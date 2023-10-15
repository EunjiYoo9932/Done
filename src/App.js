
import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/views/Header/Header';
import Nav from './components/views/Nav/Nav';
import Footer from './components/views/Footer/Footer';
import RecommendStartPage from './components/views/RecommendPage/RecommendStartPage';
import RecommendPage from './components/views/RecommendPage/RecommendPage';
import RecommendResultPage from './components/views/RecommendResultPage/RecommendResultPage';
import CrawlingPage from './components/views/Crawling/CrawlingPage';
import CrawlingResultPage from './components/views/CrawlingResult/CrawlingResultPage';
import IntroducePage from './components/views/Introduce/IntroducePage';
import MainPage from './components/views/Main/MainPage';
import LoginPage from './components/views/Login/LoginPage';
import SignInPage from './components/views/SignIn/SignInPage';
import { AuthProvider } from "./components/views/Header/AuthContext";
function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div className="App">
        <AuthProvider>{/* AuthProvider로 감싼 컴포넌트 계층을 생성 */}
        <BrowserRouter>
          <div id="wrapper" className="flex flex-col h-screen">
            <Header/>
            <Nav/>
            <div id="main-content" className="flex-1">
              <Routes>
                <Route path='/' element={<MainPage/>}></Route>
                <Route path='/RecommendStartPage' element={<RecommendStartPage/>}></Route>
                <Route path='/RecommendPage' element={<RecommendPage/>}></Route>
                <Route path='/RecommendResultPage' element={<RecommendResultPage/>}></Route>
                <Route path='/CrawlingPage' element={<CrawlingPage/>}></Route>
                <Route path='/CrawlingResultPage' element={<CrawlingResultPage/>}></Route>
                <Route path='/IntroducePage' element={<IntroducePage/>}></Route>
                <Route path='/MainPage' element={<MainPage/>}></Route>
                <Route path='/LoginPage' element={<LoginPage/>}></Route>
                <Route path='/SignInPage' element={<SignInPage/>}></Route>
              </Routes>
            </div>
            <Footer/>
          </div>
        </BrowserRouter>
        </AuthProvider>
      </div>
    </Suspense>
    
  );
}

export default App;
