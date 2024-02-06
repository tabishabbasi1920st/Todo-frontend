import { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import apiStatusConstants from "../apiStatusConstants";
import {
  BsSearch,
  BsThreeDotsVertical,
  BsSun,
  BsArrowLeft,
  BsMoonStarsFill,
} from "react-icons/bs";
import { FcManager } from "react-icons/fc";
import "./index.css";
import SearchThemeContext from "../SearchThemeContext/SearchTheme";
import Cookies from "js-cookie";

class Header extends Component {
  state = {
    searchActive: false,
    threeDotMenu: false,
    profileUsername: "",
    profileUsernameErrMsg: "",
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getProfileUsername();
  }

  getProfileUsername = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const apiUrl = "http://localhost:8081/username";
    const jwtToken = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
    if (response.status === 200) {
      const username = fetchedData.username;
      this.setState({
        profileUsername: username,
        profileUsernameErrMsg: "",
        apiStatus: apiStatusConstants.success,
      });
    } else {
      const message = fetchedData.message;
      this.setState({
        profileUsernameErrMsg: message,
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  render() {
    const { searchActive, profileUsername, apiStatus, profileUsernameErrMsg } =
      this.state;
    return (
      <SearchThemeContext.Consumer>
        {(value) => {
          const {
            isDark,
            searchInput,
            onToggleTheme,
            onChangeSearchInput,
            onClearSearchInput,
          } = value;

          console.log(isDark);

          const onClickThreeDotsButton = () => {
            this.setState((prevState) => ({
              threeDotMenu: !prevState.threeDotMenu,
            }));
          };


          const onClickLightThemeIcon = () => {
            onToggleTheme();
          };

          const onClickDarkThemeIcon = () => {
            onToggleTheme();
          };

          const onClickSearchIcon = () => {
            this.setState({ searchActive: true });
          };

          const onClickLeftArrowButton = () => {
            onClearSearchInput();
            this.setState({ searchActive: false });
          };

          const onChangeSearchBarInput = (event) => {
            onChangeSearchInput(event);
          };

          const renderNavLogoHeading = () => {
            return (
              <Link to="/home">
                {/* <h1 title="Go to home" className="nav-logo-heading">
                  Todo
                </h1> */}
                <img src="https://img.freepik.com/premium-vector/checklist-check-mark-check-logo-template_161396-514.jpg?w=740" className="nav-img"/>
              </Link>
            );
          };

          const renderSearchIcon = () => {
            return (
              <button
                type="button"
                className="search-icon-button"
                onClick={onClickSearchIcon}
              >
                <BsSearch />
              </button>
            );
          };

          const renderinputTag = () => {
            const { searchActive } = this.state;
            return (
              <input
                title="Search in todo title"
                placeholder="Search Todo..."
                value={searchInput}
                type="search"
                className="search-input"
                onChange={onChangeSearchBarInput}
                autoFocus={searchActive}
              />
            );
          };

          const renderSearchBar = () => {
            return (
              <div className="search-bar-container">
                {renderinputTag()}
                {renderSearchIcon()}
              </div>
            );
          };

          const renderThreeVerticalDots = () => {
            return (
              <button
                type="button"
                className="three-dots-icon-button"
                onClick={onClickThreeDotsButton}
              >
                <BsThreeDotsVertical />
              </button>
            );
          };

          const renderLightThemeIcon = () => {
            return (
              <button
                title="Go to Dark theme"
                type="button"
                className="light-theme-icon-button"
                onClick={onClickLightThemeIcon}
              >
                <BsSun />
              </button>
            );
          };

          // const renderDarkThemeIcon = () => {
          //   return (
          //     <button
          //       title="Go to light theme"
          //       type="button"
          //       className="dark-theme-icon-button"
          //       onClick={onClickDarkThemeIcon}
          //     >
          //       <BsMoonStarsFill />
          //     </button>
          //   );
          // };

          const renderLeftArrowIcon = () => {
            return (
              <button
                type="button"
                className="left-arrow-icon-button rotate"
                onClick={onClickLeftArrowButton}
              >
                <BsArrowLeft />
              </button>
            );
          };

          const renderProfileIcon = () => {
            return (
              <Link to="/user-profile">
                <button
                  title="Go to user Profile"
                  type="button"
                  className="nav-profile-icon-button"
                >
                  <FcManager />
                </button>
              </Link>
            );
          };

          const renderSmSearchBar = () => {
            return (
              <div className="sm-searchbar-container">
                {renderLeftArrowIcon()}
                {renderSearchBar()}
              </div>
            );
          };

          const renderSmNavbar = () => {
            const { isDark } = value;
            return (
              <nav className="sm-nav-bar">
                {renderNavLogoHeading()}
                <div className="sm-nav-second-container">
                  {renderSearchIcon()}
                  {/* {isDark ? renderLightThemeIcon() : renderDarkThemeIcon()} */}
                  {renderProfileIcon()}
                </div>
              </nav>
            );
          };

          const renderProfileUserName = () => {
            return (
              <h3 title="profile username" className="header-profile-username">
                {profileUsername}
              </h3>
            );
          };

          const renderProfileUsernameErrMsg = () => {
            return (
              <h3 className="header-profile-username">
                {profileUsernameErrMsg}
              </h3>
            );
          };

          const renderLgNavbar = () => {
            const { isDark } = value;
            return (
              <nav className="lg-nav-bar">
                {renderNavLogoHeading()}
                {renderSearchBar()}
                {/* {isDark ? renderLightThemeIcon() : renderDarkThemeIcon()} */}
                {renderProfileIcon()}
                {apiStatus === apiStatusConstants.success &&
                  renderProfileUserName()}
                {apiStatus === apiStatusConstants.failure &&
                  renderProfileUsernameErrMsg()}
              </nav>
            );
          };

          return (
            <div className="header">
              {searchActive ? renderSmSearchBar() : renderSmNavbar()}
              {renderLgNavbar()}
            </div>
          );
        }}
      </SearchThemeContext.Consumer>
    );
  }
}

export default withRouter(Header);
