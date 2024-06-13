import { imgGood, imgGood2 } from '../../shared/index_';
import styles from './cardGood.module.scss';

export const CardGood = (props: {
  name: string;
  num: number;
  price_num: number;
  typeOf: number;
}) => {
  return (
    <div className={styles.wrapper}>
      <div>
        {props.typeOf === 0 ? (
          <img src={imgGood} alt="imgGood" />
        ) : (
          <img src={imgGood2} alt="imgGood" />
        )}
      </div>
      <div className={styles.price_row}>
        <div className={styles.name}>{props.name}</div>
        {props.typeOf === 0 && <div className={styles.num}>{props.num} шт</div>}
      </div>

      <div className={styles.price_row}>
        <div className={styles.price_num}>{props.price_num}</div>
        <div className={styles.price_rub}>₽</div>
      </div>
    </div>
  );
};
