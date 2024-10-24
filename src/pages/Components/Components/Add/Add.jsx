import React, { useEffect, useState } from 'react'
import Variable from '../variable/Variable'
import './Add.css'
function Add({ v1, v2 }) {
    const [A, setA] = useState()
    const [B, setB] = useState()
    const [total,setTotal] = useState()

    useEffect(() => {
        setA(v1 || 0)
        setB(v2 || 0)
        setTotal(v1 + v2 || 0)
    }, [v1, v2])

    const setMinus = (val) => {
        if (val === "A") {
            const newA = A - 1;
            setA(newA);
            setTotal(newA + B);  
        } else {
            const newB = B - 1;
            setB(newB);
            setTotal(A + newB);  
        }
    }

    const setPlus = (val) => {
        if (val === "A") {
            const newA = A + 1;
            setA(newA);
            setTotal(newA + B);  
        } else  {
            const newB = B + 1;
            setB(newB);
            setTotal(A + newB);  
        }
    }

    return (
        <div className='add-container'>
            <h3 className='add-title'>Add</h3>
            <h2 className='add-display'>
                <span className='badge bg-primary'>A = {A}</span>
                <span className='middle-span badge bg-primary'>A + B = {total}</span>
                <span className='badge bg-primary'>B = {B}</span>
            </h2>
            <div className='add-variable'>
                <Variable type={'int'} setMinus={setMinus} setPlus={setPlus} value={A} name={'A'} />
                <Variable type={'int'} setMinus={setMinus} setPlus={setPlus}  value={B} name={'B'} />
            </div>
        </div>
    )
}

export default Add