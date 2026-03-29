// Claves de localStorage para mantener persistencia entre recargas.
const PRODUCTS_KEY = "atelier.products.v1";
const PRODUCTS_VERSION_KEY = "atelier.products.version";
const CART_KEY = "atelier.cart.v1";

// Si modificamos el seed (por ejemplo, agregar mas productos), subimos version.
// Esto permite poblar automaticamente la tienda al iniciar con el nuevo catalogo.
const PRODUCTS_SCHEMA_VERSION = "2";

// Referencias a elementos del DOM para evitar buscarlos repetidamente.
const el = {
  searchInput: document.getElementById("searchInput"),
  searchResults: document.getElementById("searchResults"),
  catalogList: document.getElementById("catalogList"),
  suggestionChips: document.getElementById("suggestionChips"),
  searchView: document.getElementById("searchView"),
  catalogView: document.getElementById("catalogView"),
  resultsCount: document.getElementById("resultsCount"),
  catalogCount: document.getElementById("catalogCount"),
  modal: document.getElementById("productModal"),
  modalImage: document.getElementById("modalImage"),
  modalTag: document.getElementById("modalTag"),
  modalName: document.getElementById("modalName"),
  modalPrice: document.getElementById("modalPrice"),
  modalDescription: document.getElementById("modalDescription"),
  closeModalBtn: document.getElementById("closeModalBtn"),
  addToCartBtn: document.getElementById("addToCartBtn"),
  downloadImageBtn: document.getElementById("downloadImageBtn"),
  downloadAllBtn: document.getElementById("downloadAllBtn"),
  cartBtn: document.getElementById("cartBtn"),
  switchButtons: Array.from(document.querySelectorAll(".switch-btn")),
};

// Estado principal en memoria.
let products = loadProductsOnStartup();
let activeProduct = null;

// Sugerencias simples para ayudar al usuario a explorar.
const suggestions = ["audio", "hogar", "movilidad", "bienestar", "edicion", "oficina"];

// Inicializacion de la aplicacion.
bootstrap();

// Configura eventos y pinta el primer render.
function bootstrap() {
  renderSuggestionChips();
  renderCatalog(products);
  renderSearchResults(products);
  updateCartLabel();

  // Busqueda reactiva mientras el usuario escribe.
  el.searchInput.addEventListener("input", onSearch);

  // Cierre de modal por boton, click fuera del panel y tecla Escape.
  el.closeModalBtn.addEventListener("click", closeModal);
  el.modal.addEventListener("click", (event) => {
    if (event.target === el.modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  // Acciones del modal.
  el.addToCartBtn.addEventListener("click", () => {
    if (!activeProduct) return;
    addToCart(activeProduct.id);
  });

  el.downloadImageBtn.addEventListener("click", () => {
    if (!activeProduct) return;
    downloadImage(activeProduct);
  });

  // Descarga masiva de imagenes del catalogo.
  el.downloadAllBtn.addEventListener("click", downloadAllImages);

  // Cambiar entre las vistas principales.
  el.switchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setView(button.dataset.view);
      el.switchButtons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

// Activa una vista y desactiva la otra.
function setView(view) {
  el.searchView.classList.toggle("active", view === "search");
  el.catalogView.classList.toggle("active", view === "catalog");
}

// Filtra productos por nombre, descripcion o categoria.
function onSearch(event) {
  const query = event.target.value.trim().toLowerCase();
  const filtered = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.tag.toLowerCase().includes(query)
    );
  });
  renderSearchResults(filtered);
}

// Dibuja chips de busqueda rapida.
function renderSuggestionChips() {
  el.suggestionChips.innerHTML = "";

  suggestions.forEach((item) => {
    const button = document.createElement("button");
    button.className = "chip";
    button.type = "button";
    button.textContent = item;

    button.addEventListener("click", () => {
      el.searchInput.value = item;
      onSearch({ target: el.searchInput });
    });

    el.suggestionChips.appendChild(button);
  });
}

// Render del catalogo completo.
function renderCatalog(list) {
  el.catalogCount.textContent = `${list.length} productos`;
  paintList(el.catalogList, list);
}

// Render de resultados de busqueda.
function renderSearchResults(list) {
  el.resultsCount.textContent = `${list.length} resultados`;
  paintList(el.searchResults, list);
}

// Render reusable: pinta una lista de tarjetas de producto en cualquier contenedor.
function paintList(container, list) {
  container.innerHTML = "";

  if (!list.length) {
    const empty = document.createElement("p");
    empty.textContent = "No encontramos resultados. Prueba otro termino.";
    container.appendChild(empty);
    return;
  }

  list.forEach((product) => {
    const article = document.createElement("article");
    article.className = "product-card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;

    const meta = document.createElement("div");
    meta.className = "product-meta";
    meta.innerHTML = `
      <h4>${product.name}</h4>
      <p>${product.description}</p>
      <p class="product-price">$${product.price}</p>
    `;

    const detailButton = document.createElement("button");
    detailButton.type = "button";
    detailButton.textContent = "Detalle";
    detailButton.addEventListener("click", () => openModal(product.id));

    article.append(image, meta, detailButton);
    container.appendChild(article);
  });
}

// Abre modal con los datos del producto seleccionado.
function openModal(productId) {
  activeProduct = products.find((item) => item.id === productId) || null;
  if (!activeProduct) return;

  el.modalImage.src = activeProduct.image;
  el.modalImage.alt = activeProduct.name;
  el.modalTag.textContent = activeProduct.tag;
  el.modalName.textContent = activeProduct.name;
  el.modalPrice.textContent = `$${activeProduct.price}`;
  el.modalDescription.textContent = activeProduct.description;
  el.modal.classList.add("open");
  el.modal.setAttribute("aria-hidden", "false");
}

// Cierra modal y conserva activeProduct por si se quiere volver a usar.
function closeModal() {
  el.modal.classList.remove("open");
  el.modal.setAttribute("aria-hidden", "true");
}

// Agrega al carrito (si existe, aumenta cantidad; si no, crea item nuevo).
function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const cart = readJson(CART_KEY, []);
  const item = cart.find((entry) => entry.id === productId);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id: product.id, quantity: 1, name: product.name, price: product.price });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartLabel();

  // Feedback visual corto para confirmar accion.
  el.addToCartBtn.textContent = "Anadido";
  setTimeout(() => {
    el.addToCartBtn.textContent = "Anadir al carrito";
  }, 800);
}

// Actualiza el total de items en la interfaz del carrito.
function updateCartLabel() {
  const cart = readJson(CART_KEY, []);
  const amount = cart.reduce((sum, item) => sum + item.quantity, 0);
  el.cartBtn.textContent = `Carrito (${amount})`;
}

// Descarga una imagen de producto al equipo del usuario.
async function downloadImage(product) {
  const filename = product.name.toLowerCase().replace(/\s+/g, "-") + ".svg";

  try {
    const response = await fetch(product.image);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    triggerDownload(objectUrl, filename);
    URL.revokeObjectURL(objectUrl);
  } catch (_error) {
    // Fallback: intenta descargar directamente por URL.
    triggerDownload(product.image, filename);
  }
}

// Descarga todo el catalogo, una imagen por vez.
async function downloadAllImages() {
  for (const product of products) {
    await downloadImage(product);
  }
}

// Crea un enlace temporal para forzar la descarga.
function triggerDownload(url, filename) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

// Carga productos al iniciar.
// Si no existen en localStorage o si cambio la version del seed, vuelve a poblar.
function loadProductsOnStartup() {
  const currentVersion = localStorage.getItem(PRODUCTS_VERSION_KEY);
  const persisted = readJson(PRODUCTS_KEY, null);

  if (currentVersion === PRODUCTS_SCHEMA_VERSION && Array.isArray(persisted) && persisted.length > 0) {
    return persisted;
  }

  const seed = buildSeedProducts();
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(seed));
  localStorage.setItem(PRODUCTS_VERSION_KEY, PRODUCTS_SCHEMA_VERSION);
  return seed;
}

// Catalogo inicial de la tienda con imagenes locales.
function buildSeedProducts() {
  return [
    {
      id: "p1",
      name: "Aural One",
      price: "129.00",
      tag: "audio",
      description: "Auriculares livianos con sonido limpio para sesiones largas.",
      image: "assets/products/aural-one.svg",
    },
    {
      id: "p2",
      name: "Desk Beam",
      price: "89.00",
      tag: "hogar",
      description: "Lampara compacta de luz calida para escritorio o lectura.",
      image: "assets/products/desk-beam.svg",
    },
    {
      id: "p3",
      name: "Flow Bottle",
      price: "39.00",
      tag: "bienestar",
      description: "Botella termica minimalista pensada para movilidad diaria.",
      image: "assets/products/flow-bottle.svg",
    },
    {
      id: "p4",
      name: "Clip Keyboard",
      price: "159.00",
      tag: "edicion",
      description: "Teclado mecanico silencioso con tacto suave y preciso.",
      image: "assets/products/clip-keyboard.svg",
    },
    {
      id: "p5",
      name: "Pocket Stand",
      price: "29.00",
      tag: "movilidad",
      description: "Soporte plegable para elevar tu telefono en segundos.",
      image: "assets/products/pocket-stand.svg",
    },
    {
      id: "p6",
      name: "Frame Speaker",
      price: "219.00",
      tag: "audio",
      description: "Parlante de mesa con graves claros y perfil ultradelgado.",
      image: "assets/products/frame-speaker.svg",
    },
    {
      id: "p7",
      name: "Calm Diffuser",
      price: "74.00",
      tag: "bienestar",
      description: "Difusor silencioso para ambientes de trabajo y descanso.",
      image: "assets/products/calm-diffuser.svg",
    },
    {
      id: "p8",
      name: "Slate Mouse",
      price: "59.00",
      tag: "oficina",
      description: "Mouse ergonomico con desplazamiento suave y bateria larga.",
      image: "assets/products/slate-mouse.svg",
    },
    {
      id: "p9",
      name: "Nimbus Lamp",
      price: "139.00",
      tag: "hogar",
      description: "Lampara de pie con luz difusa para una escena cinematica.",
      image: "assets/products/nimbus-lamp.svg",
    },
    {
      id: "p10",
      name: "Orbit Charger",
      price: "49.00",
      tag: "movilidad",
      description: "Base de carga magnetica para escritorio o velador.",
      image: "assets/products/orbit-charger.svg",
    },
    {
      id: "p11",
      name: "Canvas Sleeve",
      price: "44.00",
      tag: "oficina",
      description: "Funda para tablet con textura suave y cierre oculto.",
      image: "assets/products/canvas-sleeve.svg",
    },
    {
      id: "p12",
      name: "Echo Pen",
      price: "24.00",
      tag: "edicion",
      description: "Lapiz digital minimalista para notas y bocetos rapidos.",
      image: "assets/products/echo-pen.svg",
    },
  ];
}

// Utilidad segura para leer JSON desde localStorage.
function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (_error) {
    return fallback;
  }
}
