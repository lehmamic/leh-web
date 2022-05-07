import { Settings } from '@models/settings';
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';

import { Header } from '@components/Header';
import { MaterialCover } from '@components/MaterialCover';
import { getSettings } from '@services/settings.service';

interface HomePageProps {
  settings: Settings;
}

const HomePage: NextPage<HomePageProps> = ({ settings }) => {
  return (
    <main>
      <Header title={settings.title} />
      <MaterialCover coverImage="images/cover.jpeg" />
    </main>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<HomePageProps>> => {
  const settings = await getSettings();

  return {
    props: {
      settings: JSON.parse(JSON.stringify(settings)),
    }
  }
}
