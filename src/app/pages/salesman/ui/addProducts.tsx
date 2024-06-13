import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useSearchParams, useParams } from 'react-router-dom';
import { Salesman } from './Salesman';
import { goodItem, addGood } from '../../../reducer';

export const AddProducts = (props: { typeOf: number }) => {
  let { id } = useParams();
  const dispatch = useAppDispatch();

  const goods = useAppSelector((state) => state.mainReducer.data.goods);

  const [isAddProducts, setIsAddProducts] = useState<number>(1);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [number, setNumber] = useState<number | null>(null);

  const [addingGoods, addAddingsGoods] = useState<goodItem[]>([]);
  const [renderAddingGoods, addRenderAddingGoods] = useState<JSX.Element[]>([]);

  function addClick() {
    let goodItem: goodItem = {
      id: goods.length,
      owner_id: Number(id),
      type_of_id: props.typeOf,
      name: name,
      description: description,
      price: price,
      number: number,
    };
    dispatch(addGood(goodItem));
    let array = addingGoods;
    array.push(goodItem);
    addAddingsGoods(array);

    let renderAddingGoods1 = addingGoods.map((item, index) => {
      return (
        <div key={index}>
          {item.name} {item.price}
          {' руб'}{' '}
          {item.type_of_id === 0 && (
            <>
              {item.number}
              {' шт'}
            </>
          )}
        </div>
      );
    });

    addRenderAddingGoods(renderAddingGoods1);
    console.log(renderAddingGoods);
  }

  return (
    <>
      {isAddProducts === 1 ? (
        <>
          <div>Добавленные:</div>
          {renderAddingGoods}
          <div>
            <div>Добавить товар или услугу: {props.typeOf}</div>

            <div>
              <input
                type="text"
                placeholder="Наименование"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div>Описание:</div>
              <div>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}></textarea>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="цена"
                  value={Number(price)}
                  onChange={(e) => {
                    setPrice(Number(e.target.value));
                  }}></input>{' '}
                <span>руб</span>
              </div>
              {props.typeOf === 0 && (
                <div>
                  <input
                    type="number"
                    placeholder="колличество"
                    value={Number(number)}
                    onChange={(e) => {
                      setNumber(Number(e.target.value));
                    }}
                  />{' '}
                  <span>шт</span>
                </div>
              )}
            </div>

            <button onClick={addClick}>добавить</button>
            <button
              onClick={() => {
                setIsAddProducts(0);
              }}>
              назад
            </button>
          </div>
        </>
      ) : (
        <>
          <Salesman />
        </>
      )}
    </>
  );
};
