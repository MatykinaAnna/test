import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import './App.scss';
import { Login } from './app/pages/login/ui/Login';
import { UserCatalog } from './app/pages/user/UserCatalog/ui/UserCatalog';
import { Salesman } from './app/pages/salesman/ui/Salesman';
import { UserBasket } from './app/pages/user/UserBasket/ui/UserBasket';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user/:id?/catalog" element={<UserCatalog />} />
        <Route path="/user/:id?/basket" element={<UserBasket />} />
        <Route path="/salesman/:id?" element={<Salesman />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
