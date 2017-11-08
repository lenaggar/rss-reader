import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  getActiveFeedId,
  getActiveFeedObject,
  isAddFeedLoading,
  hasAddFeedErrored,
  getAddFeedErrorMessage
} from './../reducers'
import { dismissError } from './../actions/creators'

const FeedItems = ({
  activeFeedId,
  activeFeedObject,
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
      {activeFeedId ? (
        <ul>
          {activeFeedObject.items.map(item => (
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
  activeFeedId: PropTypes.string.isRequired,
  activeFeedObject: PropTypes.objectOf(PropTypes.any),
  addFeedIsLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  dismissErr: PropTypes.func.isRequired
}

FeedItems.defaultProps = {
  activeFeedObject: {}
}

const mapState = state => ({
  activeFeedId: getActiveFeedId(state),
  activeFeedObject: getActiveFeedObject(state),
  addFeedIsLoading: isAddFeedLoading(state),
  error: hasAddFeedErrored(state),
  errorMessage: getAddFeedErrorMessage(state)
})

const feedItems = connect(mapState, { dismissErr: dismissError })(FeedItems)

export default feedItems
