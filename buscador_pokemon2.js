let input = document.querySelector("#buscador_pokemon");
let emergente = document.querySelector("#emergente_tarjeta");
let boton_verMas = document.querySelector("#ver_mas");
let cantidadVisible = 12;
let lista_pokemons = [];
let pokemons_coincidentes = [];

async function cargarPokemons() {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
    const datos = await respuesta.json();
    lista_pokemons = datos.results;
}

cargarPokemons();

function debounce(funcion, tiempo) {
    let temporizador;
    return (...args) => {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => {
            funcion(...args);
        }, tiempo);
    };
}

async function buscarPokemons() {
    let busqueda = input.value.toLowerCase();
    pokemons_coincidentes = [];
    cantidadVisible = 12;

    let pokemons_buscados = lista_pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(busqueda)
    );

    for (const pokemon of pokemons_buscados) {
        let respuesta = await fetch(pokemon.url);
        let detalles = await respuesta.json();

        pokemons_coincidentes.push(detalles);
    }
    mostrarPokemons();
};

function mostrarPokemons() {
    let seccion = document.querySelector("#tarjetas_pokemons");
    seccion.innerHTML = "";

    pokemons_coincidentes.slice(0, cantidadVisible).forEach(pokemon => {
        let articulo = document.createElement("article");
        articulo.classList.add("tarjeta_pokemon");

        articulo.innerHTML = 
            `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>${pokemon.name}</p>`;
        
        articulo.addEventListener("click", () => {
            let informacion_pokemon = document.querySelector("#info_pokemon");

            let tipos_pokemon = pokemon.types.map(t => t.type.name);

            informacion_pokemon.innerHTML = `
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <section>
                    <p>Nombre: ${pokemon.name}</p>
                    <p>ID: ${pokemon.id}</p>
                    <p>Tipos: ${tipos_pokemon.join(", ")}</p>
                    <p>Peso: ${pokemon.weight / 10} kg</p>
                    <p>Altura: ${pokemon.height / 10} m</p>
                </section>`;

            emergente.style.display = "flex";
        });
        
        if (cantidadVisible >= pokemons_coincidentes.length) {
            boton_verMas.style.display = "none";
        } else {
            boton_verMas.style.display = "flex";
        }

        seccion.append(articulo);
    });
};

input.addEventListener("input", debounce(buscarPokemons, 500));

boton_verMas.addEventListener("click", () => {
    cantidadVisible += 12;
    mostrarPokemons();
});

emergente.addEventListener("click", function(e) {
    if (e.target === emergente) {
        emergente.style.display = "none";
    }
});