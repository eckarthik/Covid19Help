import React, {Component} from 'react';
import Loading from '../Loading/Loading';
import axios from 'axios';
import Alert from '../Alert/Alert';
import {ListGroup,Card,Container,InputGroup,FormControl,Button} from 'react-bootstrap';
import classes from './HospitalBeds.module.css';

class HospitalBeds extends Component {
    
    state = {
        data:null,
        stateData:null,
        error:null,
        searchInput:"",
        searchError:null
    }

    componentDidMount() {
        // axios.get("api/hospitalbeds")
        //     .then(response => {
        //         this.setState({data:response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error:error});
        //     });
        axios.get("api/hospitalBedsSources")
            .then(response => {
                this.setState({data:response.data,stateData:response.data});
            })
            .catch(error => {
                this.setState({error:error});
            });
    }

    searchSubmit = () => {
        let keys = Object.keys(this.state.data);
        let matchingPlaces = {};
        let searchMatchFound = false;
        for(let key of keys) {
            if(key.toLowerCase().indexOf(this.state.searchInput.toLowerCase())!==-1) {
                matchingPlaces[key] = this.state.data[key];
                searchMatchFound = true;
            }
        }
        if(!searchMatchFound) {
            this.setState({searchError:"No matches found for your search input",stateData:matchingPlaces});
        }
        else {
            this.setState({searchError:null,stateData:matchingPlaces});
        }
    }

    searchInputChange = (event) => {
        this.setState({searchInput:event.target.value})
    }

    render() {
        // let data = null;
        // if(this.state.data.length === 0) {
        //     data = <Loading loadingMessage="Fetching data... Please wait"/>
        // }
        // else
        // {
        //     let columns = [];
        //     let tableData = this.state.data;
        //     let keys = Object.keys(this.state.data[0]);
        //     for(let key of keys) {
        //         columns.push({title:key,field:key});
        //     }
        //     console.log("Columns = ",columns);
        //     console.log("Data = ",data);
        //     data = <Table columns={columns} data={tableData} tableTitle="Hospital Beds Availability"/>
        // }

        // return (
        //     <div>
        //         { this.state.data.length !== 0 ?
        //         <Alert 
        //             alertMessage="Below table shows the available Hospital beds. Last Updated: 4th May 2020 09:30pm" 
        //             alertMessageTextColor="white"
        //             alertColor="#8c7ae6"/> : null
        //         }
        //         {data}
        //         <p>{this.state.error ? JSON.stringify(this.state.error) : null}</p>
        //     </div>
        // )

        let data = null;
        if(this.state.stateData === null) {
            data = <Loading loadingMessage="Fetching data... Please wait"/>
        }
        else {
            data = []
            let keys = Object.keys(this.state.stateData);
            for(let key of keys) {
                data.push(
                    <ListGroup.Item>
                        <a target="_blank" rel="noreferrer" href={this.state.stateData[key]} key={key} className={classes.StateLink}>
                            <div style={{display:"inline"}} className={classes.State}>
                                <div style={{display:"inline"}}>{key}</div>
                                <div style={{float:"right"}}><i className="fas fa-greater-than" style={{color:"#7f8c8d"}}></i></div>
                            </div>
                        </a>
                    </ListGroup.Item>
                );
            }
            data = <ListGroup><p className={classes.InfoTag}>Popular Cities</p>{data}</ListGroup>
        }

        return (
            <Container>
                { this.state.stateData !== null ?
                    <Alert
                        alertMessage="Choose your City and you will be redirected to the official website"
                        alertMessageTextColor="white"
                        alertColor="#8c7ae6" /> : null
                }
                <Card className={classes.StatesList}>
                    <Card.Header>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Enter City/State"
                                aria-label="Enter City/State"
                                aria-describedby="basic-addon2"
                                value={this.state.searchInput}
                                onChange={this.searchInputChange}
                            />
                            <InputGroup.Append>
                                <Button variant="outline-primary" onClick={this.searchSubmit}><i className="fas fa-search"/> Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Card.Header>
                    <Card.Body>
                        {data}
                        {this.state.searchError ? <p>{this.state.searchError}</p> : null}
                    </Card.Body>
                </Card>
            </Container>
        )

    }
};

export default HospitalBeds;