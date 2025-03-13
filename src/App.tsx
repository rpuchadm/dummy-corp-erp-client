// import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomePage from "./components/HomePage"
import AboutPage from "./components/AboutPage"

import Person from "./components/person/Person"
import ListPersons from "./components/person/ListPersons"
import Application from "./components/application/Application"
import ListApplications from "./components/application/ListApplications"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<AboutPage />} />

        <Route path="/person" element={<Person />} />
        <Route path="/listpersons" element={<ListPersons />} />
        <Route path="/application" element={<Application />} />
        <Route path="/listapplications" element={<ListApplications />} />

        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
