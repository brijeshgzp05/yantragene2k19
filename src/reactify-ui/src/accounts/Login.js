import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Form, Icon, Input, Button, Spin } from 'antd';
import { Redirect, NavLink } from 'react-router-dom'
import './signup.css'
import * as actions from '../store/actions/auth'
import StartMenu from '../Menu'
  
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.email, values.password)
      }
    });
    
  }

  render() {
    let error = false
    let errorMessage='';
    if(this.props.error){
      errorMessage = <p style={{ 'color':'red' }}>Incorrect credentials</p>;
      error=true
    }
    const { getFieldDecorator } = this.props.form;
    return (

      <div id="login">
      <StartMenu isAuthenticated={this.props.isAuthenticated} />
      <br /><br /><br /><br /><br />
      {this.props.isAuthenticated===true?<Redirect to="/" />:''}
      


        {

          this.props.loading ? <Spin indicator={antIcon} /> :


          <div className="login_form_div col-lg-6 col-md-6 col-sm-10 offset-lg-3 offset-md-3 offset-sm-1">
          <br /> <br />
          <center><h1 className="login_form_title">Login</h1>{errorMessage}</center>
          <br />

          <Form onSubmit={this.handleSubmit} className="login-form">

            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
              )}
            </Form.Item>


            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>


            <Form.Item>
            <center>
              <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
                Login
              </Button>
              Or
              <NavLink style={{marginRight:'10px'}} to='/signup/'>
                signup
              </NavLink>
              </center>
            </Form.Item>

            <h3 className="forgot_password">
              <a href="#" data-toggle="tooltip" title="Contact at - yantragene2k19@gmail.com">
                Forgot password!
              </a>
            </h3>
          </Form>
          </div>
      }
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
const mapStateToProps = (state) => {
  return {
    loading:state.loading,
    error: state.error
  }
} 

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email,password) => dispatch(actions.authLogin(email,password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);