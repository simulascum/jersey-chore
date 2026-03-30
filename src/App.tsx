import './App.css'
import { Route, Routes } from 'react-router-dom'
import { JerseyEditorPage } from './components/JerseyEditorPage'

function App() {
  return (
    <Routes>
      <Route path="/jersey-editor" element={<JerseyEditorPage />} />
      <Route path="/" element={<JerseyEditorPage />} />
    </Routes>
  )
}

export default App
