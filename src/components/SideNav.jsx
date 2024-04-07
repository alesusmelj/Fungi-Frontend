import { Avatar, Box, Typography } from "@mui/material"
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar"
import SpaceDashboardTwoToneIcon from '@mui/icons-material/SpaceDashboardTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import { useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function SidenNav(){
    const { collapsed } = useProSidebar();

    const theme = useTheme();
    const location = useLocation();

    return( <Sidebar
        style={{
        height: '100%',
        top: 'auto'
    }}
        breakPoint="md"
        backgroundColor={theme.palette.neutral.light}
        >
            <Box sx={styles.avatarContainer}>
                <Avatar sx={styles.avatar} alt='Nombre de canal' src='src/assets/avatars/perfil.jpg'></Avatar>
                {!collapsed ? <Typography variant="body2" sx={styles.yourChannel}>Doctor Polla</Typography> : null}
                {!collapsed ?<Typography variant="overline"> Franco Feresini</Typography> : null}
            </Box>
            <Menu 
                menuItemStyles={{
                    button: ({active}) => {
                        return {
                            backgroundColor: active? theme.palette.neutral.medium : undefined
                        }
                    }
                }}>
                <MenuItem active={location.pathname === '/'} component={<Link to="/" />} icon={<SpaceDashboardTwoToneIcon />}>
                    <Typography variant="body2">Dashboard</Typography>
                </MenuItem>
                <MenuItem active={location.pathname === '/pacientes'} component={<Link to="/pacientes" />} icon={<PersonTwoToneIcon />}>
                    <Typography variant="body2">Pacientes</Typography>
                </MenuItem>
                <MenuItem active={location.pathname === '/formularios'} component={<Link to="/formularios" />} icon={<ListAltTwoToneIcon />}>
                    <Typography variant="body2">Formularios</Typography>
                </MenuItem>
            </Menu>
        </Sidebar>
    );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        my: 5
    },
    avatar: {
        width: '40%',
        height: 'auto'
    },
    yourChannel: {
        mt: 1
    }
}


export default SidenNav;