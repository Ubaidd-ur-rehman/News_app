import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const UpdateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=09fc7b9f3e5c4b7e8687e6219699952f&page=${page}&pageSize=${props.pageSize}`;

    try {
      setLoading(true);
      const data = await fetch(url);
      props.setProgress(30);
      const parsedData = await data.json();
      props.setProgress(50);

      setArticles([...articles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults);
      setLoading(false);

      props.setProgress(100);
      console.log("API data fetched");
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    UpdateNews();
  }, [page]);

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  return (
    <>
      <h1 className="text-center mb-4" style={{marginTop:'25px'}}>NewsMonkey - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={loading && <Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItems
                  title={element.title ? element.title : "Empty title"}
                  description={element.description ? element.description : "Empty"}
                  ImageUrl={element.urlToImage}
                  url={element.url}
                  author={element.author ? element.author : "unknown"}
                  date={element.publishedAt ? element.publishedAt : "Date is not available"}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
