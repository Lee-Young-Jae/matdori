import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

const Links = () => {
  const router = useRouter();

  // 라우트 방식의 경우 prefetch를 하고 싶을 경우
  // useEffect를 통해 개발자가 직접 prefetch를 해줘야 한다.

  // prefetch를 해주지 않기때문에
  // 특별한 경우가 아니라면 Link 사용을 권장한다

  useEffect(() => {
    router.prefetch('/section1/getStaticProps'); // 이동하고자 하는 url을 파라미터로 넘기기
  }, [router]);

  const onClickRouteBtn = useCallback(() => {
    router.push('/section1/getStaticProps');
  }, [router]);

  return (
    <main>
      <h1>Links</h1>
      <Link
        // legacyBehavior // legacyBehavior 속성을 추가하면 이전 버전의 동작을 유지할 수 있다. v12
        // // 12 버전 이전에는 link가 a태그로 완전히 대체되지 않았기 때문에 a태그를 Link 아래 넣어도 오류가 없었다. (오히려 장려)
        href="/section1/getStaticProps"
      >
        /getStaticProps
      </Link>
      <button onClick={onClickRouteBtn}>/getStaticProps</button>
    </main>
  );
};

export default Links;
