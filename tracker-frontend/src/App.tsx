import { useEffect, useState } from 'react'

// import './App.css'
import { getAllProjects } from './service/projectService'

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async ()=> {
      const results = await getAllProjects();
      setProjects(results)
    }

    fetchProjects();
  }, [])

  return (
    <>
    midagi v
    { import.meta.env.API_URL}
      {/* {projects?.map((product) => (
        <span>{product}</span>
      ))} */}
    </>
  )
}

export default App
