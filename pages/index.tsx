import { FC, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { pokeApi } from '../api';

import { Pagination } from '@nextui-org/react';

import { MainLayout } from '../components/layouts';
import { PokemonList } from '../components/pokemon/PokemonList';

import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: FC<Props> = ( { pokemons } ) => {

  const router = useRouter();
  const { query } = router;
  const { page } = query;

  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(Number(page || 0) * limit);


  const handlePagination = (pagination: number) => {
    setOffset((pagination - 1) * limit);
    router.push(`/?page=${pagination}`);
  };

  return (
    <>
      <MainLayout title='Listado de Pokemons'>

        <PokemonList pokemons={pokemons.slice(offset, offset + limit)} />
        <Pagination
          onChange={(page) => handlePagination(page)}
          total={Math.round(pokemons.length / limit)}
          page={page ? Number(page) : 1}
          color='gradient'
          noMargin
        />
        
      </MainLayout>
    </>
  );
};

// esto provee las props antes de que renderice, se ejecuta en el servidor
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=600');

  const pokemons: SmallPokemon[] = data.results.map((poke, index) => {
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${index + 1}.gif`;

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
