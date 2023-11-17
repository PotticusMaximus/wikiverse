import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";

// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  const [pages, setPages] = useState([]);
  const [article, setArticle] = useState("");

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
  }, []);

  const getArticle = async (slug) => {
    const response = await fetch(`${apiURL}/wiki/${slug}`);
    const data = await response.json();
    setArticle(data.content);
  };

  return (
    <main>
      <h1>Brickipedia</h1>
      <h2>Solid Reading</h2>
      {article === "" && <PagesList pages={pages} getArticle={getArticle} />}
      {article !== "" && (
        <>
          <p>{article}</p>
          <button onClick={() => setArticle("")}>Back to Brickpedia</button>
        </>
      )}
    </main>
  );
};
