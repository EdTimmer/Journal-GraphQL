import React from 'react';
import { Link } from 'react-router';

export default ({ children }) => {
  return (
    <div className="container">
      <div className="nav">
        <div className="nav-item">
          <Link to="/" style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}}>HOME</Link>
        </div>
      </div>
      {children}
    </div>
  )
}