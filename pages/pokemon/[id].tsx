import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { pokeApi } from '../../api';
import { MainLayout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';
import { localFavorites } from '../../utils';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: FC<Props> = ({ pokemon }) => {

  const [isInFavorites, setisInFavorites] = useState(localFavorites.existPokemonInLocal(pokemon.id));

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setisInFavorites(!isInFavorites);
  };

  return (
    <MainLayout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>

              <Button
                color='gradient'
                ghost
                onClick={onToggleFavorite}
              >
                {
                  isInFavorites ? 'Quitar de favoritos' : 'Guardar en favoritos'
                }
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprtes:</Text>

              <Container display='flex' justify='space-around'>
                <Image
                  src={pokemon.sprites.back_default}
                  width={100}
                  height={100}
                  alt={`${pokemon.name} ${pokemon.sprites.back_default}`}
                />
                <Image
                  src={pokemon.sprites.front_default}
                  width={100}
                  height={100}
                  alt={`${pokemon.name} ${pokemon.sprites.back_default}`}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  width={100}
                  height={100}
                  alt={`${pokemon.name} ${pokemon.sprites.back_default}`}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  width={100}
                  height={100}
                  alt={`${pokemon.name} ${pokemon.sprites.back_default}`}
                />

              </Container>
            </Card.Body>
          </Card>
        </Grid>

      </Grid.Container>
    </MainLayout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async () => {

  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map(id => ({
      params: { id }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    }
  };
};

export default PokemonPage;