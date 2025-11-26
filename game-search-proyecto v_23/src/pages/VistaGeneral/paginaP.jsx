import Header from '../../components/Header';
import '../../styles/paginaP.css';

//imágenes
import zeldaImg from '../../img/Zelda.webp';
import finalFantasyImg from '../../img/Final-Fantasy.webp';
import animalCrossingImg from '../../img/Animal-Crossing.webp';
import 'bootstrap/dist/css/bootstrap.min.css'; // 

export default function PaginaP() {
  return (
    <>
      <Header />
      <main>
        {/* Sección Hero */}
        <section className="hero bg-dark text-white text-center py-5">
          <div className="container">
            <h1 className="display-4 fw-bold mb-3">Bienvenido a GameSearch</h1>
            <p className="lead mb-4">
              La comunidad global de <strong>coleccionistas de juegos físicos</strong>.  
              Busca, compara, habla y compra con total seguridad.
            </p>
            <a href="/productos" className="btn btn-primary btn-lg shadow">
              Explorar Productos
            </a>
          </div>
        </section>

        {/* Sección destacada */}
        <section className="destacados bg-light py-5">
          <div className="container">
            <h2 className="text-center fw-bold mb-5">Juegos destacados</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <img src={zeldaImg} alt="The Legend of Zelda" className="card-img-top" />
                  <div className="card-body text-center">
                    <h3 className="card-title fs-5">The Legend of Zelda: Tears of the Kingdom</h3>
                    <p className="card-text text-muted">Nintendo — Aventura / Acción</p>
                    <a href="/producto/zelda" className="btn btn-outline-primary btn-sm">Ver</a>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <img src={finalFantasyImg} alt="Final Fantasy" className="card-img-top" />
                  <div className="card-body text-center">
                    <h3 className="card-title fs-5">Final Fantasy</h3>
                    <p className="card-text text-muted">Square Enix — RPG clásico</p>
                    <a href="/producto/final-fantasy" className="btn btn-outline-primary btn-sm">Ver</a>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <img src={animalCrossingImg} alt="Animal Crossing" className="card-img-top" />
                  <div className="card-body text-center">
                    <h3 className="card-title fs-5">Animal Crossing</h3>
                    <p className="card-text text-muted">Nintendo — Simulación social</p>
                    <a href="/producto/animal-crossing" className="btn btn-outline-primary btn-sm">Ver</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
