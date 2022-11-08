import { Injectable } from '@nestjs/common';

import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      `${process.env.POKEAPI_URL}?limit=10`,
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/')
      const no = Number(segments.at(-2))

      console.log(no, name);

    });

    return data.results;
  }
}
