import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);



  // setTimeout is just to demo porpuse, se should not do that. It is just to simulate how a real fecth will behave in times terms in the browser.
  // We initialize setIsPending to true and then we change to falso once the date has been fetched. That is why is located inside (.then(data => {)
  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/blogs')
        .then(res => {
          return res.json();
        })
        .then(data => {
          setIsPending(false);
          setBlogs(data);
        })
    }, 1000);
  }, [])

  // Condition with && to show Loading message until the data is fetched, like this
  // { isPending && <div>Loading...</div> }
  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
}

export default Home;
