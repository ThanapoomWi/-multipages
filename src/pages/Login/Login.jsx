import { React, useRef } from 'react';
import './Login.css'
import Form from 'react-bootstrap/Form';
import { verifyUser } from '../../data/user'

function Login({ setToken, setRole, token }) {
    const userRef = useRef()
    const passRef = useRef()
    return (
        <div className='login-main'>
            <div className='login-container'>
                <Form.Label className='d-flex text-white fs-5' htmlFor="username"> <span className='badge bg-primary me-2'><i class="bi bi-person-circle"></i></span> &nbsp;Username</Form.Label>
                <Form.Control
                    type="text"
                    id="username"
                    placeholder='user'
                    style={{ textAlign: 'center' }}
                    ref={userRef}
                />
                <Form.Label className='mt-3 d-flex text-white fs-5' htmlFor="password"><span className='badge bg-primary me-2'><i class="bi bi-lock-fill"></i></span> &nbsp;Password</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    placeholder='pass'
                    style={{ textAlign: 'center' }}
                    ref={passRef}
                />
                <button onClick={() => {
                    const user = userRef.current.value.trim()
                    const pass = passRef.current.value.trim()
                    const userInfo = verifyUser(user, pass)
                    userRef.current.value = ''
                    passRef.current.value = ''
                    if (userInfo === null) {
                        alert('Wrong username or password')
                        userRef.current.focus()
                    }
                    else {
                        Swal.fire({
                            title: "Welcome Kub Aj.Pin!",
                            text: "By Thanapoom Witrankronkoon",
                            icon: "success"
                        }).then(() => {
                            setToken(userInfo.token)
                            setRole(userInfo.role)
                        })
                    }
                }}
                    className='btn btn-success mt-3'>Login
                </button>

                <button onClick={() => {
                    userRef.current.value = ''
                    passRef.current.value = ''
                }}
                    className='btn btn-danger mt-3 ms-3'>Clear
                </button>

            </div>
        </div>
    )
}

export default Login