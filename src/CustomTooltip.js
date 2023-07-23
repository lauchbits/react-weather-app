import React from 'react';
import './CustomTooltip.css'

function CustomTooltip({ payload, label, active }) {

    if (label){
        if (label[0]==='0' && label[1]!=='0'){
            label = label.slice(1)
        }
    }

    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="time">{`${label}`}</p>
          <p className="temp">{`${payload[0].value}°C`}</p>
        </div>
      );
    }
    return null;
}

export default CustomTooltip