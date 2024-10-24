import './Products.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Products({ products, carts, setCarts }) {
    return (
        <div className="products-main">
            <div className='products-container'>
                <div className="products-items-container">
                    {products.map((product) => (
                        <Card key={product.id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={product.thumbnailUrl} />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    <b>${product.price.toFixed(2)}</b>
                                </Card.Text>

                                {carts.find((cart) => cart.id === product.id)
                                    ? (<span className='badge bg-danger'>Added</span>)
                                    : (<Button onClick={() => setCarts([...carts, product]) } variant="outline-primary">Add to Cart</Button>)
                                }
                            </Card.Body>
                        </Card>
                    )
                    )}

                </div>
            </div>
        </div>
    )
}

export default Products