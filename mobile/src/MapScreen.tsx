import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

interface Earthquake {
    title: string;
    coordinates: [number, number];
}

const API_URL = 'http://localhost:3000';

const MapScreen: React.FC = () => {
    const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: "Location Permission",
                            message: "This app needs access to your location to show earthquakes near you.",
                            buttonNeutral: "Ask Me Later",
                            buttonNegative: "Cancel",
                            buttonPositive: "OK"
                        }
                    );
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        setError('Location permission denied');
                        return;
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
            getCurrentLocation();
        };

        const getCurrentLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    fetchEarthquakes(latitude, longitude);
                    setPosition({latitude, longitude});
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setError('Failed to get location');
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
            );
        };

        const fetchEarthquakes = async (lat: number, lon: number) => {
            try {
                const response = await axios.get(`${API_URL}/earthquakes/closest`, {
                    params: {lat, lon}
                });
                setEarthquakes(response.data);
            } catch (error) {
                console.error('Error fetching earthquakes:', error);
                setError('Failed to fetch earthquake data');
            }
        };

        requestLocationPermission();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Latest Earthquakes</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            {position && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: position.latitude,
                        longitude: position.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {earthquakes.map((quake) => (
                        <Marker
                            key={quake.title}
                            coordinate={{latitude: quake.coordinates[0], longitude: quake.coordinates[1]}}
                            title={quake.title}
                        />
                    ))}
                    {earthquakes.map((quake) => (
                        <Polyline
                            key={quake.title}
                            coordinates={[
                                {latitude: position.latitude, longitude: position.longitude},
                                {latitude: quake.coordinates[0], longitude: quake.coordinates[1]}
                            ]}
                        />
                    ))}
                </MapView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default MapScreen;
