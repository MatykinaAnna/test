import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { useSearchParams, useParams } from 'react-router-dom'
import { clearUser, getActiveUser } from '../../../reducer'

export const Salesman = () => {
  const dispatch = useAppDispatch()
  let { id } = useParams()
  const navigate = useNavigate()

  //авторизованный пользователь
  const activeUser = useAppSelector((state) => state.mainReducer.activeUser)

  useEffect(() => {
    console.log('защита страницы')
    //защита страницы
    if (activeUser.id !== Number(id) || Number(id) === -1) {
      navigate(`/login`)
    }
  }, [])

  function logout() {
    dispatch(clearUser())
    navigate(`/login`)
  }

  return (
    <>
      Salesman
      <div>
        <button onClick={logout}>выйти</button>
      </div>
    </>
  )
}
