import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Products = ({products, productClickHandler}) => (
    <ListGroup className="pre-scrollable">
        {
            products.map((product) => (
                <ListGroupItem action key={product._id} onClick={() => productClickHandler(product)}>
                    {product.name}
                </ListGroupItem>
            ))
        }
    </ListGroup>
)

export default Products;