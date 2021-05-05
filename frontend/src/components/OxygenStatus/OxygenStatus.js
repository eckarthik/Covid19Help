import React, {Component} from 'react';
import Loading from '../Loading/Loading';
import axios from 'axios';
import Table from '../Table/Table';
import Alert from '../Alert/Alert';

class OxygenStatus extends Component {

    state = {
        data:[],
        error:null
    }

    column_name_mappings = {
        "id":"ID",
        "record_id":"Record ID",
        "state_name":"State",
        "distributor_name":"Distributor Name",
        "contact_information":"Contact Information",
        "created_at":"Created At",
        "updated_at":"Updated At"
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
            let columns = [];
            let tableData = this.state.data;
            let keys = Object.keys(this.state.data[0]);
            for(let key of keys) {
                columns.push({title:this.column_name_mappings[key],field:key});
            }
            console.log("Columns = ",columns);
            console.log("Data = ",data);
            data = <Table columns={columns} data={tableData} tableTitle="Oxygen Cylinders Availability"/>
        }
        return (
            <div>
                { this.state.data.length !== 0 ?
                <Alert 
                    alertMessage="Below table shows the available Oxygen Cylinders. Last Updated: 4th May 2020 09:30pm" 
                    alertMessageTextColor="white"
                    alertColor="#8c7ae6"/> : null
                }
                {data}
                <p>{this.state.error ? JSON.stringify(this.state.error) : null}</p>
            </div>
        )

    }
}

export default OxygenStatus;