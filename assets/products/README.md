# Imágenes de productos

Subí las imágenes a esta carpeta:

`assets/products/`

El nombre del archivo es el **SKU en minúsculas**. No hace falta modificar código ni base de datos.

Ejemplos:

- `EQ-XROS-MINI` → `assets/products/eq-xros-mini.webp`
- `EQ-XROS5-MINI` → `assets/products/eq-xros5-mini.webp`
- `RES-RPM2` → `assets/products/res-rpm2.webp`
- `PROMO-ELFBAR-DUO` → `assets/products/promo-elfbar-duo.webp`

Extensiones admitidas, en este orden de prioridad:

1. `.webp`
2. `.png`
3. `.jpg`
4. `.jpeg`

Si no existe una imagen local, la web intenta la URL remota del catálogo. Si tampoco existe, genera automáticamente una placa Valhalla con el nombre y la categoría.

## Recomendación

Preferir WEBP, fondo limpio o transparente, formato cuadrado o vertical y al menos 600 px de lado largo.

La lista completa de SKU está en `backend/app/seed.py`, dentro de `PRODUCTS`.
