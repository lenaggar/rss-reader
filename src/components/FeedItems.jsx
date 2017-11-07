import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { dismissError } from './../actions/creators'

const FeedItems = ({
  activeFeed,
  subscriptions,
  addFeedIsLoading,
  error,
  errorMessage,
  dismissErr
}) => {
  if (error) {
    return (
      <div className="active-feed">
        <div className="modal error-modal">
          <h2>ERROR ! ! !</h2>
          <p>{errorMessage}</p>
          <input type="button" className="error-btn" onClick={dismissErr} value="Dismiss" />
        </div>
      </div>
    )
  }

  return (
    <div className="active-feed">
      {activeFeed ? (
        <ul>
          {subscriptions[activeFeed].items.map(item => (
            <li key={item.id}>
              <h3>
                <a target="blank" href={item.link}>
                  {item.title}
                </a>
              </h3>
              <p>Creator: {item.creator}</p>
              <p>Categories: [{item.category.join(', ')}]</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="message">
          <p>Please, select a news feed to display, or subscripe to one if you haven{"'"}t yet</p>
        </div>
      )}

      {addFeedIsLoading && (
        <div className="modal checking-modal">
          <p>Checking . . .</p>
        </div>
      )}
    </div>
  )
}

FeedItems.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeFeed: PropTypes.string.isRequired,
  addFeedIsLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  dismissErr: PropTypes.func.isRequired
}

const mapState = state => ({
  subscriptions: state.db.subscriptions,
  activeFeed: state.ui.activeFeed,
  addFeedIsLoading: state.ui.addFeedIsLoading,
  error: state.ui.addFeedHasErrored.didntIt,
  errorMessage: state.ui.addFeedHasErrored.errorMessage
})

const mapDispatch = dispatch => ({
  dismissErr: () => dispatch(dismissError())
})

export default connect(mapState, mapDispatch)(FeedItems)
