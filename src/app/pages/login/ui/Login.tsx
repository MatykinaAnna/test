import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { logIn } from '../../../reducer'

export const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  //авторизованный пользователь
  const activeUser = useAppSelector((state) => state.mainReducer.activeUser)

  function inputLogin(e: React.ChangeEvent<HTMLInputElement>) {
    setLogin(e.currentTarget.value)
  }
  function inputPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value)
  }
  function sendData() {
    console.log(login, password)
    dispatch(logIn({ login: login, password: password }))
  }

  //   useEffect(() => {
  //     setLogin('login1')
  //     setPassword('password1')
  //   }, [login, password])

  useEffect(() => {
    if (activeUser.id !== -1) {
      console.log('пользователь авторизован: ', activeUser)
      // пользователь является продавцом
      if (activeUser.type_user === 1) {
        navigate(`/salesman/${activeUser.id}`)
      }
      // пользователь является покупателем
      else if (activeUser.type_user === 0) {
        navigate(`/user/${activeUser.id}/catalog`)
      } else {
        console.error('неизвестный тип пользователя')
      }
    }
  }, [activeUser])

  return (
    <>
      <div className="form">
        <div>
          <input
            type="text"
            value={login}
            onChange={(e) => {
              inputLogin(e)
            }}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              inputPassword(e)
            }}
          />
        </div>
      </div>
      <button onClick={sendData}>войти</button>
    </>
  )
}
