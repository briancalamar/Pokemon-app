import { SmallPokemon } from '../interfaces';

const toggleFavorite = ( poke: SmallPokemon) => {

  let favorites: SmallPokemon[] = JSON.parse( localStorage.getItem('favorites') || '[]');
  const includesInFavorites = favorites.find( (pokemon: SmallPokemon) => pokemon.id === poke.id);

  if(includesInFavorites){
    favorites = favorites.filter((favPoke) => favPoke.id !== poke.id);
  } else {
    favorites.push(poke);
  }

  localStorage.setItem('favorites', JSON.stringify( favorites ));
};

const existPokemonInLocal = ( id: number ): boolean => {

  if( typeof window === 'undefined') return false;

  const favorites: SmallPokemon[] = JSON.parse( localStorage.getItem('favorites') || '[]');
  const trueOrFalse = !!favorites.find( (pokemon: SmallPokemon) => pokemon.id === id);

  return trueOrFalse;
};

const pokemons = (): SmallPokemon[] => {
  if( typeof window === 'undefined') return [];

  return JSON.parse(localStorage.getItem('favorites') || '[]');
};

export default {
  existPokemonInLocal,
  toggleFavorite,
  pokemons,
};