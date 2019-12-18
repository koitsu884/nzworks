import React from 'react';

export default ({cover}) => {
  return (
    <div className={`spinner${cover ? " cover" : ""}`}><div className="spinner__inner"></div></div>
  )
}
