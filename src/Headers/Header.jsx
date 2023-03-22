import React from 'react'
import Typography from '@mui/material/Typography';
import "../styles.css";

const Header = () => {
    return (
        <div className="header">
            <Typography variant='h1' color='primary'>TO-DO</Typography>
            <Typography variant='h5' color='primary'>Remember Everything</Typography>
        </div>
    )
}

export default Header
