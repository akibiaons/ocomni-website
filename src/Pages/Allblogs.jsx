import React from "react";
import useQueryPosts from "../hooks/useQueryPosts";
import Pagination from "../components/blog-components/Pagination";
import { QUERY_ALL_POSTS } from "../components/blog-components/queries";
import {
  ContextProvider,
  useMyContext,
} from "../components/blog-components/store";
import Loading from "../components/blog-components/Loading";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-auto-rows: minmax(0, 1fr);
  grid-auto-flow: row;
  align-items: center;
  margin: auto;
  gap: 1.5rem;
  margin-top: 4rem;
  margin-bottom: 4rem;
  padding: 2rem;
  padding-left: 0;
  max-width: 48rem; /* sm:max-w-3xl */
  @media (min-width: 768px) {
    /* md */
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 0;
  }
  @media (min-width: 1024px) {
    /* lg */
    grid-template-columns: repeat(3, minmax(0, 1fr));
    max-width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const BlogCard = styled.div`
  background-color: #e5e7eb; /* bg-stone-200 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const BlogImage = styled.img`
  height: 300px;
  width: 100%;
  cursor: pointer;
  object-fit: cover;
  &:hover {
    transform: scale(1.05);
  }
  transition: transform 200ms ease-in;
`;

const BlogContent = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 2rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.25rem; /* text-xl */
  color: #1f2937; /* text-gray-900 */
  margin-bottom: 0.5rem;
  line-height: 1.375;
  // height: 4rem; /* md:h-16 */
  cursor: pointer;
  display: -webkit-box;
  // -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  &:hover {
    color: #7c3aed; /* hover:text-purple-600 */
    text-decoration: underline;
  }
  transition: color 200ms;
`;

const StyledIcon = styled.img`
  // or styled.i if using FontAwesome
  width: 20px; // Adjust the size accordingly
  height: 20px; // Adjust the size accordingly
`;

const AllBlogs = () => {
  const { posts, error } = useQueryPosts({ query: QUERY_ALL_POSTS, limit: 3 });
  const { loading, totalPage } = useMyContext();
  const navigate = useNavigate();

  return (
    <>
      {loading && <Loading />}
      <BlogGrid>
        {posts?.map((post) => (
          <BlogCard key={post.id}>
            <BlogImage
              onClick={() => navigate(`/article/${post.slug}`)}
              src={post.featuredImage.url}
              alt=""
              loading="lazy"
            />
            <BlogContent>
              <BlogTitle onClick={() => navigate(`/article/${post.slug}`)}>
                {post.title}
              </BlogTitle>
              <p>{post.excerpt}</p>
              <div>
                <p>{moment(post.createdAt).format("MM/DD/YYYY")}</p>
                <p>{post.author.name}</p>
              </div>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
      <Pagination totalPage={totalPage} />
    </>
  );
};

const AllBlogsPage = () => (
  <ContextProvider>
    <AllBlogs />
  </ContextProvider>
);

export default AllBlogsPage;
