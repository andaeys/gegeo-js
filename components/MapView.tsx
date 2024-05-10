import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFwZXBlcyIsImEiOiJjbHZ6emp1YmUzM3VjMmpteG1iZ21namhyIn0.NOdtJVHNGuQMPlS--dNGRQ';

const MapViewer = ({ onClose, geoJSONData }: { onClose: () => void; geoJSONData: string }) => {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [0, 0], 
            zoom: 2, 
        });

        map.on('load', () => {
            const geoJSON = JSON.parse(geoJSONData);

            // Calculate the bounding box of the GeoJSON features
            const bounds = new mapboxgl.LngLatBounds();

            geoJSON.features.forEach((feature) => {
                if (feature.geometry.type === 'Point') {
                    bounds.extend(feature.geometry.coordinates);
                } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'Polygon') {
                    feature.geometry.coordinates.forEach((coord) => {
                        coord.forEach((point) => {
                            bounds.extend(point);
                        });
                    });
                }
            });

            if (!bounds.isEmpty()) {
                map.fitBounds(bounds, {
                    padding: 20, 
                });
            }

            // Add GeoJSON data to the map
            map.addSource('geojson-data', {
                type: 'geojson',
                data: geoJSON,
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

    const getBounds = (geoJSON: any) => {
        const coordinates = geoJSON.features.reduce((acc: any[], feature: any) => {
            return acc.concat(feature.geometry.coordinates);
        }, []);

        const bounds = coordinates.reduce((acc: any[], coord: any) => {
            return [
                [Math.min(acc[0][0], coord[0]), Math.min(acc[0][1], coord[1])],
                [Math.max(acc[1][0], coord[0]), Math.max(acc[1][1], coord[1])]
            ];
        }, [[Infinity, Infinity], [-Infinity, -Infinity]]);

        return bounds;
    };

    return (
        <div className="map-dialog">
            <div id="map" className="map"></div>
            <button className="close-button" onClick={onClose}>Close</button>
        </div>
    );
};


export default MapViewer;
