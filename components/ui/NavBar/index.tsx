import { Link, Text, useTheme } from '@nextui-org/react';
import Image from 'next/image';
import NextLink from 'next/link';

export const NavBar = () => {
  const { theme } = useTheme();

  return (
    <div
      className='navBar--main'
      style={{ backgroundColor: theme?.colors.gray900.value }}
    >
      <section className='nav-bar--logo'>
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          alt="icono de la app"
          width={80}
          height={80}
        />
        <NextLink href='/' passHref>
          <Link>
            <Text color="white" h2>P</Text>
            <Text color="white" h3>okemon</Text>
          </Link>
        </NextLink>
      </section>

      <NextLink href='/favorites' passHref>
        <Link>
          <Text color="white">Favoritos</Text>
        </Link>
      </NextLink>
    </div>
  );
};
