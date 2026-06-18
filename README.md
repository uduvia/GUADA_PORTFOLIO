# 📷 Portafolio Fotográfico — Guía Completa

---

## PARTE 1 — Estructura de archivos

Organiza tu proyecto así en tu computadora:

```
mi-portafolio/          ← carpeta raíz del proyecto
│
├── index.html          ← nunca renombres este archivo
├── styles.css
├── script.js
│
└── fotos/              ← AQUÍ van TODAS tus fotos
    ├── foto-01.jpg
    ├── foto-02.jpg
    ├── foto-03.jpg
    ├── foto-04.jpg
    ├── foto-05.jpg
    └── perfil.jpg      ← tu foto para la sección "Sobre mí"
```

### Reglas importantes para las fotos

- Los nombres de archivo **no deben tener espacios** ni acentos.
  ✅ `foto-verano.jpg`   ❌ `Foto Verano.jpg`
- Formatos aceptados: `.jpg` / `.jpeg` / `.png` / `.webp`
- Tamaño recomendado: entre **800 KB y 3 MB** por imagen.
  (Más grandes = carga más lenta; más pequeñas = calidad baja)
- Orientación: horizontal (landscape) queda mejor en pantalla.

### Cómo agregar tus propias fotos al código

Abre `script.js` y edita el array `photos` (está al inicio del archivo):

```js
const photos = [
  {
    src:   "fotos/mi-foto-1.jpg",   // nombre exacto del archivo
    title: "El atardecer dorado",    // título que aparece abajo
    desc:  "Mar del Plata, 2024"     // lugar y fecha
  },
  {
    src:   "fotos/mi-foto-2.jpg",
    title: "Retrato de Ana",
    desc:  "Estudio, 2024"
  },
  // Sigue agregando más...
];
```

---

## PARTE 2 — Personalización rápida

### Cambiar tu nombre
En `index.html` busca "Tu Nombre" y reemplázalo.

### Cambiar colores (en styles.css, bloque `:root`)
| Variable       | Color actual     | Para qué sirve       |
|----------------|-----------------|----------------------|
| `--bg-0`       | `#080808`       | Fondo principal      |
| `--accent`     | `#C8A97A`       | Detalle dorado       |
| `--text-hi`    | `#F2EDE6`       | Texto principal      |

### Cambiar el tipo de ajuste de imagen
En `styles.css`, busca `.slide img` y cambia `object-fit`:
- `contain` → muestra la foto completa (puede dejar barras negras)
- `cover`   → recorta la foto para llenar la pantalla

---

## PARTE 3 — Cómo ver el portafolio antes de publicarlo

**No necesitas internet para esto.**

1. Abre la carpeta `mi-portafolio` en tu computadora.
2. Haz doble clic en `index.html`.
3. Se abrirá directamente en tu navegador (Chrome, Firefox, Edge, etc.).
4. Verás el portafolio exactamente como quedará publicado.
5. Cada vez que guardes cambios en el código, recarga la página
   con `F5` (Windows) o `Cmd+R` (Mac).

> 💡 **Tip:** Si las imágenes no cargan al abrir directamente con doble clic,
> instala la extensión **"Live Server"** en VS Code, o usa este truco:
> En Chrome, escribe en la barra de dirección: `file:///C:/ruta/a/tu/carpeta/index.html`

---

## PARTE 4 — Publicar en GitHub Pages (paso a paso)

### Paso 1 — Crear una cuenta en GitHub

1. Ve a **https://github.com** en tu navegador.
2. Haz clic en el botón verde **"Sign up"** (Registrarse).
3. Elige un nombre de usuario (este aparecerá en tu URL final,
   ej.: `tunombre.github.io/portafolio`). Usa tu nombre real o profesional.
4. Ingresa tu email y contraseña.
5. Verifica tu email haciendo clic en el link que te envían.

---

### Paso 2 — Crear el repositorio

Un *repositorio* es simplemente una carpeta en la nube donde vive tu sitio.

1. En GitHub, haz clic en el botón **"+"** (arriba a la derecha).
2. Selecciona **"New repository"**.
3. En el campo **"Repository name"** escribe: `portafolio`
   (o el nombre que prefieras; sin espacios).
4. Deja la opción en **"Public"** (debe ser pública para GitHub Pages gratuito).
5. **No** marques ninguna casilla adicional.
6. Haz clic en el botón verde **"Create repository"**.

---

### Paso 3 — Subir tus archivos

Ahora vas a subir todos tus archivos al repositorio.

1. Verás una página con texto y un botón que dice **"uploading an existing file"**.
   Haz clic en ese enlace.
   *(Si no lo ves, busca el botón "Add file" → "Upload files")*

2. Arrastra toda la carpeta `mi-portafolio` al área que dice
   **"Drag files here"**.
   — O haz clic en "choose your files" y selecciona todos los archivos.

   ⚠️ **Importante:** Debes subir `index.html`, `styles.css`, `script.js`
   Y también la carpeta `fotos/` con todas tus imágenes.

3. Espera a que todos los archivos terminen de subirse
   (verás una barra de progreso por cada archivo).

4. Abajo, en la sección **"Commit changes"**, escribe un mensaje como:
   `"Primera versión del portafolio"`

5. Haz clic en **"Commit changes"** (botón verde).

---

### Paso 4 — Activar GitHub Pages

¡Ya casi estás! Este es el paso mágico.

1. En tu repositorio, haz clic en **"Settings"** (el engranaje ⚙️ en la parte superior).
2. En el menú lateral izquierdo, busca y haz clic en **"Pages"**.
3. Verás la sección **"Source"**. Haz clic en el menú desplegable
   que dice **"None"** y selecciona **"main"** (o "master").
4. En el segundo menú que aparece, deja **"/ (root)"** seleccionado.
5. Haz clic en **"Save"**.
6. Espera 1-2 minutos.
7. Recarga la página de Settings > Pages.
8. Verás un recuadro verde que dice:
   **"Your site is published at https://tunombre.github.io/portafolio"**

¡Ese es tu enlace! Compártelo con quien quieras.

---

### Paso 5 — Actualizar el sitio en el futuro

Si quieres cambiar fotos, texto o cualquier cosa:

1. Edita los archivos en tu computadora.
2. Ve a tu repositorio en GitHub.
3. Haz clic en el archivo que quieres reemplazar.
4. Usa el ícono del lápiz ✏️ para editar texto directamente.
   O usa "Add file" → "Upload files" para reemplazar imágenes.
5. Los cambios se publican automáticamente en 1-2 minutos.

---

## PARTE 5 — Preguntas frecuentes

**¿Las fotos se cargan lentas?**
Reduce el tamaño de las imágenes con https://squoosh.app (gratis, en el navegador).
Apunta a menos de 800 KB por foto sin perder calidad visible.

**¿Puedo usar mi propio dominio como "mifoto.com"?**
Sí. En Settings > Pages > Custom domain puedes ingresar tu dominio.
Necesitas comprarlo aparte (desde ~10 USD/año en Namecheap o Porkbun).

**¿Cuántas fotos puedo tener?**
Las que quieras. GitHub Pages permite hasta 1 GB de archivos gratis.
Solo agrega más entradas al array `photos` en `script.js` y sube las imágenes.

**¿Funciona en celulares?**
Sí. El diseño es totalmente responsivo. En móvil también funciona
el gesto de swipe (deslizar) para pasar fotos.

**¿Alguien puede copiar mis fotos?**
Técnicamente sí (como en cualquier sitio web). Para dificultar esto,
puedes agregar `pointer-events: none` en las imágenes en el CSS,
aunque no es una protección absoluta.
