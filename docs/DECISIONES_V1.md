# Valhalla Vape / RAVN Resellers Vape — Decisiones V1

- Identidad comercial: **Valhalla Vape**. Anubis es proveedor, no la marca de la tienda.
- Alcance V1: vapeo/e-liquid exclusivamente.
- Cliente: solo se solicita **nombre**.
- E-liquids: línea, sabor, ml y mg de nicotina.
- Líneas iniciales: Tradicional, Premium, Clon, S.A.L.T.S. y Galaxy.
- Equipos, insumos, resistencias, descartables y promociones: precio final de Anubis, sin margen; para rentabilidad costo = venta.
- Se mantienen las promociones por cantidad publicadas por Anubis.
- El envío es un único importe cargado por administración.
- El cliente envía el pedido; administración revisa y carga envío; recién en “Esperando pago” se muestran los datos de transferencia.
- El cliente puede informar “Ya transferí”; administración confirma cambiando a Pagado.
- Estados: Recibido → Revisado → Esperando pago → Pagado → Pedido a proveedor → Recibido de proveedor → Listo para entregar → Entregado. Cancelado como salida alternativa.
- Todo cambio genera historial del pedido.
- Administración puede seleccionar varios pedidos y crear un consolidado simple para Anubis.
- Mobile-first. Tamaño tipográfico mínimo absoluto: **11 px**.
- Estética: oscura, nórdica, medieval/mística; acero, carbón, plata y bronce envejecido.
- Frontend público estático compatible con GitHub Pages.
- Backend FastAPI en Render; PostgreSQL externo mediante DATABASE_URL.
- El frontend público nunca recibe costos de proveedor.

## Configuración confirmada

- Nicotina para Tradicional, Premium, Clon y Galaxy: **0 / 3 / 6 / 9 / 12 mg**.
- S.A.L.T.S.: concentración fija, sin selector de variación.
- Usuario administrativo: **spafundi**. La contraseña se mantiene exclusivamente como secreto de despliegue, nunca en el repositorio.
- Alias de transferencia: **se22ba.mercadopago**.
- Para insumos sin fotografía se genera una ilustración de catálogo consistente con la identidad visual, usando nombre y categoría como referencia.
