import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { fetchDataFromApi } from "../../utils/api";

import "./styles.scss";

import noResults from "../../assets/no-results.png";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";
import Img from "../../components/lazyLoadImage/Img";

const SearchResult = () => {
  const navigate = useNavigate();
  const [newQuery, setNewquery] = useState("");
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_result > 1 ? "result" : "results"
                } for '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length}
                next={fetchNextPageData}
                hasMore={pageNum <= data.total_pages}
                loader={<Spinner />}
              >
                {data.results.map((item, index) => {
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="noResultFound">
              <Img className="noResult" src={noResults} />
              <span className="resultNotFound">Sorry, Results not Found</span>
              <div className="searchInput">
                <input
                  type="text"
                  placeholder="Search for movies and Series..."
                  onChange={(e) => setNewquery(e.target.value)}
                  onKeyUp={searchQueryHandler}
                />
                <button onClick={() => navigate(`/search/${newQuery}`)}>
                  Search
                </button>
              </div>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
