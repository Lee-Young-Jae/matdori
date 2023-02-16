import Header from '@/components/section1/Header';
import Link from 'next/link';
import styles from '../styles/header.module.scss';

export default function Home() {
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
            복사
          </button>,
          <Link href="/feedback" key="link" className={styles.box}></Link>,
        ]}
      ></Header>
      <main></main>
    </>
  );
}
