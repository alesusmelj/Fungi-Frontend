import React from 'react';
import SidenNav from '../../components/SideNav';
import AppHeader from '../../components/AppHeader';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material'
import LatestPatientCard from '../../components/LatestPatientCard';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';

const Home = () => {
  return (
    <>
        <AppHeader />
        <Box sx={styles.container}>
            <SidenNav />    
            <Box sx={styles.columnContainer}>
                <LatestPatientCard sx={styles.item}/>
                <Card sx={styles.item}>
                    <CardContent>
                        <Typography variant='cardTitle'> Situaciónes Urgentes </Typography>
                        <Box sx={styles.postTitleSection}>
                            <Avatar sx={styles.avatar} src="src/assets/emergencia.png"></Avatar>
                            <Typography sx={styles.postMeta}> Registrados en las ultimas </Typography>
                            <Typography sx={styles.postMeta}> 24hs</Typography>
                        </Box>
                        <Typography sx={styles.urgPercentaje}> 13% </Typography>
                        <Box sx={styles.urgFcst}>
                            <Typography sx={styles.urgFcstValue}>+2%</Typography>
                            <Typography sx={styles.urgFcstDescription}> vs promedio mensual</Typography>
                        </Box>                        
                    </CardContent>
                </Card>
                <Card sx={styles.item}>
                    <CardContent>
                        <Typography variant='cardTitle'> Llamadas de emergencia </Typography>
                        <Box sx={styles.postTitleSection}>
                            <Avatar sx={styles.avatar} src="src/assets/llamada.png"></Avatar>
                            <Typography sx={styles.postMeta}> Registrados en las ultimas </Typography>
                            <Typography sx={styles.postMeta}> 24hs</Typography>
                        </Box>
                        <Typography sx={styles.urgPercentaje}> 17% </Typography>
                        <Box sx={styles.urgFcst}>
                            <Typography sx={styles.urgFcstValue}>-5%</Typography>
                            <Typography sx={styles.urgFcstDescription}> vs promedio mensual</Typography>
                        </Box>                        
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                    <BarChart
                        width={350}
                        height={500}
                        series={[
                            { data: [2, 4, 6, 0], label: 'Críticas', id: 'pvId', stack: 'total' },
                            { data: [5, 10, 15, 3], label: 'Normal', id: 'uvId', stack: 'total' },
                        ]}
                        xAxis={[{ data: [
                            'Fratesi',
                            'Gaglia',
                            'Cort',
                            'Moraga',

                          ], scaleType: 'band' }]}
                        />
                    </CardContent>
                </Card>
            </Box>
        </Box>
    </>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle:{
      mb: 2
  },
  container:{
    display: 'flex',
    bgcolor: 'neutral.light',
    height: 'calc(100% -64px)'
  },
  columnContainer : {
      columns: '280px 3',
      maxWidth: 1400
  },
  item: {
      mb: 2
  },
  postTitleSection: {
      display: 'flex',
      alignItems:'center',
      my: 2
  },
  avatar: {
      width: '30px',
      height: 'auto',
      mr: 1
  },
  postMeta: {
      mr: 0.5,
      fontSize: '0.8rem',
      color: 'neutral.normal'
  },
  urgPercentaje:{
      color: 'red',
      textAlign: 'center',
      fontSize: '2.0rem',
      display: 'block',
      margin: 'auto'
  },
  urgFcst: {
    display: 'flex', 
    textAlign: 'center',
    margin: 'auto',     
    justifyContent: 'center', // Alinea los elementos hijos horizontalmente en el centro
    alignItems: 'center', // Alinea los elementos hijos verticalmente en el centro
    flexWrap: 'wrap', // 
    gap: '05px'
  },
  
  urgFcstValue: {
      fontSize: '1.3rem', 
  },
  
  urgFcstDescription: {
      fontSize: '0.9rem', 
  },
}
   
export default Home;