import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useSearchParams, useParams } from 'react-router-dom';
import { clearUser, getActiveUser, goodItem } from '../../../../reducer';
import { CardGood } from '../../../../widgets/cardGood/cardGood';
import { basketItem, addBasket } from '../../../../reducer';

export const UserCatalog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  // тип выбранного товара или услуги
  const [typyOf, setTypeOf] = useState<number>(0);

  const [renderCardGood, addRenderCardGood] = useState<JSX.Element[]>([]);

  const goods = useAppSelector((state) => state.mainReducer.data.goods);
  const basket = useAppSelector((state) => state.mainReducer.data.basket);

  //авторизованный пользователь
  const activeUser = useAppSelector((state) => state.mainReducer.activeUser);

  // useEffect(() => {
  //   //защита страницы
  //   if (activeUser.id !== Number(id) || Number(id) === -1) {
  //     navigate(`/login`)
  //   }
  // }, [])

  function logout() {
    dispatch(clearUser());
    navigate(`/login`);
  }

  function addBasketFunc(item: goodItem) {
    let basketItem: basketItem = {
      id: basket.length,
      user_id: Number(id),
      goods_id: item.id,
    };
    dispatch(addBasket(basketItem));
  }

  useEffect(() => {
    let array = goods.map((item, index) => {
      if (item.type_of_id === typyOf) {
        return (
          <div key={index}>
            <CardGood
              name={item.name}
              num={Number(item.number)}
              price_num={Number(item.price)}
              typeOf={item.type_of_id}
            />
            <button onClick={() => addBasketFunc(item)}>в корзину</button>
          </div>
        );
      } else {
        return <></>;
      }
    });
    addRenderCardGood(array);
  }, [goods, typyOf]);

  return (
    <>
      <div>Авторизованный пользователь: {id}</div>
      <div>
        <button onClick={logout}>выйти</button>
      </div>
      <div>
        <button onClick={() => setTypeOf(0)}>товар</button>
        <button onClick={() => setTypeOf(1)}>услуга</button>
        <button
          onClick={() => {
            navigate(`/user/${id}/basket`);
          }}>
          корзина
        </button>
      </div>{' '}
      {typyOf === 0 ? (
        <>
          <div>Товары</div>
          <div>{renderCardGood}</div>
        </>
      ) : (
        <>
          <div>Услуги</div>
          <div>{renderCardGood}</div>
        </>
      )}
    </>
  );
};
