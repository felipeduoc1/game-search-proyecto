import React, { useState } from "react";

function Home() {
  const [mensaje, setMensaje] = useState("");

  const validar = () => {
    setMensaje("Validado correctamente");
  };

  return (
    <main>
      <h1>Titulo del sitio</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <button onClick={validar}>Validar</button>
      {mensaje && <p role="status">{mensaje}</p>}
    </main>
  );
}

export default Home;