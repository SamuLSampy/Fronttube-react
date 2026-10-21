import {useState, useEffect} from 'react';
import VideoGroup from './VideoGroup';
import ShortsGroup from './ShortsGroup';
import TagsBar from './TagsBar';
import Sentinel from './Sentinel';
import EndList from './EndList';

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
    const [hasMore, setHasMore] = useState(
        {
            long: true,
            short: true
        }
    )
  
    useEffect(() => {
        const montarTelaInicial = async () => {
            try {
                let videoList = await videoStorage.getStoredVideos("trending", 8);
                let shortList = await videoStorage.getStoredVideos("shorts", 16);

                setLayout({
                    group1: videoList.slice(0, 4),
                    group2: videoList.slice(4, 8),
                    infinite: videoList.slice(8),
                    shorts1: shortList.slice(0, 8),
                    shorts2: shortList.slice(8, 16)
                });
                
                setLoading(false);
            } catch (error) {
                console.error("Erro ao carregar vídeos iniciais", error);
            }
        };

        montarTelaInicial();
    }, []); 

    const loadMoreVideos = async ()=>{
        try{
            const newVideos = await videoStorage.getStoredVideos("trending", 20);
            if(newVideos.length > 0){
                setLayout(prevVideos => ({...prevVideos, infinite: [...prevVideos.infinite, ...newVideos]}))
                console.log("Vídeos Carregados!")
            }
        } catch(e){
            setHasMore(prevConfig => ({...prevConfig, long: false}))
            console.error("Falha ao carregar vídeos: " + e)
        }
    }

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
            <VideoGroup videos={layout.infinite} className="infinite-group"/>
            {!loading && <Sentinel onIntersect={loadMoreVideos}/>}
            {!hasMore.long && <EndList/>}
        </div>
        </>
    );
}

export default Home