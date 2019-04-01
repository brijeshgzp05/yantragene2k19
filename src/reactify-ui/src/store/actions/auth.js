import React, { Component } from 'react'
import * as actionTypes from './actionTypes'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationDate => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationDate * 1000)
  }
}

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart()),
    axios.post('/login/token-generate/', {
      email: email,
      password: password
    })
      .then(res => {
        const token = res.data.token
        let full_name = ''
        let user_id = 0
        const expirationDate = new Date(new Date().getTime() + 3600)
        localStorage.setItem('token', token)

        localStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(token))
        dispatch(checkAuthTimeout(3600))
        if (res.status === 200) {
          return <Redirect to='/' />
        }
      })
      .catch(err => {
        dispatch(authFail(err))
        console.log('the error status is', err.status)
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (token === undefined) {
      dispatch(logout())
    } else {
      const expiratinDate = new Date(localStorage.getItem('expirationDate'))
      if (expiratinDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(checkAuthTimeout(expiratinDate.getTime() - new Date.getTime()) / 1000)
      }
    }
  }
}
