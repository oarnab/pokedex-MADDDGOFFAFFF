import * as Models from "./models.js";
import * as Utils from "./utils.js";
// ==========================================================
// EXERCICI 1: Llistar els 151 Pokémon
// ==========================================================
const mapaPokemon = new Map<number, Models.BasePokemon>();

const btnCarregarPokemon = document.getElementById("btn-show-all") as HTMLButtonElement;
btnCarregarPokemon?.addEventListener("click", carregarLlistaPokemon);

async function carregarLlistaPokemon(): Promise<void> {
    try {
        Utils.netejarCercador()
        Utils.mostrarEstat("S'estan carregant els pokemons", "loading");
        const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        if (!resposta.ok) {
            throw new Error(`Error HTTP: ${resposta.status}`);
        }
        const dades = await resposta.json() as Models.IPokeApiListResponse;
        mapaPokemon.clear();
        dades.results.forEach((pokemon: Models.IPokeApiListItem) => {
            const model = new Models.BasePokemon(pokemon);
            mapaPokemon.set(model.id, model);
        });
        Utils.amagarEstat();
        Utils.renderitzarLlistaNoms(Array.from(mapaPokemon.values()));
    }catch ( error: unknown ){
        if (error instanceof Error) {
            Utils.mostrarEstat("Error: " + error.message, "error");
        } else {
            Utils.mostrarEstat("S'ha produït un error desconegut.", "error");
            console.error("S'ha produït un error desconegut.");
        }
    } finally {
        console.log("Procés finalitzat.");
    }
}

// ==========================================================
// EXERCICI 2: Cercador en temps real
// ==========================================================
export function filtrarLlistaNoms(): void {
    const input = document.getElementById("search-input") as HTMLInputElement | null;
    const items = document.querySelectorAll<HTMLLIElement>("#pokemon-list li");

    if (!input) return;
    const cerca = input.value.trim().toLowerCase();
    const cercaNumerica = cerca !== "" && !Number.isNaN(Number(cerca));


    items.forEach((el: HTMLLIElement):void => {
        let coincideix:boolean = false;
        const id: string | null = el.getAttribute("data-id");
        const nom:string = el.textContent?.split(" - ").pop()?.toLowerCase() ?? "";

        if(cerca == ""){
            coincideix = true;
        }else if(cercaNumerica){
            coincideix = id !== null && Number(cerca) === Number(id);
        }else if(nom.includes(cerca)) {
            coincideix = true;
        }
        el.classList.toggle("hidden", !coincideix);
    });
}
document.getElementById("search-input")?.addEventListener("input", filtrarLlistaNoms);



// ==========================================================
// EXERCICI 3: Detall del Pokémon, cache i crit
// ==========================================================
const cachePokemon = new Map<number, Models.DetailedPokemon>();
const ulPokemonList = document.getElementById("pokemon-list") as HTMLUListElement;

ulPokemonList.addEventListener("click", (event):void => {
    const target : HTMLElement= event.target as HTMLElement;
    const li:HTMLLIElement | null = target.closest("li");
    if (li == null){
        return;
    }
    const id :number= Number(li.dataset.id);
    const pokemon : Models.BasePokemon | undefined = mapaPokemon.get(id);
    if (!pokemon){
        return;
    }
    Utils.marcarItemActiu(li);
    void carregarDetallPokemon(id, pokemon.url);
});


async function carregarDetallPokemon(id: number, url: string): Promise<void>{
    try {
        let pokemon: Models.DetailedPokemon | undefined = cachePokemon.get(id);
        if (pokemon === undefined) {
            Utils.mostrarEstat("Carregant el Pokemon", "loading");

            const resposta:Response = await fetch(url);
            if (!resposta.ok) {
                throw new Error(`Error HTTP: ${resposta.status}`);
            }
            const dades = await resposta.json() as Models.IPokeApiDetail;

            pokemon = new Models.DetailedPokemon(dades, url);
            cachePokemon.set(id, pokemon);
        }

        Utils.renderitzarDetallCard(pokemon);
        Utils.amagarEstat();
    } catch (error: unknown) {
        Utils.mostrarEstat("No s'ha pogut carregar el Pokémon.", "error");
        console.error(error);
    }
}


// ==========================================================
// EXERCICI 4: Botons de filtre per tipus
// ==========================================================
Utils.generarBotonsTipus()


// ==========================================================
// EXERCICI 5: Filtrar la llista per tipus
// ==========================================================

const containerElementTipus = document.getElementById("type-filter-container") as HTMLDivElement;


async function carregarPokemonPerTipus(tipus: string): Promise<void> {
    try {
        Utils.mostrarEstat("Carregant Pokemons per tipus....", "loading");
        const resposta: Response = await fetch(`https://pokeapi.co/api/v2/type/${tipus}`);
        if (!resposta.ok) {
            throw new Error(`Error HTTP: ${resposta.status}`);
        }
        const dades = await resposta.json() as Models.IPokeApiTypeResponse;

        const pokemons: Models.BasePokemon[] = [];
        for (const slot of dades.pokemon) {
            const p = new Models.BasePokemon(slot.pokemon);
            if (p.id <= 151) {
                pokemons.push(p);
                mapaPokemon.set(p.id, p);
            }
        }

        Utils.renderitzarLlistaNoms(pokemons);
        Utils.netejarCercador();
        Utils.netejarDetallCard();
        Utils.amagarEstat();
    } catch (error: unknown) {
        if (error instanceof Error) {
            Utils.mostrarEstat("Error: " + error.message, "error");
        } else {
            Utils.mostrarEstat("Error desconegut.", "error");
        }
    }
}

async function mostrarTotsPokemon(): Promise<void> {
    if (mapaPokemon.size < 151) {
        await carregarLlistaPokemon();
        return;
    }
    Utils.renderitzarLlistaNoms(Array.from(mapaPokemon.values()));
    Utils.netejarCercador();
    Utils.netejarDetallCard();
    Utils.amagarEstat();
}

btnCarregarPokemon?.addEventListener("click",()=>{
    for (const boto of containerElementTipus.children) {
        boto.classList.remove("active");
    }
});

containerElementTipus.addEventListener("click", (event) => {
    const target: HTMLElement = event.target as HTMLElement;
    const btn: HTMLButtonElement | null = target.closest("button");
    if (!btn) {
        return;
    }
    const tipus: string | undefined = btn.dataset.type;
    if (!tipus) {
        return;
    }

    if (btn.classList.contains("active")) {
        btn.classList.remove("active");
        void mostrarTotsPokemon();
        return;
    }

    for (const boto of containerElementTipus.children) {
        boto.classList.remove("active");
    }
    btn.classList.add("active");
    void carregarPokemonPerTipus(tipus);
});



