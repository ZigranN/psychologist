import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/psychologist/', // Укажи имя репозитория
  plugins: [react()],
  server: {
    open: true, // Автоматически открывает браузер при запуске dev-сервера
    port: 5173, // Устанавливаем порт сервера
    strictPort: true, // Если порт занят, сервер не будет запускаться на другом
  },
  build: {
    outDir: 'dist', // Указываем выходную папку
    sourcemap: true, // Включаем карту кода для отладки
    chunkSizeWarningLimit: 500, // Увеличиваем лимит предупреждений о размере чанков
  },
  resolve: {
    alias: {
      '@': '/src', // Добавляем алиас для удобства импортов
    },
  },
});
