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

async function obtenerHabilidades(pokemon) {
    const habilidades = await Promise.all(
        pokemon.abilities.map(async (a) => {
            const url = a.ability.url;
            const res = await fetch(url);
            const data = await res.json();

            const nombre_es = data.names.find(n => n.language.name === "es");
            return nombre_es ? nombre_es.name : data.name;
        })
    );

    return habilidades;
}

function mostrarPokemons() {
    let seccion = document.querySelector("#tarjetas_pokemons");
    seccion.innerHTML = "";

    pokemons_coincidentes.slice(0, cantidadVisible).forEach(pokemon => {
        let articulo = document.createElement("article");
        articulo.classList.add("tarjeta_pokemon");
        let tipos_pokemon = pokemon.types.map(t => t.type.name);

        let span = document.createElement("span");

        for (let index = 0; index < tipos_pokemon.length; index++) {
            let parrafo = document.createElement("p");
            parrafo.classList.add(`tipo-${tipos_pokemon[index]}`);
            parrafo.textContent = tipos_pokemon[index];
            span.append(parrafo);
        }

        articulo.innerHTML = 
            `<p id="nombre-pokemon">${pokemon.name}</p>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">`;

        articulo.append(span);

        articulo.addEventListener("click", async () => {
            let informacion_pokemon = document.querySelector("#info_pokemon");
            let habilidades_pokemon = await obtenerHabilidades(pokemon);

            informacion_pokemon.innerHTML = `
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <section>
                    <p>Nombre: ${pokemon.name}</p>
                    <p>ID: ${pokemon.id}</p>
                    <p>Habilidades: ${habilidades_pokemon.join(", ")}</p>
                    <p>Peso: ${pokemon.weight / 10} kg</p>
                    <p>Altura: ${pokemon.height / 10} m</p>
                </section>
                <button id="grito_pokemon"><img src="img/icono_audio.png" alt="icono de sonido"></button>`;
            
            let grito_pokemon = document.querySelector("#grito_pokemon");

            grito_pokemon.addEventListener("click", () => {
                let sonido = new Audio(pokemon.cries.latest);
                sonido.play();
            })

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