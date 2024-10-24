import './Carts.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Carts({ carts, setCarts }) {
    return (
        <div className='carts-main'>
            <div className='carts-container'>
                <div className="carts-items-container">
                    {carts.map((cart) => (
                        <Card key={cart.id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={cart.thumbnailUrl} />
                            <Card.Body>
                                <Card.Title>{cart.title}</Card.Title>
                                <Card.Text>
                                    ${cart.price.toFixed(2)}
                                </Card.Text>
                                <Button onClick={() => setCarts(carts.filter((c) => c.id !== cart.id))}
                                    variant="outline-danger">Remove from Cart</Button>
                            </Card.Body>
                        </Card>
                    )
                    )}
                </div>
                <h4 className='mt-3'>Products <span className='badge bg-danger'>{carts.length} items</span> - 
                Total Price: <span className='badge bg-success'>${carts.reduce((prev, cart) => prev + cart.price ,0).toFixed(2) }
                </span>
                </h4>
                <button className='my-2 btn btn-warning'>Checkout&nbsp;<i class="bi bi-wallet-fill"></i></button>
            </div>
        </div>
    )
}

export default Carts