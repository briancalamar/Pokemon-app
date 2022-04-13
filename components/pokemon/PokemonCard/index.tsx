import { Card, Grid, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { SmallPokemon } from '../../../interfaces';

import { CgPokemon } from 'react-icons/cg';
import { MdOutlineCatchingPokemon } from 'react-icons/md';

import { imageCreator, localFavorites } from '../../../utils';

interface Props {
  pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const { id, name, img } = pokemon;
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/name/${name}`);
  };

  const [isInFavorites, setisInFavorites] = useState(localFavorites.existPokemonInLocal(id));

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
    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
      <Card hoverable clickable className='pokemon-card'>
        <Card.Header>
          <Row justify='space-between'>
            <Text>#{id}</Text>
            {
              isInFavorites
                ? <MdOutlineCatchingPokemon size={26} onClick={onToggleFavorite} className="pokemon-card__icon--captured"/>
                : <CgPokemon size={26} onClick={onToggleFavorite} />
            }
          </Row>
        </Card.Header>
        <Card.Body onClick={handleRedirect}>
          <Card.Image src={img} />
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
