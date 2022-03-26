import { Link, Spacer, Text, useTheme } from '@nextui-org/react';
import Image from 'next/image';
import NextLink from 'next/link';
import styles from './NavBar.module.css';

export const NavBar = () => {
  const { theme } = useTheme();

  return (
    <div
      className={styles['navBar--main']}
      style={{ backgroundColor: theme?.colors.gray900.value }}
    >
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

      <Spacer css={{ flex: 1 }} />

      <NextLink href='/favorites' passHref>
        <Link>
          <Text color="white">Favoritos</Text>
        </Link>
      </NextLink>
    </div>
  );
};
