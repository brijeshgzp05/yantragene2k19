import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './pnf.css'
class PNF extends Component {
  render () {
    const { Showloader } = this.state
    return (
      <div>

        <img class='notfound' src='https://static-fastly.hackerearth.com/static/images/404.png' />
        <p align='center'><Link className='bth' to='/'>Go to Homepage</Link></p>

      </div>
    )
  }
}

export default PNF
