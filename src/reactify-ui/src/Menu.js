import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './store/actions/auth'
import { Link } from 'react-router-dom'
import Notification from './containers/notifications'
import './navbar.css'

class StartMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false,
      shake: null

    }
    this.onClickButton = this.onClickButton.bind(this)
    this.getshake = this.getshake.bind(this)
    this.setShake = this.setShake.bind(this)
  }

  setShake (event) {
    this.setState({
      shake: event })
  }

  getshake (e) {
    let _textvalue = e.target.className
    console.log(_textvalue)
    this.setShake(_textvalue)
  }

  onClickButton (e) {
    this.setState({
      active: !this.state.active })
  }

  render () {
    const { isAuthenticated } = this.props
    return (
      <div>

        <nav className={`${this.state.active === true ? 'complete' : ''}`}>
          <ul>

            <h1 className='tecfest_name'><li className={`nav1 face  `} >
              <Link to='/'><img src={require('./yantragenelogo2.png')} /></Link>
            </li></h1>
            <li className={`nav5 navbarcontent face nav_t ${this.state.shake === 'nav5' ? 'face' : ''}`} onMouseOver={this.getshake}>
              <Link to='/' className='my_nav_link'>Home</Link>
            </li>
            <li className={`nav5 face ${this.state.shake === 'nav5' ? 'face' : ''}`} onMouseOver={this.getshake}><Link to='/sponsors' className='my_nav_link'>Sponsors</Link></li>

            <li className={`nav5 face ${this.state.shake === 'nav5' ? 'face' : ''}`} onMouseOver={this.getshake}>
              <Link to='#' className='my_nav_link'><Notification value='Notifications' /></Link>
            </li>

            <li className={`nav5 face ${this.state.shake === 'nav5' ? 'face' : ''}`} onMouseOver={this.getshake}><Link to='/contact-us' className='my_nav_link'>Contact us</Link></li>

            {isAuthenticated === true
              ? <div class='dropdown'>
                <li className={`nav6 face ${this.state.shake === 'nav6' ? 'face' : ''}`} onMouseOver={this.getshake}>Welcome</li>
                <div class='dropdown-content'>
                  <a href='#'><Link to='/profile' className='drop_link'>Profile</Link></a>
                  <a href='#'><Link to='#' onClick={this.props.logout} className='drop_link'>Logout</Link></a>
                </div>
              </div>
              : <li className={`nav5 face ${this.state.shake === 'nav5' ? 'face' : ''}`} onMouseOver={this.getshake}><Link to='/login' className='my_nav_link'>Login</Link></li>
            }

            <li className='menu-icon' onClick={this.onClickButton}><a href='#'>
              <div className={`burger  ${this.state.active === true ? 'close' : ''}`} ><div />
                <div />
                <div />
              </div>
            </a>
            </li>
          </ul>
        </nav>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(StartMenu)
