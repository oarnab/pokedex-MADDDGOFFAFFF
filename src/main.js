import * as Models from "./models.js";
import * as Utils from "./utils.js";
// ==========================================================
// EXERCICI 1: Llistar els 151 Pokémon
// ==========================================================
const mapaPokemon = new Map();
const btnCarregarPokemon = document.getElementById("btn-show-all");
btnCarregarPokemon?.addEventListener("click", carregarLlistaPokemon);
async function carregarLlistaPokemon() {
    try {
        Utils.netejarCercador();
        Utils.mostrarEstat("S'estan carregant els pokemons", "loading");
        const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        if (!resposta.ok) {
            throw new Error(`Error HTTP: ${resposta.status}`);
        }
        const dades = await resposta.json();
        dades.results.forEach((pokemon) => {
            const model = new Models.BasePokemon(pokemon);
            mapaPokemon.set(model.id, model);
        });
        Utils.amagarEstat();
        Utils.renderitzarLlistaNoms(Array.from(mapaPokemon.values()));
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        else {
            console.error("S'ha produït un error desconegut.");
        }
    }
    finally {
        console.log("Procés finalitzat.");
    }
}
// ==========================================================
// EXERCICI 2: Cercador en temps real
// ==========================================================
export function filtrarLlistaNoms() {
    const input = document.getElementById("search-input");
    const items = document.querySelectorAll("#pokemon-list li");
    if (!input)
        return;
    const cerca = input.value.trim().toLowerCase();
    items.forEach((el) => {
        let coincideix = false;
        const id = el.getAttribute("data-id");
        const nom = el.textContent?.split(" - ").pop()?.toLowerCase() ?? "";
        if (cerca == "") {
            coincideix = true;
        }
        else if (cerca == id) {
            coincideix = true;
        }
        else if (cerca.includes(nom)) {
            coincideix = true;
        }
        el.classList.toggle("hidden", !coincideix);
    });
}
document.getElementById("search-input")?.addEventListener("input", filtrarLlistaNoms);
// ==========================================================
// EXERCICI 3: Detall del Pokémon, cache i crit
// ==========================================================
// TODO: Implementa la lògica de l'exercici 3 seguint els requisits
const cachePokemon = new Map();
const ulPokemonList = document.getElementById("pokemon-list");
ulPokemonList.addEventListener("click", (event) => {
    const target = event.target;
    const li = target.closest("li");
    if (li == null) {
        return;
    }
    const id = Number(li.dataset.id);
    const pokemon = mapaPokemon.get(id);
    if (!pokemon) {
        return;
    }
    Utils.marcarItemActiu(li);
    void carregarDetallPokemon(id, pokemon.url);
});
async function carregarDetallPokemon(id, url) {
    try {
        let pokemon = cachePokemon.get(id);
        if (pokemon === undefined) {
            Utils.mostrarEstat("Carregant el Pokemon", "loading");
            const resposta = await fetch(url);
            const dades = await resposta.json();
            pokemon = new Models.DetailedPokemon(dades, url);
            cachePokemon.set(id, pokemon);
        }
        Utils.renderitzarDetallCard(pokemon);
        Utils.amagarEstat();
    }
    catch (error) {
        Utils.mostrarEstat("No s'ha pogut carregar el Pokémon.", "error");
        console.error(error);
    }
}
// ==========================================================
// EXERCICI 4: Botons de filtre per tipus
// ==========================================================
// TODO: Implementa la lògica de l'exercici 4 seguint els requisits
// ==========================================================
// EXERCICI 5: Filtrar la llista per tipus
// ==========================================================
// TODO: Implementa la lògica de l'exercici 5 seguint els requisits
//# sourceMappingURL=main.js.map