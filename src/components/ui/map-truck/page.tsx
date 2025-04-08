"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYm9sZGtvdjEiLCJhIjoiY2xpdHg0bGhrMDlkZjNmbzJ1Y2pjeWE2eSJ9.0XXgizx295KsOkq8ChY5fg";

type CoordinateItem = {
  location: mapboxgl.LngLatLike;
  title: string;
  description?: string;
  iconUrl?: string; // optional
};

export default function MapBox({
  coordinates = [],
  onClick = () => {},
}: {
  coordinates?: CoordinateItem[];
  onClick?: (e: any) => void;
}) {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [bounds, setBounds] = useState<mapboxgl.LngLatBounds | null>(null);

  // Map үүсгэх
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [106.9137, 47.9205],
      zoom: 12,
      attributionControl: false,
    });

    map.on("click", onClick);
    setMap(map);

    return () => {
      setMap(null);
      map.remove();
    };
  }, []);

  // Marker-ууд үүсгэх
  useEffect(() => {
    if (!map || !coordinates.length) return;

    markers.forEach((m) => m.remove());

    const newMarkers: mapboxgl.Marker[] = [];
    const newBounds = new mapboxgl.LngLatBounds();

    coordinates.forEach(({ location, title, description, iconUrl }) => {
      const el = document.createElement("div");
      el.style.backgroundImage = `url('${iconUrl || "/truck.png"}')`;
      el.style.width = "40px";
      el.style.height = "40px";
      el.style.backgroundSize = "cover";
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";
      el.style.cursor = "pointer";

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(location)
        .addTo(map);

      if (title || description) {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <strong>${title}</strong><br />
          <small>${description || ""}</small>
        `);
        marker.setPopup(popup);
      }

      newMarkers.push(marker);
      newBounds.extend(location);
    });

    setMarkers(newMarkers);
    setBounds(newBounds);

    return () => {
      newMarkers.forEach((m) => m.remove());
    };
  }, [coordinates, map]);

  const handleFitBounds = () => {
    if (map && bounds && !bounds.isEmpty()) {
      map.fitBounds(bounds, {
        padding: 100,
        duration: 1000,
      });
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={mapContainerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <button
        onClick={handleFitBounds}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1,
          background: "white",
          padding: "10px 15px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          cursor: "pointer",
        }}
      >
        Томруулж харах
      </button>
    </div>
  );
}
