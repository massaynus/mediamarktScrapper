import React from 'react';
import { Card, Button, Carousel } from 'react-bootstrap';

const Product = ({ product }) => (
    <Card>
        <Card.Header>
            <Carousel interval={300} controls={false}>
                {
                    product.images.map((image => (
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={image.src}
                                alt={image.alt}
                            />
                        </Carousel.Item>
                    )))
                }
            </Carousel>
        </Card.Header>
        <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
                <table>
                    <tbody>
                        {

                            product.specifications.map(spec => (
                                <tr>
                                    <td>{spec.key}</td>
                                    <td>{spec.value}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Card.Text>
            <Button variant="primary" onClick={() => window.open(product.url)}>
                Visit product
            </Button>
        </Card.Body>
    </Card>
)

export default Product;