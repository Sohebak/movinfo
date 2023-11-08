import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import MovieResults from "./movieSection/MovieResults";


const Person = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(`/person/${id}`);

  return (
    <div className="detailsBanner">
      <DetailsBanner data={data} loading={loading} />
      <MovieResults name={data?.name}/>
    </div>
  );
};

export default Person;
