import VideoCard from "./VideoCard";

function VideoGroup({videos}){
    return(
        <div className="video-group">
            {videos.map(video =>(
                <VideoCard 
                    key={video.id} 
                    id={video.id} 
                    title={video.title}
                    thumbnail={video.thumbnail}
                    videoDuration={video.duration}
                    channelTitle={video.channelTitle}
                    channelLogo={video.channelLogo}
                    views={video.views}
                    publishedAt={video.publishedAt}/>
            ))}
        </div>
    )
}

export default VideoGroup