import React from 'react'
import AddFeedForm from './AddFeedForm'
import SubscriptionsMenu from './SubscriptionsMenu'
import FeedItems from './FeedItems'

const App = () => (
  <div className="container">
    <div className="side-bar">
      <div className="title">
        <h1>Rocket RSS</h1>
      </div>
      <SubscriptionsMenu />
    </div>
    <div className="main">
      <div className="add-feed">
        <div className="header">
          <h4>+ Add New Feed</h4>
        </div>
        <div className="form-container">
          <AddFeedForm />
        </div>
      </div>
      <FeedItems />
    </div>
  </div>
)

export default App
