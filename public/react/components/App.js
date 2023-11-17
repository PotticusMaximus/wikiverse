import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";

// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  const [pages, setPages] = useState([]);
  const [article, setArticle] = useState("");
  const [addingArticle, setAddingArticle] = useState(false);
  const [mySlug, setMySlug] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    name: "",
    email: "",
    tags: "",
  });

  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  useEffect(() => {
    fetchPages();
  }, [handleSubmit]);

  const getArticle = async (slug) => {
    const response = await fetch(`${apiURL}/wiki/${slug}`);
    const data = await response.json();
    setArticle(data.content);
    setMySlug(slug);
  };

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success submitting: ", data);

      setFormData({
        title: "",
        content: "",
        name: "",
        email: "",
        tags: "",
      });

      setAddingArticle(false);
    } catch (error) {
      console.error("Submission error:", error.message);
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiURL}/wiki/${mySlug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success deleting: ", data);
      setMySlug("");
      setArticle("");
    } catch (error) {
      console.error("Submission error:", error.message);
    }
  };

  return (
    <main>
      <h1>Brickipedia</h1>
      <h2>Solid Reading</h2>
      {article === "" && addingArticle === false && (
        <>
          <PagesList pages={pages} getArticle={getArticle} />
          <div>
            <button onClick={() => setAddingArticle(true)}>Create</button>
          </div>
        </>
      )}
      {article !== "" && addingArticle === false && (
        <>
          <p>{article}</p>
          <button onClick={() => setArticle("")}>Back to Brickpedia</button>
          <button onClick={handleDelete}>Delete article</button>
        </>
      )}
      {addingArticle === true && (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Content:
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Author Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Author Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Tags:
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </main>
  );
};
