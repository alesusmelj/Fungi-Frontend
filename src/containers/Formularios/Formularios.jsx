import React, { useState, useEffect } from 'react';
import { Box, Select, MenuItem } from '@mui/material';
import './formulario.css';
import SidenNav from '../../components/SideNav';
import AppHeader from '../../components/AppHeader';

function Formularios() {
    const [questions, setQuestions] = useState([
        { question: '', answers: [] }
    ]);
    const [selectedOption, setSelectedOption] = useState('');
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:8080/medic/get-patients?doctorId=1');
                if (!response.ok) {
                    throw new Error('Error al obtener los pacientes');
                }
                const data = await response.json();
                setPatients(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPatients();
    }, []);

    const addQuestion = () => {
        setQuestions([...questions, { question: '', answers: [] }]);
    };

    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const addAnswer = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers.push('');
        setQuestions(newQuestions);
    };

    const removeAnswer = (questionIndex, answerIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers.splice(answerIndex, 1);
        setQuestions(newQuestions);
    };

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].question = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (questionIndex, answerIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers[answerIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const qars = questions.map(question => ({
            question: question.question,
            possibleAnswers: question.answers
        }));

        const formData = {
            qars,
            doctorId: 1,
            patientId: selectedOption
        };

        try {
            const response = await fetch('http://localhost:8080/form/createForm', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            window.location.reload();

        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
           
        }
    };

    return (
        <>
            <AppHeader />
            <Box sx={styles.container}>
                <SidenNav/>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="buttons-container">
                            <button type="button" onClick={addQuestion}>Agregar Pregunta</button>
                            <Select
                                value={selectedOption}
                                onChange={handleDropdownChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="" disabled>
                                    <em>Selecciona un paciente</em>
                                </MenuItem>
                                {patients.map(patient => (
                                    <MenuItem key={patient.id} value={patient.id}>
                                        {patient.name} {patient.surname}
                                    </MenuItem>
                                ))}
                            </Select>
                            <button type="submit">Enviar</button>
                        </div>
                        <div className="questions-container">
                            {questions.map((question, questionIndex) => (
                                <div key={questionIndex} className="question-box">
                                    <div className="question-input">
                                        <input
                                            type="text"
                                            className="question-input2"
                                            value={question.question}
                                            placeholder={`Pregunta ${questionIndex + 1}`}
                                            onChange={(event) => handleQuestionChange(questionIndex, event)}
                                        />
                                        <button className="remove-answer-btn" onClick={() => removeQuestion(questionIndex)}>
                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    {question.answers.map((answer, answerIndex) => (
                                        <div key={answerIndex} className="answer-input-container">
                                            <input
                                                className="question-input2"
                                                type="text"
                                                value={answer}
                                                placeholder={`Respuesta ${answerIndex + 1}`}
                                                onChange={(event) => handleAnswerChange(questionIndex, answerIndex, event)}
                                            />
                                            <button className="remove-answer-btn" onClick={() => removeAnswer(questionIndex, answerIndex)}>
                                                <i className="fa fa-times" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    ))}
                                    <button className="add-answer-btn" type="button" onClick={() => addAnswer(questionIndex)}>
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </form>
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

export default Formularios;
