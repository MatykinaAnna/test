import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface userItem {
  id: number
  login: string
  password: string
  type_user: number
}

interface typeUserItem {
  id: number
  name: string
}

interface goodItem {
  id: number
  owner_id: number //id владельца
  type_of_id: number
  name: string
  description: string
  price: number
  number: number //колличество товаров (если type_of_id==0)
}

// тип: товар или услуга
interface type_ofItem {
  id: number
  name: string
}

interface basketItem {
  id: number
  user_id: number //id владельца корзины
  filling: {
    id: number
    goods_id: number
    number: number
  }[]
}

const reducer = createSlice({
  name: 'reducer',
  initialState: {
    data: {
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
    },
    activeUser: {
      id: -1,
      login: '',
      type_user: -1,
    },
  } as {
    data: {
      user: userItem[]
      goods: goodItem[]
      type_of: type_ofItem[]
      basket: basketItem
      type_of_users: typeUserItem[]
    }
    activeUser: userItem
  },
  reducers: {
    logIn(state, action: { payload: { login: string; password: string } }) {
      let user = state.data.user.find((item) => {
        return (
          item.login === action.payload.login &&
          item.password === action.payload.password
        )
      })
      if (user !== undefined) {
        state.activeUser.id = user.id
        state.activeUser.login = user.login
        state.activeUser.type_user = user.type_user
      }
    },
    clearUser(state) {
      state.activeUser.id = -1
      state.activeUser.login = ''
      state.activeUser.type_user = -1
    },
    getActiveUser(state, action: { payload: { id: number } }) {
      let user = state.data.user.find((item) => {
        return item.id === action.payload.id
      })
      if (user !== undefined) {
        state.activeUser.id = user.id
        state.activeUser.login = user.login
        state.activeUser.type_user = user.type_user
      }
    },
  },
  extraReducers: (builder) => {},
})

export default reducer.reducer
export const { logIn, clearUser, getActiveUser } = reducer.actions
