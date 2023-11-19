import { Request, Response } from 'express';
import { Pokemon } from '../model/pokemon.model';
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./user');
class GameController {
    constructor() {}

   
    public async main(req: Request, res: Response) {
        try {
            let level = Number(req.query.level)
            if(!level) level = 2
            let name = localStorage.getItem('name.txt');
            const randomIds = getRandomId(level, 500);
            const pokemonList = await getPokemonList(randomIds);
            const list = [...pokemonList, ...pokemonList];
            const shuffleList = shuffle(list);
            res.render('play', { shuffleList , level: level, player: name });
        } catch (error: any) {
            console.error('Error getting list of Pokémon:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }

   
}
function getRandomId(count: number, max: number): number[] {
    const number = new Set<number>();
    while (number.size < count) {
        const randomId = Math.floor(Math.random() * max + 1);
        number.add(randomId);
    }

    return Array.from(number);
}

async function getPokemonList(ids: number[]): Promise<Pokemon[]> {
    const promises = ids.map((id) => Pokemon.getPokemonById(id));
    const pokemonList = await Promise.all(promises);
    return pokemonList.filter((Pokemon) => Pokemon !== null) as Pokemon[];
}

function shuffle(arr: Pokemon[]): Pokemon[] {
    return arr.sort(() => Math.random() - 0.5);
}
export default new GameController();
