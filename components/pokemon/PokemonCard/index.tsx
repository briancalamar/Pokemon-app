import { Card, Grid, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { SmallPokemon } from '../../../interfaces';
import { BallFavorite } from '../../ui/BallFavorite';
interface Props {
  pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const { id, name, img, gif } = pokemon;
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/name/${name}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
      <Card hoverable clickable className='pokemon-card'>
        <Card.Header>
          <Row justify='space-between'>
            <Text>#{id}</Text>
            <BallFavorite pokemon={pokemon}/>
          </Row>
        </Card.Header>
        <Card.Body onClick={handleRedirect}>
          <Card.Image src={img} height={140} width="100%"/>
        </Card.Body>
        <Card.Footer onClick={handleRedirect}>
          <Row justify='center'>
            <Text transform='capitalize'>{name}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
