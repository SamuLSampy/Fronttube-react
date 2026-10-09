import { useLocation, Link } from "react-router-dom"
import ExplodingButton from "./ExplodingButton"

function AsideButton({ title , link, icon}){
    const location = useLocation()
    const isActive = location.pathname === link;
    const currentIcon = isActive ? `${icon}-fill` : icon;

    return(
        <ExplodingButton as={Link} to={link} className="aside-button bright">
            <img src={`/icos/${currentIcon}.svg`} alt="" />
            <span>{title}</span>
        </ExplodingButton>
    )
}

export default AsideButton
