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

      addNotification(message) {
        const { notifications } = this.state;
        this.setState(({ notifications }) => ({
          notifications: notifications.concat({ ...message, id: +new Date() })
        }));
      }

      onCloseNotification(id) {
        const { notifications } = this.state;

        this.setState({
          notifications: notifications.filter(
            notification => notification.id !== id
          )
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
              {notifications.map(({ message, type, id }) => {
                return (
                  <div className="notification">
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
