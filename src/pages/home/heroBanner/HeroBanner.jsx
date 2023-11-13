import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import "./styles.scss";

const HeroBanner = () => {
  const [background, setbackground] = useState("");
  const [query, setquery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/now_playing");

  useEffect(() => {
    const bg =
      url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setbackground(bg);
  }, [data]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Movinfo.</span>
          <span className="subtitle">
            Millions of movies, TV Shows and Online Series to discover. Explore
            now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for movies and Series..."
              onChange={(e) => setquery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={() => navigate(`/search/${query}`)}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
