import json
import logging
from urllib.request import Request, urlopen
from .config import get_settings

logger = logging.getLogger("valhalla.notifications")
settings = get_settings()

def email_notifications_enabled() -> bool:
    return bool(settings.notification_webhook_url and settings.valhalla_secret)

def send_new_order_email(order_number: str, customer_name: str, total: float, items: list[dict]):
    if not email_notifications_enabled():
        logger.warning("Notificación omitida: falta configurar webhook o secreto")
        return

    try:
        lines = [f"{i['quantity']}x {i['name']} — $ {i['line_total']:,.0f}".replace(",", ".") for i in items]
        total_text = f"$ {total:,.0f}".replace(",", ".")
        subject = f"⚔️ Nuevo pedido {order_number} · {customer_name} · {total_text}"

        body = (
            f"Entró un nuevo pedido en Valhalla Vape.\n\n"
            f"Pedido: {order_number}\n"
            f"Cliente: {customer_name}\n"
            f"Total: {total_text}\n\n"
            + "\n".join(lines)
            + f"\n\nAbrir Salón del Jarl: {settings.public_app_url}#admin"
        )

        payload = json.dumps({
            "secret": settings.valhalla_secret,
            "subject": subject,
            "body": body,
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
                logger.info("Respuesta del webhook de notificación: %s", result)

        logger.info("Notificación enviada para %s", order_number)
    except Exception:
        logger.exception("No se pudo enviar la notificación de nuevo pedido")
