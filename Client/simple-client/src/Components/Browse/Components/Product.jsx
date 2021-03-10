import React from 'react';
import { Card, Button, Carousel, Row, Col } from 'react-bootstrap';

const Product = ({ product }) => (
    <Card >
        <Row>
            <Col>
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

                <div className="p-3 pt-5">
                    <Card.Title>{product.brand}</Card.Title>
                    <Card.Subtitle>{product.name}</Card.Subtitle>
                </div>
            </Col>
            <Col>
                <Card.Body>
                    <Row className="align-items-center justify-content-between w-100">
                        <h5>Price: {product.price}</h5>
                        <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: product.inStock ? 'limegreen' : 'red' }}></span>
                        <span> Deliverable in &nbsp;
                        {
                            product.delivery.indexOf('NaN') === -1
                                ? product.delivery
                                : "Unknown"
                        }
                        </span>

                    </Row>
                    <Card.Text>
                        <>
                            <div className="pre-scrollable">
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
                            </div>
                        </>
                    </Card.Text>
                    <Button variant="primary" onClick={() => window.open(product.url)}>
                        Visit product
                    </Button>
                </Card.Body>
            </Col>
        </Row>
    </Card >
)

export default Product;