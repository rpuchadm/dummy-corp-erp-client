// import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomePage from "./components/HomePage"
import AboutPage from "./components/AboutPage"

import PersonContainer from "./components/person/PersonContainer"
import ListPersons from "./components/person/ListPersons"
import Application from "./components/application/Application"
import ListApplications from "./components/application/ListApplications"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<AboutPage />} />

        <Route path="/person/:id" element={<PersonContainer />} />
        <Route path="/listpersons" element={<ListPersons />} />
        <Route path="/application" element={<Application />} />
        <Route path="/listapplications" element={<ListApplications />} />

        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
