import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './store/auth.jsx'
import { ToastContainer} from 'react-toastify';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<AuthProvider>
 <StrictMode>
  <App />
  <ToastContainer/>
 </StrictMode>
 </AuthProvider>
  ,
)
