import React, { Component } from "react";
import "./withNotification.css";

const withNotification = params => {
  return WrappedComponent => {
    return class WithNotification extends Component {
      constructor(props) {
        super(props);
        this.state = {
          notifications: [{ message: "something here", type: "warn" }]
        };
        this.addNotification = this.addNotification.bind(this);
      }

      addNotification(message) {
        const { notifications } = this.state;
        this.setState(({ notifications }) => ({
          notifications: notifications.concat(message)
        }));
      }

      onCloseNotification() {
        const { notifications } = this.state;

        this.setState({
          notifications: notifications.splice(notifications.length - 1, 1)
        });
      }

      render() {
        const { notifications } = this.state;
        return (
          <>
            <WrappedComponent
              {...this.props}
              addNotification={this.addNotification}
            />
            <div className="notification-container">
              {notifications.map(({ message, type }) => {
                return (
                  <div className="notification">
                    <button
                      onClick={() => {
                        console.log("close is being fired");
                      }}
                    >
                      close
                    </button>
                    <span> {type}</span>
                    <span> {message}</span>
                  </div>
                );
              })}
            </div>
          </>
        );
      }
    };
  };
};

export default withNotification;
