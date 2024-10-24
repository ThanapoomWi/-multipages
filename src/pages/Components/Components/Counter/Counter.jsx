import React, { useEffect, useState } from 'react'
import './Counter.css'
function Counter({val,name}) {
    const [value, setCount] = useState()
    const plus = () => {
        setCount(value + 1)
    }

    const minus = () => {
        setCount(value - 1)
    }
    
    useEffect(()=>{
        setCount(val || 0)
    },[val])
    return (
        <div className='counter'>
            <h1>{name || "Counter"}</h1>
            <div className='container'>
                <button className='btn btn-danger' onClick={minus}>-</button>
                <span style={{ margin: '0 10px' }}>{value}</span>
                <button className='btn btn-success' onClick={plus}>+</button>
            </div>
        </div>
    )
}

export default Counter;