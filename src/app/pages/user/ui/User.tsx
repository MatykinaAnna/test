import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { useSearchParams, useParams } from 'react-router-dom'
import { clearUser, getActiveUser } from '../../../reducer'

export const User = () => {
  const dispatch = useAppDispatch()
  let { id } = useParams()

  //авторизованный пользователь
  const activeUser = useAppSelector((state) => state.mainReducer.activeUser)

  useEffect(() => {}, [])

  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <>
      <div>Авторизованный пользователь: {id}</div>
    </>
  )
}
