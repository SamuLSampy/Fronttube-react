function SearchResultCard({ id, title, thumbnail, videoDuration, channelTitle, channelLogo, views, publishedAt, description }) {
    return (
        <a className="result-card" id={`v${id}`}>
            <div className="result-thumbnail">
                <img src={thumbnail} alt="Thumbnail" />
                <span className="video-result-duration">{videoDuration}</span>
            </div>

            <div className="result-info">
                <span className="title">{title}</span>

                <div className="analytics">
                    <span className="views">{views}</span>
                    <span className="diviser">•</span>
                    <span className="time">{publishedAt}</span>
                </div>

                <div className="result-channel">
                    <img src={channelLogo || ''} alt="Channel Logo" />
                    <span className="result-channel-name">{channelTitle}</span>
                </div>

                <span className="description">{description}</span>
            </div>
        </a>
    );
}

export default SearchResultCard