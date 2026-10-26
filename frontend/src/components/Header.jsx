import {useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import ExplodingButton from './ExplodingButton';

function Header() {
  const [termo, setTermo] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleSearch = (e) => {
    e.preventDefault()
    if(termo.trim()){
      navigate(`/results?search_query=${encodeURIComponent(termo)}`)
    }
  }

  const isHome = location.pathname === "/";
  return (
    <header className={`top-bar ${isHome ? 'header-home' : 'header-search'}`}>
      <nav className='nav-up'>
        <div className="left">
          <ExplodingButton className='bright'>
            <img src="/icos/menu.svg" alt="Menu" />
          </ExplodingButton>
          <a href="/">
            <img src="/img/logo.png" alt="Youtube" />
            <h1>FrontTube</h1>
          </a>
        </div>
        <div className="center">
          <div className='search-wrapper'>
            <form onSubmit={handleSearch}>
              <input type="text" className="search-bar" placeholder='Pesquisar' name='search_query' value={termo} onChange={(e) => setTermo(e.target.value)}/>
              <button className="search-btn" type='submit'>
                <img src="./icos/search.svg" alt="" />
              </button>
            </form>
          </div>
          <ExplodingButton className='mic bright'>
            <img src="./icos/microphone.svg" alt="" />
          </ExplodingButton>
        </div>
        <div className="right">
          <ExplodingButton className='btn-create-account'>
            <div>
              <span>Criar</span>
            </div>
          </ExplodingButton>
        </div>
      </nav>
    </header>
  )
}

export default Header