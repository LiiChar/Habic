import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import {setUser} from './Store/Slices/setUserSlice'
import { ArticleEdit } from './Components/articles/ArticleEdit';
import { Profile } from './Pages/ProfilePage/Profile';

function App() {
  const dispatch = useDispatch();

  

  React.useEffect(() => {
    if (sessionStorage.getItem('user')) {
      const user = sessionStorage.getItem('user')
      if (user) {
        dispatch(setUser({name: JSON.parse(user)}))
      } else {
        dispatch(setUser({name: 'Bot'}))
      }
    }
  }, [])
  
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/artic/:id' element={<ArticlesPage />} />
        <Route path='/artic/:id/edit' element={<ArticleEdit />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>

      <Footer />
      {useSelector((state: RootState) => state.setUser.vision && <AddArticles />)}

    </>
  );
}

export default App;
