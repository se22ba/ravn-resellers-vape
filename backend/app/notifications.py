import html
import json
import logging
from urllib.request import Request, urlopen
from .config import get_settings

logger = logging.getLogger("valhalla.notifications")
settings = get_settings()

def email_notifications_enabled() -> bool:
    return bool(settings.notification_webhook_url and settings.valhalla_secret)

def _money(value: float) -> str:
    return f"$ {value:,.0f}".replace(",", ".")

def _send_email(to: str, subject: str, body: str, html_body: str | None = None, label: str = "notificación"):
    if not email_notifications_enabled() or not to:
        logger.warning("Notificación omitida (%s): falta webhook, secreto o destinatario", label)
        return
    try:
        payload = json.dumps({
            "secret": settings.valhalla_secret,
            "to": to,
            "subject": subject,
            "body": body,
            "htmlBody": html_body or "",
        }).encode("utf-8")
        request = Request(
            settings.notification_webhook_url,
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urlopen(request, timeout=15) as response:
            result = response.read().decode("utf-8", errors="replace").strip()
            if response.status < 200 or response.status >= 300:
                raise RuntimeError(f"Webhook respondió HTTP {response.status}: {result}")
            if result and result.upper() not in {"OK", "SUCCESS"}:
                logger.info("Respuesta del webhook (%s): %s", label, result)
        logger.info("Notificación enviada (%s) a %s", label, to)
    except Exception:
        logger.exception("No se pudo enviar %s", label)

def _button_html(title: str, intro: str, details_html: str, button_text: str, url: str) -> str:
    safe_url = html.escape(url, quote=True)
    return f"""<!doctype html>
<html><body style="margin:0;background:#090c0f;color:#e8ecef;font-family:Arial,sans-serif">
<div style="max-width:620px;margin:0 auto;padding:28px">
  <div style="background:#11171b;border:1px solid #3b4650;border-radius:16px;padding:24px">
    <div style="font-size:12px;letter-spacing:2px;color:#c6a667;font-weight:700">VALHALLA VAPE</div>
    <h2 style="margin:10px 0 12px;color:#fff">{html.escape(title)}</h2>
    <p style="color:#c7ced3;line-height:1.6">{html.escape(intro)}</p>
    <div style="margin:18px 0;padding:14px;background:#090d10;border-radius:10px;color:#d9dfe3;line-height:1.7">{details_html}</div>
    <a href="{safe_url}" style="display:inline-block;padding:12px 18px;border-radius:10px;background:#b39458;color:#090b0c;text-decoration:none;font-weight:700">{html.escape(button_text)}</a>
  </div>
</div></body></html>"""

def send_new_order_email(order_id: int, order_number: str, customer_name: str, total: float, items: list[dict]):
    lines = [f"{i['quantity']}x {i['name']} — {_money(i['line_total'])}" for i in items]
    total_text = _money(total)
    url = f"{settings.public_app_url}#admin-order={order_id}"
    subject = f"⚔️ Nuevo pedido {order_number} · {customer_name} · {total_text}"
    body = (
        f"Entró un nuevo pedido en Valhalla Vape.\n\n"
        f"Pedido: {order_number}\nCliente: {customer_name}\nTotal: {total_text}\n\n"
        + "\n".join(lines)
        + f"\n\nAbrir pedido: {url}"
    )
    details = (
        f"<b>Pedido:</b> {html.escape(order_number)}<br>"
        f"<b>Cliente:</b> {html.escape(customer_name)}<br>"
        f"<b>Total:</b> {html.escape(total_text)}<br><br>"
        + "<br>".join(html.escape(x) for x in lines)
    )
    _send_email(settings.admin_notification_email, subject, body,
                _button_html("Nuevo pedido", f"{customer_name} realizó un pedido.", details, "Abrir pedido", url),
                f"nuevo pedido {order_number}")

def send_payment_reported_email(order_id: int, order_number: str, customer_name: str, total: float):
    url = f"{settings.public_app_url}#admin-order={order_id}"
    total_text = _money(total)
    subject = f"💸 Transferencia informada · {order_number} · {customer_name}"
    body = (
        f"{customer_name} informó que realizó la transferencia.\n\n"
        f"Pedido: {order_number}\nTotal: {total_text}\n\nAbrir pedido: {url}"
    )
    details = f"<b>Pedido:</b> {html.escape(order_number)}<br><b>Cliente:</b> {html.escape(customer_name)}<br><b>Total:</b> {html.escape(total_text)}"
    _send_email(settings.admin_notification_email, subject, body,
                _button_html("Transferencia informada", f"{customer_name} marcó el pago como realizado.", details, "Revisar pedido", url),
                f"pago informado {order_number}")

def send_client_status_email(to: str, order_token: str, order_number: str, customer_name: str,
                             old_status: str, new_status: str, total: float):
    if not to:
        return
    url = f"{settings.public_app_url}#pedido={order_token}"
    total_text = _money(total)
    subject = f"Tu pedido {order_number} ahora está: {new_status}"
    body = (
        f"Hola {customer_name}.\n\n"
        f"Tu pedido {order_number} cambió de estado:\n{old_status} → {new_status}\n"
        f"Total: {total_text}\n\nVer pedido: {url}"
    )
    details = (
        f"<b>Pedido:</b> {html.escape(order_number)}<br>"
        f"<b>Estado anterior:</b> {html.escape(old_status)}<br>"
        f"<b>Nuevo estado:</b> {html.escape(new_status)}<br>"
        f"<b>Total:</b> {html.escape(total_text)}"
    )
    _send_email(to, subject, body,
                _button_html("Actualización de tu pedido", f"Hola {customer_name}, tenemos novedades.", details, "Ver mi pedido", url),
                f"estado cliente {order_number}")
