
export const Characters = async () => {
  let array = []
  while(array.length < 20){
      const randomNumber = Math.floor(Math.random() * 826) + 1;
      const response = await fetch(`https://rickandmortyapi.com/api/character/${randomNumber}`);
      const jsonResponse = await response.json();
      if (!array.some(obj => obj.id === jsonResponse.id)) {
        array.push(jsonResponse);
      }
      console.log(jsonResponse.results)
  }

  
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "95%",
          gap: "20px",
          justifyContent: "center",
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
