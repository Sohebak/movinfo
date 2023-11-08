import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import CircleRating from "../../../components/circleRating/CircleRating";
import Genres from "../../../components/genres/Genres";

import useFetch from "../../../hooks/useFetch";

const Carousel = ({ name }) => {
  const { data, loading } = useFetch(
    `/search/person?query=${name}&page=1`
  );
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();


  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton">
          <div className="textBlock">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {data && (
          <div className="carouselTitle">
            Popular work of <span>{name}</span>
          </div>
        )}

        {!loading ? (
          <div className="carouselItems">
            {data?.results[0]?.known_for?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  className="carouselItem"
                  key={item.id}
                  onClick={() => navigate(`/${item.media_type}/${item.id}`)}
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
