import React, { Component } from 'react'
import './notifications.css'

class Notification extends Component {
  gotosite (url_string) {
    const win = window.open(url_string, '_blank')
    win.focus()
  }
  render () {
    const { value } = this.props
    return (
      <div>
        <ul className='notify'>
          <li>
            <p>{value}</p>
            <ul>
              <li>
                <a href='#' onClick={() => this.gotosite('https://res.cloudinary.com/dflquw48f/image/upload/v1553007007/Rule_Book_-_Yantragene_2019.pdf')}>Rule book.</a>

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
