import React from 'react'
import './Variable.css'
function Variable({ type , name, value, setMinus , setPlus }) {

    return (
        <div className='counter-container'>
            <h3>{name}</h3>
            <button className='btn btn-danger' onClick={() => setMinus(name)}>-</button>
            <span>{type === 'int' ? parseInt(value) : value.toFixed(2)}</span>
            <button className='btn btn-success' onClick={() => setPlus(name)}>+</button>
        </div>
    )
}

export default Variable