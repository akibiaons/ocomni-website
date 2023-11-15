import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./globalStyles";
import BlogList from "./components/BlogList";
import SinglePost from "./components/SinglePost";

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
            <Route path="/posts" element={<BlogList />} />
            <Route path="/posts/:id" element={<SinglePost />} />
          </Routes>
          <Footer />
          <ScrollToTop />
        </Suspense>
      </Router>
    </>
  );
}

export default App;
