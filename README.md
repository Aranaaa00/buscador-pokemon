# 🧩 Buscador Pokémon

Proyecto sobre un buscador interactivo que permite consultar información de Pokémon utilizando la **PokeAPI**.  
El usuario puede escribir el nombre de un Pokémon para obtener resultados con sus imágenes, tipos y datos detallados.  

---

## ⚙️ Tecnologías utilizadas

- **HTML5** → estructura del sitio  
- **CSS3** → estilos 
- **JavaScript** → lógica, búsqueda y manipulación del DOM  
- **Fetch API** → conexión con la PokeAPI  
- **Debounce** → optimización de las búsquedas  

---

## 🎮 Funcionalidades principales

### 🔍 Búsqueda dinámica
- El usuario escribe en el campo de texto y, tras medio segundo sin escribir, se ejecuta una búsqueda (gracias a la técnica *debounce*).  
- Los resultados se muestran como tarjetas con el nombre, imagen y tipos del Pokémon.

### 🧠 Detalle del Pokémon
- Al hacer clic en una tarjeta, aparece una ventana emergente con más información:
  - Nombre  
  - ID  
  - Habilidades (traducidas al español)  
  - Peso  
  - Altura  
- El emergente se puede cerrar haciendo clic fuera de él.

### 🔊 Reproducción de gritos
- Dentro del emergente aparece un botón de audio que reproduce el grito característico del Pokémon seleccionado.

### 🚀 Carga progresiva con "Ver más"
- Los resultados se muestran de 12 en 12.  
- El botón **"Ver más"** carga más tarjetas sin necesidad de recargar la página.  

---

## 💡 Explicación técnica destacada

### 🕒 Debounce
Se usa la función `debounce(funcion, tiempo)` para evitar ejecutar la búsqueda en cada pulsación de tecla.  
Solo se lanza cuando el usuario deja de escribir durante el tiempo indicado (500 ms).  
Esto mejora el rendimiento y evita hacer demasiadas peticiones a la API.

### 🌐 Obtención de habilidades en español
La función `obtenerHabilidades(pokemon)` realiza peticiones adicionales a la API para obtener los nombres de las habilidades en español.  
Utiliza `Promise.all()` para hacer todas las peticiones de forma simultánea y optimizar el tiempo de carga.

### 📦 Estructura de código
- **`cargarPokemons()`** → obtiene los nombres de todos los Pokémon (hasta 1000).  
- **`buscarPokemons()`** → filtra los resultados según la búsqueda.  
- **`obtenerHabilidades()`** → traduce las habilidades al español.  
- **`mostrarPokemons()`** → muestra las tarjetas en pantalla.

## 🚀 Cómo ejecutar el proyecto

1. Clona este repositorio o descarga los archivos.
2. Abre el archivo `index.html` en tu navegador.  
3. ¡Empieza a buscar Pokémon por su nombre y descubre sus características! ⚡   
