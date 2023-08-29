import React, { useContext } from "react";
import { AppContext } from "../AppState";
import Pagination from "./Pagination";

const News = () => {
  const { news } = useContext(AppContext);
  return (
    <>
      <div className="container">
        <div className="row  d-flex justify-content-center">
          {news.map((currNews) => {
            const { urlToImage, title, publishedAt } = currNews;

            // Check if the img is available before rendering
            if (urlToImage !== null) {
              return (
                <div
                  key={publishedAt}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 text-center"
                >
                  <div>
                    <img
                      src={urlToImage}
                      className="my-3"
                      alt={title}
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                </div>
              );
            } else {
              return null; // Skip rendering for news without image
            }
          })}
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default News;
