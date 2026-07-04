import Container from "./Container";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-md p-6">
        <h1 className="text-3xl font-bold text-blue-600">StudySync</h1>

        <nav className="mt-4 flex gap-4">
          <Link to="/">Dashboard</Link>
          <Link to="/subjects">Subjects</Link>
          <Link to="/assignments">Assignments</Link>
          <Link to="/exams">Exams</Link>
        </nav>
      </header>

      <main>
  <Container>
    <Outlet />
  </Container>
</main>
    </div>
  );
}

export default Layout;