import {Link} from 'react-router-dom'
import "./index.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <img
        src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?w=740&t=st=1698559234~exp=1698559834~hmac=3798acc33e9923e0e4385c123ca2a1ee3671ea2ad2f4fbf0390fd414f997faa8"
        className="not-found-image"
        alt="page not found "
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <Link to="/home">
        <button type="button" className="go-to-home-btn">
          Go To Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
