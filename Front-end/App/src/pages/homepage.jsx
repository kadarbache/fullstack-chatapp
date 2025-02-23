import React from 'react'
import {useEffect} from 'react'
import userAuthStore from '../store/userAuthStore'

export default function HomePage() {
  const {checkAuth,authUser}=userAuthStore();
  console.log(authUser)
  useEffect(() => {
   checkAuth()
  }, [checkAuth])
  
  return (
    <div>HomePage</div>
  )
}
