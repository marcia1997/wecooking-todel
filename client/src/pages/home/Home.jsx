import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
// fetch
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const backendApiUrl = "https://wecooking-back.onrender.com";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation(); // captures the query from the URL

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${backendApiUrl}/posts${search}`);
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [search]); // Rerun the effect if search changes

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
