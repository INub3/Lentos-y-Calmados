# 🐌 Lentos y Calmados — Plantilla descargable

E-commerce de autos **intencionalmente anti-UX**, hecho con HTML, CSS y JavaScript puro. Sin frameworks, sin dependencias.

## 📁 Estructura del proyecto

```
lentos-y-calmados/
├── index.html          ← Página principal
├── css/
│   └── styles.css      ← Estilos (anti-UX)
├── js/
│   └── script.js       ← Lógica (carrito, modales, localStorage)
├── images/
│   ├── car1.png
│   ├── car2.png
│   ├── car3.png
│   ├── car4.png
│   ├── car5.png
│   └── car6.png
└── README.md
```

## 🚀 Cómo abrir el proyecto localmente

### Opción 1 — Doble clic
1. Descomprime el ZIP.
2. Haz doble clic en `index.html`.
3. Se abrirá en tu navegador. ¡Listo!

### Opción 2 — Servidor local (recomendado)
Algunos navegadores restringen `localStorage` y carga de imágenes con `file://`. Si ves problemas, usa un servidor estático:

```bash
# Con Python 3
cd lentos-y-calmados
python3 -m http.server 8000
# Abre http://localhost:8000
```

```bash
# Con Node.js
npx serve .
```

```bash
# Con VS Code
# Instala la extensión "Live Server" → clic derecho en index.html → "Open with Live Server"
```

## ✏️ Cómo modificar

- **Cambiar autos:** edita el array `cars` al inicio de `js/script.js`.
- **Cambiar imágenes:** reemplaza los archivos en `/images/` (mantén los nombres `car1.png` … `car6.png`) o cambia las rutas en `script.js`.
- **Cambiar estilos:** edita `css/styles.css`. Las animaciones están al inicio del archivo.
- **Cambiar textos:** edita directamente `index.html`.

## ⚠️ Características anti-UX incluidas

- Cursor de emoji 🚗 en toda la página
- Tipografías mezcladas (Comic Neue, Paprika, Bungee Shade, Creepster)
- Colores de bajo contraste y combinaciones ofensivas
- Botón de carrito que cambia de lugar cada 4 segundos
- Botones "+ carrito" que huyen del mouse
- Marquee con texto deslizándose
- Pop-up molesto a los 3.5 segundos
- Formulario de checkout con campos absurdos en orden desordenado
- Retrasos artificiales con `setTimeout`
- Mensajes de error vagos ("Algo falta. Adivina qué.")
- Scroll horizontal obligatorio
- Persistencia de carrito en `localStorage`

## 📝 Notas

- No requiere instalación de dependencias.
- Solo necesita conexión a Internet la primera vez para cargar las fuentes de Google Fonts (después se cachean).
- Todo el código es editable y está comentado.
