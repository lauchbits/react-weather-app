import React from 'react';
import CustomTooltip from './CustomTooltip.js'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Chart(props)  {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={1200}
        height={500}
        data={props.data}
        margin={{
          top: 40,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip wrapperStyle={{ backgroundColor: '#ccc' }} content={<CustomTooltip />} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="temperature" 
          stroke="#F44236" 
          strokeWidth={3} 
          activeDot={{ r: 8 }}/>
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart