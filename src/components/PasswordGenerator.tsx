"use client";

import { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [passwords, setPasswords] = useState([]);
  const [length, setLength] = useState(8); 
  const generatePassword = (length) => {
    const characterSets = [
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",  // minúsculas
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",  // mayúsculas
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",  // números
      "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"  // símbolos
    ];

    let generatedPassword = "";
    let isUnique = false;

    while (!isUnique) { 
      generatedPassword = "";


      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSets.length);
        generatedPassword += characterSets[randomIndex];
      }

      if (!passwords.includes(generatedPassword)) {
        isUnique = true;
      }
    }

    setPasswords([...passwords, generatedPassword]);
    setPassword(generatedPassword);
  };

  const handleRangeChange = (e) => {
    const newLength = Number(e.target.value);
    setLength(newLength);
    generatePassword(newLength); 
  };

  return (
    <div className="w-screen m-0 flex flex-col items-center text-center">
      <h2 className="title">Generador de Contraseñas Seguras</h2>
      <label>Longitud de la contraseña : {length}</label>
      <input 
        className="w-11/12" 
        type="range" 
        min={1} 
        max={40} 
        value={length} 
        onChange={handleRangeChange} 
      />
      <button className="generate-button" onClick={() => generatePassword(length)}>Recargar</button>

      <div className="password-display">
        <h3 className={
          length > 0 && length < 7 ? "text-red-500" : 
          length > 6 && length < 11 ? "text-orange-500" : 
          length > 10 && length < 14 ? "text-green-300" : 
          "text-green-600"
        }>
          Contraseña Generada 
          {length > 0 && length < 7 ? "(Poco segura)" : 
           length > 6 && length < 11 ? "(Adecuada)" : 
           length > 10 && length < 14 ? "(Segura)" : 
           "(Muy segura)"}
        :</h3>
        <input 
          type="text" 
          value={password} 
          readOnly 
          className="w-screen text-center" 
        />
      </div>
    </div>
  );
};

export default PasswordGenerator;