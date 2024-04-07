import React, { useState } from 'react';
import './Pacientes.css';
import Register from '../../components/register'; // Adjusted the import path
import { Box, Typography, Dialog } from '@mui/material';
import SidenNav from '../../components/SideNav';
import AppHeader from '../../components/AppHeader';
import { useNavigate } from "react-router-dom";

function Pacientes() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [idCard, setIdCard] = useState(0);
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [submitted, setSubmitted] = useState(false); 
    const [isOpen, setIsOpen] = useState(false); // Added isOpen state

    const navigate = useNavigate();

    const handleSumbit = async (e) => {
        e.preventDefault();

        const body = {name, surname, phoneNumber, idCard, email, birthday}

        setName('')
        setSurname('')
        setPhoneNumber(0)
        setIdCard(0)
        setEmail('')
        setBirthday('')

        const settings = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await fetch('http://localhost:8080/landing-page/register', settings)
        .then((response) => {
            if (!response.ok){
                alert("jiji", response.status)
                console.log(response);
            }
            else{
                console.log("SE ENVIO LA INFO")
            }
            return response.json()
        }).catch(err => console.error(`Error: ${err}`))
        
        navigate("/pacientes"); // Removed location.state as it's not defined
    };

    return (
        <>
            <AppHeader />
            <Box sx={styles.container}>
                <SidenNav/>
                <div className="container">
                    <button type="button" onClick={() => setIsOpen(true)}>Agregar Paciente</button>
                    {/* Removed the incorrect use of removeUser and index */}
                </div>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="modal-content">
                        <Register /> {/* Adjusted to not pass any props as Register does not accept them */}
                    </div>
                </Dialog>
            </Box>
        </>
    );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
    container:{
      display: 'flex',
      bgcolor: 'neutral.light',
      height: 'calc(100% -64px)'
    }
}

export default Pacientes;
