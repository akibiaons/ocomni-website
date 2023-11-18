import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./globalStyles";
import BlogList from "./components/blog-components/BlogList";
import Post from "./components/blog-components/Post";
import SinglePost from "./components/blog-components/SinglePost";
import Article from "./Pages/Article";
import AllBlogsPage from "./Pages/Allblogs";

const Home = lazy(() => import("./Pages/Home"));
const Header = lazy(() => import("./components/Header/index"));
const Footer = lazy(() => import("./components/Footer/index"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop/index"));

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-blogs" element={<AllBlogsPage />} />
            <Route path="/posts/:id" element={<SinglePost />} />
            <Route path="/article/:slug" element={<Article />} />
            <Route path="/post/:slug" element={<Post />} />
          </Routes>
          <Footer />
          <ScrollToTop />
        </Suspense>
      </Router>
    </>
  );
}

export default App;
