# 🧩 Buscador Pokémon

Proyecto sobre un buscador interactivo que permite consultar información de Pokémon utilizando la **PokeAPI**.  
El usuario puede escribir el nombre de un Pokémon para obtener resultados con sus imágenes y datos detallados.  

---

## ⚙️ Tecnologías utilizadas

- **HTML5** → estructura del sitio  
- **CSS3** → estilos y diseño responsive  
- **JavaScript (ES6)** → lógica, búsqueda y manipulación del DOM  
- **Fetch API** → conexión con la PokeAPI  
- **Debounce** → optimización de las búsquedas  

---

## 🎮 Funcionalidades principales

### 🔍 Búsqueda dinámica
- El usuario escribe en el campo de texto y, tras medio segundo sin escribir, se ejecuta una búsqueda (gracias a la técnica *debounce*).  
- Los resultados se muestran como tarjetas con el nombre e imagen del Pokémon.

### 🧠 Detalle del Pokémon
- Al hacer clic en una tarjeta, aparece una ventana emergente con más información:
  - Nombre  
  - ID  
  - Tipos  
  - Peso  
  - Altura  
- El emergente se puede cerrar haciendo clic fuera de él.

### 🚀 Carga progresiva con “Ver más”
- Los resultados se muestran de 12 en 12.  
- El botón **“Ver más”** carga más tarjetas sin necesidad de recargar la página.  

---

## 💡 Explicación técnica destacada

### 🕒 Debounce
Se usa la función `debounce(funcion, tiempo)` para evitar ejecutar la búsqueda en cada pulsación de tecla.  
Solo se lanza cuando el usuario deja de escribir durante el tiempo indicado (500 ms).  
Esto mejora el rendimiento y evita hacer demasiadas peticiones a la API.

### 📦 Estructura de código
- **`cargarPokemons()`** → obtiene los nombres de todos los Pokémon.  
- **`buscarPokemons()`** → filtra los resultados según la búsqueda.  
- **`mostrarPokemons()`** → muestra las tarjetas en pantalla.  
- **Eventos**:
  - `input` (campo de texto) → activa la búsqueda.  
  - `click` (tarjetas) → muestra la información.  
  - `click` (fondo del emergente) → cierra la ventana.  
  - `click` (botón “Ver más”) → carga más resultados.  

---

## 🎨 Diseño y estilos

- **Paleta principal:** tonos azules suaves inspirados en el universo Pokémon (`#1E90FF`, `#a1d6f1`, `#cce7ff`).  
- **Sombras suaves** y **bordes redondeados** para un estilo moderno y limpio.  
- **Transiciones** y **hover effects** que aportan dinamismo a las tarjetas.  
- **Diseño responsive** para pantallas pequeñas (móviles y tablets).  

---

## 🧱 Estructura de archivos

```
📁 proyecto-buscador-pokemon
│
├── index.html
├── buscar_pokemon.css
├── buscador_pokemon2.js
└── 📁 img
    ├── pokemon_logo.png
    └── favicon_pokemon.png
```

---

## 🚀 Cómo ejecutar el proyecto

1. Clona este repositorio o descarga los archivos.  
   ```bash
   git clone https://github.com/tuusuario/buscador-pokemon.git
   ```
2. Abre el archivo `index.html` en tu navegador.  
3. ¡Empieza a buscar Pokémon por su nombre y descubre sus características! ⚡  

---

## 🧠 Posibles mejoras futuras
- Buscar también por **ID o tipo de Pokémon**.  
- Añadir **animaciones al abrir el emergente**.  
- Implementar **paginación real o scroll infinito**.  
- Mostrar **estadísticas de combate** (HP, ataque, defensa…).  

---