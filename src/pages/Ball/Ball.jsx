import React, { useState, useEffect } from 'react';
import './Ball.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import basketball from './imgs/basketball.png'
import volley from './imgs/volley.png'
import football from './imgs/football.jpg'
import logo from './imgs/logoz.png'
import me from './imgs/me.jpeg'
import cartoon from './imgs/cartoon.jpg'
function Ball() {
    const fieldWidth = 700;
    const fieldHeight = 400;
    const ballSize = 100;
    const maxLeft = fieldWidth - ballSize - 2;
    const maxTop = fieldHeight - ballSize - 2;
    const vx = 5;
    const vy = 5;

    const [x, setX] = useState(350 - 50);
    const [y, setY] = useState(200 - 50);
    const [rotateValue, setRotateValue] = useState(0);
    const [goRight, setGoRight] = useState(true);
    const [goDown, setGoDown] = useState(true);
    const [running, setRunning] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState('none');
    const [backgroundColor, setBackgroundColor] = useState('red');

    // Toggle running state
    const toggleRunning = () => setRunning(!running);

    // Keypress handler
    const handleKeyPress = (e) => {
        function resetBtns(){
            for (let i = 0; i <= 7; i++) {
               document.getElementById(`option${i}`).checked = false;
            }
        }
        if (e.key === ' ') {
            setRunning(!running);
        } else if (e.key === '0') {
            setBackgroundColor('red');
            setBackgroundImage('none');
            document.getElementById('option1').checked = true;
        } else if (e.key === '1') {
            setBackgroundImage(`${basketball}`);
            setBackgroundColor('transparent');
            document.getElementById('option2').checked = true;
        } else if (e.key === '2') {
            setBackgroundImage(`${volley}`);
            setBackgroundColor('transparent');
            document.getElementById('option3').checked = true;
        } else if (e.key === '3') {
            setBackgroundImage(`${football}`);
            setBackgroundColor('transparent');
            document.getElementById('option4').checked = true;
        } else if (e.key === '4') {
            setBackgroundImage(`${logo}`);
            setBackgroundColor('transparent');
            document.getElementById('option5').checked = true;
        } else if (e.key === '5') {
            setBackgroundImage(`${me}`);
            setBackgroundColor('transparent');
            document.getElementById('option6').checked = true;
        } else if (e.key === '6') {
            setBackgroundImage(`${cartoon}`);
            setBackgroundColor('transparent');
            document.getElementById('option7').checked = true;
        }
    };

    // Change ball background image
    const changeBall = (img) => {
        if (img === 'none') {
            setBackgroundImage('none');
            setBackgroundColor('red');
        } else {
            setBackgroundImage(img);
            setBackgroundColor('transparent');
        }
    };

    // Calculate the ball position and rotation
    const calculate = () => {
        if (goRight) {
            setX((prevX) => {
                if (prevX >= maxLeft) {
                    setGoRight(false);
                    return prevX - vx;
                }
                return prevX + vx;
            });
            setRotateValue((prevRotate) => prevRotate + vx);
        } else {
            setX((prevX) => {
                if (prevX <= 0) {
                    setGoRight(true);
                    return prevX + vx;
                }
                return prevX - vx;
            });
            setRotateValue((prevRotate) => prevRotate - vx);
        }

        if (goDown) {
            setY((prevY) => {
                if (prevY >= maxTop) {
                    setGoDown(false);
                    return prevY - vy;
                }
                return prevY + vy;
            });
            setRotateValue((prevRotate) => prevRotate + 10);
        } else {
            setY((prevY) => {
                if (prevY <= 0) {
                    setGoDown(true);
                    return prevY + vy;
                }
                return prevY - vy;
            });
            setRotateValue((prevRotate) => prevRotate - 10);
        }
    };

    // Start or pause the ball animation
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (running) calculate();
        }, 40);

        return () => clearInterval(intervalId);
    }, [running, goRight, goDown]);

    // Handle keypresses
    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);
        return () => document.removeEventListener('keypress', handleKeyPress);
    }, [running]);

    return (
        <section>
            <div className="ball-container">
                <div
                    id="field"
                    style={{
                        width: `${fieldWidth}px`,
                        height: `${fieldHeight}px`,
                        position: 'relative',
                    }}
                >
                    <div
                        id="ball"
                        style={{
                            position: 'absolute',
                            width: `${ballSize}px`,
                            height: `${ballSize}px`,
                            left: `${x}px`,
                            top: `${y}px`,
                            backgroundImage: backgroundImage === 'none' ? 'none' : `url(${backgroundImage})`,
                            backgroundColor: backgroundColor,
                            transform: `rotate(${rotateValue / 1.5}deg)`,
                            backgroundSize: 'cover',
                            borderRadius: '50%',
                        }}
                    ></div>
                </div>

                <div id="control">
                    <button id="text" onClick={toggleRunning} className={`me-2 btn ${running ? 'btn-danger' : 'btn-success'}`}>
                        <i style={{ marginRight: '5px' }} className={`bi ${running ? 'bi-pause-circle' : 'bi-play-fill'}`}></i>
                        {running ? 'PAUSE' : 'RUN'}
                    </button>
                    <input type="radio" className="btn-check" name="options-outlined" id="option1" autoComplete="off" defaultChecked />
                    <label onClick={() => changeBall('none')} className="btn btn-outline-primary me-2" htmlFor="option1">
                        NONE
                    </label>
                    <input type="radio" className="btn-check" name="options-outlined" id="option2" autoComplete="off" />
                    <label onClick={() => changeBall(`${basketball}`)} className="btn btn-outline-primary me-2" htmlFor="option2">
                        Basketball
                    </label>
                    <input type="radio" className="btn-check" name="options-outlined" id="option3" autoComplete="off" />
                    <label onClick={() => changeBall(`${volley}`)} className="btn btn-outline-primary me-2" htmlFor="option3">
                        Volleyball
                    </label>
                    <input type="radio" className="btn-check" name="options-outlined" id="option4" autoComplete="off" />
                    <label onClick={() => changeBall(`${football}`)} className="btn btn-outline-primary me-2" htmlFor="option4">
                        Football
                    </label>
                    <input type="radio" className="btn-check" name="options-outlined" id="option5" autoComplete="off" />
                    <label onClick={() => changeBall(`${logo}`)} className="btn btn-outline-primary me-2" htmlFor="option5">
                        Logo
                    </label>
                    <input type="radio" className="btn-check" name="options-outlined" id="option6" autoComplete="off" />
                    <label onClick={() => changeBall(`${me}`)} className="btn btn-outline-primary me-2" htmlFor="option6">
                        Human
                    </label>
                    <input type="radio" className="btn-check" name="options-outlined" id="option7" autoComplete="off" />
                    <label onClick={() => changeBall(`${cartoon}`)} className="btn btn-outline-primary me-2" htmlFor="option7">
                        Cartoon
                    </label>
                </div>
            </div>
        </section>
    );
};

export default Ball;
