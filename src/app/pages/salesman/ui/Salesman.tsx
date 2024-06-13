import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useSearchParams, useParams } from 'react-router-dom';
import { clearUser, getActiveUser } from '../../../reducer';
import { AddProducts } from './addProducts';
import { CardGood } from '../../../widgets/cardGood/cardGood';
import { goodItem } from '../../../reducer';
import styles from './Salesman.module.scss';

export const Salesman = () => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const navigate = useNavigate();

  //авторизованный пользователь
  const activeUser = useAppSelector((state) => state.mainReducer.activeUser);

  const goods = useAppSelector((state) => state.mainReducer.data.goods);

  // тип выбранного товара или услуги
  const [typyOf, setTypeOf] = useState<number>(0);
  const [isAddProducts, setIsAddProducts] = useState<number>(0);
  const [goodsOfSalesman, setGoodsOfSalesman] = useState<goodItem[]>([]);

  const [renderCardGood, addRenderCardGood] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setGoodsOfSalesman([]);
  }, [goods, typyOf]);

  useEffect(() => {
    if (goodsOfSalesman.length === 0) {
      goods.forEach((item) => {
        if (item.owner_id === Number(id) && item.type_of_id === typyOf) {
          let array = goodsOfSalesman;
          array.push(item);
          setGoodsOfSalesman(array);
        }
      });
    }
    let array = goodsOfSalesman.map((item, index) => {
      return (
        <div key={index}>
          <CardGood
            name={item.name}
            num={Number(item.number)}
            price_num={Number(item.price)}
            typeOf={item.type_of_id}
          />
        </div>
      );
    });
    addRenderCardGood(array);
  }, [goodsOfSalesman]);

  function logout() {
    dispatch(clearUser());
    navigate(`/login`);
  }

  return (
    <>
      {isAddProducts === 0 ? (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.login}>{activeUser.login}</div>
            <div>
              <button className={styles.logOut} onClick={logout}></button>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.btn} onClick={() => setTypeOf(0)}>
              товар
            </button>
            <button className={styles.btn} onClick={() => setTypeOf(1)}>
              услуга
            </button>
          </div>
          <div className={styles.line}></div>
          {typyOf === 0 ? (
            <>
              <div>Мои товары</div>
              <div>{renderCardGood}</div>
            </>
          ) : (
            <>
              <div>Мои услуги</div>
              <div>{renderCardGood}</div>
            </>
          )}
          <div>
            <button
              onClick={() => {
                setIsAddProducts(1);
              }}>
              добавить
            </button>
          </div>
        </div>
      ) : (
        <>
          <AddProducts typeOf={typyOf} />
        </>
      )}
    </>
  );
};
