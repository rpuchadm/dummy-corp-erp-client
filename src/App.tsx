// import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomePage from "./components/HomePage"

import PersonContainer from "./components/person/PersonContainer"
import ListPersons from "./components/person/ListPersons"
import ListApplications from "./components/application/ListApplications"
import ApplicationContainer from "./components/application/ApplicationContainer"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/person/:id" element={<PersonContainer />} />
        <Route path="/listpersons" element={<ListPersons />} />
        <Route path="/application/:id" element={<ApplicationContainer />} />
        <Route path="/listapplications" element={<ListApplications />} />

        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
