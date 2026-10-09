import { useState, useRef } from 'react';

export default function ExplodingButton({ as: Component = "button", children, className = "", onClick, ...props }) {
    const [isExploding, setIsExploding] = useState(false);
    
    const buttonRef = useRef(null); 

    const handleClick = (e) => {
        if (buttonRef.current && buttonRef.current.getAnimations) {
            buttonRef.current.getAnimations().forEach((anim) => {
                anim.currentTime = 0;
            });
        }

        setIsExploding(true);
        
        if (onClick) {
            onClick(e); 
        }
    };

    return (
        <Component
            ref={buttonRef}
            {...props}
            className={`use-explode ${isExploding ? 'explode' : ''} ${className}`}
            onClick={handleClick}
            onAnimationEnd={() => setIsExploding(false)} 
        >
            {children}
        </Component>
    );
}