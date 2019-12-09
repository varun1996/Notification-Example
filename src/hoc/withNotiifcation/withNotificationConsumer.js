import React from 'react'
import { NotificationContext } from './notificationContext'

const withNotificationConsumer = (WrappedComponent) => (props) => (
  <NotificationContext.Consumer>
    {options => (
      <WrappedComponent {...props} {...options} />
    )}
  </NotificationContext.Consumer>
)

export default withNotificationConsumer