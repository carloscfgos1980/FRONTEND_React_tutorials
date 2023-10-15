import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/blogs')
        .then(res => {
          if (!res.ok) { // error coming back from server
            throw Error('could not fetch the data for that resource');
          }
          return res.json();
        })
        .then(data => {
          setIsPending(false);
          setBlogs(data);
          setError(null); // reset error message to null so it is not shown in case that the fetch is ok
        })
        .catch(err => {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        })
    }, 1000);
  }, [])


  // { error && <div>{ error }</div> } This is to show in the DOM the error message
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
}

export default Home;
