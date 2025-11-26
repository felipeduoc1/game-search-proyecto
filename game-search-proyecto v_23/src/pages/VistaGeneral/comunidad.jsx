import Header from '../../components/Header';
import '../../styles/comunidad.css';

export default function Comunidad() {
  return (
    <>
      <Header />
      <main className="community-container">
        {/* Encabezado */}
        <section className="community-header">
          <h1>Comunidad GameSearch</h1>
          <p>Comparte experiencias, descubre grupos y conecta con otros jugadores.</p>
        </section>

        {/* Grupos */}
        <section className="community-section">
          <h2>🔥 Grupos Populares</h2>
          <div className="community-grid">
            <div className="community-card">
              <h3>Fans de Resident Evil</h3>
              <p>Discute teorías, lore y novedades de la saga.</p>
              <button className="join-btn">Unirse</button>
            </div>

            <div className="community-card">
              <h3>Retro Gamers</h3>
              <p>Comparte tus colecciones y juegos clásicos favoritos.</p>
              <button className="join-btn">Unirse</button>
            </div>

            <div className="community-card">
              <h3>Ofertas y Rebajas</h3>
              <p>Encuentra los mejores descuentos de videojuegos.</p>
              <button className="join-btn">Unirse</button>
            </div>
          </div>
        </section>

        {/* Discusiones */}
        <section className="community-section">
          <h2>💬 Últimas discusiones</h2>
          <div className="discussion-list">
            <div className="discussion-item">
              <h4>¿Cuál es tu Resident Evil favorito?</h4>
              <p>Publicado por <strong>AdaFan</strong> · 15 respuestas</p>
            </div>
            <div className="discussion-item">
              <h4>Top 5 RPGs recomendados en 2025</h4>
              <p>Publicado por <strong>CloudStrife</strong> · 9 respuestas</p>
            </div>
            <div className="discussion-item">
              <h4>Mejores tiendas retro en Latinoamérica</h4>
              <p>Publicado por <strong>RetroMaster</strong> · 12 respuestas</p>
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
