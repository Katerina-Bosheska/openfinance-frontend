import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line
} from 'recharts';

const CustomLineChart = (props) => {

    const data = props.data;

    return (
        <div id="line-chart">
            <h5 style={{marginTop:"90px", marginLeft:"160px", color:"#43497B"}}>{props.title}</h5>
            <LineChart
                width={1200}
                height={400}
                margin={{
                    top: 50, right: 0, left: 190, bottom: 80,
                }}
                data={data} >
                <XAxis dataKey="date"/>
                <YAxis dataKey="amount" name="Износ:"/>
                <Tooltip/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
        </div>
    );

};

export default CustomLineChart;