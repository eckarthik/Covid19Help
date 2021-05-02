import React, {Component} from 'react';
import Loading from '../Loading/Loading';
import axios from 'axios';
import Table from '../Table/Table';
import Alert from '../Alert/Alert';

class HospitalBeds extends Component {
    
    state = {
        data:[],
        error:null
    }

    componentDidMount() {
        axios.get("api/hospitalbeds")
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
        else
        {
            let columns = [];
            let tableData = this.state.data;
            let keys = Object.keys(this.state.data[0]);
            for(let key of keys) {
                columns.push({title:key,field:key});
            }
            console.log("Columns = ",columns);
            console.log("Data = ",data);
            data = <Table columns={columns} data={tableData} tableTitle="Hospital Beds Availability"/>
        }

        return (
            <div>
                { this.state.data.length !== 0 ?
                <Alert 
                    alertMessage="Below table shows the available Hospital beds. Last Updated: 4th May 2020 09:30pm" 
                    alertMessageTextColor="white"
                    alertColor="#8c7ae6"/> : null
                }
                {data}
                <p>{this.state.error ? JSON.stringify(this.state.error) : null}</p>
            </div>
        )

    }
};

export default HospitalBeds;