// ✅ Importar imágenes
import EldenRing from '../img/Elden-Ring.webp';
import Zelda from '../img/Zelda.webp';
import CODMW from '../img/COD-MW.jpg';
import FIFA23 from '../img/FIFA-23.jpg';
import Cyberpunk from '../img/Cyberpunk.webp';
import Horizon from '../img/Horizon.webp';
import Halo from '../img/Halo.jpg';
import AnimalCrossing from '../img/Animal-Crossing.webp';
import FinalFantasy from '../img/Final-Fantasy.webp';
import Starfield from '../img/Starfield.jpg';
import ZeldaEchoes from '../img/Zelda-Echoes.webp';
import SpiderMan from '../img/SpiderMan.avif';

// ✅ Lista de productos
export const productos = [
  {
    id: 1,
    nombre: 'Elden Ring',
    descripcion: 'Un vasto mundo lleno de misterios y desafíos.',
    precio: 59990,
    plataforma: 'ps5',
    categoria: 'rpg',
    imagen: EldenRing,
  },
  {
    id: 2,
    nombre: 'The Legend of Zelda: Tears of the Kingdom',
    descripcion: 'Explora los cielos y las profundidades de Hyrule.',
    precio: 69990,
    plataforma: 'switch',
    categoria: 'aventura',
    imagen: Zelda,
  },
  {
    id: 3,
    nombre: 'Call of Duty: Modern Warfare',
    descripcion: 'Acción táctica moderna y frenética.',
    precio: 54990,
    plataforma: 'xbox',
    categoria: 'accion',
    imagen: CODMW,
  },
  {
    id: 4,
    nombre: 'FIFA 23',
    descripcion: 'El simulador de fútbol más realista.',
    precio: 49990,
    plataforma: 'pc',
    categoria: 'deportes',
    imagen: FIFA23,
  },
  {
    id: 5,
    nombre: 'Cyberpunk 2077',
    descripcion: 'Vive una historia futurista en Night City.',
    precio: 39990,
    plataforma: 'pc',
    categoria: 'accion',
    imagen: Cyberpunk,
  },
  {
    id: 6,
    nombre: 'Horizon Forbidden West',
    descripcion: 'Acompaña a Aloy en una nueva aventura postapocalíptica.',
    precio: 64990,
    plataforma: 'ps5',
    categoria: 'aventura',
    imagen: Horizon,
  },
  {
    id: 7,
    nombre: 'Halo Infinite',
    descripcion: 'El Jefe Maestro regresa para enfrentar una nueva amenaza.',
    precio: 59990,
    plataforma: 'xbox',
    categoria: 'accion',
    imagen: Halo,
  },
  {
    id: 8,
    nombre: 'Animal Crossing: New Horizons',
    descripcion: 'Crea tu isla paradisíaca y relájate.',
    precio: 49990,
    plataforma: 'switch',
    categoria: 'simulacion',
    imagen: AnimalCrossing,
  },
  {
    id: 9,
    nombre: 'Final Fantasy XVI',
    descripcion: 'Una épica historia de reinos y cristales.',
    precio: 74990,
    plataforma: 'ps5',
    categoria: 'rpg',
    imagen: FinalFantasy,
  },
  {
    id: 10,
    nombre: 'Starfield',
    descripcion: 'Explora la galaxia en esta aventura espacial de Bethesda.',
    precio: 69990,
    plataforma: 'pc',
    categoria: 'aventura',
    imagen: Starfield,
  },
  {
    id: 11,
    nombre: 'The Legend of Zelda: Echoes of Time',
    descripcion: 'Una nueva entrega con mecánicas temporales únicas.',
    precio: 79990,
    plataforma: 'switch',
    categoria: 'aventura',
    imagen: ZeldaEchoes,
  },
  {
    id: 12,
    nombre: 'Spider-Man 2',
    descripcion: 'Balanceate entre los edificios de Nueva York con Peter y Miles.',
    precio: 74990,
    plataforma: 'ps5',
    categoria: 'accion',
    imagen: SpiderMan,
  },
];

// ✅ Categorías (por si luego quieres filtrar)
export const categorias = {
  'mas-buscados': [1, 2, 3, 5, 7],
  'nuevos-lanzamientos': [10, 11, 12],
};

// ✅ Función para mostrar la imagen de un producto
export const mostrarImagen = (producto) => {
  const imagenes = {
    'Elden-Ring.webp': EldenRing,
    'Zelda.webp': Zelda,
    'COD-MW.jpg': CODMW,
    'FIFA-23.jpg': FIFA23,
    'Cyberpunk.webp': Cyberpunk,
    'Horizon.webp': Horizon,
    'Halo.jpg': Halo,
    'Animal-Crossing.webp': AnimalCrossing,
    'Final-Fantasy.webp': FinalFantasy,
    'Starfield.jpg': Starfield,
    'Zelda-Echoes.webp': ZeldaEchoes,
    'SpiderMan.avif': SpiderMan,
  };
  return imagenes[producto.imagen] || null;
};
