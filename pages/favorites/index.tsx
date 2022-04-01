import { useState } from 'react';
import { MainLayout } from '../../components/layouts';
import { PokemonList } from '../../components/pokemon/PokemonList';
import { NoFavorites } from '../../components/ui';
import { SmallPokemon } from '../../interfaces';
import { localFavorites } from '../../utils';

const FavoritesPage = () => {
  const [existPokeFavorites, setexistPokeFavorites] = useState<SmallPokemon[]>(localFavorites.pokemons());

  return (
    <MainLayout title='Favoritos'>
      {
        !existPokeFavorites.length
          ? <NoFavorites />
          : <PokemonList pokemons={existPokeFavorites}/>
      }
    </MainLayout>
  );
};

export default FavoritesPage;