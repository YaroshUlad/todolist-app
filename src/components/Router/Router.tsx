import React, { ReactElement } from 'react';

import Container from '@mui/material/Container';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from 'features/Login/Login';
import { TodolistsList } from 'features/TodolistsList/TodolistsList';

export const Router = (): ReactElement => {
  return (
    <Container fixed>
      <Routes>
        <Route path={'/'} element={<TodolistsList />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/404'} element={<h1>error 404: PAGE NOT FOUND</h1>} />
        <Route path={'*'} element={<Navigate to={'/404'} />} />
      </Routes>
    </Container>
  );
};
