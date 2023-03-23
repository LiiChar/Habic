import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import { AddArticles } from './Components/articles/AddArticles';
import { Footer } from './Components/location/Footer';
import { Header } from './Components/location/Header';
import { ArticlesPage } from './Pages/ArticlePage/ArticlesPage';
import { ErrorPage } from './Pages/ErrorPage/ErrorPage';
import { HomePage } from './Pages/HomePage/HomePage';
import { Login } from './Pages/LogInPages/Login';
import { Registration } from './Pages/LogInPages/Registration';
import { RootState } from './Store/store';

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/artic/:id' element={<ArticlesPage />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>

      <Footer />
      {useSelector((state: RootState) => state.setUser.vision && <AddArticles />)}

    </>
  );
}

export default App;
