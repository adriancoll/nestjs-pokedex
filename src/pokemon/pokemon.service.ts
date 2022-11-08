import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private readonly defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleUncontrolledExceptions(error, 'update');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    const pokemons = await this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 'asc' })
      .select('-__v');

    const nextPage = `/pokemon?limit=${limit}?offset=${
      offset === 0 ? limit : offset + limit
    }`;

    return { results: pokemons.length, nextPage, pokemons };
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    // No
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // mongo id
    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // name
    if (!pokemon)
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name, or NO "${term}" not found.`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();

    try {
      await pokemon.updateOne(updatePokemonDto);
    } catch (error) {
      this.handleUncontrolledExceptions(error, 'update');
    }

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(id: string) {
    // const result = await this.pokemonModel.findByIdAndDelete(id)

    const { acknowledged, deletedCount } = await this.pokemonModel.deleteOne({
      _id: id,
    });

    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with "${id}" not found`);

    return;
  }

  private handleUncontrolledExceptions(error: any, action: string) {
    action = action.toLowerCase().trim();
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon ${action} failed: ${JSON.stringify(error.keyValue)}.`,
      );
    }

    throw new InternalServerErrorException(
      `Can't ${action} the Pokemon - Check server logs.`,
    );
  }
}
