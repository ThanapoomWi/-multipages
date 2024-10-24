import { Outlet } from 'react-router'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './Layout.css'

function Layout({products,carts,setToken,token}) {

    return (
        <div>
            <Header/>
            <Navbar products={products} carts={carts} setToken={setToken} token={token}/>
            <Outlet/>
            <Footer/>
        </div>
    )
} 

export default Layout