import india_state from '../../../../../public/india_state.geojson'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const IndiaMap = ({ regionalData }) => {
  const [geographyData, setGeographyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(india_state) // Ensure the file is in the public folder
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load map data: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data.features) {
          throw new Error('Invalid GeoJSON format: Missing features');
        }
        setGeographyData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Map loading error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading map...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading map: {error}. Please check the console for details.
      </div>
    );
  }

  if (!geographyData) {
    return <div className="p-4 text-gray-500">No map data available.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Regional Sales Distribution</h3>
      <div className="h-96 w-full">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [82, 23],
            scale: 1200
          }}
        >
          <Geographies geography={geographyData}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#E5E7EB"
                    stroke="#FFFFFF"
                    strokeWidth={0.8}
                    style={{
                      hover: { fill: '#BFDBFE' },
                      pressed: { outline: 'none' }
                    }}
                  />
                ))}

                {regionalData.map(({ id, value, name }) => {
                  const stateGeo = geographies.find(
                    (g) => g.properties.state_code === id
                  );

                  if (!stateGeo) {
                    console.warn(`State ${id} not found in GeoJSON`);
                    return null;
                  }

                  const centroid = geoCentroid(stateGeo);
                  const radius = Math.sqrt(value) / 60 + 4;

                  return (
                    <Marker key={id} coordinates={centroid}>
                      <circle
                        r={radius}
                        fill="#3B82F6"
                        fillOpacity="0.7"
                        stroke="#1D4ED8"
                        strokeWidth="0.8"
                      />
                      <text
                        y={-radius - 8}
                        textAnchor="middle"
                        fontSize={11}
                        fill="#1E40AF"
                        className="font-medium"
                      >
                        {`${name}\n₹${(value / 1000).toFixed(1)}k`}
                      </text>
                    </Marker>
                  );
                })}
              </>
            )}
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
};

IndiaMap.propTypes = {
  regionalData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default IndiaMap;