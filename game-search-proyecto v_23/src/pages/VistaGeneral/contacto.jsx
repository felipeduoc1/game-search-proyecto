import Header from '../../components/Header';
import '../../styles/contacto.css';

export default function Contacto() {
  return (
    <>
      <Header />
      <main className="contacto-container">
        <section id="contacto">
          <h1>Contáctanos</h1>
          <p>
            ¿Tienes dudas, sugerencias o quieres vender tu colección completa?{' '}
            En <strong>GameSearch</strong> estamos para ayudarte.
          </p>

          <form className="form-contacto">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows="5" required></textarea>
            </div>

            <button type="submit" className="btn-enviar">Enviar</button>
          </form>

          <div className="info-extra">
            <h3>📍 Información de contacto</h3>
            <p><strong>Email:</strong> contacto@gamesearch.com</p>
            <p><strong>Teléfono:</strong> +56 9 1234 5678</p>
            <p><strong>Dirección:</strong> Santiago, Chile</p>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 GameSearch. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
