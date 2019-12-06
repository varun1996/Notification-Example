import React, { Component } from "react";
import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home">
        <button
          onClick={() =>
            this.props.addNotification({
              message: "My message",
              type: "warn",
              timeInterval: 5000
            })
          }
        >
          Show Notification
        </button>
      </div>
    );
  }
}

export default Home;
