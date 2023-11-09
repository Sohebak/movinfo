import { useSelector } from "react-redux";

import "./styles.scss";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";


// eslint-disable-next-line react/prop-types
const Cast = ({ data, loading, bvalue }) => {
  const castContainer = useRef()
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate()

const navigation = (dir) => {
  const container = castContainer.current;

  const scrollAmount =
    dir === "left"
      ? container.scrollLeft - (container.offsetWidth + 20)
      : container.scrollLeft + (container.offsetWidth + 20);
  container.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });
};


  

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {data?.length > 6 && (
          <MdArrowBackIos
            className="carouselLeftNav arrow"
            onClick={() => navigation("left")}
          />
        )}
        
        {data?.length > 6 && (
        <MdArrowForwardIos
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
        )}
        {!loading ? (
          <div className="listItems" ref={castContainer}>
            {data?.map((item) => {
              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;
              return (
                <div
                  key={item.id}
                  className="listItem"
                  onClick={() => navigate(`/person/${item.id}`)}
                >
                  <div className="profileImg">
                    <Img src={imgUrl} />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="character">{item.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
