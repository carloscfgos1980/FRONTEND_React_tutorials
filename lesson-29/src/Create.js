import { useState } from "react";
/*
1.  create state for the forms and and a value to the forms
2. create a eventListener (Submit). Inside the event submit event:
  2.1 - create a const that storage the values. These values need to match the values in the DataBase
  2.2 - fetch - Post (line 19 - 26)

3 - Create a loading state for the submit button
3.1 - Create another state(loading) for the button
3.2 - add the loading state to the fetch (line 30)
3.3 - create a state change for the button, like this:
{!isPending && <button>Add Blog</button>}
3.4 - create a button for when is loading, like this
{isPending && <button disabled>Adding Blog....</button>}


*/
const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    fetch('http://localhost:8000/blogs/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log('new blog added');
      setIsPending(false);
    })
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding Blog....</button>}
      </form>
    </div>
  );
}

export default Create;