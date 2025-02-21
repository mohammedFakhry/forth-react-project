import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import HomePage from './Pages/Website/HomePage/HomePage';
import WebsiteCategories from './Pages/Website/Categories/Categories';
import Login from './Pages/Auth/AuthOperations/Login';
import Rsgister from './Pages/Auth/AuthOperations/Register';
import Users from './Pages/Dashboard/Users/Users';
import GoogleCallBack from './Pages/Auth/AuthOperations/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequireAuth from './Pages/Auth/Protecting/RequireAuth';
import User from './Pages/Dashboard/Users/User';
import AddUser from './Pages/Dashboard/Users/AddUser';
import Writer from './Pages/Dashboard/Writer';
import Error404 from './Pages/Auth/Errors/404';
import RequireBack from './Pages/Auth/Protecting/RequireBack';
import Categories from './Pages/Dashboard/Category/Categories';
import AddCategoreis from './Pages/Dashboard/Category/AddCategoreis';
import Category from './Pages/Dashboard/Category/Category';
import Test from './Pages/Website/Test';
import Products from './Pages/Dashboard/Product/Products';
import AddProducts from './Pages/Dashboard/Product/AddProducts';
import UpdateProduct from './Pages/Dashboard/Product/UpdateProduct';
import Website from './Pages/Website/Website';
import SingleProduct from './Pages/Website/SingleProduct/SingleProduct';
import './custom.css';

function App() {
  return (
    <div>
      <Routes>
        {/* public Route */}
        <Route element={<Website />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/categories' element={<WebsiteCategories />} />
          <Route path='/product/:id' element={<SingleProduct />} />
        </Route>

        <Route path='/test' element={<Test />} />

        <Route element={<RequireBack />} >
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Rsgister />} />
        </Route>

        <Route path='/auth/google/callback' element={<GoogleCallBack />} />
        <Route path='/*' element={<Error404 />} />

        {/* protected Route */}
        <Route path='' element={<RequireAuth allowedRole={['1996', '1995', '1999']} />} >
          <Route path='/dashboard' element={<Dashboard />} >
            <Route element={<RequireAuth allowedRole='1995' />} >
              <Route path='users' element={<Users />} />
              <Route path='user/add' element={<AddUser />} />
              <Route path='users/:id' element={<User />} />
            </Route>

            <Route element={<RequireAuth allowedRole={['1999', '1995']} />} >
              <Route path='categories' element={<Categories />} />
              <Route path='categorie/add' element={<AddCategoreis />} />
              <Route path='categories/:id' element={<Category />} />
              <Route path='products' element={<Products />} />
              <Route path='product/add' element={<AddProducts />} />
              <Route path='products/:id' element={<UpdateProduct />} />
            </Route>

            <Route element={<RequireAuth allowedRole={['1996', '1995']} />} >
              <Route path='writer' element={<Writer />} />
            </Route>
          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App