import React, { useState, useEffect } from 'react'
import Fab from '@mui/material/Fab'
import { IoIosArrowUp } from 'react-icons/io'

const ScrollToTop = () => {
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setIsTop(window.scrollY === 0 ? true : false)
        });

        return () => {
            window.removeEventListener('scroll', () => {
                setIsTop(true)
            });
        }
    }, [isTop]);

    return (
        <div>
            {!isTop && (<div className="scroll_to_top">
                <Fab
                    size='small'
                    aria-label="scroll to top"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                    <span
                        className='scroll_to_top_span'>
                        <IoIosArrowUp />
                    </span>
                </Fab>
            </div>
            )}
        </div>
    )
}

export default ScrollToTop;
