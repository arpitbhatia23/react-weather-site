import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
base:'/react-weather-site/',
  plugins: [react()],
  assetsInclude: /\.(png|jpg|jpeg|svg|gif)$/,

})

