import React, { useState, useEffect } from 'react';
import './bot.css';
import Breath from './breath';

function bot() {
 const [preguntas, setPreguntas] = useState([]);
 const [indicePreguntaActual, setIndicePreguntaActual] = useState(0);
 const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState({});
 const [mostrarRespiracion, setMostrarRespiracion] = useState(false);
 const [contadorRespiracion, setContadorRespiracion] = useState(70);

 useEffect(() => {
  const storedLoginData = sessionStorage.getItem('loginData');

  const loginData = JSON.parse(storedLoginData);

  // Acceder al ID del paciente
  const patientId = loginData.patient.id;
  console.log(patientId);
    const obtenerPreguntas = async () => {
      try {
        const response = await fetch(`http://localhost:8080/form/getQAR?formId=${patientId}`);
        if (!response.ok) {
          throw new Error('Error al obtener las preguntas');
        }
        const data = await response.json();
        // Agregar la pregunta inicial al principio del array
        setPreguntas([
          {
            id: 0,
            question: "¿Estás sufriendo un ataque de pánico?",
            possibleAnswers: ["Sí", "No"],
            form: { id: 1, creationDate: "2024-04-07" },
            patientResponses: [],
          },
          ...data,
        ]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    obtenerPreguntas();
 }, []);

 const seleccionarRespuesta = (preguntaId, respuesta) => {
    if (preguntaId === 0) {
      if (respuesta === "Sí") {
        setMostrarRespiracion(true);
        // Iniciar el contador
        const intervalId = setInterval(() => {
          setContadorRespiracion((prevCount) => {
            if (prevCount <= 1) {
              clearInterval(intervalId);
              setMostrarRespiracion(false);
              return 0;
            }
            return prevCount - 1;
          });
        }, 50000);
      } else {
        // Si el paciente responde "No", simplemente avanzamos a las preguntas del fetch
        setIndicePreguntaActual(1);
      }
    } else {
      // Lógica para las preguntas del fetch
      setRespuestasSeleccionadas({
        ...respuestasSeleccionadas,
        [preguntaId]: respuesta,
      });
      setIndicePreguntaActual(indicePreguntaActual + 1);
    }
 };

 // Verifica si todas las preguntas han sido respondidas
 const todasLasPreguntasRespondidas = indicePreguntaActual >= preguntas.length;

 return (
    <section className="container">
      <div className="box">
        <h1>Fungi</h1>

        <div className="chat">
          {mostrarRespiracion ? (
            <div className='resp'>
              
              <p>{contadorRespiracion}</p>
              <Breath />
              
            </div>
          ) : todasLasPreguntasRespondidas ? (
            <div>
              <p>Gracias por responder.</p>
            </div>
          ) : (
            preguntas.slice(0, indicePreguntaActual + 1).map((pregunta, index) => {
              const respuestaSeleccionada = respuestasSeleccionadas[pregunta.id];
              return (
                <div key={pregunta.id} className="blob">
                 <div className="messages">
                    <p>{pregunta.question}</p>
                 </div>
                 <div className="options">
                    {pregunta.possibleAnswers.map((respuesta) => (
                      <div
                        key={respuesta}
                        className={`option ${respuestaSeleccionada === respuesta ? 'selected' : ''}`}
                        onClick={() => seleccionarRespuesta(pregunta.id, respuesta)}
                      >
                        {respuesta}
                      </div>
                    ))}
                 </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
 );
}

export default bot;
