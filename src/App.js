
import { Route,  Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ThemeToggle from './components/button/ThemeToggle';
import useTheme from './hooks/useTheme';
import Test from './pages/Test';
import Loginpage from './pages/Loginpage';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="App min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#19191A] dark:text-slate-100">
      <div className="mx-auto flex  items-center justify-end p-4">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/test' element={<Test/>} />
      </Routes>
    </div>
  );
}

export default App;
