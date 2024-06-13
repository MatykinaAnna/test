import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { goodItem, delGoodFromBasket } from '../../../../reducer';

export const UserBasket = () => {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [renderCardGood, addRenderCardGood] = useState<JSX.Element[]>([]);

  const basket = useAppSelector((state) => state.mainReducer.data.basket);
  const goods = useAppSelector((state) => state.mainReducer.data.goods);

  const [goodsOfUsers, setGoodsOfUsers] = useState<goodItem[]>([]);

  // useEffect(() => {
  //   //защита страницы
  //   if (activeUser.id !== Number(id) || Number(id) === -1) {
  //     navigate(`/login`)
  //   }
  // }, [])

  useEffect(() => {
    let arrayGood: goodItem[] = [];
    basket.forEach((item) => {
      if (item.user_id === Number(id)) {
        let goodItem = goods.find((item1) => {
          return item1.id === item.goods_id;
        });
        if (goodItem !== undefined) {
          arrayGood.push(goodItem);
        }
      }
    });
    setGoodsOfUsers(arrayGood);
  }, [basket]);

  useEffect(() => {
    let renderArray = goodsOfUsers.map((item) => {
      return (
        <div>
          <div>
            <div>
              {item.name} {item.price}
              {' руб'}
            </div>
            <div>
              <button
                onClick={() => {
                  delGood(item);
                }}>
                удалить
              </button>
            </div>
          </div>
          <div></div>
        </div>
      );
    });
    addRenderCardGood(renderArray);
  }, [goodsOfUsers]);

  function delGood(item: goodItem) {
    dispatch(delGoodFromBasket(item.id));
  }

  return (
    <>
      <div>{renderCardGood}</div>
      <div>
        <button onClick={() => navigate(`/user/${id}/catalog`)}>назад</button>
      </div>
    </>
  );
};
