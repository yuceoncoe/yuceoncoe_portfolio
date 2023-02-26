import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        projects: resolve(__dirname, 'projects.html'),
        fig1: resolve(__dirname, 'projects/fig1.html'),
        manz: resolve(__dirname, 'projects/manz.html'),
        newholi: resolve(__dirname, 'projects/newholi.html'),
        onthejeg: resolve(__dirname, 'projects/onthejeg.html'),
        robusky: resolve(__dirname, 'projects/robusky.html')
      }
    }
  }
})