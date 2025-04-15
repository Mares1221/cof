import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYm9sZGtvdjEiLCJhIjoiY2xpdHg0bGhrMDlkZjNmbzJ1Y2pjeWE2eSJ9.0XXgizx295KsOkq8ChY5fg";

export default function MapBox({
  coordinates,
  onClick = () => {},
}: {
  coordinates?: mapboxgl.LngLatLike;
  onClick?: (lngLat: mapboxgl.LngLat) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [currentMarker, setCurrentMarker] = useState<mapboxgl.Marker | null>(
    null
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [106.91377748380476, 47.92058872954049],
      zoom: 12,
      attributionControl: false,
    });

    mapInstance.on("click", (e) => {
      if (currentMarker) {
        currentMarker.remove();
      }

      const newMarker = new mapboxgl.Marker({
        color: "black",
      })
        .setLngLat(e.lngLat)
        .addTo(mapInstance);

      setCurrentMarker(newMarker);
      onClick(e.lngLat);
    });

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
      setMap(null);
    };
  }, []);

  useEffect(() => {
    if (!map || !coordinates) return;

    map.flyTo({
      center: coordinates,
    });

    if (currentMarker) {
      currentMarker.remove();
    }

    const newMarker = new mapboxgl.Marker({
      color: "black",
    })
      .setLngLat(coordinates)
      .addTo(map);

    setCurrentMarker(newMarker);
  }, [coordinates, map]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      ref={mapContainerRef}
    />
  );
}
