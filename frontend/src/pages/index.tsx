import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {getEarthquakes} from '@/app/api/earthquakeService';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';

interface Earthquake {
    title: string;
    coordinates: [number, number];
}

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {ssr: false});
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), {ssr: false});
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {ssr: false});
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), {ssr: false});
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), {ssr: false});

const HomePage = () => {
    const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [position, setPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && navigator.geolocation) {
            const fetchData = async (lat: number, lon: number) => {
                try {
                    const data = await getEarthquakes(lat, lon);
                    setEarthquakes(data);
                    setPosition([lat, lon]);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('Failed to fetch earthquake data');
                }
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    fetchData(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setError('Failed to get location');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser');
        }
    }, []);

    return (
        <div className="map-container">
            <h1>Latest Earthquakes</h1>
            {error && <p>{error}</p>}
            {position && (
                <MapContainer center={position} zoom={4} style={{height: '100%', width: '100%'}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {earthquakes.map((quake) => (
                        <Marker key={quake.title} position={quake.coordinates}>
                            <Popup>{quake.title}</Popup>
                        </Marker>
                    ))}
                    {earthquakes.map((quake) => (
                        <Polyline key={quake.title} positions={[position, quake.coordinates]}/>
                    ))}
                </MapContainer>
            )}
        </div>
    );
};

export default HomePage;
