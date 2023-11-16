import axios from 'axios';
const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';
export class Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];

    constructor(id: number, name: string, image: string, types: string[]) {
        this.id = id;
        this.name = name;
        this.image = image
        this.types = types;
    }

    static async getPokemonById(id: number): Promise<Pokemon | null> {
        try {
            const response = await axios.get(`${POKE_API_BASE_URL}/pokemon/${id}`);
            const pokemonData = response.data;
    
            const pokemon = new Pokemon(
                pokemonData.id,
                pokemonData.name,
                pokemonData.sprites.back_default,
                [pokemonData.types[0].type.name]
            );
    
            return pokemon;
        } catch (error: any) {
            console.error('Error fetching Pokémon:', error.message);
            return null;
        }
    }
    
}
