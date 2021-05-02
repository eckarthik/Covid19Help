import React from 'react';
import MaterialTable from 'material-table';
import {Container} from 'react-bootstrap';

const Table  = (props) => {
    console.log("Table js file");
    console.log("Table js props = ",props);
    return (
        <Container fluid>
            <MaterialTable
                style={{margin:"50px",textAlign:"center",backgroundColor:"#f5f6fa",boxShadow:"1px 2px 13px -1px rgba(0,0,0,0.25);",WebkitBoxShadow:"1px 2px 13px -1px rgba(0,0,0,0.25);",MozBoxShadow:"1px 2px 13px -1px rgba(0,0,0,0.25);"}}
                columns={props.columns}
                data={props.data}
                title={props.tableTitle}
                options={{
                    headerStyle:{
                        fontWeight:"bold"
                    },
                    exportButton:true
                }}
            />
        </Container>
    );
};

export default Table;