import React,{useEffect,useState} from 'react';
import {Line} from 'react-chartjs-2';
import axios from '../../axios';

const StateWiseDailyCase = (props) => {
    const [labels,setLabels] = useState([]);
    const [data,setData] = useState([]);

    useEffect(() => {
        axios.get("api/stateWiseCaseHistory")
        .then(response => {
            let totalData = response.data[props.status].length;
            let last90daysData = response.data[props.status].splice(totalData-90,totalData-1)
            let labels = [];
            last90daysData.map(data => labels.push(data["Date"]));
            let caseCountData = [];
            last90daysData.map(data => caseCountData.push(data["TT"]));

            setLabels(labels);
            setData(caseCountData);
        })
    },[]);

    let graphData = {
        labels: labels,
        datasets: [
          {
            label: props.graphTitle,
            data: data,
            fill: true,
            backgroundColor: props.graphColor
          },
        ],
      };
    return <div style={{width:"100%",height:"300px"}}>
            <Line data={graphData} options={{responsive:true,maintainAspectRatio:false}}/>
        </div>

};

export default StateWiseDailyCase;