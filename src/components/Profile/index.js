import { Component } from "react";
import "./index.css";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import Cookies from "js-cookie";
import apiStatusConstants from "../apiStatusConstants";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

class Profile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetailsList: [],
    errMsg: "",
  };

  componentDidMount() {
    this.getUserProfileInfo();
  }

  getUserProfileInfo = async () => {
    const apiUrl = "http://localhost:8081/profile-info";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    };

    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
    const message = fetchedData.message;
    if (response.status === 200) {
      this.setState({
        profileDetailsList: message,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure, errMsg: message });
    }
  };

  onLogout = () => {
    Cookies.remove("jwt_token");
    const { history } = this.props;
    history.replace("/login");
  };

  onClickLeftArrow = () => {
    const { history } = this.props;
    history.replace("/home");
  };

  renderLogoutButton = () => {
    return (
      <button title="Logout" className="profile-logout-btn">
        Logout
      </button>
    );
  };

  renderDeleteAccountButton = () => {
    return (
      <Link to="/delete-account">
        <button title="Delete your todo account" className="profile-delete-btn">
          <AiOutlineClose style={{ marginRight: "5px" }} />
          Delete Account
        </button>
      </Link>
    );
  };

  render() {
    const { profileDetailsList, apiStatus } = this.state;
    const { name, mobile, email, age, location, gender, username } =
      profileDetailsList;
    return (
      <div className="profile-main-container">
        <div className="profile-header">
          <button
            type="button"
            className="profile-header-arrow-btn"
            onClick={this.onClickLeftArrow}
          >
            <BsArrowLeft />
          </button>
        </div>
        <div className="profile-data-container">
          <div className="avatar-container">
            <img
              src="https://img.freepik.com/free-vector/3d-realistic-faceless-human-model_1441-2189.jpg?w=740&t=st=1698659974~exp=1698660574~hmac=8d1853a02e8c002f620b96238c921e135494cb058262eb1f0be2a48bbdd2f78a"
              className="avatar-img"
            />
          </div>
          <p className="username">{username}</p>
        </div>
        {apiStatus === apiStatusConstants.success && (
          <ul className="pr-details-container">
            <li className="profile-list-item">
              <h3 className="profile-headings">
                Name: <span>{name}</span>
              </h3>
            </li>
            <li className="profile-list-item">
              <h3 className="profile-headings">
                Email: <span>{email}</span>
              </h3>
            </li>
            <li className="profile-list-item">
              <h3 className="profile-headings">
                Country: <span>{location}</span>
              </h3>
            </li>
            <li className="profile-list-item">
              <h3 className="profile-headings">
                Gender: <span>{gender}</span>
              </h3>
            </li>
            <li className="profile-list-item">
              <h3 className="profile-headings">
                Age: <span>{age}</span>
              </h3>
            </li>
            <li className="profile-list-item">
              <h3 className="profile-headings">
                Mobile Number: <span>{mobile}</span>
              </h3>
            </li>
          </ul>
        )}
        <div className="profile-btns-container">
          {this.renderDeleteAccountButton()}
          <Popup modal trigger={this.renderLogoutButton}>
            {(close) => (
              <div className="logout-popup-container">
                <h2 style={{ color: "#fff" }}>Are you sure ?</h2>
                <div style={{ display: "flex" }}>
                  <button
                    className="confirm-btn"
                    type="button"
                    onClick={this.onLogout}
                  >
                    Confirm
                  </button>
                  <button className="close-btn" type="button" onClick={close}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    );
  }
}

export default Profile;
