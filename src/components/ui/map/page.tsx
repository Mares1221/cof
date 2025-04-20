import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

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
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  // Координатын валидац
  const isValidCoordinates = (coords: any): coords is [number, number] =>
    Array.isArray(coords) &&
    coords.length === 2 &&
    coords.every((n) => typeof n === "number");

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Map-г инициалчлах
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: isValidCoordinates(coordinates)
        ? coordinates
        : [106.91367547215157, 47.9204588626057], // Default [lng, lat]
      zoom: 12,
      attributionControl: false,
    });

    mapRef.current = mapInstance;

    // Click эвент
    mapInstance.on("click", (e) => {
      // Хуучин marker-ийг устгах
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Шинэ marker нэмэх
      const newMarker = new mapboxgl.Marker({ color: "black" })
        .setLngLat(e.lngLat)
        .addTo(mapInstance);

      markerRef.current = newMarker;
      onClick(e.lngLat);
    });

    // Анхны coordinates байвал marker нэмэх
    if (isValidCoordinates(coordinates)) {
      const initialMarker = new mapboxgl.Marker({ color: "black" })
        .setLngLat(coordinates)
        .addTo(mapInstance);
      markerRef.current = initialMarker;
    }

    // Cleanup
    return () => {
      mapInstance.remove();
      mapRef.current = null;
    };
  }, []); // Зөвхөн анх удаа ажиллана

  useEffect(() => {
    if (!mapRef.current || !isValidCoordinates(coordinates)) return;

    // Coordinates өөрчлөгдвөл map-г төвлөрүүлж, marker шинэчлэх
    mapRef.current.flyTo({ center: coordinates });

    // Хуучин marker-ийг устгах
    if (markerRef.current) {
      markerRef.current.remove();
    }

    // Шинэ marker нэмэх
    const newMarker = new mapboxgl.Marker({ color: "black" })
      .setLngLat(coordinates)
      .addTo(mapRef.current);

    markerRef.current = newMarker;
  }, [coordinates]); // coordinates өөрчлөгдвөл ажиллана

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
