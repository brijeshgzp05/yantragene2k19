import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Card } from 'antd'
import StartMenu from '../Menu'
import EShower from './pshower'
import './profile.css'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.loadUser = this.loadUser.bind(this)
    this.loadParticipations = this.loadParticipations.bind(this)
    this.removeparticipation = this.removeparticipation.bind(this)
    this.state = {
      doneloading: false,
      email: '',
      name: '',
      mobile: '',
      id: '',
      participatedin: []
    }
  }
  removeparticipation (id, pItem) {
    const endpoint = `/api/event/participatedin/delete/${id}/`
    const pItem1 = pItem
    const token = localStorage.getItem('token')
    let thisComp = this
    thisComp.setState({
      doneloading: true
    })
    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    }

    fetch(endpoint, lookupOptions)
      .then(function (response) {
        if (response.status === 500) {
          let oldArray = thisComp.state.participatedin
          let index = oldArray.indexOf(pItem1)
          if (index > -1) {
            oldArray.splice(index, 1)
          }
          thisComp.setState({
            participatedin: oldArray,
            doneloading: false
          })
        }
        alert('Participation removed')
        return response.json()
      }).then(function (responseData) {
      }).catch(function (error) {
      })
  }

  loadParticipations () {
    const endpoint = `/api/event/participatedin`
    const token = localStorage.getItem('token')
    let thisComp = this
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
        thisComp.setState({
          participatedin: responseData
        })
      }).catch(function (error) {
      })
  }
  loadUser () {
    const endpoint = `/api/accounts/namegetter`
    const token = localStorage.getItem('token')
    let thisComp = this
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
        thisComp.setState({
          email: responseData[0].email,
          name: responseData[0].full_name,
          mobile: responseData[0].mobile,
          id: responseData[0].id
        })
      }).catch(function (error) {
      })
  }
  componentDidMount () {
    this.loadUser()
    this.loadParticipations()
  }

  render () {
    const { email } = this.state
    const { name } = this.state
    const { mobile } = this.state
    const { doneloading } = this.state
    const { participatedin } = this.state
    return (
      <div id='profile_div'>

        {this.props.isAuthenticated === true ? '' : <Redirect to='/' />}
        <StartMenu isAuthenticated={this.props.isAuthenticated} />
        <br /><br /><br /><br />

        <center>
          <div className='col-md-6 col-md-offset-6  col-sm-10 col-sm-offset-1'>

            <div style={{ background: '#ECECEC', padding: '30px' }}>
              <Card className='profil profil_bold' title='Your details' bordered={false} style={{ width: 300 }}>
                <h4 className='profil_dark' id='pro'><b>Name</b>: {name} </h4>
                <h4 className='profil_dark' id='pro'><b>Email</b>: {email} </h4>
                <h4 className='profil_dark' id='pro'><b>Mobile</b>: {mobile}<b /></h4>
              </Card>
            </div>
            <br />
            <h3 className='profil'>Your participations:</h3>
            {doneloading === true ? <div className='spinner-border text-danger' /> : ''}
            {participatedin.length > 0
              ? participatedin.map((pItem, index) => {
                return (
                  <div>
                    <div className='well part_div'>
                      <h3 className='well_part'>Team Name: {pItem.team_name}</h3>
                      <hr />
                      <h3 className='well_part'>Event Name: {pItem.event_name}</h3>
                      <h4 className='well_part'>Member(s) :You, {pItem.other_mambers}</h4>
                      <button className='btn btn-default btn-danger' onClick={() => this.removeparticipation(pItem.id, pItem)}>Remove participation</button><br />
                    </div><br /></div>
                )
              })
              : <div className='profil'><p className='well_part '>You have Not Participated in any event yet.</p>Click <Link to='/events'>here</Link> to participate.</div>
            }

            <br />
          </div>
        </center>

      </div>
    )
  }
}

export default Profile
