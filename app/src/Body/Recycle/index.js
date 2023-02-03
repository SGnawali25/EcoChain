import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRecycle } from 'react-icons/fa';
import bgImage from '../../assets/bgImage.svg';

const RecyclePage = () => {
  const [initialPosition, setInitialPosition] = useState([
    36.167428, -86.804212,
  ]);
  const [cans, setCans] = useState([]);

  useEffect(() => {
    axios.get('/cans').then((res) => {
      setCans(res.data.data);
    });
  }, []);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setInitialPosition([position.coords.latitude, position.coords.longitude]);
  //   });
  // }, []);

  const ComponentResize = () => {
    const map = useMap();

    setTimeout(() => {
      map.invalidateSize();
    }, 0);

    return null;
  };

  const toFixed = (num, fixed) => {
    const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
  };

  const canIcon = new L.Icon({
    iconUrl: require('../../assets/canMarker.png'),
    iconRetinaUrl: require('../../assets/canMarker.png'),
    iconAnchor: null,
    popupAnchor: [0, -15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon bg-transparent border-0',
  });

  return (
    <div className="min-h-[86.5vh] bg-bgImage">
      <div className="my-10">
        <h2 className="text-center text-4xl text-gray-600 font-bold flex justify-center content-center">
          <p>Select A Can To </p>
          <p className="text-green-500"> &nbsp;Recycle&nbsp;</p>
          <FaRecycle className="my-1 text-green-500" />
        </h2>
      </div>

      <div className="map flex justify-center content-center">
        <MapContainer
          style={{ width: '50%', height: 'calc(75vh)', margin: '0 auto' }}
          center={initialPosition}
          zoom={35}
          scrollWheelZoom={true}
        >
          <ComponentResize />
          <TileLayer
            // className={'ion-hide'}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cans.length > 0 &&
            cans.map((can, id) => (
              <Marker
                position={[
                  parseFloat(can.coordinates.split(',')[0]),
                  parseFloat(can.coordinates.split(',')[1]),
                ]}
                icon={canIcon}
                key={id}
              >
                <Popup>
                  Capacity: {toFixed(can.capacityFilled, 1)}/{can.totalCapacity}{' '}
                  <br />
                  {can.capacityFilled < can.totalCapacity - 0.1 ? (
                    <Link to={`/recycle/${can._id}`} className="text-center">
                      <div className="text-center">Recycle</div>
                    </Link>
                  ) : (
                    <div className="text-center">Can Full</div>
                  )}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default RecyclePage;
