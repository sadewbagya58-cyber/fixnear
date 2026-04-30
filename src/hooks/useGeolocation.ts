import { useState, useEffect } from 'react';

interface Location {
  latitude: number | null;
  longitude: number | null;
}

export function useGeolocation() {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getPosition = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  return { location, error, loading, getPosition };
}
