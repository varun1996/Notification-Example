import React, { Component } from "react";
import "./withNotification.css";

const withNotification = params => {
  return WrappedComponent => {
    return class WithNotification extends Component {
      constructor(props) {
        super(props);
        this.state = {
          notifications: []
        };
        this.addNotification = this.addNotification.bind(this);
        this.onCloseNotification = this.onCloseNotification.bind(this);
      }

      addNotification(payload) {
        const notificationId = +new Date();
        if (typeof payload.timeInterval == "number") {
          console.log(payload.timeInterval);
          setTimeout(() => {
            this.onCloseNotification(notificationId);
          }, payload.timeInterval);
        }

        this.setState(({ notifications }) => ({
          notifications: notifications.concat({
            ...payload,
            id: notificationId
          })
        }));
      }

      onCloseNotification(id) {
        console.log("---onclose notiricaiton is fired", id);
        this.setState(({ notifications }) => ({
          notifications: notifications.filter(
            notification => notification.id !== id
          )
        }));
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
              {notifications.map(({ message, type, id }) => {
                return (
                  <div className="notification" key={id}>
                    <button
                      onClick={() => {
                        this.onCloseNotification(id);
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
