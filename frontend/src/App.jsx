
import './App.css'
import { Toaster } from "react-hot-toast";
import AdminRouters from './routes/AdminRouters';
import Routers from './routes/Routers';
import { useLocation } from 'react-router-dom';
function App() {

   const location = useLocation();
   const isAdminPage = location.pathname.startsWith("/admin");
  
  
  return (
    <div className="App font-opensans">
      {isAdminPage ? <AdminRouters /> : <Routers />}
      
      <Toaster />
    </div>
  );
}

export default App
