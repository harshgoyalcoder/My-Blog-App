import React from "react";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound()
  }
  return res.json();
}


export async function generateMetadata({ params }) {


  


  const post = await getData(params.id)

  return {
    title: post.title,
    description: post.desc,
  };
}

const BlogPost = async ({ params }) => {

  function formatDateTime(dateTimeString) {
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = new Date(dateTimeString).toLocaleDateString('en-US', options);
    return formattedDate.replace(',', '');
  }
  const data = await getData(params.id);
  console.log("dataaa",data);

  const originalDateTimeString = data.createdAt;
  const formattedDateTime = formatDateTime(originalDateTimeString);
  // console.log(formattedDateTime);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
            {data.desc}
          </p>
          <div className={styles.author}>
            <img
              src={data.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
        <img
              src={data.img}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
         {data.content}
        </p>
      </div>
      <br/>
      <span className={styles.text}>Created @  </span>
      <span className={styles.username}>{formattedDateTime}</span>

    </div>
  );
};

export default BlogPost;
