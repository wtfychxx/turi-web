import React, { ReactElement, FC } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

const Header: FC<any> = (): ReactElement => {
    return(
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Pencarian warga turi 5
                    </Typography>
                    <Button color="inherit"> Login </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header