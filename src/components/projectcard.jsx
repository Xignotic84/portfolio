import React from 'react';

export default function Projectcard(props) {
  return (
    <a name={props.title} href={props.url} rel="noreferrer" target={props.url ? '_blank' : '_self'}>
      <div className='project-container'>
        <div className='img'>
          <img alt={props.title} src={`/images/${props.image}.png`}>
          </img>
        </div>
        <div className="description">
          <div className='title'>
            <h2>{props.title}</h2>
          </div>
          <div className="info">
            <p className='position'>{props.position}</p>
            <time dateTime={props.date}> {props.date}</time>
          </div>
          <div className='description'>
            <p>{props.description}</p>
          </div>
        </div>
        </div>
    </a>
  )
}
