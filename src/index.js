import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Blog from './Pages/Blog';
import BlogPost from './Pages/BlogPost';
import BlogEditor from './Componenets/BlogEditor';
import Banner from './Componenets/Banner';
// import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Banner />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="blog" element={<Blog/>}>
          <Route path="editor" element={<BlogEditor />} />
        </Route>
        <Route path="blog/:id" element ={<BlogPost />} />
      </Routes>
    </Router>
    {/*<Home />*/}
    {/*<App />*/}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
