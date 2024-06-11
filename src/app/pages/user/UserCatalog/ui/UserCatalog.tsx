import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { useSearchParams, useParams } from 'react-router-dom'
import { clearUser, getActiveUser } from '../../../../reducer'

export const UserCatalog = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let { id } = useParams()

  const [searchParams, setSearchParams] = useSearchParams()

  //авторизованный пользователь
  const activeUser = useAppSelector((state) => state.mainReducer.activeUser)

  useEffect(() => {
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
      <div>Авторизованный пользователь: {id}</div>
      <div>
        <button onClick={logout}>выйти</button>
      </div>
    </>
  )
}
