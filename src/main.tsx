import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Admin from './Admin.tsx'

const isAdminRoute = () => window.location.hash.startsWith('#/admin')

function Root() {
  const [admin, setAdmin] = useState(isAdminRoute)
  useEffect(() => {
    const onHashChange = () => setAdmin(isAdminRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return admin ? <Admin /> : <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
