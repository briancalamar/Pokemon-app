import { FC, useEffect, useState } from 'react';

import { imageCreator, localFavorites } from '../../../utils';
import { SmallPokemon } from '../../../interfaces';

import { MdOutlineCatchingPokemon } from 'react-icons/md';
import { CgPokemon } from 'react-icons/cg';

interface Props {
  pokemon: SmallPokemon
}


export const BallFavorite: FC<Props> = ({ pokemon }) => {

  const { id, name } = pokemon;
  const [isInFavorites, setisInFavorites] = useState(localFavorites.existPokemonInLocal(id));

  useEffect(() => {
    setisInFavorites(localFavorites.existPokemonInLocal(id));
  }, []);


  const onToggleFavorite = () => {
    const poke = {
      name,
      id,
      img: imageCreator.dreamWorldImage(id),
    };
    localFavorites.toggleFavorite(poke);
    setisInFavorites(!isInFavorites);
  };

  return (
    <>
      {
        isInFavorites
          ? <MdOutlineCatchingPokemon size={26} onClick={onToggleFavorite} className="ball-favorite__icon--captured" />
          : isInFavorites === null && <CgPokemon size={26} onClick={onToggleFavorite} />
      }
    </>
  );
};
