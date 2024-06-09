'use client';
import React, { useState, useEffect } from 'react';
import { getUser } from './actions';
import AddEmpresa from './addEmpresa/AddEmpresa';

export default function UserContent() {
  const [userFullName, setUserFullName] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getUser();
        console.log(user)
        setUserFullName(user.data?.user?.user_metadata.fullName);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <AddEmpresa/>
  );
}
