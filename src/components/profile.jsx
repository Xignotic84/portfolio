import React from 'react';

export default function Profile() {
  let [currentPage, setPage] = React.useState('switch')

  if (currentPage === 'switch') currentPage = 'software'

  const sections = {
    community: <p>I am an experienced Community Manager with numerous years managing not only Top.gg's Community but many others.</p>,
    software: <p>Skilled Full-Stack Developer with years of experience with Software and Web based projects. I've developed products from chat applications to traffic analysis and mapping.</p>,
  }

  return (
    <div className="profile-container">
      <div class="inline">
        <div className="profile">
          <div className="name-holder">
            <p className="introduction"> Hello I am</p>
            <h1 className="name"> Xignotic </h1>
            <a className="email" name="email" rel="noreferrer" href="mailto:@contact@xignotic.dev" target="_blank">contact@xignotic.dev</a>
            <hr className="underline"/>
          </div>
          <div className="socials">
            <a name="github" rel="noreferrer" href="https://github.com/Xignotic84" target="_blank"><i className="fab fa-github"/></a>
            <a name="twitter" rel="noreferrer" href="https://twitter.com/Xignotic" target="_blank"><i className="fab fa-twitter"/></a>
          </div>
        </div>
      </div>

      <div className="inline small">
        <div className="info">
          <div onClick={() => {
            setPage('software')
          }} className={`switch ${currentPage === 'software' ? 'active' : ''}`}>
            <h2> Software Developer </h2>
            {currentPage === 'software' ? <hr className="underline"/> :''}
          </div>
          <div onClick={() => {
            setPage('community')
          }} className={`switch ${currentPage === 'community' ? 'active' : ''}`}>
            <h2> Community Manager </h2>
            {currentPage === 'community' ? <hr className="underline"/> :''}

          </div>

        </div>
        <div className="description">
          {sections[currentPage]}
        </div>
      </div>
    </div>
  )
}
