import React from 'react'
import Typography from '@mui/material/Typography'
import { AiFillHeart } from 'react-icons/ai'
import { TbBrandReact } from 'react-icons/tb'

const Footer = () => {
    return (
        <div className="footer">
            <Typography variant="body2" gutterBottom>
                <span className="footer_span">
                    Made with <AiFillHeart className='footer_span_icon' /> and <TbBrandReact className='footer_span_icon' />
                </span>
            </Typography>
            <Typography variant="caption" gutterBottom>All rights reserved &copy; 2023</Typography>
        </div>
    )
}

export default Footer
