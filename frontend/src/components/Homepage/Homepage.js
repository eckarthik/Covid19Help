import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import FeatureCard from '../Card/Card';
import StateWiseDailyCase from '../StateWiseDailyCase/StateWiseDailyCase';

const Homepage = () => {
    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        <FeatureCard fontAwesomeIcon="fas fa-pills" iconColor="#33d9b2" cardText="Medicines" link="/medicines" />
                    </Col>
                    <Col xs={6} md={4}>
                        <FeatureCard fontAwesomeIcon="fas fa-procedures" iconColor="#B33771" cardText="Hospital Beds" link="/hospitalBeds" />
                    </Col>
                    <Col xs={6} md={4}>
                        <FeatureCard fontAwesomeIcon="fas fa-lungs" iconColor="#CAD3C8" cardText="Oxygen Cylinder" link="/oxygenCylinder" />
                    </Col>
                    <Col xs={6} md={4}>
                        <FeatureCard fontAwesomeIcon="fas fa-tint" iconColor="#ff5252" cardText="Plasma" link="/plasmaDonors" />
                    </Col>
                    <Col xs={6} md={4}>
                        <FeatureCard fontAwesomeIcon="fas fa-hands-helping" iconColor="#82589F" cardText="Contribute" link="/contribute" />
                    </Col>
                    <Col xs={6} md={4}>
                        <FeatureCard fontAwesomeIcon="fas fa-syringe" iconColor="#ffb142" cardText="Vaccine Slot Finder" link="https://cowin-vaccine-notifier.netlify.app/" externalLink={true} />
                    </Col>

                </Row>

            </Container>

                <Container>
                    <Card>
                        <Card.Header>Case Status</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6} sm={12}>
                                    <StateWiseDailyCase status="confirmed" graphTitle="Confirmed Cases" graphColor="#6c5ce7" />
                                </Col>
                                <Col md={6}>
                                    <StateWiseDailyCase status="recovered" graphTitle="Recovered Cases" graphColor="#55efc4" />
                                </Col>
                                <Col md={6}>
                                    <StateWiseDailyCase status="deceased" graphTitle="Deceased Cases" graphColor="#FC427B" />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            
            
        </React.Fragment>

    );
}

export default Homepage;