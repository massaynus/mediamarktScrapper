import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import Categories from './Components/Categories';
import Products from './Components/Products';
import Product from './Components/Product';

import * as API from '../../Api/Data';

const Browse = () => {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);


    useEffect(() => {
        const Load = async () => {
            const categories = await API.Categories.getAll();
            setCategories(categories);

            if (categories.length > 0) {
                setCategory(categories[0]);
            }
        };

        Load();
    }, []);

    useEffect(() => {

        if (!category) {
            return;
        }

        const Load = async () => {
            const prods = await API.Categories.getOneProducts(category._id);
            setProducts(prods);

            if(prods.length > 0) {
                setProduct(prods[0]);
            }
        };

        Load();
    }, [category]);

    return (
        <>
            <Col>
                <h1>Browse around</h1>
                <Row>
                    <Col md={3}>
                        <h3>Categories</h3>
                        {
                            categories ? <Categories categories={categories} categoryClickHandler={cat => setCategory(cat)} /> : "Loading..."
                        }

                        <h3>Products</h3>
                        {
                            products ? <Products products={products} productClickHandler={prod => setProduct(prod)} /> : "Loading..."
                        }
                    </Col>
                    <Col>
                        <h3>The product</h3>
                        {
                            product ? <Product product={product} /> : "Choose one..."
                        }
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default Browse;