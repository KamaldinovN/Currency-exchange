import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// eslint-disable-next-line
import style from "./style.css"



export default function Header({date, USD, EUR, GBP}) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className='color' position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Currency Converter
                    </Typography>
                    <Typography className="todayCurrency"  variant="h7" component="div">
                        USD: {USD}$
                    </Typography>
                    <Typography  className="todayCurrency" variant="h7" component="div">
                        EUR: {EUR}€
                    </Typography>
                    <Typography className="todayCurrency" variant="h7" component="div">
                        GBP: {GBP}£
                    </Typography>
                    <Typography  variant="h6" component="div">
                        {date?.replace(/T.*/, '')}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
