import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ShareContext from './contextAPI/ShareContext.jsx'
import RouteGuard from './contextAPI/RouteGuard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId='141389229950-m3dgujhvj37ad5m17jhbd0migeahrufj.apps.googleusercontent.com'>
      <ShareContext>
        <RouteGuard>
          <App />
        </RouteGuard>
      </ShareContext>
    </GoogleOAuthProvider>
     
    </BrowserRouter>
   
  </StrictMode>,
)
