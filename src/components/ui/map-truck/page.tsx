"use client";

import { ActionIcon, Group } from "@mantine/core";
import { IconMaximize } from "@tabler/icons-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
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

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      // style: "mapbox://styles/mapbox/satellite-v9",
      // style: "mapbox://styles/mapbox/navigation-day-v1",
      // style: "mapbox://styles/mapbox/traffic-day-v2",
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
      <Group gap="xs">
        <ActionIcon onClick={handleFitBounds} mt="10px" ml="10px">
          <IconMaximize />
        </ActionIcon>
      </Group>
    </div>
  );
}
