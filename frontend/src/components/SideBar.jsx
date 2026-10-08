import AsideButton from './AsideButton'

function SideBar(){
    return(
        <aside>
            <nav>
                <AsideButton title="Início" link="/"/>
                <AsideButton title="Shorts" link="/shorts"/>
                <AsideButton title="Inscrições" link="/feed/subscriptions"/>
                <AsideButton title="Você" link="/feed/you"/>
            </nav>
        </aside>
    )
}

export default SideBar
