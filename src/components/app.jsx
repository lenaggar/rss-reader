import React from 'react'
import AddFeedForm from './AddFeedForm'

const App = () => (
  <div className="container">
    <div className="side-bar">
      <div className="title">
        <h1>Rocket RSS</h1>
      </div>
      <div className="menu">
        <ul>
          <li>1dafadg</li>
          <li>2asdfsadfdfs</li>
          <li className="active">3asdfasdfad</li>
          <li>1dafadg</li>
          <li>2asdfsadfdfs</li>
          <li>3asdfasdfad</li>
          <li>1dafadg</li>
          <li>2asdfsadfdfs</li>
          <li>3asdfasdfad</li>
        </ul>
      </div>
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
      <div className="active-feed">
        <ul>
          <li>1dafadg</li>
          <li>2asdfsadfdfs</li>
          <li>3asdfasdfad</li>
          <li>1dafadg</li>
          <li>2asdfsadfdfs</li>
          <li>3asdfasdfad</li>
          <li>1dafadg</li>
          <li>2asdfsadfdfs</li>
          <li>3asdfasdfad</li>
        </ul>
      </div>
    </div>
  </div>
)

export default App
