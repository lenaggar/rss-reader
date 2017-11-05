import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
  subscriptionsList: PropTypes.arrayOf(PropTypes.object),
  activeFeed: PropTypes.string,
  changeActiveFeed: PropTypes.func.isRequired,
  removeFeed: PropTypes.func.isRequired
}

SubscriptionsMenu.defaultProps = {
  subscriptionsList: [],
  activeFeed: ''
}

const mapState = state => ({
  subscriptionsList: state.db.subscriptionsList,
  activeFeed: state.ui.activeFeed
})

const mapDispatch = dispatch => ({
  changeActiveFeed: id => dispatch(changeActiveFeed(id)),
  removeFeed: id => dispatch(removeFeed(id))
})

export default connect(mapState, mapDispatch)(SubscriptionsMenu)
