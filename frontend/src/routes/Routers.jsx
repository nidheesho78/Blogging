import React from 'react';
import {Routes,Route} from 'react-router-dom'
import ArticleDetailPage from '../pages/articleDetail/ArticleDetailPage.jsx';
import RegisterPage from '../pages/register/RegisterPage.jsx';
import LoginPage from '../pages/login/LoginPage';
import ProfilePage from '../pages/profile/ProfilePage';
import HomePage from '../pages/home/HomePage';

function Routers() {
  return (
    <div className="App font-opensans">
         <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default Routers

