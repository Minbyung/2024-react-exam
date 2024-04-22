import React, { useRef, useState, useEffect, useMemo } from 'react';

import { Routes, Route, Navigate, useLocation, NavLink, useParams, useNavigate } from "react-router-dom"
import classNames from 'classnames';


function HomeMainPage() {
  return (
    <>
      <h1>HOME, MAIN</h1>
    </>
  )
}

function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <h1>ARTICLE, DETAIL</h1>
      <h1>{id}번 게시물 상세 페이지</h1>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </>
  );
}


function ArticleListPage() {
  const articles = [
    {
      id: 1
    },
    {
      id: 2
    }
  ];

  return (
    <>
      <h1>ARTICLE, LIST</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <NavLink to={`/article/detail/${article.id}`}>
              {article.id}번 게시물
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}

function UserLoginPage() {
  return (
    <>
      <h1>USER, LOGIN</h1>
    </>
  )
}

export default function App() {
  const location = useLocation();
  return (
    <>
    <header>
      <span>현재 주소 : {location.pathname}</span>
      <hr />
      <div>
        <NavLink 
        to="/home/main" 
        className={({ isActive }) => classNames(
          "btn",
          {"btn-line" : !isActive},
          {"btn-primary" : isActive}
        )}>
          HOME, MAIN 페이지로 이동
        </NavLink>

        <NavLink 
        to="/article/list" 
        className={({ isActive }) => classNames(
          "btn",
          {"btn-line" : !isActive},
          {"btn-primary" : isActive}
        )}>
          ARTICLE, LIST 페이지로 이동
        </NavLink>

        <NavLink 
        to="/user/login" 
        className={({ isActive }) => classNames(
          "btn",
          {"btn-line" : !isActive},
          {"btn-primary" : isActive}
        )}>
          USER, LOGIN 페이지로 이동
        </NavLink>
      </div>
    
    </header>

      <Routes>
        <Route path="/home/main" element={<HomeMainPage />}></Route>
        <Route path="/article/list" element={<ArticleListPage />}></Route>
        <Route path="/article/detail/:id" element={<ArticleDetailPage />}></Route>
        <Route path="/user/login" element={<UserLoginPage />}></Route>
        <Route path="*" element={<Navigate to="/home/main" />}></Route>
      </Routes>
    </>
  );
}
