import { React, useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const initPage = 'home'

function Navbar({ products, carts, setToken, token }) {
  const [toggle, setToggle] = useState('');
  const navigate = useNavigate();

  useEffect(() => setToggle(initPage) ,[])

  const homeRef = useRef();
  const calculatorRef = useRef();
  const animationRef = useRef();
  const componentsRef = useRef();
  const todoRef = useRef();
  const productsRef = useRef();
  const cartsRef = useRef();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logout Success!",
          text: "See you soon! Click ok to exit.",
          icon: "success"
        }).then(() => {
          setToken('')
          navigate('/')
        })
      };
    });
  }

  useEffect(() => {
    if (toggle === 'calculator') calculatorRef.current.click()
    else if (toggle === 'ball') animationRef.current.click()
    else if (toggle === 'component') componentsRef.current.click()
    else if (toggle === 'todo') todoRef.current.click()
    else if (toggle === 'product') productsRef.current.click()
    else if (toggle === 'carts') cartsRef.current.click()
    else homeRef.current.click()
  }, [toggle])

  if (token === 'guest') {
    return (
      <div className='d-flex justify-content-center'>
        <div>
          <Link className='text-white text-decoration-none me-3' to='/'>
            <button className={'btn ' + (toggle === 'home' ? 'btn-primary' : ' btn-outline-primary')}
              onClick={() => setToggle('home')} ref={homeRef}>Home</button>
          </Link>
        </div>
        <button onClick={handleLogout}
          className='btn btn-outline-danger' style={{ marginLeft: '1rem' }}>Logout
        </button>
      </div>
    )
  }

  else if (token === 'worker') {
    return (
      <div className='d-flex justify-content-center'>
        <div>
          <Link className='text-white text-decoration-none me-3' to='/'>
            <button className={'btn ' + (toggle === 'home' ? 'btn-primary' : ' btn-outline-primary')}
              onClick={() => setToggle('home')} ref={homeRef}>Home</button>
          </Link>

          <Link className='text-white text-decoration-none me-3' to='/calculator'>
            <button className={'btn ' + (toggle === 'calculator' ? 'btn-primary' : 'btn-outline-primary')}
              onClick={() => setToggle('calculator')} ref={calculatorRef}>Calculator</button>
          </Link>
        </div>

        <button onClick={handleLogout}
          className='btn btn-outline-danger' style={{ marginLeft: '1rem' }}>Logout
        </button>
      </div>
    )
  }

  else {
    return (
      <div className='d-flex justify-content-center'>

        <div>

          <Link className='text-white text-decoration-none me-3' to='/'>
            <button className={'btn ' + (toggle === 'home' ? 'btn-primary' : ' btn-outline-primary')}
              onClick={() => setToggle('home')} ref={homeRef}>Home</button>
          </Link>

          <Link className='text-white text-decoration-none me-3' to='/calculator'>
            <button className={'btn ' + (toggle === 'calculator' ? 'btn-primary' : 'btn-outline-primary')}
              onClick={() => setToggle('calculator')} ref={calculatorRef}>Calculator</button>
          </Link>

          <Link className='text-white text-decoration-none me-3' to='/ball'>
            <button className={'btn ' + (toggle === 'ball' ? 'btn-primary' : 'btn-outline-primary')}
              onClick={() => setToggle('ball')} ref={animationRef}>Animation</button>
          </Link>

          <Link className='text-white text-decoration-none me-3' to='/component'>
            <button className={'btn ' + (toggle === 'component' ? 'btn-primary' : 'btn-outline-primary')}
              onClick={() => setToggle('component')} ref={componentsRef}>Components</button>
          </Link>

          <Link className='text-white text-decoration-none me-3' to='/todo'>
            <button className={'btn ' + (toggle === 'todo' ? 'btn-primary' : 'btn-outline-primary')}
              onClick={() => setToggle('todo')} ref={todoRef}>Todo</button>
          </Link>

          <Link className='text-white text-decoration-none me-3' to='/products'>
            <button className={'btn ' + (toggle === 'product' ? 'btn-primary' : 'btn-outline-primary')}
              onClick={() => setToggle('product')} ref={productsRef}>Products ({products.length})</button>
          </Link>

          <Link className='text-white text-decoration-none me-3' to='/carts'>
            <button className={'position-relative btn ' + (toggle === 'carts' ? 'btn-primary' : 'btn-outline-primary')}
              onClick={() => setToggle('carts')} ref={cartsRef}>Carts
              {carts.length > 0 &&
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {carts.length < 10 ? carts.length : '9+'}
                  <span class="visually-hidden">unread messages</span>
                </span>
              }
            </button>
          </Link>

        </div>

        <button onClick={handleLogout}
          className='btn btn-outline-danger' style={{ marginLeft: '1rem' }}>Logout
        </button>
      </div>
    )
  }

}

export default Navbar;
