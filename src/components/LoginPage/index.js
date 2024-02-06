import { Component } from "react";
import apiStatusConstants from "../apiStatusConstants";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

export class LoginPage extends Component {
  state = {
    showPassword: false,
    username: "",
    password: "",
    usernameErrorMsg: "",
    passwordErrorMsg: "",
    serverResponseMsg: "",
    apiStatus: apiStatusConstants.initial,
  };

  onChangeShowPassword = () => {
    const { showPassword } = this.state;
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  renderLoginImage = () => {
    return (
      <>
        <img
          src="https://res.cloudinary.com/dctfbwk0m/image/upload/v1698671063/computer-security-with-login-password-padlock-removebg_iec7or.png"
          className="lg-image"
        />
      </>
    );
  };

  renderUsernameInputField = () => {
    const { username, usernameErrorMsg } = this.state;
    return (
      <div className="label-and-field-container">
        <label className="lg-label">USERNAME</label>
        <input
          autoFocus
          value={username}
          placeholder="admin1234st"
          type="text"
          className="lg-input"
          onChange={this.onChangeUsername}
        />
        <p className="err-msg">{usernameErrorMsg}</p>
      </div>
    );
  };

  renderPasswordInputField = () => {
    const { password, showPassword, passwordErrorMsg } = this.state;
    return (
      <div className="label-and-field-container">
        <label className="lg-label">PASSWORD</label>
        <input
          placeholder="@#12Admin"
          type={showPassword ? "text" : "password"}
          className="lg-input"
          onChange={this.onChangePassword}
          value={password}
        />
        <p className="err-msg">{passwordErrorMsg}</p>
      </div>
    );
  };

  renderShowOrHidePassword = () => {
    const { showPassword } = this.state;
    return (
      <div className="show-pass-container">
        <input
          id="showPassword"
          type="checkbox"
          className="lg-checkbox-input"
          value={showPassword}
          onChange={this.onChangeShowPassword}
        />
        <label htmlFor="showPassword" className="lg-checkbox-label">
          Show Password
        </label>
      </div>
    );
  };

  renderServerResponseMsg = () => {
    const { serverResponseMsg } = this.state;
    return <p className={`lg-server-res-msg`}>{serverResponseMsg}</p>;
  };

  getFormValidation = () => {
    const { username, password, usernameErrorMsg, passwordErrorMsg } =
      this.state;
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    let formValidationStatus = false;

    if (
      username.length < 3 ||
      username.length > 20 ||
      !/^[a-zA-Z0-9]+$/.test(username)
    ) {
      this.setState({
        usernameErrorMsg:
          "*Username length between 3 to 20, not contain symbols.",
      });
      formValidationStatus = false;
    } else {
      this.setState({ usernameErrorMsg: "" });
      formValidationStatus = true;
    }

    if (password.length < 8) {
      this.setState({
        passwordErrorMsg:
          "Password contain atlesat 8 characters with number, symbols, UPPERCASE letter lowercase letter",
      });
      formValidationStatus = false;
    } else {
      this.setState({ passwordErrorMsg: "" });
      formValidationStatus = true;
    }

    return formValidationStatus;
  };

  onSubmitLoginForm = async (event) => {
    event.preventDefault();
    const formValidationResult = this.getFormValidation();
    if (formValidationResult) {
      this.setState({ apiStatus: apiStatusConstants.inProgress });
      const { username, password } = this.state;
      const apiUrl = "https://todoabbasi.up.railway.app/login";
      const data = { username: username, password: password };
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(apiUrl, options);
      const fetchedData = await response.json();

      if (response.status === 200) {
        const jwtToken = fetchedData.jwtToken;
        Cookies.set("jwt_token", jwtToken, { expires: 7 });
        this.setState({ apiStatus: apiStatusConstants.success });
        this.props.history.replace("/home");
      } else {
        const message = fetchedData.message;
        this.setState({
          apiStatus: apiStatusConstants.failure,
          serverResponseMsg: message,
        });
      }
    }
  };

  renderAreYouNewUser = () => {
    return (
      <p className="new-user-msg">
        Are you new user click to{" "}
        <Link to="/register" className="register-span">
          Register
        </Link>
      </p>
    );
  };

  renderLoginForm = () => {
    return (
      <form className="form-container" onSubmit={this.onSubmitLoginForm}>
        <h1 className="lg-logo-heading">Todo</h1>
        {this.renderUsernameInputField()}
        {this.renderPasswordInputField()}
        {this.renderShowOrHidePassword()}
        {this.renderAreYouNewUser()}
        {this.renderServerResponseMsg()}
        <div className="lg-btn-container">
          <button type="submit" className="lg-login-btn">
            Login
          </button>
        </div>
      </form>
    );
  };

  render() {
    if (Cookies.get("jwt_token") !== undefined) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="lg-main-container">
        <div className="lg-container">
          {this.renderLoginImage()}
          {this.renderLoginForm()}
        </div>
      </div>
    );
  }
}

export default LoginPage;
