// Use Vite env variable so it works in development and production
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const API_GATEWAY_URL = `${BASE_URL}/api`;

// Endpoints para cada microservicio a través del Gateway
export const apiEndpoints = {
    auth: `${API_GATEWAY_URL}/auth`, // Para login, registro, etc. (coincide con backend /api/auth)
    users: `${API_GATEWAY_URL}/users`,
    games: `${API_GATEWAY_URL}/games`,
    reviews: `${API_GATEWAY_URL}/reviews`,
};
