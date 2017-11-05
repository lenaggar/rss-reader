import React from 'react'

class AddFeedForm extends React.Component {
  addFeed(feed) {
    console.log(feed)
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
                type="text"
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

export default AddFeedForm
