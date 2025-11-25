import Header from '../../components/Header';
import '../../styles/nosotros.css';


export default function Nosotros() {
  return (
    <>
      <Header />
      <main>
        <section id="nosotros" className="nosotros">
          <div className="contenedor">
            <h1>Nosotros</h1>
            <div className="nosotros-texto">
              <p>
                En <strong>GameSearch</strong> conectamos a coleccionistas de todo el mundo que buscan{' '}
                <strong>juegos físicos</strong>. Nuestra plataforma permite{' '}
                <em>buscar, comparar, conversar y comprar</em> de forma sencilla y segura.
              </p>
              <p>
                Funcionamos como <strong>intermediarios de confianza</strong>:{' '}
                recibimos el dinero y el juego en custodia, verificamos que todo esté en orden
                y luego realizamos el intercambio. De esta manera, garantizamos seguridad tanto
                para el comprador como para el vendedor.
              </p>
              <p>
                Nuestro objetivo es construir una <strong>comunidad global de coleccionistas</strong>,{' '}
                donde cada pieza de colección se valore y se cuide como merece.
              </p>
            </div>

            <div className="nosotros-cards">
              <div className="card">
                <h3>🌍 Conexión Global</h3>
                <p>Une coleccionistas de diferentes países con una misma pasión.</p>
              </div>
              <div className="card">
                <h3>🛡️ Seguridad</h3>
                <p>Custodiamos el dinero y los juegos hasta completar el intercambio.</p>
              </div>
              <div className="card">
                <h3>🤝 Comunidad</h3>
                <p>Fomentamos un espacio de confianza para compartir y coleccionar.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 GameSearch. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
