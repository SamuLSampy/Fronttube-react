import { useEffect, useRef } from "react"

function Sentinel({onIntersect}){
    const elementRef = useRef(null);
    useEffect(()=>{
        const observer = new IntersectionObserver((entries)=>{
            const isVisible = entries[0].isIntersecting;

            if(isVisible){
                onIntersect();
            }
        })

        if(elementRef.current){
            observer.observe(elementRef.current);
        }

        return ()=>{
            observer.disconnect();
        }
    },[onIntersect])
    return(
        <>
        <div className="sentinel" ref={elementRef} style={{height: '20px', width:'100%'}}></div>
        </>
    )
}

export default Sentinel
