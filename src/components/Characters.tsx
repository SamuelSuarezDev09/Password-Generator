"use client";
import { useEffect, useState } from "react";

export const Characters = () => {
  const [array, setArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === "...") return ""; 
        return prevDots + ".";
      });
    }, 500); 

    return () => clearInterval(interval); 
  }, []);

  const uploadCharacters = async () => {
    const newCharacters: any[] = [];
    try {
      for (let i = 0; i < 50; ) {
        const randomIndex = Math.floor(Math.random() * 826) + 1; 
        const response = await fetch(`https://rickandmortyapi.com/api/character/${randomIndex}`);
        const jsonResponse = await response.json();

        if (!newCharacters.some(obj => obj.id == randomIndex)) {
          newCharacters.push(jsonResponse);
          setArray(newCharacters);
          i++; 
        }
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
    }

    setTimeout(() => {
      setIsLoading(false); 
    }, 4000); 
  };

  useEffect(() => {
    uploadCharacters();
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "20px" }}>
      <p
        style={{
          visibility: `${isLoading ? "visible" : "hidden"}`,
          position: "absolute",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#555",
        }}
      >
        Loading{dots}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "95%",
          gap: "20px",
          justifyContent: "center",
          visibility: `${!isLoading ? "visible" : "hidden"}`,
        }}
      >
        {array.map((character:any) => (
          <div
            key={character.id}
            style={{
              width: "280px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={character.image}
              alt={character.name}
              style={{
                width: "100%",
                height: "auto",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            />
            <div style={{ padding: "15px", textAlign: "center" }}>
              <h3 style={{ fontSize: "18px", margin: "10px 0", color: "#333" }}>{character.name}</h3>
              <p style={{ margin: "5px 0", color: "#777" }}>
                <strong>Género:</strong> {character.gender}
              </p>
              <p style={{ margin: "5px 0", color: "#777" }}>
                <strong>Tipo:</strong> {character.type || "Desconocido"}
              </p>
              <p style={{ margin: "5px 0", color: "#777" }}>
                <strong>Especie:</strong> {character.species}
              </p>
              <p
                style={{
                  margin: "5px 0",
                  fontWeight: "bold",
                  color: character.status === "Alive" ? "#4caf50" : "#f44336",
                }}
              >
                {character.status === "Alive" ? "Vivo" : "Muerto"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
