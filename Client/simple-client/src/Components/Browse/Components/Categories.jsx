import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Categories = ({ categories, categoryClickHandler }) => (
    <ListGroup className="h-100">
        {
            categories.map((category) => (
                <ListGroupItem action key={category._id} onClick={() => categoryClickHandler(category)}>
                    {category.name}
                </ListGroupItem>
            ))
        }
    </ListGroup>
);

export default Categories;