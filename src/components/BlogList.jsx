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

const PostExcerpt = styled.p`
  // Styling for the post excerpt
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px; // Optional: for rounded image corners
  margin-bottom: 15px; // Gives some space between image and text
`;

const ReadMoreLink = styled(Link)`
  color: blue; // Choose your color
  text-decoration: none;
  font-weight: bold;
  // Add more styling as needed

  &:hover {
    text-decoration: underline;
  }
`;

function BlogList() {
  return <div></div>;
}

export default BlogList;
