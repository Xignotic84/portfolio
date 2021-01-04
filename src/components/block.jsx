import React, { Component } from 'react';
function Block({ background, children }) {
  return (
    <section style={{background}}>
      <div className="content">
        {children}
      </div>
    </section>
  )
}

export default Block
