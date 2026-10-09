import {useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

import logo from '../../public/img/logo.png'

function Header() {
    const [termo, setTermo] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); 

  const isHome = location.pathname === "/";
  return (
    <header className={`top-bar ${isHome ? 'header-home' : 'header-search'}`}>
      <nav className='nav-up'>
        <div className="left">
          <button className='bright'>
            <img src="./icos/menu.svg" alt="Menu" />
            </button>
          <a href="/">
            <img src={logo} alt="Youtube" />
            <h1>FrontTube</h1>
          </a>
        </div>
        <div className="center">
          <div className='search-wrapper'>
            <form action="/results">
              <input type="text" className="search-bar" placeholder='Pesquisar' name='search_query'/>
              <button className="search-btn">
                <img src="./icos/search.svg" alt="" />
              </button>
            </form>
          </div>
          <button className='mic bright'>
            <img src="./icos/microphone.svg" alt="" />
          </button>
        </div>
        <div className="right">
          <button className='btn-create-account'>
            <div>
              <img src="" alt="" />
              <span>Criar</span>
            </div>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header