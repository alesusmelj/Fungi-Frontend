import { Box, Card, CardContent, Typography} from '@mui/material'

function LatestPatientCard(props){
    return ( <Card {...props}>
        <CardContent>
            <Typography variant='cardTitle'> Informes </Typography>
            <Box sx={styles.latestPatientContainer}>
                <Box sx={styles.latestPatientTop} component={'img'} src='src/assets/Top.png'/>
            </Box>
            <Typography variant='h7' sx={styles.latestPatientSubTitle}> Últimas 24hs: </Typography>
            <Box sx={styles.latestPatientStats}> 
                <Typography variant ='h7'> Completados </Typography>
                <Typography variant ='h7'> 27 </Typography>
            </Box>
            <Box sx={styles.latestPatientStats}> 
                <Typography variant ='h7'> Solicitados </Typography>
                <Typography variant ='h7'> 42 </Typography>
            </Box>
            <Box sx={styles.latestPatientStats}> 
                <Typography variant ='h7'> Porcentaje completos </Typography>
                <Typography variant ='h7'> 64% </Typography>
            </Box>
        </CardContent>
    </Card>);
}


/** @type {import("@mui/material").SxProps} */
const styles = {
    latestPatientContainer: {
        width: '100%',
        position: 'relative'
    },
    latestPatientTop:  {
        width: '70%',
        mt: 1,
        filter: 'brightness(20%)',
        display: 'block'

    },
    latestPatientTitle: {
        position: 'absolute',
        bottom: 0,
        color: 'neutral.main',
        left: 0,
        right: 0,
        textAlling: 'center',
        fontWeight: 'bold',
        fontSize: '1rem',
        mb: 2
    },
    latestPatientSubTitle:{
        color: 'neutral.normal',
        mt: 2
    },
    latestPatientStats:{
        display: 'flex',
        justifyContent: 'space-between',
        mt: 2
    }
}


export default LatestPatientCard