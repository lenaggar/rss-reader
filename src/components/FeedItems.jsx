import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const FeedItems = ({ activeFeed, subscriptions, addFeedIsLoading }) => {
  const checking = (
    <div className="checking-modal">
      <p>Checking . . .</p>
    </div>
  )

  return (
    <div className="active-feed">
      {activeFeed ? (
        <ul>
          {Object.values(subscriptions[activeFeed].rss.channel.item).map(item => (
            <li key={item.guid._}>
              <h3>
                <a target="blank" href={item.link}>
                  {item.title}
                </a>
              </h3>
              <p>Creator: {item['dc:creator']}</p>
              <p>Categories: [{Object.values(item.category).join(', ')}]</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="message">
          <p>Please, select a news feed to display, or subscripe to one if you haven{"'"}t yet</p>
        </div>
      )}

      {addFeedIsLoading && checking}
    </div>
  )
}

FeedItems.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeFeed: PropTypes.string.isRequired,
  addFeedIsLoading: PropTypes.bool.isRequired
}

const mapState = state => ({
  subscriptions: state.db.subscriptions,
  activeFeed: state.ui.activeFeed,
  addFeedIsLoading: state.ui.addFeedIsLoading
})

export default connect(mapState)(FeedItems)
