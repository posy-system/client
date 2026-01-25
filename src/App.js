
import { Route,  Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ThemeToggle from './components/button/ThemeToggle';
import useTheme from './hooks/useTheme';
import Test from './pages/Test';
import Loginpage from './pages/Loginpage';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import AdminDashboard from './pages/admin/AdminDashboard';
import CashierPage from './pages/cashier/CashierPage';



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
        <Route path='/home' element={<HomePage />} />
        <Route path='/test' element={<Test/>} />
        <Route path='/admindashboard' element={<AdminDashboard/>} />
        <Route path='/cashierpage' element={<CashierPage/>} />
        
      </Routes>
    </div>
  );
}

export default App;
