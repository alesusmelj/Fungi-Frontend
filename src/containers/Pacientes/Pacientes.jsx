import React, { useState } from 'react';
import './Pacientes.css';
import Register from '..//../components/register';
import { Box, Typography, Dialog } from '@mui/material';
import SidenNav from '../../components/SideNav';
import AppHeader from '../../components/AppHeader';

function Pacientes() {
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const addUser = (user) => {
        setUsers([...users, user]);
    };

    const removeUser = (index) => {
        setUsers(users.filter((_, i) => i !== index));
    };

    return (
        <>
            <AppHeader />
            <Box sx={styles.container}>
                <SidenNav/>
                <div className="container">
                    <button type="button" onClick={openModal}>Agregar Paciente</button>
                    <div className="users-container">
                        {users.map((user, index) => (
                            <div key={index} className="user-card">
                                <div className="user-info">
                                    <h3>{user.name}</h3>
                                    <p>Age: {user.age}</p>
                                </div>
                                <div className="user-actions">
                                    <button className="remove-user-btn" onClick={() => removeUser(index)}>
                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Dialog open={isOpen} onClose={closeModal}>
                        <div className="modal-content">
                            
                            <Register onAddUser={addUser} onClose={closeModal} />
                        </div>
                    </Dialog>
                </div>
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

