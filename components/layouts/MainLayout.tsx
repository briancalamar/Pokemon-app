import React, { FC } from 'react';

import Head from 'next/head';
import { NavBar } from '../ui';

interface props {
  title?: string,
}

export const MainLayout: FC<props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="author" content="Brian Santaran"/>
        <meta name="description" content={`Informacion sobre el pokemon ${title}`}/>
        <meta name="keywords" content={`${title}, pokemon, pokedex`}/>
      </Head>

      <NavBar/>

      <main style={{
        padding: '0px 20px',
      }}>
        { children }
      </main>
    </>
  );
};
