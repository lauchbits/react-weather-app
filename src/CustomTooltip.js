import React from 'react';
import './CustomTooltip.css'

function CustomTooltip({ payload, label, active, max_temp }) {

    if (label){
        if (label[0]==='0' && label[1]!=='0'){
            label = label.slice(1)
        }
    }

    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="time">{`${label}`}</p>
          {max_temp && <p>{`Max: ${payload[1].value}°C`}</p>}
          <p className="temp">{`Avg: ${payload[0].value}°C`}</p>
        </div>
      );
    }
    return null;
}

export default CustomTooltip