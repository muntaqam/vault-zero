import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-6 bg-white rounded shadow text-center">
        <h1 className="text-2xl font-bold text-blue-600">Vault Zero 🔐</h1>
        <p className="mt-2 text-gray-700">Tailwind is working!</p>
      </div>
    </div>
  )
}

export default App
