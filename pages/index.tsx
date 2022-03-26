import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { FC } from 'react';
import { pokeApi } from '../api';
import { MainLayout } from '../components/layouts';
import { PokemonList } from '../components/pokemon/PokemonList';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: FC<Props> = ( { pokemons } ) => {

  return (
    <>
      <MainLayout title='Listado de Pokemons'>

        <PokemonList pokemons={pokemons} />
        
      </MainLayout>
    </>
  );
};

// esto provee las props antes de que renderice, se ejecuta en el servidor
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((poke, index) => {
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`;

    return {
      ...poke,
      id: index + 1,
      img,
    };
  });

  return {
    props: {
      pokemons,
    }
  };
};

export default HomePage;
