import MapSection from '@/components/home/MapSection';
import { Store } from '@/types/store';
import { NextPage } from 'next';
import useStores from '@/hooks/useStores';
import { useEffect } from 'react';
import Header from '@/components/home/Header';
import DetailSection from '@/components/home/DetailSection';
import { NextSeo } from 'next-seo';

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
      <NextSeo
        title="매장 지도"
        description="맛과 분위기, 인스타 감성을 포함한 나만의 맛집을 소개합니다."
        canonical="https://matdori.vercel.app/"
      />

      <Header />
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <MapSection />
        <DetailSection />
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

  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((res) => res.json());

  // json 파일을 불러올때는 import를 사용한다.
  // default를 사용하는 이유는 json 파일을 불러올때는 default로 불러와야한다.
  return {
    props: {
      stores,
    },
    revalidate: 60 * 60, // 1시간
  };
};
