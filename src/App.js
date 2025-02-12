import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./globalStyles";
import BlogList from "./components/blog-components/BlogList";
import Post from "./components/blog-components/Post";
import SinglePost from "./components/blog-components/SinglePost";
import Article from "./Pages/Article";
import AllBlogsPage from "./Pages/Allblogs";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";

const Home = lazy(() => import("./Pages/Home"));
const Header = lazy(() => import("./components/Header/index"));
const Footer = lazy(() => import("./components/Footer/index"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop/index"));

const httpLink = new HttpLink({
  uri: "https://api-us-west-2.hygraph.com/v2/cli4o05pf2gmi01t7g7uwg2nm/master",
  headers: {
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODUxNTg1MzQsImF1ZCI6WyJodHRwczovL2FwaS11cy13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2xpNG8wNXBmMmdtaTAxdDdnN3V3ZzJubS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYWM5YjQ3MjAtYmE2OC00MWJjLThjODItYzhmYjUwYmU1MTQ0IiwianRpIjoiY2xpNWZ2cW5zMnZ6djAxdDc2NXloZ3p5aSJ9.DbxoKHi8OTB2D_6enj7iK1RrlrBtf_WEcRZAF8IRRUYEk_0UOhyyz9KOAAj0JRc8AGdp0KybNXytb1LApZPaR9mlsatQD3vUOaSFx23GZmwD2xWpkLzo725KMR8xe77oDhXMWp4ymZ462ThRdabXWofbEI03L1BVYXYPgF4dlbdx8BhoRbMWAScPQyOYKfX4zAOgwo9TYhnP6elv4IT5ommoT_g41l4RblJXgz7jSMjXJvDcf3GYZsBcxc8z2YBx6toUhv06IlX4nLcQnRgpJ85o204Ck571Ij98IK4qYInf-t4xvdkHjj8SJky0PtYvno_m9BdE1Ja81Gfsyg6LXP5OvZ-lbby3x6bQiknwbCfX8VCoPabn7zgg-HsO5oJ1-nncHZCKkR-RY0doN7h_lc3ttU-zZS46-3pCzsrYeXD2Ehh3d-qIIp9pOoVBze55kmkpl9v4b3e59u_wssoo-XwKyWJc1nR-oR3RAhDuvanF4AW5Xo-HiExYNo1wh_sfjWxTXr4tdIOmN1IyiZMSYzkgsK_wa29cNUJTO-PwkAmMDlfWQfPVZ_6l5Q_-x1vbteI4BMuSuf8W4_Tuk-yGSryp2h5waCOjWwrPsMF4ekOAK327QLw_0r7wI6jchJf1H7Fm8ltfTCyl38jf13_BioJvFTMS7y-tifqCBDTULH0`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </>
  );
}

export default App;
