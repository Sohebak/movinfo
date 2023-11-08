import "./styles.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import Avatar from "../../../assets/avatar.png";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import React, { useState } from "react";


const DetailsBanner = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const [isTruncated, setIsTruncated] = useState(true)

   const handleClick = () => {
     setIsTruncated(!isTruncated);
   };

  return (
    <div className="details-Banner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.profile_path ? (
                      <Img
                        className="posterImg profile"
                        src={url.profile + data?.profile_path}
                      />
                    ) : (
                      <Img className="posterImg profile" src={Avatar} />
                    )}
                  </div>

                  <div className="right">
                    <div className="name">{data?.name}</div>
                    <div className="place">
                      <span>from </span>
                      {data?.place_of_birth}
                    </div>

                    <div className="info">
                      {data?.known_for_department && (
                        <div className="infoItem">
                          <span className="text bold">Profession: </span>
                          <span className="text">
                            {data?.known_for_department}
                          </span>
                        </div>
                      )}
                      {data?.birthday && (
                        <div className="infoItem">
                          <span className="text bold">Birth Date: </span>
                          <span className="text">
                            {dayjs(data.birthday).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                    </div>

                    {data?.biography &&
                      <div className="biography">
                        <div className="heading">Biography</div>
                        <div className="description">
                          {isTruncated ? (
                            <p>
                              {data?.biography.slice(0, 400)}...
                              <a onClick={handleClick} className="readBtn">
                                Read more
                              </a>
                            </p>
                          ) : (
                            <p>
                              {data?.biography}
                              <a onClick={handleClick} className="readBtn">
                                Read less
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
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
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
