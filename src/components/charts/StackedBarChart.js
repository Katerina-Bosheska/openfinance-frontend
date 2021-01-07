import React, { PureComponent, useState, useEffect } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const StackedBarChart = (props) => {

    const data = props.data;
    console.log(data);

    return (
        <div id="budgetChart">
            <BarChart
                width={1000}
                height={450}
                data={data}
                margin={{
                    top: 20, left: 300, bottom: 20,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" name="Буџет" stackId="a" fill="#8884d8" />
                <Bar dataKey="plan" name="План" stackId="a" fill="#82ca9d" />
                <Bar dataKey="realization" name="Реализација" stackId="a" fill="gray" />
                {/*<Bar dataKey="realization" stackId="a" fill="whitesmoke" />*/}
            </BarChart>
        </div>
    );
};

export default StackedBarChart;
