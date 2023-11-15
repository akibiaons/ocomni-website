import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  // Add more styling as needed
`;

const PostTitle = styled.h2`
  // Styling for the post title
`;

const PostContent = styled.p`
  // Styling for the post excerpt
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  // Add more styling as needed
`;

function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/posts?populate=*")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data to see its structure
        setPosts(data.data); // Assuming the data is in { data: [...posts] } format
      });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id}>
          {post.attributes.image && (
            <PostImage
              src={`http://localhost:1337${post.attributes.image.data.attributes.url}`}
              alt={post.attributes.title}
            />
          )}
          <PostTitle>{post.attributes.title}</PostTitle>
          <PostContent>
            {post.attributes.content.substring(0, 200)}...
          </PostContent>
          {/* ... other details ... */}
        </PostCard>
      ))}
    </div>
  );
}

export default BlogList;
