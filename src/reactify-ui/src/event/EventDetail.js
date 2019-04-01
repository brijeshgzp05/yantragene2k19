import React from 'react'
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'
import StartMenu from '../Menu'
import './edetail.css'

class EventRegistrationForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loadEvent = this.loadEvent.bind(this)
    this.eventDesc = this.eventDesc.bind(this)
    this.showContent = this.showContent.bind(this)
    this.state = {
      team_name: null,
      other_mambers: null,
      slug: null,
      event: null,
      event_name: null,
      active: '1',
      doneloading: false

    }
  }
  loadEvent (slug) {
    const endpoint = `/api/event/${slug}`
    let thisComp = this
    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint, lookupOptions)
      .then(function (response) {
        if (response.status === 404) {
          console.log('Page not found')
        }
        return response.json()
      }).then(function (responseData) {
        thisComp.setState({
          event: responseData
        })
      }).catch(function (error) {

      })
  }

  createEvent (data) {
    const endpoint = '/api/event/participant/create/'
    const csrfToken = cookie.load('csrftoken')
    const token = localStorage.getItem('token')
    let thisComp = this
    if (csrfToken !== undefined) {
      let lookupOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token,
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(data),
        credentials: 'include'

      }
      fetch(endpoint, lookupOptions)
        .then(function (response) {
          if (response.status !== 400) {
            alert('You have successfully registered')
          }
          return response.json()
        }).then(function (responseData) {
          console.log(responseData)
          document.getElementById('errorblock').innerHTML = responseData.non_field_errors[0]
          thisComp.setState({
            doneloading: false,
            team_name: '',
            other_mambers: ''
          })
        }).catch(function (error) {
          console.log('error', error)
          thisComp.setState({
            doneloading: false,
            team_name: '',
            other_mambers: ''
          })
        })
    }
  }

  eventDesc (event) {
    this.setState({ active: event })
  }

  showContent (e) {
    let _descname = e.target.classList[0]
    this.eventDesc(_descname)
  }

  handleSubmit (event) {
    event.preventDefault()
    let thisComp = this
    const data = {
      team_name: this.state.team_name,
      other_mambers: this.state.other_mambers,
      event: this.state.event.id,
      event_name: this.state.event.ename
    }
    thisComp.setState({
      doneloading: true
    })
    if (this.state.event !== null) {
      this.createEvent(data)
    }
  }
  handleInputChange (event) {
    event.preventDefault()
    let key = event.target.name
    let value = event.target.value

    this.setState({
      [key]: value
    })
  }
  eventnamesetter () {
    setInterval(function () {
      var el = document.getElementById('blink')
      if (el.className === 'fade11') {
        el.className = 'fade11 on'
      } else {
        el.className = 'fade11'
      }
    }, 1000)
  }

  gotosite (url_string) {
    const win = window.open(url_string, '_blank')
    win.focus()
  }

  componentDidMount () {
    this.setState({
      team_name: null,
      other_mambers: null,
      slug: null,
      event: null,
      event_name: null,
      active: '1',
      doneloading: false

    })
    const myUrl = window.location.href
    const strurl = String(myUrl)
    var pos = strurl.indexOf('=')
    const slug = strurl.substr(pos + 1)
    this.setState({
      slug: slug,
      doneLoading: false
    })
    this.loadEvent(slug)
    this.eventnamesetter()
  }
  render () {
    const { team_name } = this.state
    const { other_mambers } = this.state
    const { event } = this.state
    const { doneloading } = this.state
    return (
      <div id='edetail'>
        <StartMenu isAuthenticated={this.props.isAuthenticated} />
        {event !== null

          ? <div className='container'>
            <div className='row'>
              <div className='col-md-4 offset-md-4 try'>
                <div className='event_name_div11'>
                  <h1 className='event_name_title fade11' id='blink'>{event.ename}</h1></div>

                <div className='row'>
                  <div className='col-md-12'>

                    <div className='container event_btn'>

                      <div className='row'>
                        <div className='square-box zoom'>
                          <div className='1 square-content' onMouseOver={this.showContent}>Introduction</div>
                        </div><br />
                        <div className='square-box zoom'>
                          <div className='2 square-content' onMouseOver={this.showContent}>Rules And Regulations</div>
                        </div></div>

                      <div className='row down_box'>
                        <div className='square-box zoom'>
                          <div className='3 square-content' onMouseOver={this.showContent}>Co-ordinators</div>
                        </div>
                        <div className='square-box zoom'>
                          <div className='4 square-content' onMouseOver={this.showContent}>Register</div>
                        </div>

                      </div>

                      <Link to='/events' class='my_event_btn'>Events</Link>

                    </div>

                  </div>
                </div>
              </div>

              <div className='col-md-8 col-sm-12 col-xm-12 maindiv'>

                <div className={`event_content_div ${this.state.active === '1' ? 'box11' : 'box-hide'}`}>
                  <div className='mainContent'>
                    <center><h3 className='Btn_name'>Introduction</h3></center><hr />
                    <p>{event.eintro}</p>
                  </div>
                </div>

                <div className={`event_content_div ${this.state.active === '2' ? 'box11' : 'box-hide'}`}>
                  <div className='mainContent'>
                    <center><h3 className='Btn_name'>Rules</h3></center><hr />
                    <p>{event.econtent} {event.id === 1 ? <a href='#' onClick={() => this.gotosite('http://codechef.com/AGOQ2019')}>Codechef link</a> : ''}</p></div></div>

                <div className={`event_content_div  ${this.state.active === '3' ? 'box11' : 'box-hide'}`}>
                  <div className='mainContent'>
                    <center><h3 className='Btn_name'>Co-ordinaters</h3></center><hr />

                    <div className='row'>
                      <div className='card'>
                        <img src={event.c1pic} className='event_img' alt='yantragene' /><br />
                        <p className='h1'>{event.c1name}</p>
                        <p style={{ 'color': 'black' }}><span>Contact No : {event.c1mobile}</span></p>
                        <div style={{ margin: '24px 0;' }}>
                          <a href='#'><i className='fa fa-dribbble' /></a>
                          <a href='#'><i className='fa fa-twitter' /></a>
                          <a href='#'><i className='fa fa-linkedin' /></a>
                          <a href='#'><i className='fa fa-facebook' /></a>
                        </div>

                      </div>

                      <div className='card'>
                        <img src={event.c2pic} className='event_img' /><br />
                        <p className='h1'>{event.c2name}</p>
                        <p style={{ 'color': 'black' }}><span>Contact No : {event.c2mobile}</span></p>
                        <div style={{ margin: '20px 0;' }}>
                          <a href='#'><i className='fa fa-dribbble' /></a>
                          <a href='#'><i className='fa fa-twitter' /></a>
                          <a href='#'><i className='fa fa-linkedin' /></a>
                          <a href='#'><i className='fa fa-facebook' /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`event_content_div ${this.state.active === '4' ? 'box11' : 'box-hide'}`}>
                  <div className='mainContent'>
                    <center><h3 className='Btn_name'>Register</h3></center><br />
                    <hr />
                    <p><b>Maximum Member Allowed: {event.max_size_of_team}</b></p>

                    { this.props.isAuthenticated
                      ? <form onSubmit={this.handleSubmit}>
                        <center><p id='errorblock' style={{ 'color': 'red' }} /></center>
                        <div class='form-group'>
                          <label for='team'>Team Name:</label>
                          <input
                            className='form-control col-md-6 offset-md-3 col-sm-8 offset-sm-2'
                            type='text'
                            name='team_name'
                            placeholder='Team Name'
                            onChange={this.handleInputChange}
                            required='required'
                            value={team_name} />
                        </div>
                        <div class='form-group'>
                          <label for=''>Other Members:</label>
                          <textarea
                            placeholder='Other members (ex. Brijesh Kushwaha, Kishan Yadav)'
                            className='form-control col-md-6 offset-md-3 col-sm-8 offset-sm-2'
                            rows='5'
                            id='feedback'
                            name='other_mambers'
                            autoComplete='off'
                            onChange={this.handleInputChange}
                            value={other_mambers} />
                        </div>
                        <div className='container'>
                          <button type='success' className='btn btn-success btn_space'>Submit </button>
                          <button type='clear' className='btn btn-primary btn_space'> Clear</button>
                          {doneloading === true ? <div className='spinner-border text-danger' /> : ''}
                        </div>
                      </form>
                      : <div>
                        <h1>You are not logged in</h1>
                        <Link to='/login' />
                      </div>
                    }

                  </div>

                </div>
              </div>
            </div>
          </div>
          : ''}
      </div>
    )
  }
}

export default EventRegistrationForm
