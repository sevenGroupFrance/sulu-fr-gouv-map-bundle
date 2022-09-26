import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import ChangeView from './Components/ChangeView';
import Screen from './Components/Screen';

import 'leaflet/dist/leaflet.css';
import './Adresse.scss';

const Adresse = (props) => {
  const [value, setValue] = useState('');
  const [datas, setDatas] = useState([]);
  const [focus, setFocus] = useState(false);
  const [coords, setCoords] = useState([]);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (value.length > 0) {
      const timeOutId = setTimeout(() => setDisplayMessage(value), 1000);
      return () => clearTimeout(timeOutId);
    }
    setDatas([]);
    return;
  }, [value]);

  useEffect(() => {
    if (props.value) {
      props.value[0] && setValue(props.value[0]);
      props.value[1] && props.value[2] && setCoords([props.value[2], props.value[1]]);
    }
  }, []);

  const setDisplayMessage = async (value) => {
    setSpinner(true);
    await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}&limit=10&autocomplete=1`)
      .then(res => res.json())
      .then(data => {
        setSpinner(false);
        setDatas(data.features);
      });
  }

  const handleBlur = () => {
    setFocus(false);
    if (props.value && props.value[0] !== undefined) {
      setValue(props.value[0]);
    }
  }

  const handleFocus = () => {
    setFocus(true);
    if (value)
      setDisplayMessage(value);
  }

  const handleMouseDown = (value, coordinates) => {
    setCoords(coordinates);
    setValue(value);
    setFocus(false);
    props.onChange([value, coordinates[1], coordinates[0]]);
    props.onFinish();
  }

  return (
    <>
      <div className="adresse-input-output">
        <input name="adresse"
          autoComplete="off"
          onChange={e => setValue(e.target.value)}
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {
          datas.length > 0 && focus &&
          <Screen
            datas={datas}
            spinner={spinner}
            handleMouseDown={handleMouseDown}
          />
        }
      </div>
      <MapContainer
        center={coords.length > 1 ? [coords[1], coords[0]] : [45.288928063517574, 0.15500904178987499]}
        zoom={coords.length > 1 ? 13 : 6.2}
        scrollWheelZoom={true}
        style={{ width: "100%", height: 400 }}
      >
        <ChangeView
          center={coords.length > 1 ? [coords[1], coords[0]] : [45.288928063517574, 0.15500904178987499]}
          zoom={coords.length > 1 ? 13 : 6.2}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coords.length > 1 &&
          <Marker position={[coords[1], coords[0]]} />

        }
      </MapContainer>
    </>
  )
}

export default Adresse;
