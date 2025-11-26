import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Limpia el DOM después de cada prueba para evitar efectos secundarios.
afterEach(() => {
  cleanup();
});