import { createContext, useEffect, useState } from "react";

const AppContext = createContext();
const AppState = (props) => {
  // ------Important States-----------
  const [news, setNews] = useState([]); //   State for storing the news array
  const [pageNo, setPageNo] = useState(1); // State for pagination

  // ----- Fetching the Data from API and store it to news state ---------------
  const NewsContent = async () => {
    try {
      const url = `https://newsapi.org/v2/everything?q=weather&apiKey=cdcee3818f3e420697cb0fa17818ed79&pageSize=20&page=${pageNo}`;
      const res = await fetch(url);
      const data = await res.json();
      setNews(data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  // ----- Pagination/ Handling prev and next button ------------------------------
  const nextPage = () => {
    return setPageNo((pageNo) => pageNo + 1);
  };
  const PrevPage = () => {
    if (pageNo > 1) {
      setPageNo((pageNo) => pageNo - 1);
    }
  };
  // --------execute NewsContent() this function everytime PageNo state is changed---------
  useEffect(() => {
    NewsContent();
  }, [pageNo]);

  // ------context values to be sent -----------
  const contextValue = { news, setNews, nextPage, PrevPage };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
export { AppContext };
