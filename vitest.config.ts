import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'], // 'text' es la clave para ver la tabla en consola
      include: ['src/**/*.ts'],   // Solo mide la cobertura de lo que esté en src/
      exclude: ['src/index.ts'],  // Opcional: podés excluir barrel files
    },
  },
});