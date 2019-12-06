import React, { Component } from "react";
import Notification from "./Notification";
import "./withNotification.css";

const withNotification = (NotificationComponent = Notification) => {
  return WrappedComponent => {
    return class WithNotification extends Component {
      constructor(props) {
        super(props);
        this.state = {
          notifications: []
        };
        this.addNotification = this.addNotification.bind(this);
        this.onCloseNotification = this.onCloseNotification.bind(this);
        this.intervalIDs = {};
      }

      addNotification(payload) {
        const notificationId = +new Date();
        if (typeof payload.timeInterval == "number") {
          console.log(payload.timeInterval);
          this.intervalIDs[notificationId] = setTimeout(() => {
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
        if (this.intervalIDs[id]) {
          clearTimeout(this.intervalIDs[id]);
          delete this.intervalIDs[id];
        }
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
                    <NotificationComponent message={message} type={type} />
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
