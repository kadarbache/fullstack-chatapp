import React from 'react'
import {useEffect} from 'react'
import userAuthStore from '../store/userAuthStore'

export default function HomePage() {
  const { checkAuth, authUser } = userAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(authUser, checkAuth);

  return <div>HomePage</div>;
}
