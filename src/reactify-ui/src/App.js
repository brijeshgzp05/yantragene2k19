import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import requestAnimFrame from 'requestanimationframe'
import Home from './home/home'
import Event from './event/eventList'
import EventRegistrationForm from './event/EventDetail'
import * as actions from './store/actions/auth'
import 'antd/dist/antd.css'
import GalleryList from './gallery/galleryList'
import Login from './accounts/Login'
import Signup from './accounts/Signup'
import Hello from './testing/hello'
import Sponsors from './sponsors/sponsors'
import About from './containers/about'
import Contact from './containers/Contact'
import Profile from './accounts/profile'
import PNF from './pagenotfound'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.clearLoader = this.clearLoader.bind(this)
    this.state = {
      Showloader: true
    }
  }
  clearLoader () {
    this.setState({
      Showloader: false
    })
  }

  componentDidMount () {
    setTimeout(this.clearLoader, 1000)
  }

  render () {
    const { Showloader } = this.state
    return (
      <div id='all'>
        {Showloader === true
          ? <div className='load'>
            <div className='logo2'>
              <img className='App-logo' src={require('./loader.gif')} />
            </div>
          </div>
          : ''}

        <BrowserRouter>
          <Switch>

            <Route exact path='/gallery' render={(props) => (
              <GalleryList {...this.props} />
            )} />

            <Route exact path='/about-us' render={(props) => (
              <About {...this.props} />
            )} />

            <Route exact path='/events' render={(props) => (
              <Event {...this.props} />
            )} />

            <Route exact path='/events/:slug' render={(props) => (
              <EventRegistrationForm {...this.props} />
            )} />

            <Route exact path='/login' render={(props) => (
              <Login {...this.props} />
            )} />

            <Route exact path='/profile' render={(props) => (
              <Profile {...this.props} />
            )} />

            <Route exact path='/signup' render={(props) => (
              <Signup {...this.props} />
            )} />

            <Route exact path='/' render={(props) => (
              <Home {...this.props} />
            )} />

            <Route exact path='/hello' render={(props) => (
              <Hello {...this.props} />
            )} />

            <Route exact path='/contact-us' render={(props) => (
              <Contact {...this.props} />
            )} />

            <Route exact path='/sponsors' render={(props) => (
              <Sponsors {...this.props} />
            )} />

            <Route component={PNF} />

          </Switch>
        </BrowserRouter>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null

  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
