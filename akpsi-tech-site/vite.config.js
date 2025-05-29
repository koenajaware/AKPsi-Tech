import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    'process.version': '"v16.0.0"',
    'process.platform': '"browser"',
    'process.browser': true,
    'process.stdout': {
      isTTY: false
    },
    'process.stderr': {
      isTTY: false
    },
    'process.stdin': {
      isTTY: false
    }
  }
})
