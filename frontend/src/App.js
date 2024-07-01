
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Nav from './component/Nav';
import Product from './component/Product';
import AddProduct from './component/AddProduct';
import Update from './component/Update';
import Profile from './component/Profile';
import Logout from './component/Logout';
import Footer from './component/Footer';
import Signup from './component/Signup';
import Privatecmp from './component/Privatecmp';
import Login from './component/Login';
function App() {
  // const auth=localStorage.getItem("user");
  return (
    <div className="">
     <BrowserRouter>
     <Nav/>
     <Routes>
      <Route element={<Privatecmp/>} >
      <Route path='/' element={<Product/>} />
      <Route path='/addproduct' element={<AddProduct/>} />
      <Route path='/updateproduct/:sid' element={<Update/>} />
      {/* <Route path='/updateproduct' element={<Update/>} /> */}
      <Route path='/profile' element={<Profile/>} />
      <Route path='/logout' element={<Logout />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup/>} />
     </Routes>
     <Footer/>
     </BrowserRouter>
    
    </div>
  );
}

export default App;
