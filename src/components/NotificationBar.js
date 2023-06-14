import PropTypes from 'prop-types'

const NotificationBar = ({ notification }) => {
  return(
    <div>
      { notification }
    </div>
  )
}


NotificationBar.propTypes = {
  notification: PropTypes.string.isRequired
}

export default NotificationBar