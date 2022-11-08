import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      `${process.env.POKEAPI_URL}?limit=800`,
    );

    await this.pokemonModel.deleteMany();
    console.log('Cleaning up database');

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const no = Number(url.split('/').at(-2));
      pokemonToInsert.push({ name, no })
    });

    await this.pokemonModel.insertMany(pokemonToInsert)

    console.log(`Seeded ${data.results.length} pokemons successfully!`);

    return `Cleared, and seeded ${data.results.length} pokemons successfully!`;
  }
}
