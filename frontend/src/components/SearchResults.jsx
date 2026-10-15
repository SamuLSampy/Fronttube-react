import {useState, useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'

import api from '../services/api'
import SearchResultCard from './SearchResultCard';
import Sentinel from './Sentinel';

function SearchResults(){
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search_query") || ''

    const [pageToken, setPageToken] = useState(null)
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if (!query){
            setVideos([]);
            return
        }

        let ignore = false

        const fetchVideos = async ()=>{
            setLoading(true)
            setVideos([])
            setPageToken(null)

            try{
                const data = await api.getVideos({type: "search", query, pageToken: null})
                if (!ignore) {
                    setPageToken(data.nextPageToken);
                    setVideos(data.videos);
                }
            }
            catch(e){
                if(!ignore) console.error(e)
            } finally{
                if(!ignore) setLoading(false)
            }
        };

        fetchVideos()

        return() =>{
            ignore = true;
        }
    }, [query])
    
    const handleLoadMore = async () => {
        if (!pageToken || loading || !query) return;

        setLoading(true);
        try {
            const data = await api.getVideos({ type: "search", query, pageToken });
            setPageToken(data.nextPageToken);
            setVideos(prev => [...prev, ...data.videos]);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="results">
            {videos.map(video=>(
                <SearchResultCard 
                    key={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    videoDuration={video.duration}
                    channelTitle={video.channelTitle}
                    channelLogo={video.channelLogo}
                    views={video.views}
                    publishedAt={video.publishedAt}
                    description={video.description}
                />
            ))
            }
            <Sentinel onIntersect={handleLoadMore}/>
        </div>
    )
}

export default SearchResults