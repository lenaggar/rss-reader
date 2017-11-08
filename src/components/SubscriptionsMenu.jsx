import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getActiveFeedId, getSubscriptionsList } from './../reducers'
import { changeActiveFeed, removeFeed } from './../actions/creators'

class SubscriptionsMenu extends React.Component {
  constructor(props) {
    super(props)

    this.showFeed = this.showFeed.bind(this)
    this.removeFeed = this.removeFeed.bind(this)
  }

  showFeed(id) {
    this.props.changeActiveFeed(id)
  }

  removeFeed(id) {
    this.props.removeFeed(id)
  }

  render() {
    const { subscriptionsList, activeFeed } = this.props

    return (
      <div className="menu">
        <ul>
          {subscriptionsList.length
            ? subscriptionsList.map(sub => (
                <li // eslint-disable-line
                  key={sub.id}
                  className={sub.id === activeFeed ? 'active' : null}
                  onClick={() => this.showFeed(sub.id)}
                >
                  <span>{sub.desiredName}</span>
                  <input
                    type="button"
                    className="remove-feed"
                    value="x"
                    onClick={(e) => {
                      e.stopPropagation()
                      this.removeFeed(sub.id)
                    }}
                  />
                </li>
              ))
            : null}
        </ul>
      </div>
    )
  }
}

SubscriptionsMenu.propTypes = {
  subscriptionsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeFeed: PropTypes.string,
  changeActiveFeed: PropTypes.func.isRequired,
  removeFeed: PropTypes.func.isRequired
}

SubscriptionsMenu.defaultProps = {
  activeFeed: ''
}

const mapState = state => ({
  subscriptionsList: getSubscriptionsList(state),
  activeFeed: getActiveFeedId(state)
})

const subsMenu = connect(mapState, {
  changeActiveFeed,
  removeFeed
})(SubscriptionsMenu)

export default subsMenu
