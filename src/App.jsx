import {  Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Products from './pages/products/Products';
import ElectronicInvoice from './pages/invoices/ElectronicInvoice';
import InvoiceList from './pages/invoices/InvoiceList';
import './App.css';
import Sidebar from './components/Sidebar';
import Clients from './pages/clients/Clients';
import Categories from './pages/categories/Categories';
import Brands from './pages/brands/Brands';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Test from './pages/Test';

function App() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isAuth = !!token; // 🔥 VER SI HAY USUARIO EN LOCALSTORAGE
  
  return (
    <>    
    {/* <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}/> */}
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <div className="d-flex">
        {/* Sidebar SOLO si NO es login */}
        {isAuth && !isLogin && <Sidebar />}
        {/* Main Content */}
        <div className="flex-grow-1 bg-light" style={{ minHeight: "100vh" }}>
          {/* Header SOLO si NO es login */}
          {!isLogin && isAuth && (
            <Navbar user={user} />
          )}
          {/* Contenido */}
          {/* <div className="p-4"> */}
          {/* Si es login, no uses card */}
          {isLogin ? (
            <Routes>
              {/* <Route path="/login" element={<Login />} /> */}
              <Route
                path="/login"
                element={!isAuth ? <Login /> : <Navigate to="/home" />}
              />
            </Routes>
          ) : (
            // <div className="card">
            //   <div className="card-body">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              {/* <Route path="/products" element={<Products />} />
              <Route path="/clients" element={<Clients />} /> */}
              {/* <Route path="/test" element={<Test />} /> */}
              <Route
                path="/home"
                element={isAuth ? <Home /> : <Navigate to="/login" />}
              />
              <Route 
                path="/test" 
                element={isAuth ? <Test /> : <Navigate to="/login" />} 
              />
              <Route
                path="/clients"
                element={isAuth ? <Clients /> : <Navigate to="/login" />}
              />
              <Route
                path="/products"
                element={isAuth ? <Products /> : <Navigate to="/login" />}
              />
              <Route
                path="/categories"
                element={isAuth ? <Categories /> : <Navigate to="/login" />}
              />
              <Route
                path="/brands"
                element={isAuth ? <Brands /> : <Navigate to="/login" />}
              />
              <Route
                path="/electronic-invoice"
                element={isAuth ? <ElectronicInvoice /> : <Navigate to="/login" />}
              />
              <Route
                path="/invoice-list"
                element={isAuth ? <InvoiceList /> : <Navigate to="/login" />}
              />
            </Routes>
            //   </div>
            // </div>
          )}
          {/* </div> */}
        </div>
      </div>
    </SnackbarProvider>
    </>
  );
}



export default App;
