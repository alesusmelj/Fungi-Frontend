import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import NotificationsTwoToneIcon from '@mui/icons-material/NotificationsTwoTone';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { useProSidebar } from 'react-pro-sidebar';

function AppHeader() {
    const { collapseSidebar, toggleSidebar, broken } = useProSidebar();

    return (
        <AppBar position='sticky' sx={styles.appBar}>
            <Toolbar>
                <IconButton onClick={() => broken ? toggleSidebar() : collapseSidebar() } color="secondary">
                    <MenuTwoToneIcon />
                </IconButton>
                <Box
                    component='img'
                    sx={styles.appLogo}
                    src='/src/assets/logo.png' />
                <Box sx={{flexGrow: 1}} />
            </Toolbar>
        </AppBar>
    );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
    appBar: {
        bgcolor: 'neutral.main'
    },
    appLogo:{
        borderRadius: 2,
        width: 80,
        ml: 2,
        cursos: 'pointer'
    }
}

export default AppHeader;