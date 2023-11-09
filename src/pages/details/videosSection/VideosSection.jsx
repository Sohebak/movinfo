import "./styles.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopups/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import { useRef, useState } from "react";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import noResult from "../../../assets/no-results.png";

const VideosSection = ({ data, loading }) => {
  const videoContainer = useRef();
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const navigation = (dir) => {
    const container = videoContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
          {data?.length > 3 && (
        <MdArrowBackIos
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
          )}
          {data?.length > 3 && (
        <MdArrowForwardIos
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
          )}
        {!loading ? (
          <div className="videos" ref={videoContainer}>
            {data?.map((video) => {
              return (
                <div
                  key={video.id}
                  className="videoItem"
                  onClick={() => {
                    setVideoId(video.key);
                    setShow(true);
                  }}
                >
                  <div className="videoThumbnail">
                    <Img
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    />
                    <PlayIcon />
                  </div>
                  <div className="videoTitle">{video.name}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
