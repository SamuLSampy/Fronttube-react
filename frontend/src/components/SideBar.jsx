import AsideButton from './AsideButton'

function SideBar(){
    return(
        <aside>
            <nav>
                <AsideButton title="Início" link="/" icon="house"/>
                <AsideButton title="Shorts" link="/shorts" icon="lightning"/>
                <AsideButton title="Inscrições" link="/feed/subscriptions" icon="tray"/>
                <AsideButton title="Você" link="/feed/you" icon="user-circle"/>
            </nav>
        </aside>
    )
}

export default SideBar
