import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./styles.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const urlPath =
    data?.media_type === "person"
      ? url.profile + data?.profile_path : url.poster + data?.poster_path;
 
  const posterUrl =
    data?.profile_path || data?.poster_path ? urlPath : PosterFallback;
    
  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${data?.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={data?.vote_average.toFixed(1)} />
            <Genres data={data?.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data?.title || data?.name}</span>
        {data?.media_type === "person" ? (
          
          <span className="date">
            {data?.known_for_department}
          </span>
        ):(
          data?.release_date &&
          <span className="date">
            {dayjs(data?.release_date).format("MMM D, YYYY")}
          </span>
        
        )}
      </div>
    </div>
  );
};

export default MovieCard;
