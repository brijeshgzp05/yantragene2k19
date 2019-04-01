import React, { Component } from 'react'
import StartMenu from '../Menu'
import Coordinator from '../coordinators/coordinator'
import Aboutus from './aboutus'
import './about.css'

class About extends Component {
  constructor (props) {
    super(props)
    this.handleCoord = this.handleCoord.bind(this)
    this.state = {
      div: 'about'

    }
  }
  handleCoord (event) {
    event.preventDefault()
    let thisComp = this
    const div = this.state.div
    if (div === 'about') {
      thisComp.setState({
        div: 'coord'
      })
    } else {
      thisComp.setState({
        div: 'about'
      })
    }
  }
  render () {
    const { div } = this.state
    return (
      <div>
        <StartMenu isAuthenticated={this.props.isAuthenticated} />
        <button
          id='about_btn'
          onClick={this.handleCoord}
          type='button'
          class='btn btn-outline-dark'>
          {div === 'about' ? 'Coordinators' : 'About'}
        </button>

        {div === 'about'

          ? <Aboutus />
          : <Coordinator />
        }
      </div>
    )
  }
}

export default About
