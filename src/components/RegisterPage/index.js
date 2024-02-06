import { Component } from "react";
import apiStatusConstants from "../apiStatusConstants";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

export class LoginPage extends Component {
  state = {
    name: "",
    nameErrorMsg: "",
    email: "",
    emailErrorMsg: "",
    mobile: "",
    mobileErrorMsg: "",
    age: "",
    ageErrorMsg: "",
    location: "",
    locationErrorMsg: "",
    genderSelectedOption: "Male",
    username: "",
    usernameErrorMsg: "",
    password: "",
    passwordErrorMsg: "",
    showPassword: false,
    serverResponseMsg: "",
    apiStatus: apiStatusConstants.initial,
  };

  onChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
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

  onChangeAge = (event) => {
    this.setState({ age: event.target.value });
  };

  onChangeGender = (event) => {
    this.setState({ genderSelectedOption: event.target.value });
  };

  onChangeMobileNumber = (event) => {
    this.setState({ mobile: event.target.value });
  };

  onChangeLocation = (event) => {
    this.setState({ location: event.target.value });
  };

  rendderRegisterImage = () => {
    return (
      <>
        <img
          src="https://img.freepik.com/free-vector/recruit-agent-analyzing-candidates_74855-4565.jpg?w=900&t=st=1698247476~exp=1698248076~hmac=998e14741b990e7435a46ff196fc4f8268ae3633ff169e068a5d7eab7e9f3aa4" alt="register"
          className="rg-image"
        />
      </>
    );
  };

  renderUsernameInputField = () => {
    const { username, usernameErrorMsg } = this.state;
    return (
      <div className="label-and-field-container">
        <label htmlFor="username" className="rg-label">
          USERNAME
        </label>
        <input
          id="username"
          value={username}
          placeholder="admin@1920st"
          type="text"
          className="rg-input"
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
        <label htmlFor="password" className="rg-label">
          PASSWORD
        </label>
        <input
          id="password"
          placeholder="@#12admin"
          type={showPassword ? "text" : "password"}
          className="rg-input"
          onChange={this.onChangePassword}
          value={password}
        />
        <p className="err-msg">{passwordErrorMsg}</p>
      </div>
    );
  };

  renderNameInputField = () => {
    const { name, nameErrorMsg } = this.state;
    return (
      <div className="label-and-field-container">
        <label htmlFor="name" className="rg-label">
          NAME
        </label>
        <input
          id="name"
          placeholder="admin"
          type="text"
          className="rg-input"
          onChange={this.onChangeName}
          value={name}
        />
        <p className="err-msg">{nameErrorMsg}</p>
      </div>
    );
  };

  renderEmailInputField = () => {
    const { email, emailErrorMsg } = this.state;
    return (
      <div className="label-and-field-container">
        <label htmlFor="email" className="rg-label">
          E-mail
        </label>
        <input
          id="email"
          placeholder="admin123@gmail.com"
          type="email"
          className="rg-input"
          onChange={this.onChangeEmail}
          value={email}
        />
        <p className="err-msg">{emailErrorMsg}</p>
      </div>
    );
  };

  renderAgeInputField = () => {
    const { age, ageErrorMsg } = this.state;
    return (
      <div className="label-and-field-container">
        <label htmlFor="age" className="rg-label">
          AGE
        </label>
        <input
          id="age"
          placeholder="3 - 120"
          type="text"
          className="rg-input"
          onChange={this.onChangeAge}
          value={age}
        />
        <p className="err-msg">{ageErrorMsg}</p>
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
          className="rg-checkbox-input"
          value={showPassword}
          onChange={this.onChangeShowPassword}
        />
        <label htmlFor="showPassword" className="rg-checkbox-label">
          Show Password
        </label>
      </div>
    );
  };

  renderGenderInputField = () => {
    const { genderSelectedOption } = this.state;

    return (
      <div onChange={this.onChangeGender} value={genderSelectedOption}>
        <p className="rg-label">Gender</p>
        <label className="rg-label">
          <input
            className="rg-radio-input"
            type="radio"
            name="gender"
            id="Male"
            value="Male"
            checked={genderSelectedOption === "Male"}
          />
          Male
        </label>

        <label className="rg-label">
          <input
            className="rg-radio-input"
            type="radio"
            name="gender"
            id="Female"
            value="Female"
            checked={genderSelectedOption === "Female"}
          />
          Female
        </label>

        <label className="rg-label">
          <input
            className="rg-radio-input"
            type="radio"
            name="gender"
            id="Others"
            value="Others"
            checked={genderSelectedOption === "Others"}
          />
          Others
        </label>
      </div>
    );
  };

  renderMobileNumberInputField = () => {
    const { mobile, mobileErrorMsg } = this.state;
    return (
      <div className="label-and-field-container">
        <label htmlFor="mobile" className="rg-label">
          MOBILE
        </label>
        <input
          id="mobile"
          placeholder="Enter Mobile"
          type="text"
          className="rg-input"
          onChange={this.onChangeMobileNumber}
          value={mobile}
        />
        <p className="err-msg">{mobileErrorMsg}</p>
      </div>
    );
  };

  renderLocationInputField = () => {
    const { location, locationErrorMsg } = this.state;
    return (
      <div className="label-and-field-container">
        <label htmlFor="location" className="rg-label">
          Location
        </label>
        <input
          id="location"
          placeholder="Country/State"
          type="text"
          className="rg-input"
          onChange={this.onChangeLocation}
          value={location}
        />
        <p className="err-msg">{locationErrorMsg}</p>
      </div>
    );
  };

  renderServerResponseMessage = () => {
    const { serverResponseMsg } = this.state;
    return (
      <p className="server-response-msg">
        {`* ${serverResponseMsg}`}{" "}
        <Link className="rg-link-class" to="/login">
          Please Login
        </Link>
      </p>
    );
  };

  getFormValidation = () => {
    const { username, password, name, email, age, mobile, location } =
      this.state;
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let nameStatus;
    let emailStatus;
    let ageStatus;
    let usernameStatus;
    let passwordStatus;
    let mobileNumberStatus;
    let locationStatus;

    // condition for username validation.
    if (
      username.length < 3 ||
      username.length > 20 ||
      !/^[a-zA-Z0-9]+$/.test(username)
    ) {
      this.setState({
        usernameErrorMsg:
          "*Username length between 3 to 20, not contain symbols.",
      });
      usernameStatus = false;
    } else {
      this.setState({ usernameErrorMsg: "" });
      usernameStatus = true;
    }

    // condition for password validation.
    if (password.length < 8) {
      this.setState({
        passwordErrorMsg:
          "Password contain atlesat 8 characters with number, symbols, UPPERCASE letter lowercase letter",
      });
      passwordStatus = false;
    } else {
      this.setState({ passwordErrorMsg: "" });
      passwordStatus = true;
    }

    // condition for name validation.
    if (!name || name.trim() === "") {
      this.setState({ nameErrorMsg: "Name is required." });
      nameStatus = false;
    } else {
      this.setState({ nameErrorMsg: "" });
      nameStatus = true;
    }

    // condition for email validation.
    if (emailPattern.test(email)) {
      this.setState({ emailErrorMsg: "" });
      emailStatus = true;
    } else {
      this.setState({ emailErrorMsg: "Enter valid Email" });
      emailStatus = false;
    }

    // condition for Age validation.
    if (age < 3 || age > 120 || age === "") {
      this.setState({ ageErrorMsg: "Age range 0-120 only" });
      ageStatus = false;
    } else {
      this.setState({ ageErrorMsg: "" });
      ageStatus = true;
    }

    // condition for mobile number validation.
    if (mobile.length !== 10) {
      this.setState({ mobileErrorMsg: "Enter Valid Mobile Number" });
      mobileNumberStatus = false;
    } else {
      this.setState({ mobileErrorMsg: "" });
      mobileNumberStatus = true;
    }

    // condition for location validation.
    if (location === "") {
      this.setState({ locationErrorMsg: "Enter valid Location" });
      locationStatus = false;
    } else {
      this.setState({ locationErrorMsg: "" });
      locationStatus = true;
    }

    const formValidationStatus =
      nameStatus &&
      emailStatus &&
      ageStatus &&
      usernameStatus &&
      passwordStatus &&
      mobileNumberStatus &&
      locationStatus;

    return formValidationStatus;
  };

  onSubmitRegisterForm = async (event) => {
    event.preventDefault();
    const formValidationResult = this.getFormValidation();

    if (formValidationResult) {
      this.setState({ apiStatus: apiStatusConstants.inProgress });
      const apiUrl = "http://localhost:8081/register";
      const {
        name,
        mobile,
        email,
        age,
        location,
        genderSelectedOption,
        username,
        password,
      } = this.state;

      const data = {
        name: name,
        mobile: mobile,
        email: email,
        age: age,
        location: location,
        gender: genderSelectedOption,
        username: username,
        password: password,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(apiUrl, options);
      const fetchedData = await response.json();
      console.log(response);

      if (response.status === 200) {
        const serverResMsg = fetchedData.message;
        this.setState({
          apiStatus: apiStatusConstants.success,
          serverResponseMsg: serverResMsg,
        });
      } else if (response.status === 400) {
        const serverResMsg = fetchedData.message;
        this.setState({
          apiStatus: apiStatusConstants.success,
          serverResponseMsg: serverResMsg,
        });
      }
    }
  };

  renderRegistrationForm = () => {
    const { apiStatus } = this.state;
    return (
      <form className="rg-form-container" onSubmit={this.onSubmitRegisterForm}>
        <h1 className="rg-logo-heading">Todo</h1>
        {this.renderNameInputField()}
        {this.renderMobileNumberInputField()}
        {this.renderEmailInputField()}
        {this.renderAgeInputField()}
        {this.renderLocationInputField()}
        {this.renderGenderInputField()}
        {this.renderUsernameInputField()}
        {this.renderPasswordInputField()}
        {this.renderShowOrHidePassword()}
        {apiStatus === apiStatusConstants.success &&
          this.renderServerResponseMessage()}
        {apiStatus === apiStatusConstants.initial && (
          <p style={{ marginTop: "10px" }}>
            If you are existing user you can{" "}
            <Link to="/login" style={{ textDecoration: "underline" }}>
              Login
            </Link>
          </p>
        )}
        <div className="rg-btn-container">
          <button type="submit" className="rg-login-btn">
            Register
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
      <div className="rg-main-container">
        <div className="rg-container">
          {this.rendderRegisterImage()}
          {this.renderRegistrationForm()}
        </div>
      </div>
    );
  }
}

export default LoginPage;
