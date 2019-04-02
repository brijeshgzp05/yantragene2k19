import React, { Component } from 'react'
import cookie from 'react-cookies'
import {Form, Input, Icon, Button} from 'antd';
import { Redirect, NavLink } from 'react-router-dom'
import StartMenu from '../Menu'
import './signup.css'

class RegistrationForm extends Component {
  constructor(props){
    super(props)
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      confirmDirty: false,
      doneloading: false,
      registered:false,
    };

  }
  

  createAccount (data) {
    const endpoint = '/api/accounts/register/'
    //const csrfToken = cookie.load('csrftoken')
    const myerrorblock = document.getElementById("errorblock")
    let thisComp = this
    //if (csrfToken !== undefined) {
      let lookupOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(data),
        credentials: 'include'

      }
      fetch(endpoint, lookupOptions)
        .then(function (response) {
          if(response.status !==400){
            alert("You have successfully registered")
            thisComp.setState({
              registered:true
            })
            
          }
          return response.json()
        }).then(function (responseData) {
          
          if(myerrorblock!==null){
            myerrorblock.innerHTML = responseData.email[0]
          }
          
          thisComp.setState({
            doneloading:false
          })
        }).catch(function (error) {
          thisComp.setState({
            doneloading:false
          })
        })
    //}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let thisComp = this
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        thisComp.setState({
          doneloading:true
        })
        this.createAccount(values)
      }
    });
  }

  handleConfirmBlur = (e) => {
    let thisComp = this
    const value = e.target.value;
    thisComp.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  validateMobile = (rule,value, callback) => {
    if (value.length!==10){
      callback('Incorrect mobile number')
    }else{
      callback();
    }
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { doneloading } = this.state
    const { registered } =this.state 

    return (
      <div id="signup">

      <StartMenu isAuthenticated={this.props.isAuthenticated} />
      <br /><br /><br /><br />
      {registered===true? <Redirect to='/login' /> : ''}


      <div className="signup_form_div col-lg-6 col-md-6 col-sm-10 offset-lg-3 offset-md-3 offset-sm-1">
      <center><h1 className="signup_form_title">Sign up</h1></center>
      <Form onSubmit={this.handleSubmit}>
        <center><p id="errorblock" style={{ 'color':'red' }}></p></center>
        <Form.Item>
          {getFieldDecorator('full_name', {
            rules: [{ required: true, message: 'Please input your full name!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Full Name" />
          )}
        </Form.Item>


        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email"/>
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('mobile', {
            rules: [{ required: true, message: 'Please input your mobile number!' },
            {
              validator:this.validateMobile,
            }],
          })(
            <Input type="number"prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Mobile" />
          )}
        </Form.Item>


        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>


        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>

        <Form.Item>
          <center>
              <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
                Signup
              </Button>
              {doneloading === true ? <div className='spinner-border text-danger' /> : ''}
              Or

              <NavLink style={{marginRight:'10px'}} to='/login/'>
                login
              </NavLink>
           </center>

        </Form.Item>


      </Form>
      </div>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);


export default WrappedRegistrationForm;





// 'X-CSRFToken': csrfToken