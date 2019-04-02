import React, { Component } from 'react'
import cookie from 'react-cookies'
import StartMenu from '../Menu'
import './contact.css'

class Contact extends Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createFeedback = this.createFeedback.bind(this)
    this.state = {
      name: null,
      email: null,
      feedback: null,
      doneloading: false
    }
  }

  createFeedback (data) {
    const endpoint = '/api/extra/contactus/create/'
    // const csrfToken = cookie.load('csrftoken')
    let thisComp = this
    // if (csrfToken !== undefined) {
    let lookupOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify(data),
      credentials: 'include'

    }
    fetch(endpoint, lookupOptions)
      .then(function (response) {
        return response.json()
      }).then(function (responseData) {
        thisComp.setState({
          name: '',
          email: '',
          feedback: '',
          doneloading: false
        })
        alert('Thank you for your feedback.')
      }).catch(function (error) {
        thisComp.setState({
          doneloading: false
        })
        alert('Try Again Error Happend')
      })
    // }
  }

  handleSubmit (event) {
    event.preventDefault()
    const data = {
      name: this.state.name,
      email: this.state.email,
      feedback: this.state.feedback
    }
    this.setState({
      doneloading: true
    })
    this.createFeedback(data)
  }
  handleInputChange (event) {
    event.preventDefault()
    let key = event.target.name
    let value = event.target.value

    this.setState({
      [key]: value
    })
  }
  gotosite (url_string) {
    const win = window.open(url_string, '_blank')
    win.focus()
  }
  render () {
    const { name } = this.state
    const { email } = this.state
    const { feedback } = this.state
    const { doneloading } = this.state
    return (
      <div id='contact'>
        <StartMenu isAuthenticated={this.props.isAuthenticated} />
        <br /><br />
        <center>

          <div className='row'>
            <div className='col-md-5 col-lg-5 col-sm-11 offset-lg-1 offset-md-1 offset-sm-1'>
              <h1 className='awesome'>Reach us</h1>
              <div className='mapouter'>
                <div className='gmap_canvas'>

                  <iframe
                    title='FGIET Map'
                    width='530'
                    height='430'
                    id='gmap_canvas'
                    src='https://maps.google.com/maps?q=feroze%20gandhi%20institute%20raebareli&t=&z=13&ie=UTF8&iwloc=&output=embed'
                    frameBorder='0'
                    scrolling='no'
                    marginHeight='0'
                    marginWidth='0'
                  />

                </div>

              </div>
            </div>
            <div className='col-md-5 col-lg-5 col-sm-11 offset-lg-1 offset-md-1 offset-sm-1 contactus'>
              <h1 className='awesome'>Contact us</h1>
              <p><strong>Email : </strong><a href='mailto:info@fgiet.ac.in'>info@fgiet.ac.in</a></p>
              <p><strong>Contact : </strong>0535-2211269, 0535-2211430</p>
              <p><strong>Website : </strong><a href='#' onClick={() => this.gotosite('http://fgiet.ac.in/')}>fgiet.ac.in</a></p>
              <h3 style={{ 'color': '#F0ECF7' }}>Your feedback : </h3>
              <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <div className='form-group'>
                    <input
                      placeholder='Your name'
                      type='text'
                      className='form-control col-md-6 col-lg-6 col-sm-10'
                      id='name' autofocus='on'
                      name='name'
                      autoComplete='off'
                      onChange={this.handleInputChange}
                      required='required'
                      value={name} />
                  </div>
                  <input
                    placeholder='Your email'
                    type='email'
                    className='form-control col-md-6 col-lg-6 col-sm-10'
                    id='email'
                    name='email'
                    autoComplete='off'
                    onChange={this.handleInputChange}
                    required='required'
                    value={email} />
                </div>

                <div className='form-group'>
                  <textarea
                    placeholder='Your opinion, suggestion or message'
                    className='form-control col-md-6 col-lg-6 col-sm-10'
                    rows='5' id='feedback'
                    name='feedback'
                    autoComplete='off'
                    onChange={this.handleInputChange}
                    required='required'
                    value={feedback} />
                </div>
                <button type='submit' className='btn btn-success'>Submit</button>
                <button type='cancel' className='btn btn-primary clear'>Clear</button>
                {doneloading === true ? <div className='spinner-border text-danger' /> : ''}

              </form>
            </div>
          </div>

        </center>

      </div>
    )
  }
}

export default Contact

// 'X-CSRFToken': csrfToken
