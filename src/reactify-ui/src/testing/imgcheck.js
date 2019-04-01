import React, { Component } from 'react'
import './ex.css'
/* import GalleryList from './gallery/galleryList'
<GalleryList /> */

class Imgcheck extends Component {
  /* componentDidMount () {
    console.log(data)
  } */
  render () {
    return (
      <div>
        <h1 className='grenne'>This is example image page.</h1>
        <img src={require('./example.jpg')} />
        <img src={require('./example2.jpg')} />
      </div>
    )
  }
}

export default Imgcheck
