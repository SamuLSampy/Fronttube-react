import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import './assets/css/global.css'

import Header from './components/Header'
import SideBar from './components/SideBar'
import TagsBar from "./components/TagsBar"
import VideoCard from './components/VideoCard'
import Home from './components/Home'
import SearchResults from './components/SearchResults';

function App() {

  return (
    <BrowserRouter>
      <div className="app-layout"> 
        <Header />
        <SideBar />
        <main className='video-list'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/results' element={<SearchResults />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App