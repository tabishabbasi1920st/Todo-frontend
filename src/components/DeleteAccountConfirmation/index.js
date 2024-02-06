import { Component } from "react";
import "./index.css";
import { AiOutlineClose } from "react-icons/ai";
import apiStatusConstants from "../apiStatusConstants";
import Cookies from "js-cookie";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const passwordConstants = {
  onDeletedSuccess: "Account has been deleted permanently and successfully",
  onDeleteFailed: "Wrong Password. Account Deleted Failed",
};

class DeleteAccountConfirmation extends Component {
  state = {
    textareaInput: "",
    passwordInput: "",
    feedbackErrMsg: "",
    passwordErrMsg: "",
    apiStatus: apiStatusConstants.initial,
    serverResMsg: { message: "", color: "", bgColor: "" },
    showSerRes: false,
  };

  postDeleteAccountRequest = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const { passwordInput } = this.state;
    const data = { password: passwordInput };
    const apiUrl = "http://localhost:8081/delete-account";
    const options = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    };
    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
    const message = fetchedData.message;

    if (response.status === 200) {
      this.setState(
        {
          serverResMsg: { color: "green", message: message, bgColor: "white" },
          apiStatus: apiStatusConstants.success,
          showSerRes: true,
        },
        this.renderSerMessage
      );
    } else {
      this.setState(
        {
          serverResMsg: { color: "red", message: message, bgColor: "white" },
          apiStatus: apiStatusConstants.failure,
          showSerRes: true,
        },
        this.renderSerMessage
      );
    }
  };

  validateForm = () => {
    const { textareaInput, passwordInput, feedbackErrMsg, passwordErrMsg } =
      this.state;

    let textareaStatus;
    let passwordStatus;

    // validate text area.
    if (textareaInput.length < 30) {
      this.setState({
        feedbackErrMsg: "*Feedback altleast contain 30 characters.",
      });
      textareaStatus = false;
    } else {
      this.setState({ feedbackErrMsg: "" });
      textareaStatus = true;
    }

    // validate password.
    if (passwordInput.length < 8) {
      this.setState({
        passwordErrMsg: "*Password atleast contain 8 characters",
      });
      passwordStatus = false;
    } else {
      this.setState({ passwordErrMsg: "" });
      passwordStatus = true;
    }

    return textareaStatus && passwordStatus; // if valid return true else will return false.
  };

  onClickDeleteMyAccountButtonPermanently = () => {
    const isFormValid = this.validateForm();
    if (isFormValid) {
      this.postDeleteAccountRequest();
    }
  };

  renderDeleteAccountButton = () => {
    return (
      <button
        title="Press to delete you todo account permanently."
        className="feedback-delete-btn"
        onClick={this.onClickDeleteMyAccountButtonPermanently}
      >
        <AiOutlineClose style={{ marginRight: "5px" }} />
        Delete My Account Permanently
      </button>
    );
  };

  onChangePasswordInput = (event) => {
    this.setState({ passwordInput: event.target.value });
  };

  renderPasswordErrMsg = () => {
    const { passwordErrMsg } = this.state;
    return <p className="feedback-error-message">{passwordErrMsg}</p>;
  };

  renderPasswordField = () => {
    const { passwordInput } = this.state;
    return (
      <div className="fb-pass-container">
        <label className="fb-pass-label">Enter Your Password</label>
        <input
          onChange={this.onChangePasswordInput}
          className="fb-pass-input"
          type="password"
          value={passwordInput}
        />
        {this.renderPasswordErrMsg()}
      </div>
    );
  };

  onChangeTextArea = (event) => {
    this.setState({ textareaInput: event.target.value });
  };

  renderFeedbackErrMsg = () => {
    const { feedbackErrMsg } = this.state;
    return <p className="feedback-error-message">{feedbackErrMsg}</p>;
  };

  renderAccountDeletedStatus = () => {
    const { serverResMsg } = this.state;
    const { message, color, bgColor } = serverResMsg;

    const divStyle = {
      backgroundColor: `${bgColor}`,
    };

    const headingStyle = {
      textAlign: "center",
      color: `${color}`,
    };
    return (
      <div style={divStyle} className="server-res-msg-container">
        <p style={headingStyle}>{message}</p>
      </div>
    );
  };

  renderSerMessage = () => {
    const { serverResMsg } = this.state;
    const { message } = serverResMsg;
    const uniqueKey = setInterval(() => {
      this.setState({ showSerRes: false });
      clearInterval(uniqueKey);
      if (message === passwordConstants.onDeletedSuccess) {
        Cookies.remove("jwt_token");
        const { history } = this.props;
        history.push("/");
      }
    }, 3000);
  };

  renderHeader = () => {
    return (
      <div className="fb-profile-header">
        <Link to="/user-profile">
          <button type="button" className="profile-header-arrow-btn">
            <BsArrowLeft />
          </button>
        </Link>
      </div>
    );
  };

  render() {
    const { textareaInput, showSerRes, serverResMsg } = this.state;
    return (
      <>
        {this.renderHeader()}

        <div className="feedback-main-container">
          <h2 className="why-heading">Why You Want To Delete Your Account ?</h2>
          <h3 className="feedback-heading">feedback</h3>
          <textarea
            value={textareaInput}
            onChange={this.onChangeTextArea}
            placeholder="Write a reason, why are you deleting your account permanently."
            autoFocus
            className="text-area"
          />
          {this.renderFeedbackErrMsg()}
          {this.renderPasswordField()}

          <p className="warning-message">
            <AiOutlineClose style={{ marginRight: "5px" }} />
            All data will be erase permanently.
          </p>
          <p className="warning-message">
            <AiOutlineClose style={{ marginRight: "5px" }} />
            You will not remain a user of this website.
          </p>
          {this.renderDeleteAccountButton()}
          {showSerRes && this.renderAccountDeletedStatus()}
        </div>
      </>
    );
  }
}

export default DeleteAccountConfirmation;
