import React, { Component } from 'react'
import $ from 'jquery'
import StartMenu from '../Menu'
import Video from './videos'
import './gallery.css'

class GalleryList extends Component {
  constructor (props) {
    super(props)
    this.extractimages = this.extractimages.bind(this)
    this.loadImages = this.loadImages.bind(this)
    this.state = {
      imageList: []
    }
  }

  extractimages (imageList) {
    let thisComp = this
    let urls = []
    if (imageList.length > 0) {
      imageList.map((imageItem, index) => {
        urls.push(imageItem.img_name)
      })
      thisComp.preparegallery(urls)
    } else {
      console.log('No Images found')
    }
  }

  preparegallery (urls) {
    'use strict'
    $(document).ready(function () {
      console.log
      let rows = 4 // change this also in css
      let cols = 6 // change this also in css
      let staggerTime = 150

      // console.log(urls)
      var $gallery = $('.demo__gallery')
      var $help = $('.demo__help')
      var partsArray = []
      var reqAnimFr = (function () {
        return window.requestAnimationFrame || function (cb) {
          setTimeout(cb, 1000 / 60)
        }
      })()

      $gallery.html('')
      for (let row = 1; row <= rows; row++) {
        partsArray[row - 1] = []
        for (let col = 1; col <= cols; col++) {
          $gallery.append(`<div class="show-front demo__part demo__part-${row}-${col}" row="${row}" col="${col}"><div class="demo__part-back"><div class="demo__part-back-inner"></div></div><div class="demo__part-front"></div></div>`)
          partsArray[row - 1][col - 1] = new Part()
        }
      }

      var $parts = $('.demo__part')
      var $image = $('.demo__part-back-inner')
      var help = true

      for (let i = 0; i < $parts.length; i++) {
        $parts.find('.demo__part-front').eq(i).css('background-image', `url(${urls[i]})`)
      }

      $gallery.on('click', '.demo__part-front', function () {
        $image.css('background-image', $(this).css('background-image'))
        if (help) {
          $help.html('Click any of the tiles to get back')
          help = false
        }

        let row = +$(this).closest('.demo__part').attr('row')
        let col = +$(this).closest('.demo__part').attr('col')
        waveChange(row, col)
      })

      $gallery.on('click', '.demo__part-back', function () {
        if (!isShowingBack()) return

        $help.html(`Check out my other <a target="blank" href="https://codepen.io/kiyutink/">pens</a> and follow me on <a target="_blank" href="https://twitter.com/kiyutin_k">twitter</a>`)

        setTimeout(function () {
          for (let row = 1; row <= rows; row++) {
            for (let col = 1; col <= cols; col++) {
              partsArray[row - 1][col - 1].showing = 'front'
            }
          }
        }, staggerTime + $parts.length * staggerTime / 10)

        showFront(0, $parts.length)
      })

      function showFront (i, maxI) {
        if (i >= maxI) return
        $parts.eq(i).addClass('show-front')

        reqAnimFr(function () {
          showFront(i + 1)
        })
      }

      function isShowingBack () {
        return partsArray[0][0].showing == 'back' && partsArray[0][cols - 1].showing == 'back' && partsArray[rows - 1][0].showing == 'back' && partsArray[rows - 1][cols - 1].showing == 'back'
      }

      function Part () {
        this.showing = 'front'
      }

      function waveChange (rowN, colN) {
        if (rowN > rows || colN > cols || rowN <= 0 || colN <= 0) return
        if (partsArray[rowN - 1][colN - 1].showing == 'back') return
        $('.demo__part-' + rowN + '-' + colN).removeClass('show-front')
        partsArray[rowN - 1][colN - 1].showing = 'back'
        setTimeout(function () {
          waveChange(rowN + 1, colN)
          waveChange(rowN - 1, colN)
          waveChange(rowN, colN + 1)
          waveChange(rowN, colN - 1)
        }, staggerTime)
      }
    })
  }

  loadImages () {
    const endpoint = '/api/gallery/'
    let thisComp = this
    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(endpoint, lookupOptions)
      .then(function (response) {
        return response.json()
      }).then(function (responseData) {
        thisComp.extractimages(responseData)
      }).catch(function (error) {
        console.log('error', error)
      })
  }

  componentDidMount () {
    this.loadImages()
  }

  render () {
    return (
      <div id='gallery'>
        <StartMenu isAuthenticated={this.props.isAuthenticated} />
        <br /><br />
        <br />
        <div class='demo'>
          <br /><br />

          <div class='demo__gallery'>
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
            <div class='demo__placeholder' />
          </div>
          <br /><br /><br />

        </div>

        <br /><br />

      </div>
    )
  }
}

export default GalleryList

//         <center><h1 className='gallery_heading'>Photos</h1></center>
//         <hr className='video_hr accessory' />
