import React from 'react';
import MaterialTable from 'material-table';
import {Container} from 'react-bootstrap';
import './Table.css';

const Table  = (props) => {
    console.log("Table js file");
    console.log("Table js props = ",props);
    return (
        <Container fluid>
            <MaterialTable
                style={{textAlign:"center",backgroundColor:"#f5f6fa",boxShadow:"1px 2px 13px -1px rgba(0,0,0,0.25);",WebkitBoxShadow:"1px 2px 13px -1px rgba(0,0,0,0.25);",MozBoxShadow:"1px 2px 13px -1px rgba(0,0,0,0.25);"}}
                columns={props.columns}
                data={props.data}
                title={
                    <p class="tableTitle">
                        {props.tableTitle}
                    </p>
                }
                options={{
                    headerStyle:{
                        fontWeight:"bold",
                        fontSize:"10px"
                    },
                    exportButton:true
                }}
            />
        </Container>
    );
};

export default Table;