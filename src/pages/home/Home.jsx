import HeroBanner from './heroBanner/HeroBanner';
import Popular from './popular/Popular';
import "./styles.scss";
import Trending from './trending/Trending';
import TopRated from './toprated/TopRated';
import Upcoming from './Upcoming/Upcoming';


const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <Upcoming/>
      <TopRated/>
    </div>
  )
}

export default Home