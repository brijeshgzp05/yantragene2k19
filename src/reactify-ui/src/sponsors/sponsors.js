import React, { Component } from 'react'
import StartMenu from '../Menu'
import requestAnimFrame from 'requestanimationframe'
import './sponsors.css'

class Sponsors extends Component {
  render () {
    return (
      <div id='mainsponsorid'>
        <StartMenu isAuthenticated={this.props.isAuthenticated} />
        <div id='w'><canvas id='space' /></div>
        <br /><br /><br />
        <div className='sp' id='sponsorsid'>
          <div className='container'>
            <h1 style={{ 'color': 'black' }}>Our Partners</h1>
            <p />
          </div>
          <div className='container'>
            <hr className='chr' />
            <center><h3>Educational Partner</h3></center>
            <div className='row'>
              <div className='col-md-4 col-xs-12 col-centered'>
                <a href='http://www.csi-india.org/'>
                  <figure>
                    <img src={require('./csi-logo.png')} className='spl' />
                  </figure>
                </a>
              </div>
              <div className='col-md-4 col-xs-12 col-centered'>
                <a href='http://www.isteonline.in/'>
                  <figure>
                    <img src={require('./istelogo.jpg.png')} className='spl' />
                  </figure>
                </a>
              </div>
            </div>
            <hr className='chr' />
            <center><h3>WorkShop Partner</h3></center>
            <div className='row'>
              <div className='col-md-4 col-xs-12 col-centered'>
                <a href='http://www.cetpainfotech.com/'>
                  <figure>
                    <img src={require('./cetpa.png')} className='spl' />
                  </figure>
                </a>
              </div>
              <div className='col-md-4 col-xs-12 col-centered'>
                <a href='https://www.aceenggacademy.com/'>
                  <figure>
                    <img src={require('./ace.png')} className='spl' />
                  </figure>
                </a>
              </div>
              <div className='col-md-4 col-xs-12 col-centered'>
                <a href='https://www.madeeasy.in/'>
                  <figure>
                    <img src={require('./madeeasy.jpeg')} className='spl' />
                  </figure>
                </a>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4 col-xs-12 col-centered'>
                <a href='https://www.fundamakers.com/'>
                  <figure>
                    <img src={require('./fundamaker.jpeg')} className='spl' />
                  </figure>
                </a>
              </div>
            </div>
            <hr className='chr' />
            <center><h3>Food Partner</h3></center>
            <div className='row'>
              <div className='col-md-4 col-xs-12 col-centered'>
                <a href='http://www.pizza90.com/'>
                  <figure>
                    <img src={require('./pizza90.jpeg')} className='spl' />
                  </figure>
                </a>
              </div>
            </div>
            <hr className='chr' />
            <center><h3>Styling Partner</h3></center>
            <div className='row'>
              <div className='col-md-4 col-xs-12 col-centered'>
                <a href='http://jawedhabib.co.in/'>
                  <figure>
                    <img src={require('./jawedhabib.jpeg')} className='spl' />
                  </figure>
                </a>
              </div>
            </div>
            <hr className='chr' />
            <center><h3>Event Sponsors</h3></center>
            <div className='row'>
              <div className='col-md-4 col-xs-12 col-centered'>
                <a href='http://jawedhabib.co.in/'>
                  <figure>
                    <img src={require('./hpworld.jpg')} className='spl' />
                  </figure>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Sponsors
