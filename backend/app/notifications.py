import logging
import smtplib
import ssl
from email.message import EmailMessage
from .config import get_settings

logger = logging.getLogger("valhalla.notifications")
settings = get_settings()

def email_notifications_enabled() -> bool:
    return bool(settings.smtp_user and settings.smtp_app_password and settings.notify_email_to)

def send_new_order_email(order_number: str, customer_name: str, total: float, items: list[dict]):
    if not email_notifications_enabled():
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

        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"] = settings.smtp_user
        msg["To"] = settings.notify_email_to
        msg.set_content(body)

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port, context=context, timeout=15) as smtp:
            smtp.login(settings.smtp_user, settings.smtp_app_password)
            smtp.send_message(msg)
    except Exception:
        logger.exception("No se pudo enviar la notificación de nuevo pedido")
