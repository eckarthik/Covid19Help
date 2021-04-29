import React, {Component} from 'react';
import Loading from '../Loading/Loading';

class OxygenStatus extends Component {

    state = {
        data:[]
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/oxygenStatus")
            .then(response => response.json())
            .then(response => {
                this.setState({data:response})
            })
    }

    render() {
        let data = null;
        if(this.state.data.length === 0) {
            data = <Loading loadingMessage="Fetching data... Please wait"/>
        }
        else {
            data = <div style={{marginTop:"50px"}}>
            <h1 style={{textAlign:"center"}}>Oxygen Status</h1>
            <table border="border" style={{margin:"auto",textAlign:"center",marginTop:"50px",borderCollapse:"collapse"}}>
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
            </table>
        </div>
        }
        return (
            <div>
                {data}
            </div>
           
        )
    }
}

export default OxygenStatus;