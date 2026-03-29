# Guia del codigo - Atelier Store

Este documento explica, en lenguaje simple, como funciona la tienda.

## 1) Estructura general

El proyecto se divide en tres archivos principales:

- `index.html`: estructura visual (que elementos existen)
- `styles.css`: estilos (como se ven esos elementos)
- `script.js`: logica (que ocurre cuando el usuario interactua)

Tambien hay imagenes en `assets/products/`.

## 2) `index.html`

Partes importantes:

- `header.topbar`: marca de la tienda + boton para descargar todas las imagenes
- `nav.view-switch`: cambia entre dos vistas
- `section#searchView`: pantalla de busqueda
- `section#catalogView`: catalogo completo
- `footer.bottom-nav`: barra inferior de navegacion
- `div#productModal`: modal con detalle del producto

Idea clave: el HTML no contiene la data hardcodeada en tarjetas. Las tarjetas se crean con JavaScript.

## 3) `styles.css`

Partes importantes:

- `:root`: variables de color, radios y tono visual
- `.app-shell`: contenedor principal tipo tarjeta de vidrio
- `.product-card`: estilo de cada producto
- `.modal` y `.modal-panel`: ventana de detalle
- `@media (max-width: 640px)`: adaptacion para celular

Idea clave: separamos estilos por secciones para que modificar colores o espaciados sea facil.

## 4) `script.js`

### 4.1 Estado y llaves de almacenamiento

- `PRODUCTS_KEY`: donde se guarda el catalogo en `localStorage`
- `PRODUCTS_VERSION_KEY`: controla version del seed
- `CART_KEY`: guarda el carrito
- `PRODUCTS_SCHEMA_VERSION`: si cambias el seed, sube version y se repuebla

### 4.2 Flujo de inicio

1. Se ejecuta `loadProductsOnStartup()`
2. Si hay catalogo valido y misma version, usa ese
3. Si no, crea seed con `buildSeedProducts()`
4. Renderiza vistas y engancha eventos con `bootstrap()`

### 4.3 Eventos clave

- Busqueda en vivo: `onSearch`
- Cambiar vista: `setView`
- Abrir/cerrar modal: `openModal`, `closeModal`
- Agregar al carrito: `addToCart`
- Descargar imagen individual: `downloadImage`
- Descargar todas: `downloadAllImages`

### 4.4 Renderizado

- `renderCatalog` y `renderSearchResults` llaman a `paintList`
- `paintList` crea cada tarjeta con imagen, texto y boton "Detalle"

### 4.5 Persistencia

- Productos y carrito se guardan en `localStorage`
- `readJson` evita romper la app si hay JSON invalido

## 5) Como editar productos

Abre `script.js` y modifica la lista de `buildSeedProducts()`.

Cada producto tiene:

- `id`: identificador unico
- `name`: nombre
- `price`: precio
- `tag`: categoria
- `description`: texto breve
- `image`: ruta a la imagen (por ejemplo `assets/products/nueva.svg`)

Si agregas o cambias muchos productos:

1. Sube `PRODUCTS_SCHEMA_VERSION` (por ejemplo de `2` a `3`)
2. Recarga la pagina
3. Se repoblara el catalogo automaticamente al iniciar

## 6) Como agregar nuevas imagenes

1. Copia tu imagen en `assets/products/`
2. Usa nombres simples (ejemplo: `mi-producto.svg`)
3. En `buildSeedProducts()`, coloca esa ruta en `image`

## 7) Como limpiar datos de prueba

En consola del navegador puedes usar:

```js
localStorage.removeItem("atelier.products.v1");
localStorage.removeItem("atelier.products.version");
localStorage.removeItem("atelier.cart.v1");
```

Luego recarga, y la app vuelve a sembrar el catalogo inicial.
