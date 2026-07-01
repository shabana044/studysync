import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <header>
        <h1>StudySync</h1>
        <nav>
          <Link to="/">Dashboard</Link> |{' '}
          <Link to="/subjects">Subjects</Link> |{' '}
          <Link to="/assignments">Assignments</Link> |{' '}
          <Link to="/exams">Exams</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout