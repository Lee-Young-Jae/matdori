import DetailContent from '@/components/home/DetailContent';
import DetailHeader from '@/components/home/DetailHeader';
import { Store } from '@/types/store';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import styles from '../styles/detail.module.scss';
import { useRouter } from 'next/router';
import useCurrentStore from '@/hooks/useCurrentStore';

interface Props {
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
  const expanded = true;

  const router = useRouter();
  const { setCurrentStore } = useCurrentStore();

  const goToMap = () => {
    setCurrentStore(store);
    router.push(
      `/?zoom=15&lat=${store.coordinates[0]}&lng=${store.coordinates[1]}`
    );
  };

  return (
    <div
      className={`${styles.detailSection} ${styles.selected} ${styles.expanded}`}
    >
      <DetailHeader
        currentStore={store}
        expanded={expanded}
        onClickArrow={goToMap}
      ></DetailHeader>
      <DetailContent currentStore={store} expanded={expanded}></DetailContent>
    </div>
  );
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

export default StoreDetail;
