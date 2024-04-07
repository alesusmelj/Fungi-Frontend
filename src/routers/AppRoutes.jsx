import Dashboard from '../containers/Dashboard/Dashboard';
import Pacientes from '../containers/Pacientes/Pacientes';
import Formularios from '../containers/Formularios/Formularios';
import { Route, Routes } from 'react-router-dom';
import Register from '../components/register';
import Login from '../components/login.jsx';
import RegisterMedic from '../components/registerMedic.jsx';
import Bot from '../components/bot.jsx';

function AppRoutes(){
    return ( <Routes>

        <Route path='/' element={<Dashboard/>} />
        <Route path='/pacientes' element={<Pacientes/>} />
        <Route path='/formularios' element={<Formularios/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/registerMedic' element={<RegisterMedic/>} />
        <Route path='/bot' element={<Bot/>} />
    </Routes> );
}

export default AppRoutes;