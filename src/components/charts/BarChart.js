import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line
} from 'recharts';

const CustomBarChart = (props) => {

    const data = props.data;
    const COLORS = ['#5ecba1', '#8dd15c', '#6dadb2', '#da7258', '#6dadb2', '#5ecba1', '#8dd15c', '#6dadb2', '#da7258', '#6dadb2'];

    // return (
    //     <LineChart width={500} height={300} data={data}>
    //         <XAxis dataKey="date"/>
    //         <YAxis dataKey="amount"/>
    //         <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    //         <Line type="monotone" dataKey="amount" stroke="#8884d8" />
    //     </LineChart>
    // );

    return (
        <div id="custom-bar-chart">
            <BarChart
                width={1200}
                height={500}
                data={data}
                margin={{
                    top: 40, right: 0, left: 150, bottom: 80,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={10} tick={{fontSize: 10}} name="Акаунт:"/>
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" name="Износ" fill="#8884d8" >
                    {
                        data.map((entry, index) => {
                            const color = COLORS[index];
                            return <Cell fill={color} />;
                        })
                    }
                </Bar>
                {/*<Bar dataKey="uv" fill="#82ca9d" />*/}
            </BarChart>
        </div>
    );

};

export default CustomBarChart;