import { Component } from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import "./index.css";
import { FiPlus } from "react-icons/fi";
import Popup from "reactjs-popup";
import Loader from "../Loader";
import apiStatusConstants from "../apiStatusConstants";
import SearchThemeContext from "../SearchThemeContext/SearchTheme";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import { BsCheckCircleFill } from "react-icons/bs";
import popSound from "../../pop.wav";
import zipSound from "../../zip.wav";
import bellSound from "../../bellSound.wav";
import clickSound from "../../click.mp3";

const tagList = [
  { id: "ALL", tagName: "All" },
  { id: "HEALTH", tagName: "Health" },
  { id: "EDUCATION", tagName: "Education" },
  { id: "ENTERTAINMENT", tagName: "Entertainment" },
  { id: "SPORTS", tagName: "Sports" },
  { id: "TRAVEL", tagName: "Travel" },
  { id: "PERSONAL", tagName: "Personal" },
  { id: "OTHERS", tagName: "Others" },
];

const todoStatusConstants = {
  inProgress: "In Progress",
  complete: "Completed",
};

class Home extends Component {
  state = {
    todoList: [],
    selectedTagId: tagList[0].id,
    todoTitle: "",
    todoTitleErrMsg: "",
    todoDescription: "",
    todoDescriptionErrMsg: "",
    selectedTagIdInNewTodo: tagList[1].tagName,
    newTodoRes: "",
    newTodoApiStatus: apiStatusConstants.initial,
    showNewTodoRes: { status: false, color: "red" },
    allTodoApiStatus: apiStatusConstants.initial,
    allTodoResMsg: "",
    todoStatus: false,
    todoStateChangeApiStatus: apiStatusConstants.initial,
    todoStateChangeErrMsg: "",
  };

  componentDidMount() {
    this.getAllTodos();
  }

  playPopUppopSound = () => {
    const audio = new Audio(popSound);
    audio.play();
  };

  playZipSound = () => {
    const audio = new Audio(zipSound);
    audio.play();
  };

  playBellSound = () => {
    const audio = new Audio(bellSound);
    audio.play();
  };

  playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  getAllTodos = async () => {
    this.setState({ allTodoApiStatus: apiStatusConstants.inProgress });
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "http://localhost:8081/alltodos";

    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
    if (response.status === 200) {
      const allTodosList = fetchedData.all_todos;
      const updatedAllTodosList = allTodosList.map((eachObj) => ({
        id: eachObj.id,
        todoDescription: eachObj.todo_description,
        todoTag: eachObj.todo_tag,
        todoTitle: eachObj.todo_title,
        todoStatus: eachObj.todo_status,
        createdTime: eachObj.created_time,
        createdDate: eachObj.created_date,
      }));
      this.setState({
        todoList: updatedAllTodosList,
        allTodoApiStatus: apiStatusConstants.success,
      });
    } else {
      const message = fetchedData.message;
      this.setState({
        allTodoResMsg: message,
        allTodoApiStatus: apiStatusConstants.failure,
      });
    }
  };

  onChangeTodoTitle = (event) => {
    this.setState({ todoTitle: event.target.value });
  };

  onChangeTodoDescription = (event) => {
    this.setState({ todoDescription: event.target.value });
  };

  renderHeader = () => {
    return <Header />;
  };

  manufacturTag = (eachObj) => {
    const { selectedTagId } = this.state;
    const { id, tagName } = eachObj;
    const activeTagClass = id === selectedTagId ? "active-tag-class" : "";
    return (
      <li key={id}>
        <button
          title="Filter todo by tag"
          className={`tag-button ${activeTagClass}`}
          type="button"
          onClick={() => {
            this.setState({ selectedTagId: id });
            this.playClickSound();
          }}
        >
          {tagName}
        </button>
      </li>
    );
  };

  renderTagElementContainerSm = () => {
    return (
      <ul className="tag-elements-container-sm">
        {tagList.map((eachObj) => this.manufacturTag(eachObj))}
      </ul>
    );
  };

  renderTagElementContainerLg = () => {
    return (
      <ul className="tag-elements-container-lg">
        {tagList.map((eachObj) => this.manufacturTag(eachObj))}
      </ul>
    );
  };

  renderAddTodoButton = () => {
    return (
      <button title="Create New Todo" type="button" className="add-todo-button">
        <FiPlus />
      </button>
    );
  };

  renderTitleOfTodo = () => {
    const { todoTitle, todoTitleErrMsg } = this.state;
    return (
      <div className="todo-input-field-container">
        <label htmlFor="todoTitle" className="todo-label">
          Title
        </label>
        <input
          placeholder="Pay Electricity Bill."
          id="todoTitle"
          type="text"
          className="todo-input"
          value={todoTitle}
          onChange={this.onChangeTodoTitle}
        />
        <p className="todo-field-err-msg">{todoTitleErrMsg}</p>
      </div>
    );
  };

  renderDescriptionOfTodo = () => {
    const { todoDescription, todoDescriptionErrMsg } = this.state;
    return (
      <div className="todo-input-field-container">
        <label htmlFor="todoDescription" className="todo-label">
          Description
        </label>
        <input
          placeholder="I will pay utility bill today at any cost."
          id="todoDescription"
          type="text"
          className="todo-input"
          value={todoDescription}
          onChange={this.onChangeTodoDescription}
        />
        <p className="todo-field-err-msg">{todoDescriptionErrMsg}</p>
      </div>
    );
  };

  getCurrentTimeStamp = () => {
    let currentTimeStamp = new Date();
    const currentTime = currentTimeStamp.toLocaleTimeString();
    const currentDate = currentTimeStamp.toLocaleDateString();
    return { currentDate: currentDate, currentTime: currentTime };
  };

  postNewlyCreatedTodoQuery = async () => {
    this.setState({ newlyCreatedTodoApiStatus: apiStatusConstants.inProgress });
    const { todoTitle, todoDescription, selectedTagIdInNewTodo } = this.state;
    const { currentDate, currentTime } = this.getCurrentTimeStamp();

    const newTodoData = {
      todoTitle: todoTitle,
      todoDescription: todoDescription,
      todoTag: selectedTagIdInNewTodo,
      todoStatus: todoStatusConstants.inProgress,
      createdTime: currentTime,
      createdDate: currentDate,
    };

    const apiUrl = "http://localhost:8081/new-todo";
    const jwtToken = Cookies.get("jwt_token");

    const options = {
      method: "POST",
      body: JSON.stringify(newTodoData),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
    const message = fetchedData.message;

    if (response.status === 200) {
      this.setState({
        newTodoRes: message,
        newTodoApiStatus: apiStatusConstants.success,
        todoTitle: "",
        todoDescription: "",
        selectedTagIdInNewTodo: tagList[1].tagName,
        showNewTodoRes: { status: true, color: "green" },
      });
      this.showStatusFor2Seconds();
    } else {
      this.setState({
        newTodoRes: message,
        newTodoApiStatus: apiStatusConstants.failure,
        showNewTodoRes: { status: true, color: "red" },
      });
    }
  };

  getTodoFormValidationResult = () => {
    const { todoTitle, todoDescription } = this.state;
    let titleValidStatus;
    let DescriptionValidStaus;

    // Validation condition for todo title.
    if (todoTitle === "" || todoTitle.length > 20) {
      this.setState({
        todoTitleErrMsg: "Please Enter Todo.Max character limit 20",
      });
      titleValidStatus = false;
    } else {
      this.setState({ todoTitleErrMsg: "" });
      titleValidStatus = true;
    }

    // Validation condition for todo Description.
    if (todoDescription === "" || todoDescription.length > 100) {
      this.setState({
        todoDescriptionErrMsg:
          "Please Enter Description. Max character limit 100.",
      });
      DescriptionValidStaus = false;
    } else {
      this.setState({ todoDescriptionErrMsg: "" });
      DescriptionValidStaus = true;
    }

    return titleValidStatus && DescriptionValidStaus;
  };

  onClickSaveTodoButton = () => {
    const todoFormValidationResult = this.getTodoFormValidationResult();
    if (todoFormValidationResult) {
      this.postNewlyCreatedTodoQuery();
      this.getAllTodos();
    }
  };

  onChangeNewTodoTag = (event) => {
    this.setState({ selectedTagIdInNewTodo: event.target.value });
  };

  renderSelectingTagMenu = () => {
    const { selectedTagIdInNewTodo } = this.state;
    return (
      <>
        <label className="todo-label">Tags</label>
        <select
          className="todo-input margin-b10"
          value={selectedTagIdInNewTodo}
          onChange={this.onChangeNewTodoTag}
        >
          {tagList.slice(1, tagList.length).map((eachObj) => {
            const { id, tagName } = eachObj;
            return (
              <option
                className="select-tag-menu-option"
                key={id}
                value={tagName}
              >
                {tagName}
              </option>
            );
          })}
        </select>
      </>
    );
  };

  showStatusFor2Seconds = () => {
    const uniqueKey = setInterval(() => {
      this.setState({ showNewTodoRes: false });
      clearInterval(uniqueKey);
    }, 2000);
  };

  renderNoTodoView = () => {
    return (
      <div className="no-todo-view-img-container">
        <img
          src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=740&t=st=1698430428~exp=1698431028~hmac=a35d9ff5ca6210004683ca64b5be3b9d6feb147f5eda5fce884f5ea6840b643e"
          className="no-todo-view-img"
          alt="empty"
        />
        <p className="no-todo-heading">No Todos</p>
      </div>
    );
  };

  renderNewlyCreatedTodoStatus = () => {
    const { newTodoRes, showNewTodoRes } = this.state;
    const { color } = showNewTodoRes;
    return <p style={{ color: color }}>{newTodoRes}</p>;
  };

  renderAddTodoPopUp = () => {
    const { showNewTodoRes } = this.state;
    return (
      <Popup trigger={this.renderAddTodoButton()} modal nested>
        {(close) => (
          <div className="new-todo-root-container">
            <div className="new-todo-form-img-container">
              <img
                src="https://img.freepik.com/free-vector/appointment-booking-smartphone_23-2148559902.jpg?w=360&t=st=1698431551~exp=1698432151~hmac=3a39d16c55d5a6c890295f52a37131c8cef0b64de38aafba9fb3daae80e6309e"
                className="new-todo-form-img"
                alt="form"
              />
            </div>
            <div className="new-todo-main-container">
              <h1 className="create-todo-heading">Create Todo</h1>
              {this.renderTitleOfTodo()}
              {this.renderDescriptionOfTodo()}
              {this.renderSelectingTagMenu()}
              {showNewTodoRes.status && this.renderNewlyCreatedTodoStatus()}
              <div className="todo-btns-container">
                <button
                  title="To save Todo"
                  type="button"
                  className="save-todo-btn"
                  onClick={this.onClickSaveTodoButton}
                >
                  Save
                </button>
                <button
                  title="To cancel/close todo"
                  type="button"
                  className="cancel-todo-btn"
                  onClick={close}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    );
  };

  getFormattedTodoTitle = (todoTitle) => {
    return todoTitle.replace(/\w\S*/g, function (todoTitle) {
      return (
        todoTitle.charAt(0).toUpperCase() + todoTitle.substr(1).toLowerCase()
      );
    });
  };

  getFormattedTodoDescription = (todoDescription) => {
    const formattedFirstWordOfTodoDescription = todoDescription
      .split(" ")[0][0]
      .toUpperCase();
    const remainingDescriptionText = todoDescription.slice(1);
    return formattedFirstWordOfTodoDescription + remainingDescriptionText;
  };

  updateTodoListAfterTodoAltered = (todoId, updatedTodoStatus) => {
    const { todoList } = this.state;
    this.setState((prevState) => ({
      todoList: prevState.todoList.map((eachObj) => {
        if (eachObj.id === todoId) {
          return { ...eachObj, todoStatus: updatedTodoStatus };
        } else {
          return eachObj;
        }
      }),
    }));
  };

  postTodoStatusUpdateQuery = async (todoId, todoStatus) => {
    this.setState({ todoStateChangeApiStatus: apiStatusConstants.inProgress });
    const updatedTodoStatus =
      todoStatus === todoStatusConstants.inProgress
        ? todoStatusConstants.complete
        : todoStatusConstants.inProgress;

    this.updateTodoListAfterTodoAltered(todoId, updatedTodoStatus);
    const updationData = { todoStatus: updatedTodoStatus };

    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:8081/update-todo-status/?todoId=${todoId}`;
    const options = {
      method: "PATCH",
      body: JSON.stringify(updationData),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
    const message = fetchedData.message;
    if (response.status === 200) {
      this.setState({
        todoStateChangeApiStatus: apiStatusConstants.success,
        todoStateChangeErrMsg: message,
      });
    } else {
      this.setState({
        todoStateChangeApiStatus: apiStatusConstants.failure,
        todoStateChangeErrMsg: message,
      });
    }
  };

  postDeleteTodoRequestQuery = async (todoId) => {
    const apiUrl = `http://localhost:8081/delete-todo/?todoId=${todoId}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    };

    const response = await fetch(apiUrl, options);
    console.log(response);
  };

  onClickDeleteTodoButton = (todoId) => {
    const { todoList } = this.state;
    this.setState((prevState) => ({
      todoList: prevState.todoList.filter((eachObj) => eachObj.id !== todoId),
    }));

    this.postDeleteTodoRequestQuery(todoId);
  };

  renderTodo = (filteredTodoList) => {
    return (
      <ul className="todo-elements-ul-container">
        {filteredTodoList.map((eachObj) => {
          const {
            id,
            todoDescription,
            todoTag,
            todoTitle,
            todoStatus,
            createdTime,
            createdDate,
          } = eachObj;

          const strikeThroughClass =
            todoStatus === todoStatusConstants.complete ? "strike-title" : "";
          return (
            <li className="todo-list-item" key={id}>
              <div className="main-todo-item">
                <h4 className={`todo-title ${strikeThroughClass}`}>
                  {this.getFormattedTodoTitle(todoTitle)}
                </h4>
                <p className="todo-tag">{todoTag}</p>
                <details className="details-container">
                  <summary>Description</summary>
                  <p className="todo-description">
                    {this.getFormattedTodoDescription(todoDescription)}
                  </p>
                </details>
                <div className="todo-date-time-container">
                  <p className="created-date">
                    <span className="date-time-span">Created Date: </span>
                    {createdDate}
                  </p>
                  <p className="created-time">
                    <span className="date-time-span">Created Time: </span>
                    {createdTime}
                  </p>
                </div>
                <div className="todo-info-container">
                  <input
                    title={
                      todoStatus === todoStatusConstants.inProgress
                        ? "Mark as completed."
                        : "Mark as In progress."
                    }
                    checked={todoStatus === todoStatusConstants.complete}
                    className="todo-status-input"
                    type="checkbox"
                    onChange={() => {
                      this.postTodoStatusUpdateQuery(
                        id,
                        todoStatus,
                        filteredTodoList
                      );
                      todoStatus !== todoStatusConstants.complete &&
                        this.playBellSound();
                    }}
                  />
                  <p
                    className={`${"todo-completion-status"} ${
                      todoStatus === todoStatusConstants.inProgress &&
                      "blue-color"
                    }`}
                  >
                    {todoStatus}
                    {todoStatus === todoStatusConstants.inProgress ? (
                      "..."
                    ) : (
                      <BsCheckCircleFill style={{ marginLeft: "5px" }} />
                    )}
                  </p>
                  <button
                    title="Delete todo"
                    type="button"
                    className="del-todo-btn"
                    onClick={() => {
                      this.onClickDeleteTodoButton(id);
                      this.playPopUppopSound();
                    }}
                  >
                    <FaTrashCanArrowUp />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  renderTodoElementsContainer = (filteredTodoList) => {
    const { allTodoApiStatus } = this.state;
    return (
      <div className="todo-elements-container">
        {this.renderAddTodoButton()}
        {filteredTodoList.length === 0 &&
          allTodoApiStatus === apiStatusConstants.success &&
          this.renderNoTodoView()}
        {allTodoApiStatus === apiStatusConstants.inProgress && <Loader />}
        {allTodoApiStatus === apiStatusConstants.success &&
          this.renderTodo(filteredTodoList)}
      </div>
    );
  };

  renderHomeBody = (filteredTodoList) => {
    return (
      <div className="home-body-container">
        {this.renderTagElementContainerSm()}
        {this.renderTagElementContainerLg()}
        {this.renderTodoElementsContainer(filteredTodoList)}
        {this.renderAddTodoPopUp()}
      </div>
    );
  };

  render() {
    const { selectedTagId, todoList } = this.state;
    return (
      <SearchThemeContext.Consumer>
        {(value) => {
          const { searchInput } = value;
          const selectedTagObj = tagList.filter(
            (eachObj) => eachObj.id === selectedTagId
          );
          const selectedTag = selectedTagObj[0].tagName;

          let filteredTodoList;
          if (selectedTag === tagList[0].tagName) {
            filteredTodoList = todoList.filter((eachTodo) =>
              eachTodo.todoTitle
                .toLowerCase()
                .includes(searchInput.toLowerCase())
            );
          } else {
            filteredTodoList = todoList.filter(
              (eachTodo) =>
                eachTodo.todoTag === selectedTag &&
                eachTodo.todoTitle
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
            );
          }

          return (
            <div className="home-main-container">
              {this.renderHeader()}
              {this.renderHomeBody(filteredTodoList)}
            </div>
          );
        }}
      </SearchThemeContext.Consumer>
    );
  }
}

export default Home;
