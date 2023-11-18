import { Request, Response } from 'express';
import { Pokemon } from '../model/pokemon.model';

class GameController {
    private level: number;

    constructor() {
        this.level = 5;
    }

    private getRandomId(count: number, max: number): number[] {
        const number = new Set<number>();
        while (number.size < count) {
            const randomId = Math.floor(Math.random() * max + 1);
            number.add(randomId);
        }

        return Array.from(number);
    }

    public async main(req: Request, res: Response) {
        try {
            const randomIds = this.getRandomId(this.level, 500);
            const pokemonList = await this.getPokemonList(randomIds);
            const list = [...pokemonList, ...pokemonList];
            const shuffleList = this.shuffle(list);
            res.render('play', { shuffleList });
        } catch (error: any) {
            console.error('Error getting list of Pokémon:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }

    private async getPokemonList(ids: number[]): Promise<Pokemon[]> {
        const promises = ids.map((id) => Pokemon.getPokemonById(id));
        const pokemonList = await Promise.all(promises);
        return pokemonList.filter((Pokemon) => Pokemon !== null) as Pokemon[];
    }

    private shuffle = (arr: Pokemon[]): Pokemon[] => {
        return arr.sort(() => Math.random() - 0.5);
    }
}

export default new GameController();
