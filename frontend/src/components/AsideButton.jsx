function AsideButton({ title , link, icon}){
    return(
        <a href= {link} className="aside-button bright">
            <img src={`./icos/${icon}.svg`} alt="" />
            <span>{title}</span>
        </a>
    )
}

export default AsideButton
