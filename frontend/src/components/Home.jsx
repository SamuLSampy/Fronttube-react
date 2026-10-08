import {useState, useEffect} from 'react';
import VideoGroup from './VideoGroup';
import ShortsGroup from './ShortsGroup';
import TagsBar from './TagsBar';

import videoStorage from '../services/storage'

function Home(){
    const [layout, setLayout] = useState({
        group1: [],
        group2: [],
        infinite: [],
        shorts1: [],
        shorts2: []
    });

    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const montarTelaInicial = async () => {
            try {
                const startVideos = await videoStorage.getStoredVideos("trending", 50);
                const startShorts = await videoStorage.getStoredVideos("shorts", 50);

                setLayout({
                    group1: startVideos.slice(0, 8),
                    group2: startVideos.slice(8, 16),
                    infinite: startVideos.slice(16),
                    shorts1: startShorts.slice(0, 10),
                    shorts2: startShorts.slice(10, 20)
                });
                
                setLoading(false);
            } catch (error) {
                console.error("Erro ao carregar vídeos iniciais", error);
            }
        };
        montarTelaInicial();
    }, []); 
    return (
        <>
        <section className='tags-section'>
            <TagsBar />
        </section>
        <div className="home-container">
            
            <VideoGroup videos={layout.group1} />
            <ShortsGroup videos={layout.shorts1} />
            <VideoGroup videos={layout.group2} />
            <ShortsGroup videos={layout.shorts2} />

        </div>
        </>
    );
}

export default Home