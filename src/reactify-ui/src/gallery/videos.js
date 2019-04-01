import React from 'react'
import YouTube from 'react-youtube'

class Video extends React.Component {
  videoOnReady (event) {
    const player = event.target
    player.pauseVideo()
  }
  render () {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    }
    const { videoId } = this.props
    return (
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={this.videoOnReady}
      />
    )
  }
}

export default Video
