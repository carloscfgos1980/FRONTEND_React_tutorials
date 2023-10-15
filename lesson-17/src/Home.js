import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null)


  // We use useEfect to fecth the API. Using setBlog allows to change the initial value which in this case is null
  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setBlogs(data);
      })
  }, [])

  // We used {} in the return in order to swith from HTML to JavaScript in the return and the we run a condiction, like this:
  //{blogs && <BlogList blogs={blogs} />}
  // This allows the browser to wait until it fetch the data, avoiding the website to crash. VERY IMPORTANT
  return (
    <div className="home">
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
}

export default Home;
