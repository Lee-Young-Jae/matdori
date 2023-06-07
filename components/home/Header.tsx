import styles from '../../styles/header.module.scss';
import { AiOutlineShareAlt } from 'react-icons/ai';
import Link from 'next/link';
import { VscFeedback } from 'react-icons/vsc';
import Header from '../common/Header';
import useMap from '@/hooks/useMap';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import copy from 'copy-to-clipboard';

const HomeHeader = () => {
  const { resetMapOptions, getMapOptions } = useMap();

  const router = useRouter();

  const replaceAndCopyUrl = useCallback(() => {
    const mapOptions = getMapOptions();
    const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;

    router.replace(query);
    copy(location.origin + query);

    alert(`링크가 복사되었습니다.\n${location.origin + query}`);
  }, [getMapOptions, router]);

  return (
    <Header
      onClickLogo={resetMapOptions}
      rightElements={[
        <button
          key="button"
          onClick={replaceAndCopyUrl}
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
  );
};

export default HomeHeader;
