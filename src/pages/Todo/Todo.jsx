import React, { useEffect, useRef, useState } from 'react'
import './Todo.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { fetchTodos } from '../../data/data';

const initItemsPerPage = 10;
const initOnlyWaiting = false;
function Todo() {
    const [todosRaw, setTodosRaw] = useState([]);
    const [onlyWaiting, setOnlyWaiting] = useState(false);
    const [todos, setTodos] = useState([]);

    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [curPage, setCurPage] = useState(0);
    const [numPage, setNumPage] = useState(0);

    const itemsPerPageRef = useRef();
    const onlyWaitingRef = useRef();

    //bypass
    useEffect(() => {
        setTodosRaw(fetchTodos());
        setOnlyWaiting(initOnlyWaiting);
        itemsPerPageRef.current.value = initItemsPerPage;
        setItemsPerPage(initItemsPerPage);
        onlyWaitingRef.current.checked = initOnlyWaiting;
    }, []);

    //setup
    useEffect(() => {
        if (onlyWaiting) {
            setTodos(todosRaw.filter(todo => !todo.completed));
        }
        else {
            setTodos(todosRaw);
        }
    }, [todosRaw, onlyWaiting])

    useEffect(() => {
        setNumPage(Math.ceil(todos.length / itemsPerPage));
    }, [itemsPerPage, todos])

    useEffect(() => {
        if (numPage <= 0) setCurPage(0)
        else if (curPage === 0) setCurPage(1)
        else if (curPage > numPage) setCurPage(numPage)
    }, [numPage])

    const deleteClick = (id) => {
        setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
    }

    const setStatus = (id) => {
        const selectedTodo = todosRaw.find((todo) => todo.id === id);
        selectedTodo.completed = true;
        setTodosRaw([...todosRaw]);
    }

    const addClick = (id, title) => {
        const newTodo = {
            userId: 1,
            id,
            title,
            completed: false
        }
        setTodosRaw([...todosRaw, newTodo]);
    }

    //modal handlers
    const [show, setShow] = useState(false);

    const newIdRef = useRef();
    const newTitleRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="todo-container">
            {/* modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><span className='bi bi-plus-lg'>&nbsp;Add todo</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID&nbsp;:</Form.Label>
                            <Form.Control
                                autoFocus
                                value={
                                    Number(todosRaw.reduce((prev, todo) =>
                                        todo.id > prev ? todo.id : prev
                                        , 0)) + 1
                                }
                                ref={newIdRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title&nbsp;:</Form.Label>
                            <Form.Control
                                autoFocus
                                ref={newTitleRef}
                                type='text'
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <span className='bi bi-x-lg'>&nbsp;Cancel</span>
                    </Button>
                    <Button variant="primary" onClick={() => {
                        const id = newIdRef.current.value;
                        const title = newTitleRef.current.value.trim();
                        if (!title) {
                            alert('Title is required');
                            newIdRef.current.value = '';
                            newTitleRef.current.focus();
                        }
                        else {
                            addClick(id, title);
                            handleClose();
                        }
                    }
                    }>
                        <span className='bi bi-plus-lg'>&nbsp;Add</span>
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* filter */}
            <div className="todo-filter-container">
                <div className="form-check form-switch d-flex align-items-center">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        // checked
                        onChange={(e) => setOnlyWaiting(e.target.checked)}
                        ref={onlyWaitingRef}
                    />
                    <label className="form-check-label ms-2 mt-2" htmlFor="flexSwitchCheckChecked">
                        Show only&nbsp;<button className='btn bg-warning'>waiting&nbsp;
                            <span className='bi bi-clock'></span>
                        </button>
                    </label>
                </div>
                <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={5}
                    style={{ width: "200px" }}
                    onChange={(e) => setItemsPerPage(e.target.value)}
                    ref={itemsPerPageRef}
                >
                    <option value={5}>
                        5 items per page
                    </option>
                    <option value={10}>10 items per page</option>
                    <option value={50}>50 items per page</option>
                    <option value={100}>100 items per page</option>
                </select>
            </div>
            {/* table */}
            <table className="table table table-striped table-hover todo-table">
                <thead className="table-dark">
                    <tr>
                        <th style={{ width: '5%' }} valign='middle'>ID</th>
                        <th style={{}} valign='middle'>Titles</th>
                        <th style={{ textAlign: "right", width: '20%' }} valign='middle'>
                            Completed&nbsp;
                            <button onClick={() => handleShow()} className='btn btn-primary'>
                                <span className='bi bi-plus-lg'></span>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.filter((todo, i) => {
                            const min = (curPage - 1) * itemsPerPage;
                            const max = curPage * itemsPerPage - 1;
                            return i >= min && i <= max
                        }).map((todo) => (
                            <tr key={todo.id}>
                                <td valign='middle'>
                                    <span className="badge bg-secondary" style={{ width: '3rem' }}>{todo.id}</span>
                                </td>
                                <td style={{ textAlign: "left" }} valign='middle'>{todo.title}</td>
                                <td style={{ textAlign: "right" }} valign='middle'>
                                    <span onClick={() => setStatus(todo.id)}
                                        className={todo.completed ? 'badge bg-success' : 'btn bg-warning'}>
                                        {todo.completed ? 'done' : 'waiting'}&nbsp; <span className={todo.completed ? 'bi bi-check' : 'bi bi-clock'}></span>
                                    </span>
                                    &nbsp;
                                    <button className="btn btn-danger" onClick={() => deleteClick(todo.id)}>
                                        <span className="bi bi-trash"></span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* pagacontrol */}
            <div className='d-flex justify-content-center align-items-center pb-3'>
                <button onClick={() => setCurPage(1)} className='btn btn-outline-primary todo-spacing' disabled={curPage === 1}>First</button>
                <button onClick={() => curPage > 1 && setCurPage(curPage - 1)}
                    className='btn btn-outline-primary todo-spacing' disabled={curPage === 1}>Previous</button>
                <span className='todo-spacing'>{curPage}&nbsp;/&nbsp;{numPage}</span>
                <button onClick={() => curPage < numPage && setCurPage(curPage + 1)}
                    className='btn btn-outline-primary todo-spacing' disabled={curPage === numPage}>Next</button>
                <button onClick={() => setCurPage(numPage)} className='btn btn-outline-primary todo-spacing' disabled={curPage === numPage}>Last</button>
            </div>
        </div>
    )
}

export default Todo