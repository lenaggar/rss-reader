import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addFeed } from './../actions/creators'

class AddFeedForm extends React.Component {
  constructor(props) {
    super(props)

    this.addFeed = this.addFeed.bind(this)
  }

  // shouldComponentUpdate(nextProps, nextState) {

  // }

  addFeed(feed) {
    this.props.addFeed(feed)
  }

  render() {
    let feedName
    let feedUrl

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (this.props.subscriptionsList.map(sub => sub.url).includes(feedUrl.value)) {
            alert("Can't add this one, you're already subscribed to it!") // eslint-disable-line
          } else {
            this.addFeed({
              name: feedName.value,
              url: feedUrl.value
            })
          }
        }}
      >
        <div className="fieldset">
          <div className="form-group">
            <label htmlFor="name">
              Feed Name:
              <input
                id="name"
                type="text"
                required
                ref={(node) => {
                  feedName = node
                }}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="url">
              Feed URL:
              <input
                id="url"
                type="url"
                required
                ref={(node) => {
                  feedUrl = node
                }}
              />
            </label>
          </div>
          <div className="form-group">
            <input type="submit" value="Add Feed" />
          </div>
        </div>
      </form>
    )
  }
}

AddFeedForm.propTypes = {
  addFeed: PropTypes.func.isRequired,
  subscriptionsList: PropTypes.arrayOf(PropTypes.object)
}

AddFeedForm.defaultProps = {
  subscriptionsList: []
}

const mapState = state => ({
  subscriptionsList: state.db.subscriptionsList
})

const mapDispatch = dispatch => ({
  addFeed: feed => dispatch(addFeed(feed))
})

export default connect(mapState, mapDispatch)(AddFeedForm)
