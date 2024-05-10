import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'
import styles from './MapViewer.module.css'

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

            const bounds = new mapboxgl.LngLatBounds();

            geoJSON.features.forEach((feature: Feature) => {
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

        return () => {
            map.remove();
        };
    }, [geoJSONData]);

    return (
        <div className={styles['map-viewer-wrapper']}>
            <div id="map" className={styles.map}></div>
            <button className={styles['close-button']} onClick={onClose}>
                <span className="material-icons">close</span>
            </button>
        </div>
    );
};


export default MapViewer;
