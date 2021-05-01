import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import FeatureCard from '../Card/Card';
import StateWiseDailyCase from '../StateWiseDailyCase/StateWiseDailyCase';

const Homepage = () => {
    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col md={4}>
                        <FeatureCard fontAwesomeIcon="fas fa-pills" iconColor="#FD7272" cardText="Medicines" link="/medicies" />
                    </Col>
                    <Col md={4}>
                        <FeatureCard fontAwesomeIcon="fas fa-procedures" iconColor="#B33771" cardText="Hospital Beds" link="/hospitalBeds" />
                    </Col>
                    <Col md={4}>
                        <FeatureCard fontAwesomeIcon="fas fa-lungs" iconColor="#CAD3C8" cardText="Oxygen Cylinder" link="/oxygenCylinder" />
                    </Col>
                    <Col md={6}>
                        <FeatureCard fontAwesomeIcon="fas fa-syringe" iconColor="#1B9CFC" cardText="Plasma" link="/plasmaDonors" />
                    </Col>
                    <Col md={6}>
                        <FeatureCard fontAwesomeIcon="fas fa-hands-helping" iconColor="#82589F" cardText="Contribute" link="/contribute" />
                    </Col>
                </Row>
            </Container>

            <Container>
                <Card>
                    <Card.Header>Case Status</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <StateWiseDailyCase status="confirmed" graphTitle="Confirmed Cases" graphColor="#6c5ce7"/>
                            </Col>
                            <Col md={6}>
                                <StateWiseDailyCase status="recovered" graphTitle="Recovered Cases" graphColor="#55efc4"/>
                            </Col>
                            <Col md={6}>
                                <StateWiseDailyCase status="deceased" graphTitle="Deceased Cases" graphColor="#FC427B"/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            
            
        </React.Fragment>

    );
}

export default Homepage;