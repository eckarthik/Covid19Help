import React, {Component} from 'react';
import Loading from '../Loading/Loading';
import axios from 'axios';
import Alert from '../Alert/Alert';
import {ListGroup,Card,Container} from 'react-bootstrap';
import classes from './PlasmaDonors.module.css';

class PlasmaDonors extends Component {
    
    state = {
        data:null,
        error:null,
    }

    componentDidMount() {
        axios.get("api/plasmasources")
            .then(response => {
                this.setState({data:response.data});
            })
            .catch(error => {
                this.setState({error:error.message});
            });
    }

    render() {
        let data = null;
        if(this.state.data === null) {
            data = <Loading loadingMessage="Fetching data... Please wait"/>
        }
        else {
            data = []
            let sources = Object.keys(this.state.data);
            for(let source of sources) {
                data.push(
                    <ListGroup.Item>
                        <a target="_blank" rel="noreferrer" href={this.state.data[source]} key={source} className={classes.SourceLink}>
                            <div style={{display:"inline"}} className={classes.Source}>
                                <div style={{display:"inline"}}>{source}</div>
                                <div style={{float:"right"}}><i className="fas fa-greater-than" style={{color:"#7f8c8d"}}></i></div>
                            </div>
                        </a>
                    </ListGroup.Item>
                );
            }
            data = <ListGroup>{data}</ListGroup>
        }

        return (
            <Container>
                { this.state.stateData !== null ?
                    <Alert
                        alertMessage="List of Plasma Donors. Click to redirect to their website"
                        alertMessageTextColor="white"
                        alertColor="#8c7ae6" /> : null
                }
                <Card className={classes.SourceList}>
                    <Card.Header>
                        Plamsa Donors List
                    </Card.Header>
                    <Card.Body>
                        {data}
                        {this.state.error ? <p>{this.state.error}</p> : null}
                    </Card.Body>
                </Card>
            </Container>
        )

    }
};

export default PlasmaDonors;