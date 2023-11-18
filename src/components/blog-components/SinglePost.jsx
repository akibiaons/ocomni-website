import moment from "moment";
import React from "react";
import Comments from "./Comments";
import styled from "styled-components";

const StyledArticle = styled.article`
  margin: auto;
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
  max-width: 40rem; /* equivalent to max-w-2xl */
  padding-left: 2rem;
  padding-right: 2rem;
`;

const AuthorImage = styled.img`
  margin-right: 1rem;
  width: 4rem; /* equivalent to w-16 */
  height: 4rem; /* equivalent to h-16 */
  border-radius: 9999px; /* equivalent to rounded-full */
`;

const AuthorName = styled.a`
  font-size: 1.25rem; /* equivalent to text-xl */
  font-weight: 600; /* equivalent to font-semibold */
  color: #1f2937; /* equivalent to text-gray-900 */
  transition: color 100ms ease-in-out;
  &:hover {
    color: #6b7280; /* equivalent to hover:text-gray-500 */
  }
  cursor: pointer;
`;

const PostTitle = styled.h1`
  font-weight: bold;
  font-size: 2.25rem; /* equivalent to text-4xl */
  line-height: 1.25; /* equivalent to leading-snug */
  @media (min-width: 768px) {
    line-height: 1; /* equivalent to md:leading-none */
  }
`;

const Post = ({ post }) => {
  console.log(post);

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      case "list":
        return (
          <ul>
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>
                <li>{item}</li>
              </React.Fragment>
            ))}
          </ul>
        );
      default:
        return modifiedText;
    }
  };
  return (
    <StyledArticle>
      <article className="mx-auto my-14 max-w-2xl px-8">
        {/* File path Component */}

        {/* Author Component */}
        <div>
          <header>
            <address>
              <div>
                <AuthorImage
                  src={post.author.photo.url}
                  alt={`Photograph of author ${post.author.name}`}
                />
                <AuthorName href="#">{post.author.name}</AuthorName>

                <p>{moment(post.createdAt).format("MM/DD/YYYY")}</p>
              </div>
            </address>
          </header>
        </div>

        {/* post */}
        <PostTitle>{post.title}</PostTitle>
        <br />
        <p>{post.excerpt}</p>
        <img src={post.featuredImage.url} />

        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) =>
            getContentFragment(itemindex, item.text, item)
          );

          return (
            <p>{getContentFragment(index, children, typeObj, typeObj.type)}</p>
          );
        })}

        {/* will work on comments later */}
        <div>
          <Comments />
        </div>
      </article>
    </StyledArticle>
  );
};

export default Post;
