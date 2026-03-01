import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import './App.css';

function App() {
  return (
    <>
      <nav>
        <Link to="/tools/">
          <Button variant="link" size="xs">
            Home
          </Button>
        </Link>
        {' | '}
        <Link to="/tools/store">
          <Button variant="link" size="xs">
            Store
          </Button>
        </Link>
      </nav>

      <Outlet />
    </>
  );
}

export default App;
