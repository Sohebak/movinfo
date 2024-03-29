import HeroBanner from './heroBanner/HeroBanner';
import Popular from './popular/Popular';
import "./styles.scss";
import Trending from './trending/Trending';
import TopRated from './TopRated/TopRated';
import Upcoming from './upcoming/Upcoming';


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