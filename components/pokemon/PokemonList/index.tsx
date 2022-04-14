import { Grid } from '@nextui-org/react';
import { FC } from 'react';
import { PokemonCard } from '..';
import { SmallPokemon } from '../../../interfaces';

interface Props {
  pokemons: SmallPokemon[];
}

export const PokemonList: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} justify="center">
      {
        pokemons.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))
      }
    </Grid.Container>
  );
};

