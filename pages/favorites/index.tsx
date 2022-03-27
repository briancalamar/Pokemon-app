import { useState } from 'react';
import { MainLayout } from '../../components/layouts';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';

const FavoritesPage = () => {
  const [existPokeFavorites, setexistPokeFavorites] = useState<number[]>(localFavorites.pokemons());

  return (
    <MainLayout title='Favoritos'>
      {
        !existPokeFavorites.length
          ? <NoFavorites />
          : 'hay pokes'
      }
    </MainLayout>
  );
};

export default FavoritesPage;