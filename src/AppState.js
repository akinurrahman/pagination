import { createContext, useEffect, useState } from "react";

const AppContext = createContext();
const AppState = (props) => {
  // ------Important States-----------
  const [news, setNews] = useState([]); //   State for storing the news array
  const [pageNo, setPageNo] = useState(1); // State for pagination

  // ----- Fetching the Data from API and store it to news state ---------------
  const NewsContent = async () => {
    try {
      const url = `https://newsapi.org/v2/everything?q=weather&apiKey=aac2c676af264d2489f3d9897adb9b26&pageSize=10&page=${pageNo}`;
      const res = await fetch(url);
      const data = await res.json();
      setNews((prev) => [...prev, ...data.articles]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight
      ) {
        setPageNo((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // --------execute NewsContent() this function for the first time only---------
  useEffect(() => {
    NewsContent();
  }, [pageNo]);

  // -----
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  // ------context values to be sent -----------
  const contextValue = { news, setNews };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
export { AppContext };
