import React, { useEffect, useState } from 'react'
import './Temperatures.css'
import Variable from '../variable/Variable'
function Temp({ celsius, fahren, kelvin }) {
    const [cel, setCel] = useState(celsius || 25);
    const [fah, setFah] = useState(fahren || 77);
    const [kel, setKel] = useState(kelvin || 298);

    const celToKel = (c) => c + 273.15;
    const celToFah = (c) => (c * 9) / 5 + 32;
    const fahToCel = (f) => ((f - 32) * 5) / 9;
    const kelToCel = (k) => k - 273.15;

    const setMinus = (val) => {
        if (val === "Celsius") {
            const newCel = cel - 1;
            setCel(newCel);
            setFah(celToFah(newCel));
            setKel(celToKel(newCel));
        } else if (val === 'Fahrenheit') {
            const newFah = fah - 1;
            setFah(newFah);
            const newCel = fahToCel(newFah);
            setCel(newCel);
            setKel(celToKel(newCel));
        } else if (val === 'Kelvin') {
            const newKel = kel - 1;
            setKel(newKel);
            const newCel = kelToCel(newKel);
            setCel(newCel);
            setFah(celToFah(newCel));
        }
    }

    const setPlus = (val) => {
        if (val === "Celsius") {
            const newCel = cel + 1;
            setCel(newCel);
            setFah(celToFah(newCel));
            setKel(celToKel(newCel));
        } else if (val === 'Fahrenheit') {
            const newFah = fah + 1;
            setFah(newFah);
            const newCel = fahToCel(newFah);
            setCel(newCel);
            setKel(celToKel(newCel));
        } else if (val === 'Kelvin') {
            const newKel = kel + 1;
            setKel(newKel);
            const newCel = kelToCel(newKel);
            setCel(newCel);
            setFah(celToFah(newCel));
        }
    }

    useEffect(() => {
        setCel(celsius || 25);
        setFah(fahren || 77);
        setKel(kelvin || 298);
    }, [celsius, fahren, kelvin])



    return (
        <div className='temp-container'>
            <h3 className='temp-title'>Temperature</h3>
            <h2 className='temp-display'>
                <span className='badge bg-primary'>{cel.toFixed(2)}°C</span>
                <span className='middle-span badge bg-primary'>{fah.toFixed(2)}°F</span>
                <span className='badge bg-primary'>{kel.toFixed(2)}°K</span>
            </h2>
            <div className='temp-variable'>
                <Variable type={''} value={cel} name={'Celsius'} setMinus={setMinus} setPlus={setPlus} />
                <Variable type={''} value={fah} name={'Fahrenheit'} setMinus={setMinus} setPlus={setPlus} />
                <Variable type={''} value={kel} name={'Kelvin'} setMinus={setMinus} setPlus={setPlus} />
            </div>
        </div>
    )
}

export default Temp