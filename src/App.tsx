import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { JerseyEditorPage } from './components/JerseyEditorPage'
import { JerseyViewer } from './components/JerseyViewer'

function App() {
  return (
    <Routes>
      <Route path="/jersey-editor" element={<JerseyEditorPage />} />
      <Route path="/" element={<JerseyViewer />}  />
    </Routes>
  )
}

export default App
