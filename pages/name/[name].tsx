import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { pokeApi } from '../../api';
import { MainLayout } from '../../components/layouts';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { getPokemoInfo, imageCreator, localFavorites } from '../../utils';

import confetti from 'canvas-confetti';

interface Props {
  pokemon: Pokemon;
}

const PokemonNamePage: FC<Props> = ({ pokemon }) => {

  const [isInFavorites, setisInFavorites] = useState(localFavorites.existPokemonInLocal(pokemon.id));

  const onToggleFavorite = () => {
    const poke = {
      name: pokemon.name,
      id: pokemon.id,
      img: imageCreator.dreamWorldImage(pokemon.id),
    };
    localFavorites.toggleFavorite(poke);
    setisInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
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
            <Card.Header css={{ display: 'flex', justifyContent: 'space-around' }} className='responsive'>
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
              <Text size={30}>Sprites:</Text>

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

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: string[] = data.results.map((poke) => poke.name);

  return {
    paths: pokemons.map(name => ({
      params: { name }
    })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { name } = params as { name: string };

  const pokemon = await getPokemoInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }

  return {
    props: {
      pokemon,
    },
    // Next.js hara una regeneracion de las paginas cada 24 horas
    revalidate: 8400,
  };
};

export default PokemonNamePage;