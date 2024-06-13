import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface userItem {
  id: number;
  login: string;
  password: string;
  type_user: number;
}

export interface typeUserItem {
  id: number;
  name: string;
}

export interface goodItem {
  id: number;
  owner_id: number; //id владельца
  type_of_id: number;
  name: string;
  description: string;
  price: number | null;
  number: number | null; //колличество товаров (если type_of_id==0)
}

// тип: товар или услуга
export interface type_ofItem {
  id: number;
  name: string;
}

export interface basketItem {
  id: number;
  user_id: number; //id владельца корзины
  goods_id: number;
}

const reducer = createSlice({
  name: 'reducer',
  initialState: {
    data: {
      type_of: [
        { id: 0, name: 'товар' },
        {
          id: 1,
          name: 'услуга',
        },
      ],
      type_of_users: [
        {
          id: 0,
          name: 'пользователь',
        },
        {
          id: 1,
          name: 'продавец',
        },
      ],
      user: [
        // пользователь услуг
        {
          id: 0,
          login: 'login1',
          password: 'password1',
          type_user: 0,
        },
        // предоставляющий услуги
        {
          id: 1,
          login: 'login2',
          password: 'password2',
          type_user: 1,
        },
      ],
      goods: [
        {
          id: 0,
          owner_id: 1,
          type_of_id: 0,
          name: 'Товар 1',
          description: 'Описание товара 1',
          price: 100,
          number: 10,
        },
        {
          id: 1,
          owner_id: 1,
          type_of_id: 0,
          name: 'Товар 2',
          description: 'Описание товара 2',
          price: 1000,
          number: 5,
        },
        {
          id: 2,
          owner_id: 1,
          type_of_id: 1,
          name: 'Услуга 1',
          description: 'Описание услуги 1',
          price: 5000,
          number: null,
        },
        {
          id: 3,
          owner_id: 1,
          type_of_id: 1,
          name: 'Услуга 2',
          description: 'Описание услуги 2',
          price: 700,
          number: null,
        },
      ],
      basket: [{ id: -1 }],
    },
    activeUser: {
      id: -1,
      login: '',
      type_user: -1,
    },
  } as {
    data: {
      user: userItem[];
      goods: goodItem[];
      type_of: type_ofItem[];
      basket: basketItem[];
      type_of_users: typeUserItem[];
    };
    activeUser: userItem;
  },
  reducers: {
    logIn(state, action: { payload: { login: string; password: string } }) {
      let user = state.data.user.find((item) => {
        return (
          item.login === action.payload.login &&
          item.password === action.payload.password
        );
      });
      if (user !== undefined) {
        state.activeUser.id = user.id;
        state.activeUser.login = user.login;
        state.activeUser.type_user = user.type_user;
      }
    },
    clearUser(state) {
      state.activeUser.id = -1;
      state.activeUser.login = '';
      state.activeUser.type_user = -1;
    },
    getActiveUser(state, action: { payload: { id: number } }) {
      let user = state.data.user.find((item) => {
        return item.id === action.payload.id;
      });
      if (user !== undefined) {
        state.activeUser.id = user.id;
        state.activeUser.login = user.login;
        state.activeUser.type_user = user.type_user;
      }
    },

    addGood(state, action: { payload: goodItem }) {
      let item = action.payload;
      item.id = state.data.goods[state.data.goods.length - 1].id + 1;
      state.data.goods.push(item);
    },

    addBasket(state, action: { payload: basketItem }) {
      let item = action.payload;
      item.id = state.data.basket[state.data.basket.length - 1].id + 1;
      state.data.basket.push(action.payload);
    },

    delGoodFromBasket(state, action: { payload: number }) {
      let index = state.data.basket.findIndex((item) => {
        return item.id === action.payload;
      });
      if (index !== -1) {
        state.data.basket.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {},
});

export default reducer.reducer;
export const {
  logIn,
  clearUser,
  getActiveUser,
  addGood,
  addBasket,
  delGoodFromBasket,
} = reducer.actions;
