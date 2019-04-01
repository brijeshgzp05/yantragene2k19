import React, { Component } from 'react'
import StartMenu from '../Menu'

class Hello extends Component {
  loadHello () {
    const endpoint = '/hello/'
    const token = localStorage.getItem('token')
    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    }
    fetch(endpoint, lookupOptions)
      .then(function (response) {
        return response.json()
      }).then(function (responseData) {
        console.log('The res data is : ', responseData)
      }).catch(function (error) {
        console.log('error', error)
      })
  }

  render () {
    return (
      <div>
        <StartMenu isAuthenticated={this.props.isAuthenticated} />
        <h1>Hello Page</h1>
        {
          this.props.isAuthenticated

            ? <div>
              <p>User is authenticated</p><br />
              <button className='btn' onClick={this.loadHello}>Load Hello</button>
            </div>

            : <h4>Not Authenticated</h4>

        }
      </div>
    )
  }
}

export default Hello
