import Header from '@/components/common/Header';
import Link from 'next/link';
import styles from '../styles/header.module.scss';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import MapSection from '@/components/home/MapSection';
import { Store } from '@/types/store';
import { NextPage } from 'next';
import useStores from '@/hooks/useStores';
import { useEffect } from 'react';

interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [stores, initializeStores]);

  return (
    <>
      <Header
        rightElements={[
          <button
            key="button"
            onClick={() => {
              alert('복사되었습니다.');
            }}
            className={styles.box}
            style={{ marginRight: '8px' }}
          >
            <AiOutlineShareAlt />
          </button>,
          <Link href="/feedback" key="link" className={styles.box}>
            <VscFeedback />
          </Link>,
        ]}
      ></Header>
      <main style={{ width: '100%', height: '100%' }}>
        <MapSection />
      </main>
    </>
  );
};

export default Home;

// getStaticProps
export const getStaticProps = async () => {
  /**
   * TODO: Next API Routes로 불러오기
   */
  const stores = (await import('../public/stores.json')).default;

  // json 파일을 불러올때는 import를 사용한다.
  // default를 사용하는 이유는 json 파일을 불러올때는 default로 불러와야한다.
  return {
    props: {
      stores,
    },
    revalidate: 60 * 60, // 1시간
  };
};
