import ShortsCard from "./ShortsCard";

function ShortsGroup({videos}){
    return(
        <div className="shorts-group">
            <div className="shorts-title-container">
                <img src="" alt="Shorts Logo" />
                <h2 className="shorts-container-title">Shorts</h2>
            </div>
            <div className="shorts-list">
                {videos.map(video =>(
                    <ShortsCard 
                        key={video.id} 
                        title={video.title}
                        thumbnail={video.thumbnail}
                        views={video.views}/>
                ))}
            </div>
        </div>
    )
}

export default ShortsGroup