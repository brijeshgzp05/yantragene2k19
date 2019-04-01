import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import requestAnimFrame from 'requestanimationframe'
import StartMenu from '../Menu'

import './cube.css'

class Event extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentDiv: null,
      currentClass: null,
      currentHover: null,
      active: 'f1'
    }
    this.checkstate = this.checkstate.bind(this)
    this.changeContent = this.changeContent.bind(this)
  }

  checkstate (event) {
    this.setState({ currentDiv: event })
  }

  checkClass (event) {
    if (event !== 'show-undefined') {
      this.setState({ currentClass: event })
    };
  }

  checknewClass () {
    this.setState({ currentClass: null })
  }

  gotoContent () {
    window.open('https://techkriti.org/competitions')
  }

  changeContent (e) {
    let cube = this.state.currentDiv
    let try_ = cube.className
    let _class = e.target.classList[3]
    let _btnactive = e.target.classList[4]

    console.log(_btnactive)
    let showClass = 'show-' + _class
    let showClass1 = 'show-' + _class + '1'

    if (this.state.currentClass) {
      cube.classList.remove(this.state.currentClass)
    }
    if (showClass === 'show-undefined') {
      showClass = this.state.currentClass
      cube.classList.add(showClass)
    } else {
      cube.classList.add(showClass)
      this.checkClass(showClass)
      this.addClassbtn(_btnactive)
    }
  }

  addClassbtn (event) {
    this.setState({ active: event })
  }

  componentDidMount () {
    var cube = document.querySelector('.cube')
    console.log(cube)
    var elemDiv = document.querySelector('.div_space')
    this.checkstate(cube)

    var showClass = 'show-' + 'front'
    var showClass1 = 'show-' + 'front' + '1'
    cube.classList.add(showClass)
    cube.classList.add(showClass)
    this.checkClass(showClass)
  };

  render () {
    return (
      <div >
        <StartMenu isAuthenticated={this.props.isAuthenticated} />

        <div className='row' id='all'>
          <div className='col'>
            <div className='container'>
              <div className='div_space'>
                <div className={` floater  event__face event-front front f1 ${this.state.active === 'f1' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=algosense' className='elinks'>ALGOSENSE</Link></div>
                <div className={`floater event__face event-front back f2 ${this.state.active === 'f2' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=appmania' className='elinks'>APP MANIA</Link></div>
                <div className={`floater event__face event-front right f3 ${this.state.active === 'f3' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=digicanva' className='elinks'>DIGI CANVA</Link></div>
                <div className={`floater event__face event-front left f4 ${this.state.active === 'f4' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=webbit' className='elinks'>WEBBIT</Link></div>
                <div className={`floater event__face event-front top f5 ${this.state.active === 'f5' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=zumowar' className='elinks'>ZUMO WAR</Link></div>
                <div className={`floater event__face event-front bottom f6 ${this.state.active === 'f6' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=robosoccer' className='elinks'>ROBO SOCCER</Link></div>
                <div className={`floater event__face event-front right f7 ${this.state.active === 'f7' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=roborace' className='elinks'>ROBO RACE</Link></div>
                <div className={`floater event__face event-front top f15 ${this.state.active === 'f15' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=ballonfight' className='elinks'>BALLOON FIGHT</Link></div>

              </div>
            </div>
          </div>
          <center>
            <div id='try'>

              <div className='scene'>
                <div className='cube' id='cubeid'>

                  <div className='cube__face  cube__face--front'><img src={require('./Mixed Bowl.jpg')} className='img1' /></div>
                  <div className='cube__face cube__face--back'><img src={require('./hover.jpg')} className='img1' /></div>
                  <div className='cube__face cube__face--right'><img src={require('./Robogames.jpg')} className='img1' /></div>
                  <div className='cube__face cube__face--left'><img src={require('./Software Corner.jpg')} className='img1' /></div>
                  <div className='cube__face cube__face--top'><img src={require('./Take Off.jpg')} className='img1' /></div>
                  <div className='cube__face cube__face--bottom'><img src={require('./Technovation.jpg')} className='img1' /></div>

                  <div className='cube__face1 cube__face--front1' />
                  <div className='cube__face1 cube__face--back1' />
                  <div className='cube__face1 cube__face--right1' />
                  <div className='cube__face1 cube__face--left1' />
                  <div className='cube__face1 cube__face--top1' />
                  <div className='cube__face1 cube__face--bottom1' />

                </div>
              </div>
            </div>
          </center>

          <div className='col'>
            <div className='row'>
              <div className='container'>
                <div className='div_space1'>
                  <div className={`floater  event__face1 event-front1 front f8 ${this.state.active === 'f8' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=pubgmobile' className='elinks'>PUBG MOBILE</Link></div>
                  <div className={`floater event__face1 event-front1 back f9 ${this.state.active === 'f9' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=techyshot' className='elinks'>TECHY SHOT</Link></div>
                  <div className={`floater event__face1 event-front1 right f10 ${this.state.active === 'f10' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=contraption' className='elinks'>CONTRAPTION</Link></div>
                  <div className={`floater event__face1 event-front1 left f11 ${this.state.active === 'f11' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=bridgeit' className='elinks'>BRIDGE-IT</Link></div>
                  <div className={`floater event__face1 event-front1 top f12 ${this.state.active === 'f12' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=airfray' className='elinks'>AIR FRAY</Link></div>
                  <div className={`floater event__face1 event-front1 bottom f13 ${this.state.active === 'f13' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=skyrc' className='elinks'>SKY RC</Link></div>
                  <div className={`floater event__face1 event-front1 right f14 ${this.state.active === 'f14' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=hovermania' className='elinks'>HOVER MANIA</Link></div>
                  <div className={`floater event__face event-front1 front f16 ${this.state.active === 'f16' ? 'active' : ''}`} onMouseOver={this.changeContent}><Link to='/events/event=embeddedexpo' className='elinks'>EMBEDDED EXPO</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Event

//
