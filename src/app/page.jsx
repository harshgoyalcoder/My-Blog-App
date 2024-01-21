import styles from "./page.module.css";
import blog from "public/blog.png";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
        Welcome to Harsh's Blog!
        </h1>
        <p className={styles.desc}>
         Explore a diverse range of topics, from insightful articles to engaging stories, and join me on this journey of discovery and inspiration. 
          
        </p>
        <Button url="/dashboard" text="Create Your Post!"/>
      </div>
      <div className={styles.item}>
        <img src="/blog.png" alt="" className={styles.img} />
      </div>
    </div>
  );
}
