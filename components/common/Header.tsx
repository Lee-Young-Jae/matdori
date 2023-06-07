import React from 'react';
import Link from 'next/link';
import styles from '../../styles/header.module.scss';
import Image from 'next/image';
import MatDoRiLogo from '../../public/MatDoRiLogo.png';

interface Props {
  onClickLogo?: () => void;
  rightElements?: React.ReactElement[];
}

// next/image 의 장점
// 1. webp 지원한다. next/image 는 webp 지원한다.
// 2. quality 속성으로 이미지 품질을 조절할 수 있다. default 는 75 이다.
// 3. lazy loading 을 지원한다.
// 4. width와 height 속성을 통해 이미지의 크기를 지정할 수 있다.
// 5. placeholder 속성을 통해 로딩중에 보여줄 이미지를 설정할 수 있다.

// 외부 이미지 링크를 사용할경우?
// fill 이라는 속성을 next/Image에 추가하고
// 부모에 width와 height를 지정해주면 된다.
// 또한 본인에게 ObjectFit 속성으로 이미지가 어떻게 보여질지 지정할 수 있다.
const Header = ({ onClickLogo, rightElements }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link
          href="/"
          className={styles.box}
          onClick={onClickLogo}
          aria-label="홈으로 이동"
        >
          <Image
            src={MatDoRiLogo}
            alt="MatDoRi Logo"
            width={100}
            height={20}
            placeholder="blur"
            // style={{ objectFit: 'fill' }}
          />
        </Link>
      </div>
      {rightElements && <div className={styles.flexItem}>{rightElements}</div>}
    </header>
  );
};

export default Header;
