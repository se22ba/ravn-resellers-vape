from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Valhalla Vape API"
    database_url: str = "sqlite:///./ravn.db"
    db_schema: str = "valhalla"
    admin_username: str = "spafundi"
    admin_password: str = ""
    admin2_username: str = ""
    admin2_password: str = ""
    jwt_secret: str = ""
    cors_origins: str = "http://localhost:5173"
    payment_alias: str = "se22ba.mercadopago"
    payment_holder: str = ""
    payment_cvu: str = ""
    notification_webhook_url: str = ""
    valhalla_secret: str = ""
    public_app_url: str = "https://valhalla-vape.onrender.com/"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    @property
    def cors_list(self) -> list[str]:
        return [x.strip() for x in self.cors_origins.split(",") if x.strip()]

@lru_cache
def get_settings() -> Settings:
    return Settings()
