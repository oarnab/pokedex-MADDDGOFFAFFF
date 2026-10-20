// ==========================================================
// 1. INTERFÍCIES DTO (Contractes de dades de la PokéAPI)
//    Ja venen donades. Descriuen la forma del JSON que retorna l'API.
//    IMPORTANT: només existeixen en temps de compilació. TypeScript NO
//    valida en execució que l'API realment retorni aquesta estructura.
// ==========================================================
// ==========================================================
// 3. PokemonType (JA IMPLEMENTADA, usa-la com a MODEL)
//    Fixa't: `readonly` per a dades que no canvien i un getter
//    només on hi ha lògica (label).
// ==========================================================
/**
 * Representa un tipus de Pokémon (Foc, Aigua, etc.)
 */
export class PokemonType {
    id;
    name;
    icon;
    color;
    // 2. Rebre els valors i fer l'assignació manual
    constructor(id, name, icon, color) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.color = color;
    }
    get label() {
        return `${this.icon} ${this.name}`;
    }
}
export const POKEMON_TYPES = {
    normal: new PokemonType("normal", "Normal", "⚪", "#a8a878"),
    fire: new PokemonType("fire", "Foc", "🔥", "#c84010"),
    water: new PokemonType("water", "Aigua", "💧", "#2060c0"),
    grass: new PokemonType("grass", "Planta", "🌿", "#208020"),
    electric: new PokemonType("electric", "Elèctric", "⚡", "#a08000"),
    ice: new PokemonType("ice", "Gel", "❄️", "#68c2d0"),
    fighting: new PokemonType("fighting", "Lluita", "🥊", "#c03028"),
    poison: new PokemonType("poison", "Verí", "☠️", "#703870"),
    ground: new PokemonType("ground", "Terra", "⏳", "#e0c068"),
    flying: new PokemonType("flying", "Volador", "🦅", "#a890f0"),
    psychic: new PokemonType("psychic", "Psíquic", "🔮", "#f85888"),
    bug: new PokemonType("bug", "Insecte", "🐛", "#a8b820"),
    rock: new PokemonType("rock", "Roca", "🪨", "#b8a038"),
    ghost: new PokemonType("ghost", "Fantasma", "👻", "#705898"),
    dragon: new PokemonType("dragon", "Drac", "🐉", "#7038f8"),
    steel: new PokemonType("steel", "Acer", "⚙️", "#b8b8d0"),
    fairy: new PokemonType("fairy", "Fada", "🧚", "#ee99ac")
};
// ==========================================================
// 5. CLASSES QUE HAS D'IMPLEMENTAR TU
//    Els getters ja tenen signatura i retornen un valor provisional
//    perquè el projecte compili. Substitueix-los per la implementació real.
// ==========================================================
/**
 * EXERCICI 1: class BasePokemon  -> És la classe PARE. Representa un Pokémon de la llista general.
 *
 * Atributs (privats, amb prefix _):
 *   _id: número que conté l'identificador únic del pokemon
 *   _name: cadena de text que conté el nom del pokemon
 *   _url: cadena de text que conté la url per obtenir el detall del pokemon
 *
 * Constructor(item: IPokeApiListItem):
 *   - Desa name i url.
 *   - L'id NO ve a les dades: has d'extreure'l de la url.
 *     Ex: "https://pokeapi.co/api/v2/pokemon/25/"  ->  25
 *     Pista: split("/"), filter(Boolean), pop(), Number().
 *
 * Getters:
 *   get id: retorna l'atribut privat corresponent.
 *   get name: retorna l'atribut privat corresponent.
 *   get url: retorna l'atribut privat corresponent.
 *   get formattedId: retorna l'atribut id en format "#025" (3 xifres, amb zeros a l'esquerra. Pista: padStart).
 */
/**
 * EXERCICI 3: class DetailedPokemon
 *
 * Classe FILLA. Pokémon amb totes les dades de la targeta de detall.
 * Ha d'HEREDAR de BasePokemon
 *
 * Atributs (privats):
 *   _weightKg: pes del pokemon
 *   _imageUrl: cadena de text amb la url de la imatge del pokemon
 *   _types: array dels tipus als que pertany el pokemon (usar classe PokemonType)
 *   _stats: array amb informació sobre diferents atrributs (usar tupla type Stat)
 *   _cryUrl: cadena de text amb la url amb l'àudio del seu crit (pot ser null)
 *
 * Constructor(data: IPokeApiDetail, url: string):
 *   - Crida obligatòria a super() amb un objecte { data.name, data.url } (IPokeApiListItem).
 *   - weightKg: obtenir de data.weight (l'API dóna el pes en hectograms -> divideix per 10).
 *   - imageUrl: obtenir de data.sprites.front_default, o "" si és null.
 *   - cryUrl: obtenir de data.cries.latest, o null si no existeix (pista: ?. i ||).
 *   - types: converteix els noms de l'API ("fire") a instàncies de PokemonType
 *            usant el diccionari POKEMON_TYPES. Podeu copiar aquest codi:
 *
 *      this._types = data.types
 *          .map((t) => POKEMON_TYPES[t.type.name])
 *          .filter((type): type is PokemonType => type !== undefined);
 *
 *   - stats: converteix cada element de l'API en una tupla [nom, valor]. Podeu copiar aquest codi:
 *
 *     this._stats = data.stats.map((s): Stat => [s.stat.name, s.base_stat]);
 *
 * Getters:
 *   get weightKg: retorna l'atribut privat corresponent.
 *   get imageUrl: retorna l'atribut privat corresponent.
 *   get cryUrl: retorna l'atribut privat corresponent (pot ser string o null).
 *   get types: retorna un array d'objectes PokemonType
 *   get stats: retorna un array de type Stat
 */
//# sourceMappingURL=models.js.map