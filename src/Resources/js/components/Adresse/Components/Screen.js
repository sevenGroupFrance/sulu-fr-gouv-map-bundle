import React from 'react';

const Screen = ({datas, spinner, handleMouseDown}) => {
  return (
    <ul>
      {
        spinner
          ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          : datas.map((data, i) => (
            <li key={i} onMouseDown={() => handleMouseDown(data.properties.label, data.geometry.coordinates)}>
              {data.properties.label}
            </li>
          ))
      }
    </ul>
  )
}

export default Screen;