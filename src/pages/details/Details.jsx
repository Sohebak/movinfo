import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Recommendation from './carousels/Recommendation';
import Similar from './carousels/Similar';
import Cast from './cast/Cast';
import DetailsBanner from './detailsBanner/DetailsBanner';
import VideosSection from './videosSection/VideosSection';


const Details = () => {

  const {mediaType, id} = useParams()
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div className="detailsBanner">
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      {credits?.cast.length !== 0 && <Cast data={credits?.cast} loading={creditsLoading}  />}
      {data?.results.length !== 0 && <VideosSection data={data?.results} loading={loading} />}
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
}

export default Details