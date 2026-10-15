function ShortsCard({id, title, thumbnail, views}){
    return(
        <>
        <a className="short-card" id={id}>
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
