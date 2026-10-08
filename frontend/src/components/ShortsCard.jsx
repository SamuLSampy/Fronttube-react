function ShortsCard({key, title, thumbnail, views}){
    return(
        <>
        <a className="short-card" id={key}>
              <div className="short-thumbnail">
                <img src={thumbnail} alt="thumbnail"  />
              </div>
              <div className="short-info">
                <span className="title">{title}</span>
                <span className="views">{views}</span>
              </div>
            </a>
        </>
    )
}

export default ShortsCard 
