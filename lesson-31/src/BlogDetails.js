import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
/*
1. Create a new (delete) button with a handleEvent (line 28), like this:
<button onClick={handleClick}>delete</button>
2. Create a handleClickEvent function (line 14 - 20)
3. Add automatic state so it returns to home page (line 19)

*/
const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  const history = useHistory();

  const handleClick = () => {
    fetch('http://localhost:8000/blogs/' + blog.id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    })
  }

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
}

export default BlogDetails;