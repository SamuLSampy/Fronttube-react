import { useEffect } from "react"
import convertTime from "../services/time"

function VideoCard({key, title, thumbnail, videoDuration, channelTitle ,channelLogo, views, publishedAt}){
    const durationFormatted = convertTime(videoDuration);
  
    return(
        <a className="video-card" id={`v${key}`}>
            <div className="video-thumbnail">
              <img src={thumbnail} alt="Thumbnail" />
              <span className="video-duration">{durationFormatted.concat}</span>
            </div>

            <div className="video-info">
              <div className="channel-logo">
                <img src={channelLogo} alt="Channel Logo" />
              </div>

              <div className="video-description">
                <span className="title">{title}</span>
                <span className="channel-name">{channelTitle}</span>

                <div className="analytics">
                  <span className="views">{views}</span>
                  <span className="diviser">•</span>
                  <span className="time">{publishedAt}</span>
                </div>
              </div>
            </div>
        </a>
    )
}

export default VideoCard
