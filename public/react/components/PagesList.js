import React from "react";
import { Page } from "./Page";

export const PagesList = ({ pages, getArticle }) => {
  return (
    <>
      {pages.map((page, idx) => {
        return <Page page={page} key={idx} getArticle={getArticle} />;
      })}
    </>
  );
};
