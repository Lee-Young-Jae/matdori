import { Store } from '@/types/store';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

interface Props {
  store: Store;
}

const storeDetail: NextPage<Props> = ({ store: Store }) => {
  return <div>{Store.name}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import('../public/stores.json')).default;
  const paths = stores.map((store) => ({
    params: { name: store.name },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import('../public/stores.json')).default;
  const store = stores.find((store) => store.name === params?.name);

  return { props: { store } };
};

export default storeDetail;
