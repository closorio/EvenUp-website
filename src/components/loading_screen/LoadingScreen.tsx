import HashLoader from 'react-spinners/HashLoader'
import './Loader.css'

const LoadingScreen = () => {


return (
  <>
      <div className="loaderContainerMobile">
          <HashLoader color='#A3FCE1'  size={120} />
      </div>
      <div className="loaderContainer">
          <HashLoader color='#A3FCE1'  size={150} />
      </div>
  </>
)
};

export default LoadingScreen;
