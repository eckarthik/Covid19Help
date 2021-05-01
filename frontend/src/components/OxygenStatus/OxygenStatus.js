import React, {Component} from 'react';
import Loading from '../Loading/Loading';
import axios from 'axios';
import {Table,Container} from 'react-bootstrap';

class OxygenStatus extends Component {

    state = {
        data:[],
        error:null
    }

    componentDidMount() {
        axios.get("api/oxygenStatus")
            .then(response => {
                this.setState({data:response.data});
            })
            .catch(error => {
                this.setState({error:error});
            });
    }

    render() {
        let data = null;
        if(this.state.data.length === 0) {
            data = <Loading loadingMessage="Fetching data... Please wait"/>
        }
        else {
            data = <Container style={{marginTop:"50px"}}>
            <h1 style={{textAlign:"center"}}>Oxygen Status</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>
                            State/City
                        </th>
                        <th>
                            Distributor Name
                        </th>
                        <th>
                            Area
                        </th>
                        <th>
                            Contact Information
                        </th>
                    </tr> 
                </thead>
                <tbody>
                    {this.state.data.map(row => {
                        return <tr key={row["Id"]}>
                            <td>
                                {row["State/City"]}
                            </td>
                            <td>
                                {row["Distributor Name"]}
                            </td>
                            <td>
                                {row["Area"]}
                            </td>
                            <td>
                                {row["Contact Information"]}
                            </td>
                        </tr>
                    })}
                 </tbody>
            </Table>
        </Container>
        }
        return (
            <div>
                {data}
                <p>{this.state.error ? JSON.stringify(this.state.error) : null}</p>
            </div>
           
        )
    }
}

export default OxygenStatus;