import React, { useState, useRef } from 'react';
import './ChatbotComponent.css'; // Importa tus estilos CSS si es necesario
import { ReactMic } from 'react-mic'; // Importa la librería ReactMic para grabar audio
import { Howl } from 'howler'; // Importa la librería Howler para reproducir audio

function ChatbotComponent() {
  const [messages, setMessages] = useState([]); // Estado para almacenar los mensajes
  const [audioSrc, setAudioSrc] = useState(null); // Estado para la fuente de audio

  const micRef = useRef(null); // Referencia al componente ReactMic

  const handleSendMessage = (message) => {
    // Lógica para enviar un mensaje al chatbot y recibir respuesta
    // Agrega la respuesta a la lista de mensajes
    setMessages([...messages, { text: message, sender: 'user' }]);
    // Simulación de respuesta del chatbot
    const botResponse = 'Respuesta del chatbot';
    setMessages([...messages, { text: botResponse, sender: 'bot' }]);
    // Genera y reproduce el audio de la respuesta del chatbot
    generateAndPlayAudio(botResponse);
  };

  const generateAndPlayAudio = (text) => {
    // Lógica para generar y reproducir audio a partir del texto
    // Puedes usar librerías como 'gtts' para convertir el texto en audio
    // Por simplicidad, aquí simulamos la reproducción de audio con Howler
    const sound = new Howl({ src: ['/ruta-al-archivo-audio.mp3'] });
    sound.play();
  };

  return (
    <div className="chatbot-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(e.target.value);
              e.target.value = ''; // Limpiar el campo de entrada
            }
          }}
        />
        <button onClick={() => micRef.current.startRecording()}>Grabar</button>
        <button onClick={() => micRef.current.stopRecording()}>Detener</button>
      </div>
      {audioSrc && <audio controls src={audioSrc} />}
      <ReactMic ref={micRef} record={false} />
    </div>
  );
}

export default ChatbotComponent;
