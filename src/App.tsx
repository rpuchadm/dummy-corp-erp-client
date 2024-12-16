// import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Layout from "./components/layout/Layout.tsx"
import HomePage from "./components/HomePage"
import AboutPage from "./components/AboutPage"

function App() {
  return (
    <Layout>
      <br />
      <Router>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </Layout>
  )
}

export default App
