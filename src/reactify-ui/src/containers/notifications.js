import React, { Component } from 'react'
import './notifications.css'

class Notification extends Component {
  render () {
    const { value } = this.props
    return (
      <div>
        <ul className='notify'>
          <li>
            <p>{value}</p>
            <ul>
              <li>
                <a href='#'>Registrations started from 1st of April.</a>
              </li>
              <li>
                <a href='#'>No accomodations and mess charges for outsiders.</a>
              </li>
              <li>
                <a href='#'>Event Algosense will be conducted on Codechef.For more details refer website.</a>
              </li>
              <li>
                <a href='#'>In Embedded expo event, candidates who requires AC power supply they must come with their own extension board.</a>
              </li>
              <li>
                <a href='#' />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default Notification
