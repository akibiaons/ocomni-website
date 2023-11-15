import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:1337/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  return (
    <div>
      {post && (
        <>
          <h1>{post.title}</h1>
          {/* Add other post details you want to display */}
        </>
      )}
    </div>
  );
}

export default SinglePost;
