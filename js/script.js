/* ============================================
   LENTOS Y CALMADOS - Lógica (HCI Mejorado)
   ============================================ */

// ---------- Datos ----------
const cars = [
  { id: 1, name: "Sedán Rojo Misterioso",     price: 4999.99, year: 1997, km: 342000, color: "Rojo oxidado",
    description: "Un auto que probablemente funciona. Tiene 4 ruedas (verificar al recoger). El aire acondicionado sopla aire, no necesariamente frío.",
    image: "images/car1.png" },
  { id: 2, name: "SUV Azul Cuestionable",     price: 7500.00, year: 2003, km: 289000, color: "Azul dudoso",
    description: "Perfecto para familias que disfrutan la incertidumbre. El motor hace un ruido interesante que nuestro mecánico no pudo identificar.",
    image: "images/car2.png" },
  { id: 3, name: "Pickup Fantasma Blanca",    price: 3200.50, year: 1989, km: 450000, color: "Blanco sucio",
    description: "Ideal para mudanzas lentas. La caja trasera puede o no estar soldada al chasis. Viene con sorpresa en la guantera.",
    image: "images/car3.png" },
  { id: 4, name: "Deportivo Amarillo Lento",  price: 15000.00, year: 2001, km: 178000, color: "Amarillo chillón",
    description: "Se ve rápido pero no lo es. Velocidad máxima: 80km/h cuesta abajo. El spoiler es decorativo (está pegado con silicón).",
    image: "images/car4.png" },
  { id: 5, name: "Minivan Verde Esperanza",   price: 2800.00, year: 1995, km: 520000, color: "Verde esperanza",
    description: "Caben 7 personas si 3 van en el techo. El sistema de sonido solo reproduce cumbia. Las puertas corredizas a veces se abren solas.",
    image: "images/car5.png" },
  { id: 6, name: "Sedán Púrpura del Destino", price: 1500.00, year: 1992, km: 670000, color: "Púrpura destino",
    description: "Comprado en un deshuesadero con amor. Cada viaje es una aventura porque nunca sabes si llegarás. Incluye manual del propietario en ruso.",
    image: "images/car6.png" }
];

// ---------- Estado ----------
let cart = [];
try { cart = JSON.parse(localStorage.getItem('lentos-cart') || '[]'); } catch(e) { cart = []; }

const $ = (id) => document.getElementById(id);

function saveCart() {
  localStorage.setItem('lentos-cart', JSON.stringify(cart));
  $('cart-count').textContent = cart.length;
}

// CODIGO ANTIGUO, CONTADOR DE VISITAS

// ---------- Visitas ----------
// const visits = parseInt(localStorage.getItem('lentos-visits') || '0', 10) + 1;
// localStorage.setItem('lentos-visits', visits);
// $('visit-count').textContent = visits;
$('cart-count').textContent = cart.length;

// Safe to use 
// [NUEVO] 
document.querySelectorAll('#checkout-form input, #checkout-form textarea').forEach(input => {
  input.addEventListener('input', (e) => {
    localStorage.setItem(`draft_${input.className}`, e.target.value);
  });
});

// [NUEVO] 
function loadFormDraft() {
  document.querySelectorAll('#checkout-form input, #checkout-form textarea').forEach(input => {
    const saved = localStorage.getItem(`draft_${input.className}`);
    if (saved) input.value = saved;
  });
}

// ---------- Render autos ----------
function renderCars() {
  const container = $('cars-list');
  container.innerHTML = '';
  
  cars.forEach(car => {
    const div = document.createElement('div');
    div.className = 'car-card';
    div.innerHTML = `
      <img src="${car.image}" alt="${car.name}" />
      <h3>${car.name}</h3>
      <p class="price">$${car.price.toFixed(2)}</p>
      <p class="small">Año: ${car.year} · ${car.km.toLocaleString()} km · ${car.color}</p>
      <p class="desc">${car.description.substring(0, 80)}...</p>
      <span class="fake-button btn-detail" data-id="${car.id}">Ver detalles</span>
      <span class="fake-button btn-add" data-id="${car.id}">+ Carrito</span>
    `;
    container.appendChild(div);
  });

  // Evento normal para ver detalles
  document.querySelectorAll('.btn-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id, 10);
      showDetail(id);
    });
  });

  // Evento normal para agregar al carrito (sin retrasos ni movimientos)
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id, 10);
      addToCart(id);
    });
  });
}

// ---------- Carrito ----------
function addToCart(id) {
  const car = cars.find(c => c.id === id);
  if (!car) return;
  cart.push(car);
  saveCart();
  alert('¿Tal vez se agregó? Quién sabe. Revisa el carrito.');
}

/* ANTERIOR
function removeFromCart(idx) {
  cart.splice(idx, 1);
  saveCart();
  renderCart();
}
*/

// NUEVO
let lastRemovedItem = null;
let undoTimeout = null;

function removeFromCart(idx) {
  lastRemovedItem = { item: cart[idx], index: idx }; // Guardamos el respaldo
  cart.splice(idx, 1);
  saveCart();
  renderCart();
  
  // Mostrar notificación de Deshacer
  const toast = $('undo-toast');
  toast.classList.remove('hidden');
  
  clearTimeout(undoTimeout);
  undoTimeout = setTimeout(() => {
    toast.classList.add('hidden');
    lastRemovedItem = null;
  }, 5000);
}

// NUEVO
$('undo-btn').addEventListener('click', () => {
  if (lastRemovedItem) {
    cart.splice(lastRemovedItem.index, 0, lastRemovedItem.item);
    lastRemovedItem = null;
    saveCart();
    renderCart();
    $('undo-toast').classList.add('hidden');
  }
});

function renderCart() {
  const list = $('cart-items');
  list.innerHTML = '';
  if (cart.length === 0) {
    list.innerHTML = '<p class="font-creepster" style="color:hsl(0,100%,40%);text-align:center">Carrito vacío... como tu alma</p>';
  } else {
    cart.forEach((c, i) => {
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `<span>${c.name} - $${c.price.toFixed(2)}</span><span class="rm" data-i="${i}">[quitar?]</span>`;
      list.appendChild(row);
    });
  }
  const total = cart.reduce((s, c) => s + c.price, 0);
  $('cart-total').textContent = total.toFixed(2);
  list.querySelectorAll('.rm').forEach(el => {
    el.addEventListener('click', () => removeFromCart(parseInt(el.dataset.i, 10)));
  });
}

// ---------- Detalle ----------
function showDetail(id) {
  const car = cars.find(c => c.id === id);
  if (!car) return;
  
  $('detail-content').innerHTML = `
    <h2>${car.name}</h2>
    <img src="${car.image}" alt="${car.name}" />
    <p class="price" style="font-size:28px; font-weight:bold; color:hsl(120,70%,30%); margin:0;">$${car.price.toFixed(2)}</p>
    <p style="color:hsl(0,0%,40%); margin:0;">Año: ${car.year} | KM: ${car.km.toLocaleString()} | Color: ${car.color}</p>
    <p style="color:hsl(0,0%,30%); line-height:1.5;">${car.description}</p>
    <div style="display:flex; gap:10px; margin-top:15px;">
      <button class="fake-button" id="detail-add" style="flex:1;">Agregar al carrito</button>
      <button class="fake-button" id="detail-close" style="flex:1; background:hsl(0, 0%, 60%);">Cerrar</button>
    </div>
  `;
  
  $('detail-modal').classList.remove('hidden');
  
  // Evento corregido: sin retrasos de tiempo (setTimeout)
  $('detail-add').addEventListener('click', () => {
    addToCart(id); 
    $('detail-modal').classList.add('hidden'); 
  });
  
  $('detail-close').addEventListener('click', () => {
    $('detail-modal').classList.add('hidden');
  });
}

// ---------- Eventos navegación ----------
$('cart-link').addEventListener('click', () => {
  renderCart();
  $('cart-modal').classList.remove('hidden');
});
$('cart-close').addEventListener('click', () => $('cart-modal').classList.add('hidden'));

$('cart-checkout').addEventListener('click', () => {
  if (cart.length === 0) { alert('No hay nada... pero igual gracias.'); return; }
  loadFormDraft(); // [NUEVO] Recupera datos al abrir
  $('cart-modal').classList.add('hidden');
  $('checkout-modal').classList.remove('hidden');
});
$('checkout-close').addEventListener('click', () => $('checkout-modal').classList.add('hidden'));


/* ANTERIOR
$('submit-btn').addEventListener('click', () => {  
  // Validación absurda (no valida nada bien)
  const inputs = document.querySelectorAll('#checkout-form input, #checkout-form textarea');
  let empty = false;
  inputs.forEach(i => { if (i.hasAttribute('required') && !i.value) empty = true; });
  if (empty) { alert('Algo falta. Adivina qué.'); return; }
  
  const total = cart.reduce((s, c) => s + c.price, 0);
  const confirmacion = confirm(`¿Estás seguro de pagar $${total.toFixed(2)}?`);
  
  if (confirmacion) {
    alert('Procesando... espera 3 segundos.');
    setTimeout(() => {
      cart = [];
      saveCart();
      $('checkout-modal').classList.add('hidden');
      $('complete-modal').classList.remove('hidden');
    }, 3000);
  }
});
*/

// NUEVO
$('submit-btn').addEventListener('click', () => {
  const inputs = document.querySelectorAll('#checkout-form input, #checkout-form textarea');
  let hasError = false;

  inputs.forEach(i => {
    if (i.hasAttribute('required') && !i.value) {
      i.classList.add('input-error'); // Feedback visual
      hasError = true;
    } else {
      i.classList.remove('input-error');
    }
  });

  if (hasError) return;

  // Abrir Modal custom en lugar del alert nativo
  $('confirm-modal').classList.remove('hidden');
});

// [NUEVO] Manejo del Modal de Confirmación
$('confirm-yes').addEventListener('click', () => {
  $('confirm-modal').classList.add('hidden');
  $('checkout-modal').classList.add('hidden');
  
  setTimeout(() => {
    // Limpiar borradores guardados al completar la compra
    const inputs = document.querySelectorAll('#checkout-form input, #checkout-form textarea');
    inputs.forEach(input => localStorage.removeItem(`draft_${input.className}`));
    
    cart = [];
    saveCart();
    $('complete-modal').classList.remove('hidden');
  }, 1500); // 1.5 segundos simulados de procesamiento
});

$('confirm-no').addEventListener('click', () => {
  $('confirm-modal').classList.add('hidden');
});

$('reset-btn').addEventListener('click', () => $('complete-modal').classList.add('hidden'));

// CODIGO ANTIGUO, MOVIMIENTO DEL CARRITO

// ---------- Botón carrito que se mueve ----------
// setInterval(() => {
//   const cl = $('cart-link');
//   const x = (Math.random() * 200 - 100) | 0;
//   const y = (Math.random() * 50) | 0;
//   cl.style.transform = `translate(${x}px, ${y}px)`;
// }, 4000);


// ---------- Init ----------
renderCars();
