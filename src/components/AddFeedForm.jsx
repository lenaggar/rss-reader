import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addFeed } from './../actions/creators'

class AddFeedForm extends React.Component {
  constructor(props) {
    super(props)

    this.addFeed = this.addFeed.bind(this)
  }

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
          const feed = { name: feedName.value, url: feedUrl.value }
          this.addFeed(feed)
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
  addFeed: PropTypes.func.isRequired
}

const mapDispatch = dispatch => ({
  addFeed: feed => dispatch(addFeed(feed))
})

export default connect(undefined, mapDispatch)(AddFeedForm)
