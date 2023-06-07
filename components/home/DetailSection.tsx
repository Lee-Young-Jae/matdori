import { CURRENT_STORE_KEY } from '@/hooks/useCurrentStore';
import styles from '../../styles/detail.module.scss';
import { IoIosArrowUp } from 'react-icons/io';
import useSWR from 'swr';
import { Store } from '@/types/store';
import { useState } from 'react';
import exp from 'constants';
import DetailContent from './DetailContent';
import DetailHeader from './DetailHeader';

const DetailSection = () => {
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`${styles.detailSection} ${
        currentStore ? styles.selected : ''
      } ${expanded ? styles.expanded : ''}`}
    >
      <DetailHeader
        currentStore={currentStore}
        expanded={expanded}
        onClickArrow={() => setExpanded(!expanded)}
      ></DetailHeader>
      <DetailContent
        currentStore={currentStore}
        expanded={expanded}
      ></DetailContent>
    </div>
  );
};

export default DetailSection;
