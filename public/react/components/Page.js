import React from "react";

export const Page = (props) => {
  return (
    <>
      <h3>{props.page.title}</h3>
      <button onClick={() => props.getArticle(props.page.slug)}>Read</button>
    </>
  );
};
//on click function will reference props.page.slug
