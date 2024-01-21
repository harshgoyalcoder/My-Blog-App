"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { HeartOutline, HeartSharp } from "react-ionicons";
const Newstyles = {
  container: {
    display: "flex",
    margin: "25px 0",
    alignItems: "center",
  },
  input: {
    width: "15rem",
    padding: "15px",
    marginRight: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "8px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Blog = () => {
  const [data, setData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
        // Assuming the 'likes' property is present in the first item of the data array
        setLike(result.length > 0 ? result[0].likes : 0);
        setComments(result.length > 0 ? result[0].comments : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const { likes } = await response.json();
        setLike(likes);
        setIsLiked(!isLiked);
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (postId) => {
    try {
      console.log(JSON.stringify({ text: commentText }));
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text:commentText }), // Ensure that you are sending 'text' property
        }
      );
      if (response.ok) {
        const { comments } = await response.json();
        console.log("Response from server:", comments);
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  
  

  return (
    <div className={styles.mainContainer}>
      {data.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Link href={`/blog/${item._id}`} className={styles.container}>
              <div className={styles.imageContainer}>
                <img
                  src={item.img}
                  alt=""
                  width={"400px"}
                  height={250}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h1 className={styles.title}>{item.title}</h1>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            </Link>
            <div
              style={{
                marginTop: "-10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "5px",
              }}
            >
              {isLiked ? (
                <HeartSharp color="red" onClick={() => handleLike(item._id)} />
              ) : (
                <HeartOutline
                  color="red"
                  onClick={() => handleLike(item._id)}
                />
              )}
              {like} people liked this!
            </div>
            <br/>
          </div>
          <div>
            <div style={Newstyles.container}>

            <input
              style={Newstyles.input}
              type="text"
              placeholder="Add a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              />
            <button
              style={Newstyles.button}
              onClick={() => handleAddComment(item._id)}
              >
              Add Comment
            </button>
              </div>
            <div>
              <br/>
              <strong>Comments:</strong>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>{comment.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
