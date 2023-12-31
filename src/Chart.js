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
          bottom: 5,
        }}
      >
        {props.grid && <CartesianGrid stroke="#ccc" />}
        <XAxis dataKey="time" stroke='white' />

        <Tooltip wrapperStyle={{ backgroundColor: '#ccc' }} content={<CustomTooltip max_temp={props.max_temp}/>} />
        <Line 
          type="monotone" 
          dataKey="temperature" 
          stroke="yellow" 
          strokeWidth={3}
          activeDot={{ r: 8 }}/>
        
        <Line 
          type="monotone" 
          dataKey="max_temperature" 
          stroke="red" 
          strokeWidth={3}
          dot={{ stroke: 'red',  r: 4,}}
          activeDot={{ r: 8 }}/>
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart