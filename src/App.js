
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ThemeToggle from './components/button/ThemeToggle';
import useTheme from './hooks/useTheme';
import Loginpage from './pages/Loginpage';
import HomePage from './pages/HomePage';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import InventoryPage from './pages/admin/InventoryPage';
import SalesPage from './pages/admin/SalesPage';
import BillsPage from './pages/admin/BillsPage';
import NotificationPage from './pages/admin/NotificationPage';
import CashierPage from './pages/cashier/CashierPage';
import RequireRole from './components/auth/RequireRole';



//base URL setup for axios
axios.defaults.baseURL = 'http://localhost:8000';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="App min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#19191A] dark:text-slate-100">
       <Toaster position="bottom-right" />
      <div className="mx-auto flex  items-center justify-end p-4">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route path='/test' element={<HomePage />} />

        <Route element={<RequireRole allowedRoles={['admin']} />}>
          <Route path='/admindashboard' element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path='inventory' element={<InventoryPage />} />
            <Route path='sales' element={<SalesPage />} />
            <Route path='bills' element={<BillsPage />} />
            <Route path='notifications' element={<NotificationPage />} />
          </Route>
        </Route>

        <Route element={<RequireRole allowedRoles={['cashier']} />}>
          <Route path='/cashierpage' element={<CashierPage />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
