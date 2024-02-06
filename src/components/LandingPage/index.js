import { Component } from "react";
import { Link,Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

class LandingPage extends Component {

   renderLandingPageImage  = () => {
    return(
      <>
      <img
            src="https://res.cloudinary.com/dctfbwk0m/image/upload/v1698640960/11879384_Work-removebg_bes6gp.png"
            className="lp-image"
          />
      </>
    )
  }

  renderDescriptionContainer = () => {
    return(
      <div className="lp-description-container">
            <h1 className="lp-todo-heading">Todo</h1>
            <p className="lp-todo-quote">
              Welcome to the future of productivity. Our sleek, intuitive to-do
              app empowers you to conquer tasks effortlessly. Achieve your
              goals, simplify your life, and seize the day!
            </p>
            <div className="lp-btn-container">
              <Link to="/register">
                <button title="For New user." type="button" className="lp-register-btn">Register</button>
              </Link>
              <Link to="/login">
                <button title="For Existing user." type="button" className="lp-login-btn">Login</button>
              </Link>
            </div>
          </div>
    )
  }

  render() {
    if(Cookies.get("jwt_token") !== undefined){
      return <Redirect to="/home"/>
    }
    return (
      <div className="lp-main-container">
        <div className="lp-container">
          {this.renderLandingPageImage()}
          {this.renderDescriptionContainer()}
        </div>
      </div>
    );
  }
}

export default LandingPage;
