import "./styles.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { useSelector } from "react-redux";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import dayjs from "dayjs";
import CircleRating from "../../../components/circleRating/CircleRating";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Upcoming = () => {
  const { data, loading } = useFetch(`/movie/upcoming`);
  const upcomingContainer = useRef();

  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = upcomingContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth - 100)
        : container.scrollLeft + (container.offsetWidth - 100);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="upcomingBanner">
      <ContentWrapper>
        <div className="upcomingTitle">Upcoming Movies</div>
        <FiArrowLeft
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <FiArrowRight
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="upcomingItems" ref={upcomingContainer}>
            {data?.results?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  className="upcomingItem"
                  key={item.id}
                  onClick={() => navigate(`/movie/${item.id}`)}
                >
                  <div className="backdrop-img">
                    <Img src={url.backdrop + item.backdrop_path} />
                  </div>
                  <div className="content">
                    <div className="left">
                      <div className="upcomingOvarley"></div>
                      <Img className="posterImg" src={posterUrl} />
                    </div>

                    <div className="right">
                      <div className="title">
                        {`${item.name || item.title} (${dayjs(
                          item?.realease_date
                        ).format("YYYY")})`}
                      </div>

                      <div className="subtitle">{item.tagline}</div>
                      <Genres data={item.genre_ids} />

                        <CircleRating rating={item.vote_average.toFixed(1)} />

                      <div className="overview">
                        <div className="heading">Overview</div>
                        <div className="description">{item.overview}</div>
                      </div>
                      <div className="info">
                        {item.release_date && (
                          <div className="infoItem">
                            <span className="text bold">Release Date: </span>
                            <span className="text">
                              {dayjs(item.release_date).format("MMM D, YYYY")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="detailsBannerSkeleton">
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Upcoming;
