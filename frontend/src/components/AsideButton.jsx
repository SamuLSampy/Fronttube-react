function AsideButton({ title , link, icon}){
    return(
        <a href= {link} className="aside-button bright">
            <img src={icon} alt="" />
            <span>{title}</span>
        </a>
    )
}

export default AsideButton
