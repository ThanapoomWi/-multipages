import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import Layout from './layouts/Layout/Layout.jsx'
import Home from './pages/Home/Home.jsx'
import Calculator from './pages/Calculator/Calculator.jsx'
import Ball from './pages/Ball/Ball.jsx'
import Components from './pages/Components/Components.jsx'
import Todo from './pages/Todo/Todo.jsx'
import Products from './pages/Products/Products.jsx'
import Carts from './pages/Carts/Carts.jsx'
import Login from './pages/Login/Login.jsx'
import { fetchProducts } from './data/products.jsx'

function App() {
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')
  const [products, setProducts] = useState([])
  const [carts, setCarts] = useState([])

  useEffect(() => setProducts(fetchProducts()), [])

  if (token === '') {
    return (<Login setToken={setToken} setRole={setRole} token={token}/>)
  }

  else if (token === 'guest') {
    return (
      <div className="App-container">
        <HashRouter>
          <Routes>
            <Route element={<Layout products={products} carts={carts} setToken={setToken} token={token} />}>
              <Route path={'/'} element={<Home />} />
              <Route path={'/home'} element={<Home />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    )
  }

  else if (token === 'worker') {
    return (
      <div className="App-container">
        <HashRouter>
          <Routes>
            <Route element={<Layout products={products} carts={carts} setToken={setToken} token={token} />}>
              <Route path={'/'} element={<Home />} />
              <Route path={'/home'} element={<Home />} />
              <Route path={'/calculator'} element={<Calculator />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    )
  }

  else {
    return (
      <div className="App-container">
        <HashRouter>
          <Routes>
            <Route element={<Layout products={products} carts={carts} setToken={setToken} token={token} />}>
              <Route path={'/'} element={<Home />} />
              <Route path={'/home'} element={<Home />} />
              <Route path={'/calculator'} element={<Calculator />} />
              <Route path={'ball'} element={<Ball />} />
              <Route path={'/component'} element={<Components />} />
              <Route path={'/todo'} element={<Todo />} />
              <Route path={'/products'} element={<Products products={products} carts={carts} setCarts={setCarts} />} />
              <Route path={'/carts'} element={<Carts carts={carts} setCarts={setCarts} />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    )
  }

}

export default App
