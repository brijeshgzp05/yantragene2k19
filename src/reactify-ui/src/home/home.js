import React from 'react'
import { Link } from 'react-router-dom'
import requestAnimFrame from 'requestanimationframe'
import $ from 'jquery'
import './home.css'
import StartMenu from '../Menu'

class Myhome extends React.Component {
  load () {
    function makeTimer () {
      var endTime = new Date('9 April 2019 10:00:00 GMT+05:30')
      endTime = (Date.parse(endTime) / 1000)

      var now = new Date()
      now = (Date.parse(now) / 1000)

      var timeLeft = endTime - now

      var days = Math.floor(timeLeft / 86400)
      var hours = Math.floor((timeLeft - (days * 86400)) / 3600)
      var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60)
      var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)))

      if (days < '10') { days = '0' + days }
      if (hours < '10') { hours = '0' + hours }
      if (minutes < '10') { minutes = '0' + minutes }
      if (seconds < '10') { seconds = '0' + seconds }

      $('#days').html(days)
      $('#hours').html(hours)
      $('#minutes').html(minutes)
      $('#seconds').html(seconds)
    }

    setInterval(function () { makeTimer() }, 1000)
  }
  componentDidMount () {
    this.load()
  }
  render () {
    return (
      <div id='home_page_div'>
        <StartMenu isAuthenticated={this.props.isAuthenticated} />
        <center>
          <div className='logo456'><img className='logo123_div' src={require('./animatelogo.gif')} />
          </div></center>
        <div className='container-fluid'>

          <div className='row'>

            <div id='timer'>
              <div className='timer_div zoom_time'><p className='time_title'><span id='days' />&nbsp; days</p></div>
              <div className='timer_div zoom_time'><p className='time_title'><span id='hours' /> &nbsp;hours</p></div>
              <div className='timer_div zoom_time'><p className='time_title'><span id='minutes' />&nbsp;minutes</p></div>
              <div className='timer_div zoom_time'><p className='time_title'><span id='seconds' />&nbsp;seconds</p></div>
            </div>

          </div>
          <div className='row'>

            <div className='maindiv123'>
              <Link to='/events'>
                <div className='div123 zoom123'><img className='div_img123' src={require('./competition.jpg')} /></div>
              </Link>
              <Link to='/gallery'>
                <div className='div123 zoom123'><img className='div_img123' src={require('./gallery.jpg')} /></div>
              </Link>
              <Link to='/about-us'>
                <div className='div123 zoom123'><img className='div_img123' src={require('./aboutus.jpg')} /></div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Myhome

// var timer

//     var compareDate = new Date()
//     compareDate.setDate(compareDate.getDate() + 8) // just for this demo today + 7 days

//     timer = setInterval(function () {
//       timeBetweenDates(compareDate)
//     }, 1000)

//     function timeBetweenDates (toDate) {
//       var dateEntered = toDate
//       var now = new Date()
//       var difference = dateEntered.getTime() - now.getTime()

//       if (difference <= 0) {
//         // Timer done
//         clearInterval(timer)
//       } else {
//         var seconds = Math.floor(difference / 1000)
//         var minutes = Math.floor(seconds / 60)
//         var hours = Math.floor(minutes / 60)
//         var days = Math.floor(hours / 24)

//         hours %= 24
//         minutes %= 60
//         seconds %= 60

//         $('#days').text(days)
//         $('#hours').text(hours)
//         $('#minutes').text(minutes)
//         $('#seconds').text(seconds)
//       }
//     }
