import { Container, Image, Text } from '@nextui-org/react';


export const NoFavorites = () => {
  return (
    <Container css={{
      width: '100%',
      height: 'calc(100vh - 100px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text h1>Sin Pokemons guardados</Text>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
        width={250}
        height={250}
        css={{ opacity: 0.2 }}
      />
    </Container>
  );
};
