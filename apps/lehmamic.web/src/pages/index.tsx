import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';

import { getSettings } from '@services/settings.service';
import { ensureSerializable } from '@root/utils/serialization';
import { Layout, LayoutProps } from '@components/Layout';

interface HomePageProps {
  layoutProps: LayoutProps;
}

const HomePage: NextPage<HomePageProps> = ({ layoutProps }) => {
  return (
    <Layout {...layoutProps}>
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<HomePageProps>> => {
  const settings = await getSettings();
  const layoutProps: LayoutProps = {
    ...settings,
    imageUrl: settings.coverImageUrl,
    path: '',
   };

  return {
    props: {
      layoutProps: ensureSerializable(layoutProps),
    }
  }
}
