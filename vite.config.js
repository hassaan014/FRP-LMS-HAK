import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export 
default defineConfig({
  plugins: [react()],
//   build: {
//     rollupOptions: {
//         output:{
//             manualChunks(id) {
//                 if (id.includes('node_modules')) {
//                     return id.toString().split('node_modules/')[1].split('/')[0].toString();
//                 }
//             }
//         }
//     }
// }
server: {
  allowedHosts: ['e0f4-117-102-48-226.ngrok-free.app'],
}
})
