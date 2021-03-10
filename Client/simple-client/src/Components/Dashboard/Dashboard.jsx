import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { HorizontalBar, Pie } from 'react-chartjs-2';

import * as API from '../../Api/Data';

const Dashboard = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await API.Categories.getPrices();
            setPrices(data);
        }

        load();
    }, []);

    return (
        <Col>
            <h1>Dashboard</h1>
            <Row>
                <Col>
                    {
                        prices
                            ? <HorizontalBar
                                data={{
                                    labels: prices.map(el => el.name),
                                    datasets: [
                                        {
                                            label: 'Avg catgory price range',
                                            data: prices.map(el => {
                                                const prices = el.prices.map(p => p.price);
                                                const sum = prices.reduce((sum, el) => sum + el);
                                                const avg = Math.ceil(sum / prices.length);

                                                return avg;

                                            }),
                                            backgroundColor: 'orange'
                                        },
                                        {
                                            label: 'Highest price in catgory',
                                            data: prices.map(el => {
                                                const prices = el.prices.map(p => p.price);
                                                return Math.max(...prices);
                                            }),
                                            backgroundColor: 'red'
                                        },
                                        {
                                            label: 'Lowest price in catgory',
                                            data: prices.map(el => {
                                                const prices = el.prices.map(p => p.price);
                                                return Math.min(...prices);
                                            }),
                                            backgroundColor: 'limegreen'
                                        }
                                    ],
                                }}
                            />
                            : "Loading..."

                    }
                </Col>
                <Col>
                    {
                        prices
                            ? <Pie
                                data={{
                                    labels: prices.map(el => el.name),
                                    datasets: [
                                        {
                                            label: 'category total value share',
                                            data: prices.map(el => {
                                                const prices = el.prices.map(p => p.price);
                                                const sum = prices.reduce((sum, el) => sum + el);
                                                return sum;
                                            }),

                                            backgroundColor: prices.map((_, i) => `hsl(${i * 30}, 100%, 45%)`)
                                        }
                                    ],
                                }}
                            />
                            : "loading.."
                    }
                </Col>
            </Row>
        </Col>
    );
}

export default Dashboard;