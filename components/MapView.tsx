import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFwZXBlcyIsImEiOiJjbHZ6emp1YmUzM3VjMmpteG1iZ21namhyIn0.NOdtJVHNGuQMPlS--dNGRQ';

const MapViewer = ({ onClose, geoJSONData }: { onClose: () => void; geoJSONData: string }) => {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [0, 0], // Initial center of the map
            zoom: 2, // Initial zoom level
        });

        map.on('load', () => {
            // Add GeoJSON data to the map
            map.addSource('geojson-data', {
                type: 'geojson',
                data: JSON.parse(geoJSONData),
            });
            map.addLayer({
                id: 'geojson-layer',
                type: 'fill',
                source: 'geojson-data',
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.8,
                },
            });
        });

        // Clean up resources when the component unmounts
        return () => {
            map.remove();
        };
    }, [geoJSONData]);

    return (
        <div className="map-dialog">
            <div id="map" className="map"></div>
            <button className="close-button" onClick={onClose}>Close</button>
        </div>
    );
};


export default MapViewer;
