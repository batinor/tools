import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <nav>
        <Link to="/tools/">Home</Link>
        {' | '}
        <Link to="/tools/contact">Contact</Link>
      </nav>

      <Outlet />
    </>
  );
}

export default App;
