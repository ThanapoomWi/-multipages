import React from 'react'
import './Home.css'
import { TypeAnimation } from 'react-type-animation'
import pic from './img/pic.png'

function Home() {
    return (
        <div className='Home-container'>
            <div className='Home'>
                <div className='Home-img'>
                    <img src={pic} width={350} height={450} alt="" />
                </div>
                <div className='Home-text d-flex flex-column'>
                   <div className='d-flex'>
                   <h2 className='Home-text'>Hi my name is <span className='myname'>Thanpoom Witrankronkoon</span></h2>
                   </div>
                    <h2>And I want to <TypeAnimation
                        sequence={[
                            'Explore the world',
                            1000,
                            'Become a President',
                            1000,
                            'Become a Leadsinger',
                            1000,
                            'Mastering about religions',
                            1000
                        ]}
                        wrapper="span"
                        speed={30}
                        style={{ fontSize: '1.5em', display: 'inline-block', color: 'white', fontWeight: 'bold'}}
                        repeat={Infinity}
                    /></h2>
               
                </div>
            </div>
        </div>
    )
}

export default Home