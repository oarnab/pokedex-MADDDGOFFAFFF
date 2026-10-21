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
// TODO: Implementa la lògica de l'exercici 2 seguint els requisits
// ==========================================================
// EXERCICI 3: Detall del Pokémon, cache i crit
// ==========================================================
// TODO: Implementa la lògica de l'exercici 3 seguint els requisits
// ==========================================================
// EXERCICI 4: Botons de filtre per tipus
// ==========================================================
// TODO: Implementa la lògica de l'exercici 4 seguint els requisits
// ==========================================================
// EXERCICI 5: Filtrar la llista per tipus
// ==========================================================
// TODO: Implementa la lògica de l'exercici 5 seguint els requisits
//# sourceMappingURL=main.js.map