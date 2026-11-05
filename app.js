const LOGO='https://raw.githubusercontent.com/se22ba/ravn-resellers-vape/4e2b0d06b10f454cdcf1fea5873bb534c4d83122/assets/brand/Logo%20vikingo%20de%20Valhalla%20Vape.png';
const BRAND_BG='https://raw.githubusercontent.com/se22ba/ravn-resellers-vape/4e2b0d06b10f454cdcf1fea5873bb534c4d83122/assets/brand/Guerrero%20vikingo%20bajo%20la%20luna%20de%20Valhalla.png';
document.documentElement.style.setProperty('--brand-bg',`url("${BRAND_BG}")`);
function viewMode(mode){document.body.dataset.view=mode}
const API=(localStorage.getItem('vv-api')||'https://valhalla-vape-api.onrender.com/api').replace(/\/$/,'');
const STATUS=[['received','Recibido'],['reviewed','Revisado'],['awaiting_payment','Esperando pago'],['paid','Pagado'],['supplier_ordered','Pedido a proveedor'],['supplier_received','Recibido de proveedor'],['ready','Listo para entregar'],['delivered','Entregado'],['cancelled','Cancelado']];
const FLAVOR_DESCRIPTIONS={"tradicional":{"Cafe al Rhum":"Cafe negro con notas del rhum del caribe","Cafe al Whisky":"Cafe negro con whisky añejo","Cafe con Crema":"Cafe recien hecho con vainilla y leche","Caramel Capuchino":"La dulzura del caramelo con un toque de capuchino","Crema de Menta":"Menta fresca y batido de menta","Crema Irlandesa":"Crema de whisky con cafe y polvo de cacao","Ecto":"Jugo de naranja recien exprimido","Kilua":"Licor mexicano con toques de cafe","Menta":"Sabor intenso a menta fresca","Mentol":"Sabor refrescante a cristales de mentol","Mojito":"Rhum, azucar y menta","Red Bull":"Identico a la bebida energetica","Triple Mentol":"Refrescante, triple intensidad","Vainilla al Rhum":"Mezcla de vainilla dulce y un toque sutil de rhum","Anana":"El verdadero sabor de esta fruta tropical","Banana":"El inconfundible sabor de la fruta","Banana Frozen":"Banana con un toque mentolado","Blueberry":"Refrescantes arandanos","Cherry":"Sabor natural a cereza","Dragon Fruit":"Ligeramente dulce mezcla entre kiwi y pera","Frutilla":"Sabor a frutillas jugosas","Frutillas Ripes":"Frutillas jugosas, dulces y maduras","Fruits del Bosque":"Genuino sabor a frutos del bosque","Kiwi Doble":"Dulce y con un toque de acidez","Manzana Doble":"Fruta jugosa, refrescante y suave","Melon":"Fruta veraniega con gran contenido dulce","Naranja":"Tradicional jugo de naranjas, con un dejo de acidez","Pera":"Refrescante, jugosa y acida","Pomelo Rosado":"Para los amantes de los sabores citricos","Razberry":"Frutos rojos y frambuesas frescas","Sandia":"Fruta porosa, muy jugosa y dulce","Uva":"Sabor de la uva recien cortada","Yumberry":"Mix de frutos rojos y secos","Blendt de Menta":"Sabor al clasico chicle refrescante","Berry Crunch":"Copos crujientes y granola crocante","Captain Cereal":"Crocante cereal de avena y maiz","Caramelo con Limon":"Dulce caramelo de limon con un toque acido","Dulce de Leche":"El dulce de leche Argentino en un liquido","Frutti Loops":"Mix de cereales de fruta azucarados","Hazelnut":"Avellanas dulces","Marraquesh":"Marroqui con frutos secos","Mint Candy":"Refrescante caramelo de menta","Monkey Fart":"Frutillas, bananas maduras y crema de mani","Pie Crust":"Sabor a la corteza de los pasteles","Unicorn Vomit":"Mezcla de frutas con toques acidos, similar a las pastillas yapa","Banana Cream":"Bananas con crema","Banana Split":"Banana con dulce de leche y chocolate","Butter Toffees":"Caramelo de chocolate con leche","Cheesecake G. Crust":"Sabor a la masa de tarta crocante","Chococo":"Excelente mezcla de coco con chocolate","Cocoa":"Chocolate amargo intenso","Double Chocolate":"Sabor a chocolate concentrado","Durazno con Crema":"Duraznos en almibar con crema suave","French Vainilla":"Vainilla francesa dulce e intensa","Frutillas con Crema":"Frutillas con crema chantilly","Merengue Limon":"Merengue de limon esponjoso y suave","Mouse de Chocolate":"Espuma ligera y muy esponjosa de chocolate","Nutella":"Crema de chocolate y avellanas","Vainilla Cream":"Vainilla dulce con un toque crema","Americano":"Suave, semi dulce","Asian RY4":"Mas fuerte y acaramelado que nuestro RY4 original","Burley":"Intenso tabaquil de pipa, semi dulce","Cavendish":"Clasico sabor a tabaco rubio","Coumarine Pipe":"Tabaco de pipa y aroma dulce a heno recien cortado","Double RY4":"Tabaco y caramelo doblemente intenso","Golden Virginia":"Tabaco americano similar los cigarrillos armados","Honey Pipe":"Tabaco para pipas con miel pura","Mild Black":"Suave tabaco dulce con notas de tabaco negro","Red Type Blend":"Similar al cigarrillo convencional","RY4 Capuchino":"Tabaquil acaramelado con un toque de capuchino","RY4 Mentol":"Original sabor del RY4 con un fondo mentolado","Strong":"Tabaco fuerte y acido","Sweet Cuban":"Tabaco pipa clasico, semi dulce","Tabaco Cubano":"Fuerte con sabor a habano","Western":"Tradicional robusto y aromatico"},"premium":{"555":"Semi acido, para todo el dia","777":"Mezcla perfecta de varios tabacos rubios","7UP":"El inconfundible sabor a lima limon","Aguila":"Bocadito de menta bañado en chocolate","Akkenaton":"Mix frutal con lo mejor de cada fruta","Amon":"Tabaquil rubio con mani y caramelo","Anubeca":"Version de Anubis del conocido Tribeca","Anubis Cigarette":"Mezcla de tres tabacos amielados","Anubis Flan":"El clasico sabor a flan con caramelo","Anubis Gum":"Sabor a chicle globo de tutti frutti y sandia","Anubis Milk":"Cremoso a base de frutas frescas y maduras","Anubis RY4":"Base ry4 con canela, vainillas y capuccino","Anuket":"El sabor del licor baileys","Apofis":"Nuestra Version del Don Juan Reserve","Artik":"Mentol intenso con toques frutales","Asthor":"Cheesecake de uvas, arandanos y crema","Atom":"Tarta de limon, arandanos y vainilla mentolada","Cleopatra":"Donas glaseadas, bizcochos crocantes y leche malteada","Coffe Latte":"Sabor a cafe con leche recien preparado","Cuba Free":"Tabaco cubano con vainilla, caramelo y chocolate","Deluxe":"Tabaquil suave con crema de bananas, nueces y caramelo","Desert Ship":"Tabaquil rubio y suave","Felippe":"Tabaquil Phillip Morris","Felippe Mentolado":"Tabaquil Phillip Morris mentolado","Forest Ice":"Pomelo granadina y frutos del bosque con mentol","Frog Bloop":"Red Bull, champagne, melon con menta acaramelada","Gala":"Uvas y frutillas bajo cero","Horus":"Tabaquil rubio con rum y chocolate","Isis":"Tabaquil rubio, robusto con capuchino y almendras","Kalerb":"Un sabor intenso a avellanas con vainillas","Karnak":"Tabaquil semi acaramelado con mani y leche","Keops":"Churros con canela, crema de nueces y almendras","Lemon Dry":"Exquisito budin de limon recien horneado","Lyptus":"Pastillas cherry con un toque justo de durazno","Malibu":"Piña colada, anana y rum jamaiquino","Marlboro":"Tabaco rubio con frutos secos y ahumados","Merengada":"Dulce y exquisito como las galletitas","Monkey Rhum":"Bananas maduras con crema y rhum","Nefertiti":"Combinacion de cuatro vainillas, avellanas y leche","Neftis":"Tabaquil rubio con postre de vainilla","Nilo":"Caramelo limon y marraquesh","Nona Milk":"Base de leche, crema, dulce de leche y vainillas","Nui":"Tabaquil tipo convertible mentolado","Osiris":"Tabaquil ry4 con coco","Pico Dulce":"Identico sabor de la famosa golosina","Ra":"Anana con moleculas de menta","RY4 Hazelnut":"Tabaquil acaramelado con avellanas y almendras","Seb":"Tabaquil rubio con miel y un toque de expreso italiano","Seth":"Caramelos de anana sugarch","Sobek":"Tabaquil rubio con un fondo de coco","Tabaco Cocoa":"Tabaquil con toques de cacao y caramelo","Turbok":"La acidez del tabaco turco y lo citrico combinados con caramelo","USA Blend":"Tabaquil rubio similar a los cigarrillos comerciales","USA Mixer":"Tabaquil rubio fresco con toques de uva","Vainilla Tobacco":"Tabaco dulce combinado con vainilla"},"clon":{"ASAP Grape":"La mezcla de uva negra, con bayas maduras y otras frutas, crean este delicioso jugo de uva","Bluebird":"Cheesecake de cereales","Boss Reserve":"Frutos secos, cereales, crema de leche y rodajas de platano con miel","Capone":"Tabaquil dulce con crema de vainillas y caramelo","Castle Long":"Bourbon de Kentucky","Churrios":"Churros con azucar y canela","Dragon Blood":"Frutal con toques de crema, dulce y acido a la vez","Duchess":"Pastel cremoso de tres tipos diferentes de leche","Fat Boy":"Combinacion de variedades de mango y un toque sutil de menta","Love Cookies":"Galletitas remojadas en leche, con fresa y caramelo","Lemon Tart":"Tarta de limon con hojaldre y merengue","Looper":"Cereales con fruta y leche fresca","Midnight Apple":"Tabaco suave con notas de manzana verde","Milkman":"Tarta de frutas con helado de vainilla y leche","Monster Melons":"Trio de sabores mango, melon y papaya","Mother Milk":"Postre de crema con un toque de fresa","My Man":"Vainilla, fresa y chocolate","Prime 15":"Tabaco seco con matices de cacao","Sugar Drizzle":"Canela y crema de leche azucarada","Tribeca":"Tabaco, especies, caramelo y frutas secas","Unicorn Milk":"Frutillas maduras con crema de leche","Venus":"Malvaviscos asados, mantequilla de mani, caramelo, y crema"},"salts":{"Anubeca":"Version de Anubis del conocido Tribeca. Menos dulce y mas tabaquil","Artik":"Ideal para los amantes del mentol, con toques frutales","DRY4":"Tabaco con caramelo doblemente intenso","Forest Ice":"Mix de frutas, pomelo, granadina y frutos del bosque con el punto justo de mentol","Marlboro":"Version de Anubis del tabaco rubio con frutos secos y ahumados","Tribeca":"Mezcla de tabaco suave y dulce, con especias, caramelo y frutos secos","Yumberry":"Mix de frutos rojos y secos"},"galaxy":{"Mercurio":"Batido de Frutillas","Venus":"Tabaco Dulce","Tierra":"Tribeca Remix","Marte":"Milkshake de Frutilla y Banana","Jupiter":"Frappuccino","Saturno":"Ice Frutal Mix","Urano":"Bourbon Tabaco"}};
const LIQUID_LINE_IMAGES={
  tradicional:'https://dcdn-us.mitiendanube.com/stores/001/878/039/products/cc18dc23-a546-4875-a2ff-c2f01da00273-421566bc7caf7f6cac17012895187436-480-0.webp',
  premium:'https://zonatronik.com/wp-content/uploads/2024/03/ZTVAP0000110-1024x1024.jpg',
  clon:'https://liliwilson.com.ar/wp-content/uploads/2024/02/Caratulas-1080-x-540-px-1080-x-540-px-1-1024x512.png',
  salts:'https://d22fxaf9t8d39k.cloudfront.net/bbed104d9e0ad635f66795cb7d497130e86bed9140d892e016cc9fc194f9c3e5317053.jpg',
  galaxy:'https://liliwilson.com.ar/wp-content/uploads/2024/02/Caratulas-1080-x-540-px-1080-x-540-px-1-1024x512.png'
};
const ars=n=>new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(Number(n||0));
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function safeJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{localStorage.removeItem(key);return fallback}}
let catalog=null, editingOrderToken=sessionStorage.getItem('vv-edit-order-token')||'', editingOrderNumber=sessionStorage.getItem('vv-edit-order-number')||'', adminToken=sessionStorage.getItem('vv-admin')||'', clientToken=localStorage.getItem('vv-client')||'', clientProfile=safeJSON('vv-client-profile',null), cart=[];
let personalCatalog=null,
    personalCart=safeJSONSession('vv-personal-cart',[]),
    personalEditingOrderId=Number(sessionStorage.getItem('vv-personal-edit-id')||0),
    personalEditingOrderNumber=sessionStorage.getItem('vv-personal-edit-number')||'';

function clientCartKey(profile=clientProfile){return profile?.id?`vv-cart-client-${profile.id}`:'vv-cart'}
function loadClientCart(profile=clientProfile){
  const key=clientCartKey(profile);
  let stored=safeJSON(key,[]);
  if(profile?.id&&!stored.length){
    const legacy=safeJSON('vv-cart',[]);
    if(legacy.length){stored=legacy;localStorage.setItem(key,JSON.stringify(legacy));localStorage.removeItem('vv-cart')}
  }
  return stored;
}
function clearEditSession(){
  editingOrderToken='';editingOrderNumber='';
  document.body.classList.remove('order-edit-mode');
  sessionStorage.removeItem('vv-edit-order-token');
  sessionStorage.removeItem('vv-edit-order-number');
  sessionStorage.removeItem('vv-edit-order-cart');
  sessionStorage.removeItem('vv-edit-cart-backup');
}
function restoreNormalCart(){
  const backup=sessionStorage.getItem('vv-edit-cart-backup');
  clearEditSession();
  cart=backup?JSON.parse(backup):loadClientCart();
  saveCart();
  updateCartCount();
}
cart=editingOrderToken?safeJSONSession('vv-edit-order-cart',[]):loadClientCart();
function safeJSONSession(key,fallback){try{return JSON.parse(sessionStorage.getItem(key)||JSON.stringify(fallback))}catch{sessionStorage.removeItem(key);return fallback}}
function toast(t){const el=document.querySelector('#toast');el.textContent=t;el.classList.remove('hidden');setTimeout(()=>el.classList.add('hidden'),2200)}
async function forceRefresh(){try{if('caches' in window){for(const k of await caches.keys())await caches.delete(k)}}catch{}const u=new URL(location.href);u.searchParams.set('_refresh',Date.now());location.replace(u.toString())}
async function req(path,opt={}){const headers={'Content-Type':'application/json',...(opt.headers||{})};if(clientToken&&!headers.Authorization&&!path.startsWith('/admin/')&&!path.startsWith('/client/login'))headers.Authorization='Bearer '+clientToken;const r=await fetch(API+path,{...opt,headers,cache:'no-store'});if(!r.ok){let j={};try{j=await r.json()}catch{}if(r.status===401&&clientToken&&!path.startsWith('/admin/')&&!path.startsWith('/client/login')){clientLogout(false)}throw new Error(j.detail||'Error de comunicación')}return (r.headers.get('content-type')||'').includes('json')?r.json():r.text()}
function syncOrderEditMode(){
  document.body.classList.toggle('order-edit-mode',!!editingOrderToken);
}
function header(admin=false){return `<header class="topbar"><button class="brand" onclick="location.hash='' "><img class="brand-logo" src="${LOGO}"><span><b>VALHALLA</b><small>VAPE</small></span></button><div class="top-actions">${admin?'<span class="admin-chip">ADMIN</span>':`${editingOrderToken?`<button class="edit-header-chip" onclick="showCart()" title="Pedido en edición"><span>EDITANDO</span><b>${esc(editingOrderNumber)}</b></button>`:''}<span class="client-chip">${esc(clientProfile?.username||'Cliente')}</span><a class="admin-entry" href="#admin" aria-label="Acceder al Salón del Jarl">ᛉ <span>Salón del Jarl</span></a><button class="icon-btn" onclick="showCart()">🛍<i>${cart.reduce((s,x)=>s+x.quantity,0)}</i></button><button class="icon-btn logout-btn" onclick="clientLogout()" title="Cerrar sesión">↪</button>`}</div></header>`}
function footer(){return `<footer><span>ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ</span><p>Valhalla Vape · Solo para mayores de edad</p><a class="jarl-footer-link" href="#admin">ᛉ Acceder al Salón del Jarl</a></footer>`}
function privateWelcome(message=''){viewMode('private');document.title='Acceso privado';catalog=null;document.querySelector('#app').innerHTML=`<main class="private-gate branded-gate"><div class="private-bg neutral-bg"></div><div class="private-overlay"></div><section class="private-shell private-shell-client"><img class="private-brand-mark" src="${LOGO}" alt="" onerror="this.style.display='none';document.querySelector('.private-bg')?.classList.add('brand-fallback')"><p class="private-kicker private-welcome">QUÉ BUENO VERTE</p>${message?`<div class="private-error">${esc(message)}</div>`:''}<label>Usuario<input id="clientUser" autocomplete="username" placeholder="Usuario"></label><label>Número de teléfono<input id="clientPhone" type="tel" inputmode="tel" autocomplete="tel" placeholder="Teléfono"></label><button class="btn primary full" onclick="doClientLogin()">Ingresar</button><a class="management-entry" href="#admin">Acceso de gestión</a></section></main>`;applyGateBrand();const u=document.querySelector('#clientUser');if(u)u.focus()}
function applyGateBrand(){const bg=document.querySelector('.private-bg');if(!bg||!BRAND_BG)return;const img=new Image();img.onload=()=>{bg.style.backgroundImage=`url("${BRAND_BG}")`;bg.classList.remove('neutral-bg')};img.onerror=()=>bg.classList.add('brand-fallback');img.src=BRAND_BG}
async function doClientLogin(){const username=document.querySelector('#clientUser')?.value.trim()||'',phone=document.querySelector('#clientPhone')?.value.trim()||'';if(username.length<2||phone.length<6)return toast('Completá usuario y teléfono');try{const r=await req('/client/login',{method:'POST',body:JSON.stringify({username,phone})});clientToken=r.token;clientProfile=r.client;localStorage.setItem('vv-client',clientToken);localStorage.setItem('vv-client-profile',JSON.stringify(clientProfile));if(!editingOrderToken)cart=loadClientCart(clientProfile);updateCartCount();if(localStorage.getItem('vv-age-ok')==='1')route();else showAgeGate()}catch(e){privateWelcome(e.message)}}
function clientLogout(render=true){
  if(editingOrderToken){
    const backup=sessionStorage.getItem('vv-edit-cart-backup');
    clearEditSession();
    cart=backup?JSON.parse(backup):loadClientCart();
    localStorage.setItem(clientCartKey(),JSON.stringify(cart));
  }else saveCart();
  clientToken='';clientProfile=null;catalog=null;cart=[];
  localStorage.removeItem('vv-client');
  localStorage.removeItem('vv-client-profile');
  if(render){location.hash='';privateWelcome()}
}
function showAgeGate(){document.body.insertAdjacentHTML('beforeend',`<div id="age" class="age-gate"><div class="age-card rune-frame"><img class="logo-img" src="${LOGO}" alt="Valhalla Vape"><p class="eyebrow">ACCESO RESTRINGIDO</p><h1>¿Sos mayor de edad?</h1><p>Este catálogo contiene productos de vapeo y nicotina. El acceso es exclusivo para adultos.</p><button class="btn primary" onclick="acceptAge()">Sí, soy mayor de edad</button><button class="btn ghost" onclick="clientLogout()">Salir</button></div></div>`)}
function acceptAge(){localStorage.setItem('vv-age-ok','1');document.querySelector('#age')?.remove();route()}
function tierTotal(p,q){let left=q,total=0,tiers=[...(p.price_tiers||[])].sort((a,b)=>b.qty-a.qty);if(!tiers.length)return p.sale*q;for(const t of tiers){let n=Math.floor(left/t.qty);total+=n*t.total;left-=n*t.qty}return total+left*p.sale}
async function loadCatalog(){if(catalog)return catalog;catalog=await req('/catalog');return catalog}
function emailPromptKey(){return 'vv-email-prompt-dismissed-'+(clientProfile?.id||'guest')}
function emailPromptDismissed(){return sessionStorage.getItem(emailPromptKey())==='1'}
function clientEmailNotice(){
  const email=(clientProfile?.email||'').trim();
  if(email){
    return `<section class="client-email-status"><div class="client-email-status-main"><span>✉</span><div><b>Avisos por email activados</b><small>${esc(email)}</small></div></div><button class="link-btn" onclick="showClientEmailEditor()">Cambiar</button><div id="clientEmailEditor" class="client-email-editor hidden"><label>Email<input id="clientNotificationEmail" type="email" inputmode="email" autocomplete="email" value="${esc(email)}"></label><div class="client-email-editor-actions"><button class="btn ghost compact" onclick="clearClientNotificationEmail()">Desactivar</button><button class="btn primary compact" onclick="saveClientNotificationEmail()">Guardar</button></div></div></section>`;
  }
  if(emailPromptDismissed())return '';
  return `<section class="client-email-cta"><div class="client-email-copy"><span>✉</span><div><p class="eyebrow">SEGUIMIENTO</p><h3>¿Querés recibir avisos cuando cambie el estado de tus pedidos?</h3><p>Agregá tu correo y te avisamos. Es opcional y solo lo usamos para notificaciones de tus pedidos.</p></div></div><div class="client-email-form"><input id="clientNotificationEmail" type="email" inputmode="email" autocomplete="email" placeholder="tu@email.com"><button class="btn primary" onclick="saveClientNotificationEmail()">Activar avisos</button><button class="btn ghost" onclick="dismissClientEmailPrompt()">Ahora no</button></div></section>`;
}
function dismissClientEmailPrompt(){sessionStorage.setItem(emailPromptKey(),'1');document.querySelector('.client-email-cta')?.remove()}
function showClientEmailEditor(){document.querySelector('#clientEmailEditor')?.classList.toggle('hidden')}
async function saveClientNotificationEmail(){
  const email=document.querySelector('#clientNotificationEmail')?.value.trim()||'';
  if(!email)return toast('Ingresá un correo electrónico');
  try{
    const r=await req('/client/email',{method:'PATCH',body:JSON.stringify({email})});
    clientProfile={...(clientProfile||{}),email:r.email};
    localStorage.setItem('vv-client-profile',JSON.stringify(clientProfile));
    sessionStorage.removeItem(emailPromptKey());
    toast('Avisos por email activados');
    shop();
  }catch(e){toast(e.message)}
}
async function clearClientNotificationEmail(){
  try{
    const r=await req('/client/email',{method:'PATCH',body:JSON.stringify({email:null})});
    clientProfile={...(clientProfile||{}),email:r.email};
    localStorage.setItem('vv-client-profile',JSON.stringify(clientProfile));
    sessionStorage.removeItem(emailPromptKey());
    toast('Avisos por email desactivados');
    shop();
  }catch(e){toast(e.message)}
}
function goToEmailSettings(){
  sessionStorage.removeItem(emailPromptKey());
  location.hash='';
  setTimeout(()=>document.querySelector('.client-email-cta,.client-email-status')?.scrollIntoView({behavior:'smooth',block:'center'}),180);
}
function clientOrdersSection(orders=[]){return `${clientEmailNotice()}<section class="client-orders-section"><div class="client-orders-head"><div><p class="eyebrow">SEGUIMIENTO</p><h2>Mis pedidos</h2></div><button class="btn ghost compact" onclick="shop()">Actualizar</button></div>${orders.length?`<div class="client-orders-grid">${orders.slice(0,6).map(o=>`<button class="client-order-card" onclick="location.hash='pedido=${o.public_token}'"><div class="client-order-top"><div><b>${esc(o.number)}</b><small>${new Date(o.created_at).toLocaleString('es-AR')}</small></div><span class="status-badge s-${o.status}">${esc(o.status_label)}</span></div><div class="client-order-bottom"><span>${o.items.reduce((s,i)=>s+i.quantity,0)} ítems</span><strong>${ars(o.total)}</strong></div></button>`).join('')}</div>`:'<div class="client-orders-empty">Todavía no tenés pedidos.</div>'}</section>`}
function saveCart(){if(editingOrderToken)sessionStorage.setItem('vv-edit-order-cart',JSON.stringify(cart));else localStorage.setItem(clientCartKey(),JSON.stringify(cart));}
function updateCartCount(){
  const count=cart.reduce((s,x)=>s+x.quantity,0);
  const total=cart.reduce((s,x)=>s+x.line_total,0);
  const i=document.querySelector('.top-actions .icon-btn i');
  if(i)i.textContent=String(count);
  const c=document.querySelector('#editWorkspaceCount');
  const l=document.querySelector('#editWorkspaceCountLabel');
  const t=document.querySelector('#editWorkspaceTotal');
  if(c)c.textContent=String(count);
  if(l)l.textContent=count===1?'ítem':'ítems';
  if(t)t.textContent=ars(total);
}
function flavorNorm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}
function flavorDescription(slug,name){return FLAVOR_DESCRIPTIONS?.[slug]?.[name]||''}
function lineFlavorMatches(line,query){const q=flavorNorm(query);return line.flavors.filter(name=>!q||flavorNorm(name+' '+flavorDescription(line.slug,name)).includes(q))}
function flavorResultButton(line,name,global=false){const d=flavorDescription(line.slug,name);return `<button type="button" class="flavor-result" data-slug="${esc(line.slug)}" data-flavor="${esc(name)}" onclick="${global?'chooseGlobalFlavor':'selectFlavorFromButton'}(this)"><span><b>${esc(name)}</b>${global?`<em>${esc(line.name)}</em>`:''}</span>${d?`<small>${esc(d)}</small>`:''}</button>`}
function renderFlavorResults(slug,query=''){const line=catalog.liquid_lines.find(x=>x.slug===slug),box=document.querySelector(`#fr-${slug}`);if(!line||!box)return;const matches=lineFlavorMatches(line,query);box.innerHTML=matches.length?matches.map(name=>flavorResultButton(line,name)).join(''):`<div class="flavor-no-results">No encontramos sabores con “${esc(query)}”.</div>`;box.classList.add('open')}
function openFlavorPicker(slug){const input=document.querySelector(`#f-${slug}`);renderFlavorResults(slug,input?.value||'')}
function filterFlavorPicker(slug,value){const input=document.querySelector(`#f-${slug}`);if(input)input.dataset.selected='';const desc=document.querySelector(`#fd-${slug}`);if(desc)desc.textContent=value?'Resultados por nombre o descripción':'Escribí para buscar o elegí de la lista';renderFlavorResults(slug,value)}
function selectFlavor(slug,name){const input=document.querySelector(`#f-${slug}`),desc=document.querySelector(`#fd-${slug}`),box=document.querySelector(`#fr-${slug}`);if(input){input.value=name;input.dataset.selected=name}if(desc)desc.textContent=flavorDescription(slug,name)||'Sabor seleccionado';if(box)box.classList.remove('open')}
function selectFlavorFromButton(btn){selectFlavor(btn.dataset.slug,btn.dataset.flavor)}
function searchAllFlavors(value){const box=document.querySelector('#globalFlavorResults');if(!box)return;const q=flavorNorm(value);if(q.length<2){box.innerHTML='';box.classList.remove('open');return}let results=[];catalog.liquid_lines.forEach(line=>lineFlavorMatches(line,value).forEach(name=>results.push({line,name})));results.sort((a,b)=>{const an=flavorNorm(a.name),bn=flavorNorm(b.name);const ae=an===q?0:an.startsWith(q)?1:2,be=bn===q?0:bn.startsWith(q)?1:2;return ae-be||a.name.localeCompare(b.name)});const shown=results.slice(0,20);box.innerHTML=shown.length?shown.map(r=>flavorResultButton(r.line,r.name,true)).join(''):`<div class="flavor-no-results">No encontramos sabores con “${esc(value)}”.</div>`;if(results.length>20)box.insertAdjacentHTML('beforeend',`<div class="flavor-more">+${results.length-20} resultados. Afiná la búsqueda.</div>`);box.classList.add('open')}
function chooseGlobalFlavor(btn){const slug=btn.dataset.slug,name=btn.dataset.flavor;const global=document.querySelector('#globalFlavorSearch');if(global)global.value=name;document.querySelector('#globalFlavorResults')?.classList.remove('open');selectFlavor(slug,name);const card=document.querySelector(`.line-${slug}`);if(card){card.classList.add('flavor-target');card.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>card.classList.remove('flavor-target'),1400)}}
function resolveFlavor(line,raw){const q=flavorNorm(raw);if(!q)return null;const exact=line.flavors.find(n=>flavorNorm(n)===q);if(exact)return exact;const matches=lineFlavorMatches(line,raw);return matches.length===1?matches[0]:null}
document.addEventListener('click',e=>{if(!e.target.closest('.flavor-picker'))document.querySelectorAll('.flavor-results.open').forEach(x=>{if(x.id!=='globalFlavorResults')x.classList.remove('open')});if(!e.target.closest('.global-flavor-search'))document.querySelector('#globalFlavorResults')?.classList.remove('open')});
function resetLiquidCard(slug){const input=document.querySelector(`#f-${slug}`),desc=document.querySelector(`#fd-${slug}`),results=document.querySelector(`#fr-${slug}`),size=document.querySelector(`#s-${slug}`),nico=document.querySelector(`#n-${slug}`),qtyEl=document.querySelector(`#q-${slug}`),global=document.querySelector('#globalFlavorSearch'),globalResults=document.querySelector('#globalFlavorResults');if(input){input.value='';input.dataset.selected=''}if(desc)desc.textContent='Escribí para buscar o elegí de la lista';if(results){results.innerHTML='';results.classList.remove('open')}if(size)size.selectedIndex=0;if(nico)nico.selectedIndex=0;if(qtyEl)qtyEl.textContent='1';if(global)global.value='';if(globalResults){globalResults.innerHTML='';globalResults.classList.remove('open')}}
function addLiquid(slug){const l=catalog.liquid_lines.find(x=>x.slug===slug),input=document.querySelector(`#f-${slug}`),f=resolveFlavor(l,input?.value||'');if(!f){toast('Elegí un sabor válido de la lista');input?.focus();openFlavorPicker(slug);return}selectFlavor(slug,f);const size=+document.querySelector(`#s-${slug}`).value,mg=+document.querySelector(`#n-${slug}`).value,q=+document.querySelector(`#q-${slug}`).textContent,p=l.prices.find(x=>x.size_ml===size).sale,key=`l-${slug}-${f}-${size}-${mg}`;const old=cart.find(x=>x.key===key);if(old){old.quantity+=q;old.line_total+=p*q}else cart.push({key,kind:'liquid',line_slug:slug,flavor:f,size_ml:size,nicotine_mg:mg,quantity:q,name:`${l.name} · ${f} · ${size}ml · ${mg}mg`,line_total:p*q});saveCart();resetLiquidCard(slug);toast(editingOrderToken?'Agregado a '+editingOrderNumber:'Agregado al pedido');updateCartCount()}
function addProduct(id){const p=catalog.products.find(x=>x.id===id),qtyEl=document.querySelector(`#pq-${id}`),q=+qtyEl.textContent,total=tierTotal(p,q),variant=(document.querySelector(`#pv-${id}`)?.value||'').trim(),key=`p-${id}-${variant.toLowerCase()}`,old=cart.find(x=>x.key===key);if(old){old.quantity+=q;old.line_total=tierTotal(p,old.quantity)}else cart.push({key,kind:'product',reference_id:id,quantity:q,variant_note:variant||null,name:p.name+(variant?' · Preferencia: '+variant:''),line_total:total});saveCart();if(qtyEl)qtyEl.textContent='1';const v=document.querySelector(`#pv-${id}`);if(v)v.value='';toast(editingOrderToken?'Agregado a '+editingOrderNumber:'Agregado al pedido');updateCartCount()}
function qty(id,d){const e=document.querySelector('#'+id);e.textContent=Math.max(1,+e.textContent+d)}
function liquidImageFallback(img){const slug=img.dataset.slug||'',base='assets/liquids/'+slug,raw='https://raw.githubusercontent.com/se22ba/ravn-resellers-vape/main/assets/liquids/'+slug,remote=LIQUID_LINE_IMAGES[slug]||'',fallback=productPlaceholder(img.dataset.name||'Anubis','E-Liquid');const tries=[base+'.png',base+'.jpg',base+'.jpeg',raw+'.webp',raw+'.png',raw+'.jpg',raw+'.jpeg',remote,fallback].filter(Boolean);let i=Number(img.dataset.try||0)+1;if(i<tries.length){img.dataset.try=String(i);img.src=tries[i]}else img.onerror=null}
function liquidCard(l){let min=Math.min(...l.prices.map(p=>p.sale)),local=`assets/liquids/${l.slug}.webp`;return `<article class="liquid-card line-${l.slug}"><img class="liquid-line-art" src="${esc(local)}" alt="Envase línea ${esc(l.name)}" data-slug="${esc(l.slug)}" data-name="${esc(l.name)}" data-try="0" onerror="liquidImageFallback(this)"><div class="liquid-shade"></div><div class="liquid-emblem"><span>ᚱ</span></div><div class="liquid-card-content"><div class="liquid-head"><p class="eyebrow">LÍNEA</p><h3>${esc(l.name)}</h3><strong>desde ${ars(min)}</strong></div><label>Sabor<div class="flavor-picker"><div class="flavor-input-wrap"><input id="f-${l.slug}" type="search" inputmode="search" autocomplete="off" placeholder="Buscar sabor…" data-selected="" onfocus="openFlavorPicker('${l.slug}')" oninput="filterFlavorPicker('${l.slug}',this.value)"><button type="button" class="flavor-toggle" aria-label="Ver sabores" onclick="event.preventDefault();openFlavorPicker('${l.slug}')">⌄</button></div><div id="fr-${l.slug}" class="flavor-results"></div><small id="fd-${l.slug}" class="flavor-description">Escribí para buscar o elegí de la lista</small></div></label><div class="grid-2"><label>Medida<select id="s-${l.slug}">${l.prices.map(p=>`<option value="${p.size_ml}">${p.size_ml} ml · ${ars(p.sale)}</option>`).join('')}</select></label><label>Nicotina<select id="n-${l.slug}">${l.nicotine_options.map(x=>`<option value="${x}">${x} mg</option>`).join('')}</select></label></div><div class="add-row"><div class="qty"><button onclick="qty('q-${l.slug}',-1)">−</button><span id="q-${l.slug}">1</span><button onclick="qty('q-${l.slug}',1)">+</button></div><button class="btn primary compact catalog-add-btn" onclick="addLiquid('${l.slug}')">${editingOrderToken?'＋ Sumar al pedido':'+ Agregar'}</button></div></div></article>`}
function productPlaceholder(name,category){const clean=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const words=String(name||'Producto').split(/\s+/).slice(0,4),top=clean(words.slice(0,2).join(' ')),bottom=clean(words.slice(2).join(' ')),cat=clean(String(category||'Insumo').toUpperCase());const svg='<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#1f2830"/><stop offset="1" stop-color="#090c0f"/></linearGradient><linearGradient id="b" x1="0" x2="1"><stop stop-color="#d0b173"/><stop offset="1" stop-color="#8f7548"/></linearGradient></defs><rect width="480" height="480" rx="28" fill="url(#g)"/><rect x="18" y="18" width="444" height="444" rx="22" fill="none" stroke="#3d4852"/><circle cx="240" cy="150" r="88" fill="#10161b" stroke="#4b5661"/><text x="240" y="173" text-anchor="middle" font-size="96" fill="url(#b)" font-family="Georgia,serif">ᛉ</text><text x="240" y="285" text-anchor="middle" font-size="26" font-weight="700" fill="#d0b173" font-family="Arial,sans-serif" letter-spacing="2">'+cat+'</text><text x="240" y="335" text-anchor="middle" font-size="32" font-weight="700" fill="#eef1f2" font-family="Arial,sans-serif">'+top+'</text>'+(bottom?'<text x="240" y="372" text-anchor="middle" font-size="28" fill="#c7cdd1" font-family="Arial,sans-serif">'+bottom+'</text>':'')+'</svg>';return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg)}
function productImageFallback(img){const key=String(img.dataset.sku||'').toLowerCase(),base='assets/products/'+key,raw='https://raw.githubusercontent.com/se22ba/ravn-resellers-vape/main/assets/products/'+key,remote=img.dataset.remote||'',fallback=productPlaceholder(img.dataset.name||'Producto',img.dataset.category||'Insumo'),candidates=[base+'.webp',base+'.png',base+'.jpg',base+'.jpeg',raw+'.webp',raw+'.png',raw+'.jpg',raw+'.jpeg',remote,fallback].filter(Boolean);let i=Number(img.dataset.try||0)+1;if(i<candidates.length){img.dataset.try=String(i);img.src=candidates[i]}else{img.onerror=null}}
function productVariantMeta(p){
  const cat=String(p?.category||'').toLowerCase();
  if(cat.includes('descartable'))return {
    kind:'flavor',
    label:'Preferencia de sabor',
    placeholder:'Ej: Blue Razz, Sandía Ice…',
    hint:'Hay distintos sabores según disponibilidad. La imagen puede mostrar solo una variante.'
  };
  if(cat.includes('resistencia'))return {
    kind:'resistance',
    label:'Preferencia de ohmiaje / variante',
    placeholder:'Ej: 0.8 Ω, 0.6 Ω…',
    hint:'El ohmiaje y la variante dependen del stock disponible. La imagen puede mostrar una opción específica.'
  };
  return null;
}
function illustrativeCatalogNotice(){
  return `<div class="catalog-availability-notice"><span>ⓘ</span><div><b>Imágenes meramente ilustrativas</b><p>Algunas fotos muestran un sabor, color, ohmiaje o versión específica. Las variantes reales dependen de disponibilidad. Cuando corresponda, podés indicar tu preferencia y la confirmamos antes de procesar el pedido.</p></div></div>`;
}

function productCard(p){
  const base='assets/products/'+String(p.sku||'').toLowerCase()+'.webp',variant=productVariantMeta(p);
  return `<article class="product-card ${variant?'product-has-variants':''}"><div class="product-media"><img src="${esc(base)}" alt="${esc(p.name)}" loading="lazy" data-try="0" data-sku="${esc(p.sku)}" data-remote="${esc(p.image_url||'')}" data-name="${esc(p.name)}" data-category="${esc(p.category)}" onerror="productImageFallback(this)"><span>${esc(p.category)}</span></div><div class="product-body"><h3>${esc(p.name)}</h3>${p.price_tiers?.length?`<p class="promo-line">${p.price_tiers.map(t=>`${t.qty}× ${ars(t.total)}`).join(' · ')}</p>`:''}<strong>${ars(p.sale)}</strong>${variant?`<div class="variant-preference"><label>${esc(variant.label)} <small>(opcional)</small><input id="pv-${p.id}" type="text" maxlength="160" autocomplete="off" placeholder="${esc(variant.placeholder)}"></label><p>${esc(variant.hint)}</p></div>`:''}<div class="add-row"><div class="qty"><button onclick="qty('pq-${p.id}',-1)">−</button><span id="pq-${p.id}">1</span><button onclick="qty('pq-${p.id}',1)">+</button></div><button class="btn primary icon-only catalog-add-btn" onclick="addProduct(${p.id})" title="${editingOrderToken?'Sumar al pedido':'Agregar al pedido'}">${editingOrderToken?'＋ Sumar':'+'}</button></div></div></article>`;
}
function editOrderWorkspace(){
  const total=cart.reduce((sum,x)=>sum+x.line_total,0);
  const count=cart.reduce((sum,x)=>sum+x.quantity,0);
  return `<section class="edit-workspace" id="editWorkspace">
    <div class="edit-mode-flag"><span class="edit-mode-dot"></span><span>EDITANDO PEDIDO</span></div>
    <div class="edit-workspace-copy">
      <b class="edit-workspace-number">${esc(editingOrderNumber)}</b>
      <span class="edit-workspace-help">Todo lo que agregues modifica este pedido</span>
    </div>
    <div class="edit-workspace-summary">
      <span><b id="editWorkspaceCount">${count}</b> <span id="editWorkspaceCountLabel">${count===1?'ítem':'ítems'}</span></span>
      <strong id="editWorkspaceTotal">${ars(total)}</strong>
    </div>
    <div class="edit-workspace-actions">
      <button class="btn primary compact" onclick="showCart()">Ver cambios</button>
      <button class="edit-bar-cancel" onclick="cancelOrderEdit()" title="Cancelar edición">✕</button>
    </div>
  </section>`;
}
function continueEditingOrder(){
  document.querySelector('#cartModal')?.remove();
  const reveal=()=>{
    syncOrderEditMode();
    const bar=document.querySelector('#editWorkspace');
    if(bar){bar.classList.remove('edit-workspace-pulse');void bar.offsetWidth;bar.classList.add('edit-workspace-pulse')}
    document.querySelector('.pill-tabs')?.scrollIntoView({behavior:'smooth',block:'start'});
    toast('Seguís editando '+editingOrderNumber+' · lo que agregues se suma a este pedido');
  };
  if(location.hash){location.hash='';setTimeout(reveal,220)}else reveal();
}
async function shop(){if(!clientToken)return privateWelcome();viewMode('client');syncOrderEditMode();document.title='Valhalla Vape';document.querySelector('#app').innerHTML=header()+`<div class="catalog-loading">Cargando catálogo…</div>`;try{const [,orders,me]=await Promise.all([loadCatalog(),req('/client/orders'),req('/client/me')]);clientProfile={...(clientProfile||{}),...me};localStorage.setItem('vv-client-profile',JSON.stringify(clientProfile));syncOrderEditMode();document.querySelector('#app').innerHTML=header()+`<main>${editingOrderToken?editOrderWorkspace():`<section class="hero"><div class="hero-overlay"></div><div class="hero-copy"><p class="eyebrow">INSUMOS & E-LIQUIDS</p><h1>Elegí. Armá. <span>Entrá al Valhalla.</span></h1></div></section>${clientOrdersSection(orders)}`}<nav class="pill-tabs"><button class="active" onclick="tab('liquidos',this)">💧 Líquidos</button><button onclick="tab('insumos',this)">▦ Insumos</button><button onclick="tab('promos',this)">✦ Promos</button></nav><section class="section" id="content"></section></main>${footer()}`;tab('liquidos',document.querySelector('.pill-tabs button'))}catch(e){if(!clientToken)return privateWelcome('Tu sesión venció o ya no está autorizada.');const loading=document.querySelector('.catalog-loading');if(loading)loading.textContent='No pudimos conectar con el servidor. '+e.message}}
function tab(name,b){document.querySelectorAll('.pill-tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');let c=document.querySelector('#content');if(name==='liquidos')c.innerHTML=`<div class="section-title"><p class="eyebrow">ANUBIS E-JUICE</p><h2>Elegí tu líquido</h2><p>Seleccioná línea, sabor, medida y nicotina.</p></div><div class="global-flavor-search"><div class="global-flavor-copy"><p class="eyebrow">ATAJO</p><h3>¿Ya sabés qué querés?</h3><p>Buscá por nombre o por lo que tiene. Ej: Tribeca, banana, tabaco, menta…</p></div><div class="global-flavor-field"><span>⌕</span><input id="globalFlavorSearch" type="search" inputmode="search" autocomplete="off" placeholder="Buscar sabor o ingrediente…" oninput="searchAllFlavors(this.value)" onfocus="searchAllFlavors(this.value)"></div><div id="globalFlavorResults" class="global-flavor-results"></div></div><div class="liquid-grid">${catalog.liquid_lines.map(liquidCard).join('')}</div>`;else{let promo=name==='promos',ps=catalog.products.filter(p=>promo?p.category.toLowerCase().includes('promo'):!p.category.toLowerCase().includes('promo')),cats=[...new Set(ps.map(p=>p.category))];c.innerHTML=`<div class="section-title"><p class="eyebrow">CATÁLOGO</p><h2>${promo?'Promociones':'Equipos & insumos'}</h2><p>${promo?'Promociones directas de Anubis.':'Precios finales, sin recargo.'}</p></div>${illustrativeCatalogNotice()}${cats.map(cat=>`<div class="category-block"><h3>${esc(cat)}</h3><div class="products-grid">${ps.filter(p=>p.category===cat).map(productCard).join('')}</div></div>`).join('')}`}}
function cartItemEditor(x,i){
  if(x.kind==='liquid'){
    const line=catalog?.liquid_lines?.find(l=>l.slug===x.line_slug);
    if(!line)return '';
    return `<div class="cart-edit-form" id="cei-${i}">
      <label>Sabor<select id="cef-${i}">${line.flavors.map(v=>`<option value="${esc(v)}" ${v===x.flavor?'selected':''}>${esc(v)}</option>`).join('')}</select></label>
      <div class="grid-2">
        <label>Medida<select id="ces-${i}">${line.prices.map(p=>`<option value="${p.size_ml}" ${p.size_ml===x.size_ml?'selected':''}>${p.size_ml} ml · ${ars(p.sale)}</option>`).join('')}</select></label>
        <label>Nicotina<select id="cen-${i}">${line.nicotine_options.map(n=>`<option value="${n}" ${n===x.nicotine_mg?'selected':''}>${n} mg</option>`).join('')}</select></label>
      </div>
      <label>Cantidad<input id="ceq-${i}" type="number" min="1" max="99" value="${x.quantity}"></label>
      <div class="cart-edit-actions"><button class="btn ghost compact" onclick="closeCartEdit(${i})">Cancelar</button><button class="btn primary compact" onclick="saveCartEdit(${i})">Guardar cambios</button></div>
    </div>`;
  }
  const p=catalog?.products?.find(p=>p.id===x.reference_id),variant=productVariantMeta(p);
  return `<div class="cart-edit-form" id="cei-${i}">
    ${variant?`<label>${esc(variant.label)} <small>(opcional)</small><input id="cev-${i}" type="text" maxlength="160" value="${esc(x.variant_note||'')}" placeholder="${esc(variant.placeholder)}"></label><p class="cart-variant-hint">${esc(variant.hint)}</p>`:''}
    <label>Cantidad<input id="ceq-${i}" type="number" min="1" max="99" value="${x.quantity}"></label>
    <div class="cart-edit-actions"><button class="btn ghost compact" onclick="closeCartEdit(${i})">Cancelar</button><button class="btn primary compact" onclick="saveCartEdit(${i})">Guardar cambios</button></div>
  </div>`;
}
function editCartItem(i){const row=document.querySelector(`#cart-row-${i}`);if(!row)return;row.querySelector('.cart-edit-slot').innerHTML=cartItemEditor(cart[i],i);row.classList.add('editing')}
function closeCartEdit(i){const row=document.querySelector(`#cart-row-${i}`);if(!row)return;row.querySelector('.cart-edit-slot').innerHTML='';row.classList.remove('editing')}
function saveCartEdit(i){
  const x=cart[i]; if(!x)return;
  const q=Math.max(1,Math.min(99,Number(document.querySelector(`#ceq-${i}`)?.value||1)));
  if(x.kind==='liquid'){
    const line=catalog?.liquid_lines?.find(l=>l.slug===x.line_slug); if(!line)return;
    const flavor=document.querySelector(`#cef-${i}`).value,size=Number(document.querySelector(`#ces-${i}`).value),mg=Number(document.querySelector(`#cen-${i}`).value);
    const price=line.prices.find(p=>p.size_ml===size); if(!price)return;
    Object.assign(x,{flavor,size_ml:size,nicotine_mg:mg,quantity:q,name:`${line.name} · ${flavor} · ${size}ml · ${mg}mg`,line_total:price.sale*q,key:`l-${line.slug}-${flavor}-${size}-${mg}`});
  }else{
    const p=catalog?.products?.find(p=>p.id===x.reference_id); if(!p)return;
    const variant=(document.querySelector(`#cev-${i}`)?.value||x.variant_note||'').trim();
    x.quantity=q;x.variant_note=variant||null;x.line_total=tierTotal(p,q);x.name=p.name+(variant?' · Preferencia: '+variant:'');x.key=`p-${p.id}-${variant.toLowerCase()}`;
  }
  saveCart();updateCartCount();document.querySelector('#cartModal')?.remove();showCart();toast(editingOrderToken?'Cambio aplicado al pedido en edición':'Producto actualizado');
}
function removeCartItem(i){cart.splice(i,1);saveCart();document.querySelector('#cartModal')?.remove();updateCartCount();showCart()}
function showCart(){
  let total=cart.reduce((s,x)=>s+x.line_total,0);
  const editing=!!editingOrderToken;
  const items=cart.length
    ?cart.map((x,i)=>`<div class="cart-item cart-item-editable" id="cart-row-${i}"><div class="cart-item-main"><div class="cart-item-info"><b>${x.quantity}× ${esc(x.name)}</b><small>${ars(x.line_total)}</small></div><div class="cart-item-actions"><button class="link-btn" onclick="editCartItem(${i})">Editar</button><button class="link-btn danger" onclick="removeCartItem(${i})">Quitar</button></div></div><div class="cart-edit-slot"></div></div>`).join('')
    :'<div class="cart-empty-edit"><p>No hay productos en este pedido.</p><small>Agregá al menos uno antes de guardar.</small></div>';

  const editActions=editing
    ?`<div class="edit-cart-actions">
        <button class="btn ghost full add-more-order-btn" onclick="continueEditingOrder()">＋ Seguir agregando productos</button>
        <button class="btn primary full save-order-changes" ${cart.length?'':'disabled'} onclick="sendOrder(this)">Guardar cambios</button>
        <button class="link-btn cancel-edit-link" onclick="cancelOrderEdit()">Descartar cambios</button>
      </div>
      <div class="edit-danger-zone">
        <span>Acción irreversible</span>
        <button class="link-btn danger" onclick="deleteOrder('${editingOrderToken}')">Eliminar pedido completo</button>
      </div>`
    :`<button class="btn primary full" ${cart.length?'':'disabled'} onclick="location.hash='checkout';document.querySelector('#cartModal').remove()">Continuar</button>`;

  const html=`<div class="modal-scrim" id="cartModal"><div class="batch-modal cart-modal rune-frame ${editing?'cart-modal-editing':''}">
    <button class="modal-close" onclick="document.querySelector('#cartModal').remove()" aria-label="Cerrar">✕</button>
    ${editing
      ?`<div class="edit-modal-head"><div><p class="eyebrow">PEDIDO EN EDICIÓN</p><h2>Cambios del pedido</h2></div><span class="edit-order-pill">${esc(editingOrderNumber)}</span></div>
         <p class="edit-modal-intro">Modificá, quitá o agregá productos. Nada se aplica al pedido hasta que presiones <b>Guardar cambios</b>.</p>`
      :`<p class="eyebrow">TU PEDIDO</p><h2>Carrito</h2>`}
    <div class="cart-items-list">${items}</div>
    <div class="edit-cart-summary"><span>Subtotal</span><strong>${ars(total)}</strong></div>
    <p class="muted cart-shipping-note">El envío se agrega después de revisar el pedido.</p>
    ${editActions}
  </div></div>`;
  document.body.insertAdjacentHTML('beforeend',html);
}
function checkout(){if(!clientToken)return privateWelcome();if(editingOrderToken){showCart();return}let total=cart.reduce((s,x)=>s+x.line_total,0);document.querySelector('#app').innerHTML=header()+`<main class="narrow"><section class="checkout-card rune-frame"><p class="eyebrow">${editingOrderToken?'EDITAR PEDIDO':'CONFIRMAR PEDIDO'}</p><h1>${editingOrderToken?esc(editingOrderNumber):'Pedido de '+esc(clientProfile?.username||'cliente')}</h1><p class="muted">${editingOrderToken?'Revisá los cambios antes de guardarlos. Podés modificar el pedido hasta que sea enviado al proveedor.':'No transfieras todavía. Primero revisamos disponibilidad y cargamos el envío.'}</p><div class="order-review">${cart.map(x=>`<div><span>${x.quantity}× ${esc(x.name)}</span><b>${ars(x.line_total)}</b></div>`).join('')}</div><div class="total-line"><span>Subtotal</span><strong>${ars(total)}</strong></div>${clientProfile?.email?'':`<div class="checkout-email-reminder"><span>✉</span><div><b>¿Querés recibir cambios de estado?</b><small>Podés agregar tu email. No es obligatorio.</small></div><button class="link-btn" onclick="goToEmailSettings()">Activar avisos</button></div>`}<button class="btn primary full" onclick="sendOrder(this)">Enviar pedido</button></section></main>`}
function orderPayload(){return {items:cart.map(x=>({kind:x.kind,reference_id:x.reference_id,line_slug:x.line_slug,flavor:x.flavor,size_ml:x.size_ml,nicotine_mg:x.nicotine_mg,variant_note:x.variant_note||null,quantity:x.quantity}))}}
async function sendOrder(button=null){
  if(!clientToken)return privateWelcome();
  if(!cart.length)return toast('Agregá al menos un producto');
  const original=button?.textContent||'';
  if(button){button.disabled=true;button.textContent=editingOrderToken?'Guardando cambios…':'Enviando pedido…'}
  try{
    const editToken=editingOrderToken;
    const o=await req(editToken?'/orders/public/'+editToken:'/orders',{method:editToken?'PUT':'POST',body:JSON.stringify(orderPayload())});
    document.querySelector('#cartModal')?.remove();
    if(editToken){restoreNormalCart();toast('Pedido actualizado')}else{cart=[];localStorage.removeItem(clientCartKey());updateCartCount()}
    location.hash='pedido='+o.public_token;
  }catch(e){
    toast(e.message);
    if(button&&document.body.contains(button)){button.disabled=false;button.textContent=original}
  }
}
function cancelOrderEdit(){
  if(editingOrderToken&&!confirm('¿Cancelar la edición? Los cambios que todavía no guardaste se van a descartar.'))return;
  const token=editingOrderToken;
  document.querySelector('#cartModal')?.remove();
  restoreNormalCart();
  if(token)location.hash='pedido='+token;else location.hash='';
}
async function startOrderEdit(token){
  try{
    const [o]=await Promise.all([req('/orders/public/'+token),loadCatalog()]);
    if(!o.editable){toast('Este pedido ya fue enviado al proveedor y no puede modificarse');return}
    const rebuilt=[];
    for(const i of o.items){
      if(i.kind==='liquid'){
        const line=catalog.liquid_lines.find(l=>l.id===i.reference_id);if(!line)continue;
        rebuilt.push({key:`l-${line.slug}-${i.flavor}-${i.size_ml}-${i.nicotine_mg}`,kind:'liquid',reference_id:line.id,line_slug:line.slug,flavor:i.flavor,size_ml:i.size_ml,nicotine_mg:i.nicotine_mg,quantity:i.quantity,name:i.name,line_total:i.line_total_sale});
      }else{
        const p=catalog.products.find(p=>p.id===i.reference_id);if(!p)continue;
        rebuilt.push({key:`p-${p.id}-${String(i.variant_note||'').toLowerCase()}`,kind:'product',reference_id:p.id,quantity:i.quantity,variant_note:i.variant_note||null,name:i.name,line_total:i.line_total_sale});
      }
    }
    if(!rebuilt.length){toast('No se pudieron cargar los productos del pedido');return}
    sessionStorage.setItem('vv-edit-cart-backup',JSON.stringify(cart));editingOrderToken=token;editingOrderNumber=o.number;sessionStorage.setItem('vv-edit-order-token',token);sessionStorage.setItem('vv-edit-order-number',o.number);cart=rebuilt;saveCart();syncOrderEditMode();updateCartCount();location.hash='';setTimeout(()=>showCart(),220);
  }catch(e){toast(e.message)}
}
async function deleteOrder(token){
  if(!confirm('¿Eliminar este pedido? Esta acción lo quitará de Mis pedidos.'))return;
  try{
    await req('/orders/public/'+token,{method:'DELETE'});
    if(editingOrderToken===token)restoreNormalCart()
    toast('Pedido eliminado');
    location.hash='';
  }catch(e){toast(e.message)}
}
async function orderStatus(token){document.querySelector('#app').innerHTML=header()+`<div class="catalog-loading">Buscando pedido…</div>`;try{let o=await req('/orders/public/'+token);let pay=o.payment?`<div class="payment-box"><span>🏦</span><div><p class="eyebrow">TRANSFERENCIA</p><h3>${esc(o.payment.alias||'Alias pendiente')}</h3><p>${esc(o.payment.holder||'')}</p></div><button class="icon-btn" onclick="navigator.clipboard.writeText('${esc(o.payment.alias||'')}');toast('Alias copiado')">⧉</button></div>`:'';document.querySelector('#app').innerHTML=header()+`<main class="narrow"><section class="status-card rune-frame"><p class="eyebrow">PEDIDO ${esc(o.number)}</p><h1>${esc(o.customer_name)}</h1><div class="status-badge s-${o.status}">${esc(o.status_label)}</div>${o.editable?`<div class="order-edit-available"><p>Podés modificar o eliminar este pedido hasta que sea enviado al proveedor.</p><button class="btn ghost full" onclick="startOrderEdit('${token}')">✎ Editar pedido</button><button class="btn danger full delete-order-btn" onclick="deleteOrder('${token}')">Eliminar pedido</button></div>`:''}<div class="order-review">${o.items.map(i=>`<div><span>${i.quantity}× ${esc(i.name)}</span><b>${ars(i.line_total_sale)}</b></div>`).join('')}</div><div class="summary-lines"><div><span>Subtotal</span><b>${ars(o.subtotal)}</b></div><div><span>Envío</span><b>${ars(o.shipping)}</b></div><div class="grand"><span>Total</span><b>${ars(o.total)}</b></div></div>${pay}${o.status==='awaiting_payment'&&!o.payment_reported?`<button class="btn primary full" onclick="reportPayment('${token}')">Ya transferí</button>`:''}${o.payment_reported?'<div class="notice success">✓ Transferencia informada. Falta confirmación.</div>':''}<div class="timeline"><h3>Historial</h3>${[...o.events].reverse().map(e=>`<div><i></i><p><b>${esc(e.detail)}</b><small>${new Date(e.created_at).toLocaleString('es-AR')}</small></p></div>`).join('')}</div></section></main>`}catch(e){if(!clientToken)return privateWelcome('Tu sesión venció o ya no está autorizada.');toast(e.message)}}
async function reportPayment(token){try{await req('/orders/public/'+token+'/payment-reported',{method:'POST'});orderStatus(token)}catch(e){toast(e.message)}}
let adminTab='active';
const ADMIN_ACTIVE_STATUSES=new Set(['received','reviewed','awaiting_payment','paid','supplier_ordered','supplier_received','ready']);
function setAdminTab(tab){adminTab=tab==='history'?'history':'active';admin()}
function adminSectionNav(activeCount=0,historyCount=0,current='orders'){return `<nav class="admin-section-nav" aria-label="Administración"><button class="admin-section-tab ${current==='orders'&&adminTab==='active'?'active':''}" onclick="setAdminTab('active')"><span>Pedidos</span><b>${activeCount}</b></button><button class="admin-section-tab ${current==='orders'&&adminTab==='history'?'active':''}" onclick="setAdminTab('history')"><span>Historial</span><b>${historyCount}</b></button><a class="admin-section-tab ${current==='users'?'active':''}" href="#admin-users"><span>Usuarios</span></a></nav>`}
function adminEmptyState(history=false){return `<div class="admin-empty-state"><span>${history?'ᚺ':'ᚱ'}</span><h3>${history?'Todavía no hay historial':'No hay pedidos pendientes'}</h3><p>${history?'Los pedidos entregados y cancelados van a aparecer acá.':'Cuando ingrese un pedido nuevo, va a aparecer en esta vista.'}</p></div>`}
async function admin(focusId=null){if(!adminToken)return adminLogin();viewMode('admin');document.title='Salón del Jarl';document.querySelector('#app').innerHTML=header(true)+`<div class="catalog-loading">Cargando administración…</div>`;try{let [orders,m,me]=await Promise.all([req('/admin/orders',{headers:{Authorization:'Bearer '+adminToken}}),req('/admin/metrics',{headers:{Authorization:'Bearer '+adminToken}}),req('/admin/me',{headers:{Authorization:'Bearer '+adminToken}})]);const activeOrders=orders.filter(o=>ADMIN_ACTIVE_STATUSES.has(o.status)),historyOrders=orders.filter(o=>!ADMIN_ACTIVE_STATUSES.has(o.status));if(focusId){const target=orders.find(o=>o.id===+focusId);if(target)adminTab=ADMIN_ACTIVE_STATUSES.has(target.status)?'active':'history'}const shown=adminTab==='history'?historyOrders:activeOrders;document.querySelector('#app').innerHTML=header(true)+`<main class="admin-panel"><div class="admin-title"><div><p class="eyebrow">VALHALLA CONTROL</p><h1>${adminTab==='history'?'Historial':'Pedidos'}</h1></div><div class="admin-title-actions">${me.personal_order_enabled?'<a class="btn personal-order-entry compact" href="#admin-personal">⚔ Pedido personal</a>':''}<a class="btn primary compact" href="#admin-catalog">Catálogo completo</a><button class="btn ghost compact" onclick="admin()">Actualizar</button></div></div><div class="metrics"><div><span>Nuevos</span><b>${m.new}</b></div><div><span>Venta</span><b>${ars(m.sales)}</b></div><div><span>Costo</span><b>${ars(m.cost)}</b></div><div class="profit"><span>Ganancia</span><b>${ars(m.profit)}</b></div></div>${adminSectionNav(activeOrders.length,historyOrders.length,'orders')}${adminTab==='active'?'<div class="admin-actions"><span id="selCount">0 seleccionados</span><button class="btn primary compact" onclick="createBatch()">Crear pedido a Anubis</button></div>':''}<div class="admin-grid ${adminTab==='history'?'history-grid':''}">${shown.length?shown.map(o=>adminOrder(o,adminTab==='history')).join(''):adminEmptyState(adminTab==='history')}</div></main>`;if(focusId){requestAnimationFrame(()=>{const el=document.querySelector(`#admin-order-${focusId}`);if(el){el.classList.add('order-focus');el.scrollIntoView({behavior:'smooth',block:'center'})}})}}catch(e){adminToken='';sessionStorage.removeItem('vv-admin');adminLogin()}}
let adminUsersTab='clients';
function setAdminUsersTab(tab){adminUsersTab=tab==='admins'?'admins':'clients';adminUsersView()}
function managedClientRow(c){return `<article class="user-manage-row"><div class="user-manage-identity"><span class="user-role-icon">ᚱ</span><div><b>${esc(c.username)}</b><small>Cliente · desde ${new Date(c.created_at).toLocaleDateString('es-AR')}${c.email?' · ✉ '+esc(c.email):' · sin correo'}</small></div></div><div class="user-manage-fields client-fields"><label>Usuario<input id="mcu-${c.id}" value="${esc(c.username)}"></label><label>Teléfono<input id="mcp-${c.id}" type="tel" inputmode="tel" value="${esc(c.phone)}"></label><label>Email <small>(opcional)</small><input id="mce-${c.id}" type="email" inputmode="email" value="${esc(c.email||'')}" placeholder="cliente@gmail.com"></label></div><div class="user-manage-actions"><button class="btn ghost compact" onclick="saveManagedClient(${c.id})">Guardar</button><button class="client-state ${c.active?'active':'inactive'}" onclick="toggleManagedClient(${c.id},${!c.active})">${c.active?'Activo':'Bloqueado'}</button></div></article>`}
function managedAdminRow(a){return `<article class="user-manage-row admin-user-row"><div class="user-manage-identity"><span class="user-role-icon">ᛉ</span><div><b>${esc(a.username)} ${a.current?'<em>Vos</em>':''}</b><small>Administrador · desde ${new Date(a.created_at).toLocaleDateString('es-AR')}</small></div></div><div class="user-manage-fields admin-fields"><label>Usuario<input id="mau-${a.id}" value="${esc(a.username)}"></label><label>Nueva contraseña<input id="map-${a.id}" type="password" autocomplete="new-password" placeholder="Dejar vacío para no cambiar"></label></div><div class="user-manage-actions"><button class="btn ghost compact" onclick="saveManagedAdmin(${a.id})">Guardar</button><button class="client-state ${a.active?'active':'inactive'}" ${a.current?'disabled title="No podés bloquear tu propia cuenta"':''} onclick="toggleManagedAdmin(${a.id},${!a.active})">${a.active?'Activo':'Bloqueado'}</button></div></article>`}
async function adminUsersView(){if(!adminToken)return adminLogin();viewMode('admin');document.title='Usuarios · Salón del Jarl';document.querySelector('#app').innerHTML=header(true)+`<div class="catalog-loading">Cargando usuarios…</div>`;try{const [clients,admins,orders]=await Promise.all([req('/admin/clients',{headers:{Authorization:'Bearer '+adminToken}}),req('/admin/users/admins',{headers:{Authorization:'Bearer '+adminToken}}),req('/admin/orders',{headers:{Authorization:'Bearer '+adminToken}})]);const activeCount=orders.filter(o=>ADMIN_ACTIVE_STATUSES.has(o.status)).length,historyCount=orders.length-activeCount;document.querySelector('#app').innerHTML=header(true)+`<main class="admin-panel users-admin-panel"><div class="admin-title"><div><p class="eyebrow">SALÓN DEL JARL</p><h1>Usuarios</h1><p class="muted">Gestioná accesos de clientes y administradores.</p></div><button class="btn ghost compact" onclick="adminUsersView()">Actualizar</button></div>${adminSectionNav(activeCount,historyCount,'users')}<nav class="user-type-tabs"><button class="${adminUsersTab==='clients'?'active':''}" onclick="setAdminUsersTab('clients')">Clientes <b>${clients.length}</b></button><button class="${adminUsersTab==='admins'?'active':''}" onclick="setAdminUsersTab('admins')">Administradores <b>${admins.length}</b></button></nav>${adminUsersTab==='clients'?clientsManagement(clients):adminsManagement(admins)}</main>`}catch(e){toast(e.message);if(String(e.message).toLowerCase().includes('sesión')){adminToken='';sessionStorage.removeItem('vv-admin');adminLogin()}}}
function clientsManagement(clients){return `<section class="users-management-section"><div class="user-create-card"><div><p class="eyebrow">NUEVO CLIENTE</p><h2>Autorizar acceso</h2><p class="muted">El correo es opcional. Si se carga, el cliente recibe avisos cuando cambia el estado de su pedido.</p></div><div class="user-create-fields client-create-fields"><label>Usuario<input id="manageNewClientUser" placeholder="Ej: juan"></label><label>Teléfono<input id="manageNewClientPhone" type="tel" inputmode="tel" placeholder="Ej: 11 1234 5678"></label><label>Email <small>(opcional)</small><input id="manageNewClientEmail" type="email" inputmode="email" placeholder="cliente@gmail.com"></label><button class="btn primary" onclick="createManagedClient()">Autorizar cliente</button></div></div><div class="user-manage-list">${clients.length?clients.map(managedClientRow).join(''):'<div class="admin-empty-state"><h3>No hay clientes</h3></div>'}</div></section>`}
function adminsManagement(admins){return `<section class="users-management-section"><div class="user-create-card"><div><p class="eyebrow">NUEVO ADMINISTRADOR</p><h2>Crear cuenta de gestión</h2></div><div class="user-create-fields"><label>Usuario<input id="manageNewAdminUser" autocomplete="off" placeholder="Usuario"></label><label>Contraseña<input id="manageNewAdminPass" type="password" autocomplete="new-password" placeholder="Mínimo 6 caracteres"></label><button class="btn primary" onclick="createManagedAdmin()">Crear administrador</button></div></div><div class="user-manage-list">${admins.length?admins.map(managedAdminRow).join(''):'<div class="admin-empty-state"><h3>No hay administradores</h3></div>'}</div></section>`}
async function createManagedClient(){const username=document.querySelector('#manageNewClientUser')?.value.trim()||'',phone=document.querySelector('#manageNewClientPhone')?.value.trim()||'',email=document.querySelector('#manageNewClientEmail')?.value.trim()||'';if(username.length<2||phone.length<6)return toast('Completá usuario y teléfono');try{await req('/admin/clients',{method:'POST',headers:{Authorization:'Bearer '+adminToken},body:JSON.stringify({username,phone,email})});toast('Cliente autorizado');adminUsersView()}catch(e){toast(e.message)}}
async function saveManagedClient(id){const username=document.querySelector(`#mcu-${id}`)?.value.trim()||'',phone=document.querySelector(`#mcp-${id}`)?.value.trim()||'',email=document.querySelector(`#mce-${id}`)?.value.trim()||'';try{await req('/admin/clients/'+id,{method:'PATCH',headers:{Authorization:'Bearer '+adminToken},body:JSON.stringify({username,phone,email})});toast('Cliente actualizado');adminUsersView()}catch(e){toast(e.message)}}
async function toggleManagedClient(id,active){try{await req('/admin/clients/'+id,{method:'PATCH',headers:{Authorization:'Bearer '+adminToken},body:JSON.stringify({active})});adminUsersView()}catch(e){toast(e.message)}}
async function createManagedAdmin(){const username=document.querySelector('#manageNewAdminUser')?.value.trim()||'',password=document.querySelector('#manageNewAdminPass')?.value||'';if(username.length<2||password.length<6)return toast('Usuario y contraseña de al menos 6 caracteres');try{await req('/admin/users/admins',{method:'POST',headers:{Authorization:'Bearer '+adminToken},body:JSON.stringify({username,password})});toast('Administrador creado');adminUsersView()}catch(e){toast(e.message)}}
async function saveManagedAdmin(id){const username=document.querySelector(`#mau-${id}`)?.value.trim()||'',password=document.querySelector(`#map-${id}`)?.value||'',body={username};if(password)body.password=password;try{await req('/admin/users/admins/'+id,{method:'PATCH',headers:{Authorization:'Bearer '+adminToken},body:JSON.stringify(body)});toast('Administrador actualizado');adminUsersView()}catch(e){toast(e.message)}}
async function toggleManagedAdmin(id,active){try{await req('/admin/users/admins/'+id,{method:'PATCH',headers:{Authorization:'Bearer '+adminToken},body:JSON.stringify({active})});adminUsersView()}catch(e){toast(e.message)}}
function adminLogin(){viewMode('private');document.title='Acceso de gestión';document.querySelector('#app').innerHTML=`<main class="private-gate branded-gate admin-gate"><div class="private-bg neutral-bg"></div><div class="private-overlay"></div><section class="private-shell management-shell"><img class="private-brand-mark" src="${LOGO}" alt="" onerror="this.style.display='none';document.querySelector('.private-bg')?.classList.add('brand-fallback')"><p class="private-kicker">SALÓN DEL JARL</p><h1>Acceso de gestión.</h1><p class="private-copy">Ingresá tus credenciales administrativas.</p><label>Usuario<input id="adminUser" autocomplete="username" placeholder="Usuario"></label><label>Clave<input type="password" id="adminPass" autocomplete="current-password" placeholder="Clave"></label><button class="btn primary full" onclick="doLogin()">Ingresar</button><a class="management-entry" href="#">Volver</a></section></main>`;applyGateBrand()}
async function doLogin(){try{let r=await req('/admin/login',{method:'POST',body:JSON.stringify({username:document.querySelector('#adminUser').value.trim(),password:document.querySelector('#adminPass').value})});adminToken=r.token;sessionStorage.setItem('vv-admin',adminToken);route()}catch(e){toast(e.message)}}
function adminLiquidCard(l){return `<article class="admin-catalog-card admin-liquid-card"><img class="admin-catalog-bg" src="assets/liquids/${esc(l.slug)}.webp" data-slug="${esc(l.slug)}" data-name="${esc(l.name)}" data-try="0" onerror="liquidImageFallback(this)" alt=""><div class="admin-catalog-shade"></div><div class="admin-catalog-content"><p class="eyebrow">E-LIQUID</p><h3>${esc(l.name)}</h3><div class="admin-price-table">${l.prices.map(p=>`<div><span>${p.size_ml} ml</span><small>Costo ${ars(p.cost)}</small><small>Venta ${ars(p.sale)}</small><b>+${ars(p.profit)}</b></div>`).join('')}</div><details><summary>${l.flavors.length} sabores</summary><div class="flavor-cloud">${l.flavors.map(f=>`<span>${esc(f)}</span>`).join('')}</div></details><p class="admin-nico">Nicotina: ${l.nicotine_options.map(n=>n+' mg').join(' · ')}</p></div></article>`}
function adminProductCard(p){const base='assets/products/'+String(p.sku||'').toLowerCase()+'.webp';return `<article class="admin-catalog-card admin-product-card"><div class="admin-product-media"><img src="${esc(base)}" data-try="0" data-sku="${esc(p.sku)}" data-remote="${esc(p.image_url||'')}" data-name="${esc(p.name)}" data-category="${esc(p.category)}" onerror="productImageFallback(this)" alt="${esc(p.name)}"></div><div class="admin-catalog-content"><p class="eyebrow">${esc(p.category)}</p><h3>${esc(p.name)}</h3><code>${esc(p.sku)}</code><div class="admin-costs"><span>Costo <b>${ars(p.cost)}</b></span><span>Venta <b>${ars(p.sale)}</b></span><span>Ganancia <b>${ars(p.profit)}</b></span></div>${p.price_tiers?.length?`<p class="promo-line">${p.price_tiers.map(t=>`${t.qty}× ${ars(t.total)}`).join(' · ')}</p>`:''}</div></article>`}

function savePersonalCart(){sessionStorage.setItem('vv-personal-cart',JSON.stringify(personalCart))}
function personalProductTotal(p,q){
  let left=q,total=0,tiers=[...(p.price_tiers||[])].sort((a,b)=>b.qty-a.qty);
  if(!tiers.length)return Number(p.cost||0)*q;
  for(const t of tiers){const n=Math.floor(left/Number(t.qty));total+=n*Number(t.total);left-=n*Number(t.qty)}
  return total+left*Number(p.cost||0);
}
function personalCartTotal(){return personalCart.reduce((sum,x)=>sum+Number(x.line_total||0),0)}
function resetPersonalDraft(){
  personalCart=[];personalEditingOrderId=0;personalEditingOrderNumber='';
  sessionStorage.removeItem('vv-personal-cart');
  sessionStorage.removeItem('vv-personal-edit-id');
  sessionStorage.removeItem('vv-personal-edit-number');
}
function personalQty(id,d){const el=document.querySelector('#'+id);if(el)el.textContent=Math.max(1,Number(el.textContent||1)+d)}
function personalLiquidCard(l){
  const min=Math.min(...l.prices.map(p=>Number(p.cost||0)));
  return `<article class="personal-liquid-card line-${esc(l.slug)}">
    <img class="personal-card-art" src="assets/liquids/${esc(l.slug)}.webp" data-slug="${esc(l.slug)}" data-name="${esc(l.name)}" data-try="0" onerror="liquidImageFallback(this)" alt="">
    <div class="personal-card-shade"></div>
    <div class="personal-card-content">
      <div class="personal-card-head"><div><p class="eyebrow">E-LIQUID · COSTO</p><h3>${esc(l.name)}</h3></div><strong>desde ${ars(min)}</strong></div>
      <label>Sabor<select id="ppf-${esc(l.slug)}">${l.flavors.map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join('')}</select></label>
      <div class="grid-2">
        <label>Medida<select id="pps-${esc(l.slug)}">${l.prices.map(p=>`<option value="${p.size_ml}">${p.size_ml} ml · ${ars(p.cost)}</option>`).join('')}</select></label>
        <label>Nicotina<select id="ppn-${esc(l.slug)}">${l.nicotine_options.map(n=>`<option value="${n}">${n} mg</option>`).join('')}</select></label>
      </div>
      <div class="add-row"><div class="qty"><button onclick="personalQty('ppq-${esc(l.slug)}',-1)">−</button><span id="ppq-${esc(l.slug)}">1</span><button onclick="personalQty('ppq-${esc(l.slug)}',1)">+</button></div><button class="btn primary compact" onclick="addPersonalLiquid('${esc(l.slug)}')">+ Sumar</button></div>
    </div>
  </article>`;
}
function personalProductCard(p){
  const base='assets/products/'+String(p.sku||'').toLowerCase()+'.webp',variant=productVariantMeta(p);
  return `<article class="personal-product-card ${variant?'product-has-variants':''}"><div class="personal-product-media"><img src="${esc(base)}" data-try="0" data-sku="${esc(p.sku)}" data-remote="${esc(p.image_url||'')}" data-name="${esc(p.name)}" data-category="${esc(p.category)}" onerror="productImageFallback(this)" alt="${esc(p.name)}"></div><div class="personal-product-body"><p class="eyebrow">${esc(p.category)} · COSTO</p><h3>${esc(p.name)}</h3><strong>${ars(p.cost)}</strong>${p.price_tiers?.length?`<small class="promo-line">${p.price_tiers.map(t=>`${t.qty}× ${ars(t.total)}`).join(' · ')}</small>`:''}${variant?`<div class="variant-preference compact"><label>${esc(variant.label)} <small>(opcional)</small><input id="ppv-${p.id}" type="text" maxlength="160" placeholder="${esc(variant.placeholder)}"></label><p>${esc(variant.hint)}</p></div>`:''}<div class="add-row"><div class="qty"><button onclick="personalQty('ppp-${p.id}',-1)">−</button><span id="ppp-${p.id}">1</span><button onclick="personalQty('ppp-${p.id}',1)">+</button></div><button class="btn primary compact" onclick="addPersonalProduct(${p.id})">+ Sumar</button></div></div></article>`;
}
function addPersonalLiquid(slug){
  const l=personalCatalog?.liquid_lines?.find(x=>x.slug===slug);if(!l)return;
  const flavor=document.querySelector('#ppf-'+CSS.escape(slug))?.value||'';
  const size=Number(document.querySelector('#pps-'+CSS.escape(slug))?.value||0);
  const mg=Number(document.querySelector('#ppn-'+CSS.escape(slug))?.value||0);
  const q=Number(document.querySelector('#ppq-'+CSS.escape(slug))?.textContent||1);
  const price=l.prices.find(p=>Number(p.size_ml)===size);if(!price)return;
  const key=`l-${slug}-${flavor}-${size}-${mg}`,old=personalCart.find(x=>x.key===key);
  if(old){old.quantity+=q;old.line_total=Number(price.cost)*old.quantity}
  else personalCart.push({key,kind:'liquid',reference_id:l.id,line_slug:slug,flavor,size_ml:size,nicotine_mg:mg,quantity:q,name:`${l.name} · ${flavor} · ${size}ml · ${mg}mg`,line_total:Number(price.cost)*q});
  savePersonalCart();renderPersonalCart();toast('Sumado al pedido personal');
}
function addPersonalProduct(id){
  const p=personalCatalog?.products?.find(x=>x.id===id);if(!p)return;
  const q=Number(document.querySelector('#ppp-'+id)?.textContent||1),variant=(document.querySelector('#ppv-'+id)?.value||'').trim(),key='p-'+id+'-'+variant.toLowerCase(),old=personalCart.find(x=>x.key===key);
  if(old){old.quantity+=q;old.line_total=personalProductTotal(p,old.quantity)}
  else personalCart.push({key,kind:'product',reference_id:id,quantity:q,variant_note:variant||null,name:p.name+(variant?' · Preferencia: '+variant:''),line_total:personalProductTotal(p,q)});
  const v=document.querySelector('#ppv-'+id);if(v)v.value='';
  savePersonalCart();renderPersonalCart();toast('Sumado al pedido personal');
}
function changePersonalCartQty(i,d){
  const x=personalCart[i];if(!x)return;x.quantity=Math.max(1,x.quantity+d);
  if(x.kind==='liquid'){
    const l=personalCatalog.liquid_lines.find(v=>v.slug===x.line_slug),p=l?.prices.find(v=>Number(v.size_ml)===Number(x.size_ml));
    if(p)x.line_total=Number(p.cost)*x.quantity;
  }else{
    const p=personalCatalog.products.find(v=>v.id===x.reference_id);if(p)x.line_total=personalProductTotal(p,x.quantity);
  }
  savePersonalCart();renderPersonalCart();
}
function removePersonalCartItem(i){personalCart.splice(i,1);savePersonalCart();renderPersonalCart()}
function renderPersonalCart(){
  const box=document.querySelector('#personalCartPanel');if(!box)return;
  const total=personalCartTotal(),count=personalCart.reduce((a,x)=>a+x.quantity,0);
  box.innerHTML=`<div class="personal-cart-head"><div><p class="eyebrow">${personalEditingOrderId?'EDITANDO PEDIDO PERSONAL':'TU PEDIDO PERSONAL'}</p><h2>${personalEditingOrderNumber?esc(personalEditingOrderNumber):'Al costo'}</h2></div><span>${count} ${count===1?'ítem':'ítems'}</span></div>
  <div class="personal-cart-list">${personalCart.length?personalCart.map((x,i)=>`<div class="personal-cart-row"><div><b>${esc(x.name)}</b><small>${ars(x.line_total)}</small></div><div class="personal-cart-row-actions"><button onclick="changePersonalCartQty(${i},-1)">−</button><span>${x.quantity}</span><button onclick="changePersonalCartQty(${i},1)">+</button><button class="remove" onclick="removePersonalCartItem(${i})">×</button></div></div>`).join(''):'<div class="personal-cart-empty">Todavía no agregaste productos.</div>'}</div>
  <div class="personal-cart-total"><span>Total a costo</span><strong>${ars(total)}</strong></div>
  <p class="personal-cart-note">Este pedido no cuenta como venta ni genera ganancia. Sí se puede incluir en el consolidado de Anubis.</p>
  <button class="btn primary full" ${personalCart.length?'':'disabled'} onclick="submitPersonalOrder(this)">${personalEditingOrderId?'Guardar pedido personal':'Crear pedido personal'}</button>
  ${personalEditingOrderId?'<button class="btn ghost full personal-cancel-edit" onclick="cancelPersonalEdit()">Cancelar edición</button>':''}`;
}
function personalCatalogTab(name,button){
  document.querySelectorAll('.personal-tabs button').forEach(x=>x.classList.remove('active'));button?.classList.add('active');
  const target=document.querySelector('#personalCatalogContent');if(!target)return;
  if(name==='liquids')target.innerHTML=`<div class="personal-grid">${personalCatalog.liquid_lines.map(personalLiquidCard).join('')}</div>`;
  else{
    const products=personalCatalog.products,cats=[...new Set(products.map(p=>p.category))];
    target.innerHTML=illustrativeCatalogNotice()+cats.map(cat=>`<section class="personal-category"><h3>${esc(cat)}</h3><div class="personal-product-grid">${products.filter(p=>p.category===cat).map(personalProductCard).join('')}</div></section>`).join('');
  }
}
async function adminPersonalOrder(){
  if(!adminToken)return adminLogin();
  viewMode('admin');document.title='Pedido personal · Valhalla';
  document.querySelector('#app').innerHTML=header(true)+'<div class="catalog-loading">Cargando precios de costo…</div>';
  try{
    const [me,c]=await Promise.all([
      req('/admin/me',{headers:{Authorization:'Bearer '+adminToken}}),
      req('/admin/catalog',{headers:{Authorization:'Bearer '+adminToken}})
    ]);
    if(!me.personal_order_enabled){toast('Tu usuario no está habilitado para pedidos personales');location.hash='admin';return}
    personalCatalog=c;
    document.querySelector('#app').innerHTML=header(true)+`<main class="admin-panel personal-order-page">
      <div class="admin-title personal-order-title"><div><p class="eyebrow">SALÓN DEL JARL · USO INTERNO</p><h1>${personalEditingOrderId?'Editar pedido personal':'Pedido personal'}</h1><p class="muted">Comprá para vos a precio de costo, sin generar una venta ficticia.</p></div><a class="btn ghost compact" href="#admin">Volver a pedidos</a></div>
      <div class="personal-cost-notice"><span>⚔</span><div><b>MODO PRECIO COSTO</b><p>Los importes se validan nuevamente en el servidor al guardar. Este pedido aparecerá como <strong>VP</strong> y queda fuera de venta, facturación y ganancia.</p></div></div>
      <div class="personal-shop-layout">
        <section class="personal-catalog-area"><nav class="personal-tabs"><button class="active" onclick="personalCatalogTab('liquids',this)">💧 E-liquids</button><button onclick="personalCatalogTab('products',this)">▦ Insumos</button></nav><div id="personalCatalogContent"></div></section>
        <aside id="personalCartPanel" class="personal-cart-panel"></aside>
      </div>
    </main>`;
    personalCatalogTab('liquids',document.querySelector('.personal-tabs button'));renderPersonalCart();
  }catch(e){toast(e.message);location.hash='admin'}
}
function personalOrderPayload(){return {items:personalCart.map(x=>({kind:x.kind,reference_id:x.reference_id,line_slug:x.line_slug,flavor:x.flavor,size_ml:x.size_ml,nicotine_mg:x.nicotine_mg,variant_note:x.variant_note||null,quantity:x.quantity}))}}
async function submitPersonalOrder(button){
  if(!personalCart.length)return;
  const editing=personalEditingOrderId,old=button.textContent;button.disabled=true;button.textContent=editing?'Guardando…':'Creando…';
  try{
    const path=editing?'/admin/personal/orders/'+editing:'/admin/personal/orders';
    const o=await req(path,{method:editing?'PUT':'POST',headers:{Authorization:'Bearer '+adminToken},body:JSON.stringify(personalOrderPayload())});
    resetPersonalDraft();toast(editing?'Pedido personal actualizado':'Pedido personal creado');location.hash='admin-order='+o.id;
  }catch(e){button.disabled=false;button.textContent=old;toast(e.message)}
}
async function editPersonalOrder(id){
  try{
    const [orders,c]=await Promise.all([
      req('/admin/orders',{headers:{Authorization:'Bearer '+adminToken}}),
      req('/admin/catalog',{headers:{Authorization:'Bearer '+adminToken}})
    ]);
    const o=orders.find(x=>x.id===id&&x.internal);if(!o)return toast('Pedido personal no encontrado');
    if(!o.editable)return toast('Ese pedido ya no se puede editar');
    personalCatalog=c;personalCart=o.items.map(i=>{
      if(i.kind==='liquid'){
        const line=c.liquid_lines.find(l=>l.id===i.reference_id);
        return {key:`l-${line?.slug||i.line_name}-${i.flavor}-${i.size_ml}-${i.nicotine_mg}`,kind:'liquid',reference_id:i.reference_id,line_slug:line?.slug||'',flavor:i.flavor,size_ml:i.size_ml,nicotine_mg:i.nicotine_mg,quantity:i.quantity,name:i.name,line_total:i.line_total_cost};
      }
      return {key:'p-'+i.reference_id+'-'+String(i.variant_note||'').toLowerCase(),kind:'product',reference_id:i.reference_id,quantity:i.quantity,variant_note:i.variant_note||null,name:i.name,line_total:i.line_total_cost};
    });
    personalEditingOrderId=id;personalEditingOrderNumber=o.number;
    sessionStorage.setItem('vv-personal-edit-id',String(id));sessionStorage.setItem('vv-personal-edit-number',o.number);savePersonalCart();
    location.hash='admin-personal';
  }catch(e){toast(e.message)}
}
function cancelPersonalEdit(){
  if(!confirm('¿Cancelar la edición del pedido personal?'))return;
  resetPersonalDraft();location.hash='admin';
}

async function adminCatalog(){if(!adminToken)return adminLogin();viewMode('admin');document.title='Catálogo · Salón del Jarl';document.querySelector('#app').innerHTML=header(true)+`<div class="catalog-loading">Cargando catálogo…</div>`;try{const c=await req('/admin/catalog',{headers:{Authorization:'Bearer '+adminToken}});const cats=[...new Set(c.products.map(p=>p.category))];document.querySelector('#app').innerHTML=header(true)+`<main class="admin-panel admin-catalog-panel"><div class="admin-title"><div><p class="eyebrow">SALÓN DEL JARL</p><h1>Catálogo completo</h1><p class="muted">Costos, ventas, márgenes y referencias del catálogo activo.</p></div><a class="btn ghost compact" href="#admin">Volver a pedidos</a></div><label class="admin-catalog-search">Buscar<input id="adminCatalogSearch" type="search" placeholder="Producto, SKU, categoría o línea…" oninput="filterAdminCatalog(this.value)"></label><section><div class="section-title"><p class="eyebrow">E-LIQUIDS</p><h2>Líneas</h2></div><div class="admin-catalog-grid">${c.liquid_lines.map(adminLiquidCard).join('')}</div></section>${cats.map(cat=>`<section class="admin-category"><div class="section-title"><p class="eyebrow">INSUMOS</p><h2>${esc(cat)}</h2></div><div class="admin-catalog-grid">${c.products.filter(p=>p.category===cat).map(adminProductCard).join('')}</div></section>`).join('')}</main>`}catch(e){toast(e.message)}}
function filterAdminCatalog(q){const t=String(q||'').toLowerCase().trim();document.querySelectorAll('.admin-catalog-card').forEach(el=>{el.classList.toggle('catalog-hidden',t&&!el.textContent.toLowerCase().includes(t))});document.querySelectorAll('.admin-category').forEach(sec=>{const visible=[...sec.querySelectorAll('.admin-catalog-card')].some(x=>!x.classList.contains('catalog-hidden'));sec.classList.toggle('catalog-hidden',!visible&&!!t)})}
function clientPanel(clients){return `<section class="client-admin"><div class="client-admin-head"><div><p class="eyebrow">ACCESOS</p><h2>Clientes autorizados</h2></div><span>${clients.filter(c=>c.active).length} activos</span></div><div class="client-create"><label>Usuario<input id="newClientUser" placeholder="Ej: juan"></label><label>Teléfono<input id="newClientPhone" type="tel" inputmode="tel" placeholder="Ej: 11 1234 5678"></label><button class="btn primary" onclick="createClient()">Autorizar cliente</button></div><div class="client-list">${clients.length?clients.map(c=>`<div class="client-row"><div><b>${esc(c.username)}</b><small>${esc(c.phone)}</small></div><button class="client-state ${c.active?'active':'inactive'}" onclick="toggleClient(${c.id},${!c.active})">${c.active?'Activo':'Bloqueado'}</button></div>`).join(''):'<p class="muted">Todavía no hay clientes autorizados.</p>'}</div></section>`}
async function createClient(){const username=document.querySelector('#newClientUser')?.value.trim()||'',phone=document.querySelector('#newClientPhone')?.value.trim()||'';if(username.length<2||phone.length<6)return toast('Completá usuario y teléfono');try{await req('/admin/clients',{method:'POST',headers:{Authorization:'Bearer '+adminToken},body:JSON.stringify({username,phone})});toast('Cliente autorizado');admin()}catch(e){toast(e.message)}}
async function toggleClient(id,active){try{await req('/admin/clients/'+id,{method:'PATCH',headers:{Authorization:'Bearer '+adminToken},body:JSON.stringify({active})});admin()}catch(e){toast(e.message)}}
function adminOrder(o,history=false){
  const internal=!!o.internal;
  const editablePersonal=internal&&!history&&o.editable;
  return `<article id="admin-order-${o.id}" class="admin-order ${history?'history-order':''} ${o.payment_reported?'payment-alert':''} ${internal?'internal-order':''}">
    <div class="order-top">
      ${history?`<span class="history-status s-${o.status}">${esc(o.status_label)}</span>`:`<input class="batchCheck" type="checkbox" value="${o.id}" onchange="selCount()">`}
      <div>
        <div class="order-identity-line"><b>${esc(o.number)} · ${esc(o.customer_name)}</b>${internal?'<span class="internal-order-badge">PERSONAL · COSTO</span>':''}</div>
        <small>${new Date(o.created_at).toLocaleString('es-AR')}</small>
      </div>
      <strong>${ars(o.total)}</strong>
    </div>
    <div class="admin-items">${o.items.map(i=>`<span>${i.quantity}× ${esc(i.name)}</span>`).join('')}</div>
    <div class="finance-row">
      <span>Costo <b>${ars(o.cost)}</b></span>
      ${internal?`<span>Total personal <b>${ars(o.subtotal)}</b></span><span>Ganancia <b>${ars(0)}</b></span>`:`<span>Venta <b>${ars(o.subtotal)}</b></span><span>Ganancia <b>${ars(o.profit)}</b></span>`}
      ${o.payment_reported?'<em>TRANSFERENCIA INFORMADA</em>':''}
    </div>
    ${editablePersonal?`<div class="personal-order-card-action"><button class="btn ghost compact" onclick="editPersonalOrder(${o.id})">✎ Editar productos personales</button></div>`:''}
    <div class="admin-controls"><label>Envío<input inputmode="numeric" value="${o.shipping}" onchange="patchOrder(${o.id},{shipping:+this.value||0})"></label><label>Estado<select onchange="patchOrder(${o.id},{status:this.value})">${STATUS.map(([v,l])=>`<option value="${v}" ${v===o.status?'selected':''}>${l}</option>`).join('')}</select></label></div>
    <details><summary>Historial (${o.events.length})</summary>${[...o.events].reverse().map(e=>`<p>${esc(e.detail)}<small>${new Date(e.created_at).toLocaleString('es-AR')}</small></p>`).join('')}</details>
  </article>`;
}
function selCount(){document.querySelector('#selCount').textContent=document.querySelectorAll('.batchCheck:checked').length+' seleccionados'}
async function patchOrder(id,data){try{await req('/admin/orders/'+id,{method:'PATCH',headers:{Authorization:'Bearer '+adminToken},body:JSON.stringify(data)});admin()}catch(e){toast(e.message)}}
async function createBatch(){let ids=[...document.querySelectorAll('.batchCheck:checked')].map(x=>+x.value);if(!ids.length)return toast('Seleccioná al menos un pedido');try{let b=await req('/admin/supplier-batches',{method:'POST',headers:{Authorization:'Bearer '+adminToken},body:JSON.stringify({order_ids:ids,extra_items:[]})});document.body.insertAdjacentHTML('beforeend',`<div class="modal-scrim" id="batch"><div class="batch-modal rune-frame"><button class="modal-close" onclick="document.querySelector('#batch').remove()">✕</button><p class="eyebrow">${esc(b.number)}</p><h2>Pedido consolidado</h2><pre class="batch-output">${esc(b.text)}</pre><button class="btn primary full" onclick="navigator.clipboard.writeText(\`${b.text.replace(/`/g,'\`')}\`);toast('Copiado')">Copiar listado</button></div></div>`);admin()}catch(e){toast(e.message)}}
function route(){let h=location.hash.slice(1);if(h==='admin')return admin();if(h.startsWith('admin-order='))return admin(+h.split('=')[1]);if(h==='admin-users')return adminUsersView();if(h==='admin-catalog')return adminCatalog();if(h==='admin-personal')return adminPersonalOrder();if(!clientToken)return privateWelcome();if(h==='checkout')checkout();else if(h.startsWith('pedido='))orderStatus(h.split('=')[1]);else shop()}
addEventListener('hashchange',route);
route();