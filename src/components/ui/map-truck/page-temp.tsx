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
  onClick?: (e: any) => void;
}) {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      // style: "mapbox://styles/mapbox/streets-v11",
      // style: "mapbox://styles/mapbox/streets-v12",
      style: "mapbox://styles/mapbox/outdoors-v12",
      // style: "mapbox://styles/mapbox/light-v11",
      // style: "mapbox://styles/mapbox/dark-v11",
      // style: "mapbox://styles/mapbox/navigation-day-v1",
      // style: "mapbox://styles/mapbox/navigation-night-v1",
      // bodit haragduuldag
      // style: "mapbox://styles/mapbox/satellite-v9",
      center: [106.91377748380476, 47.92058872954049],
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
    let thismarker: mapboxgl.Marker | null = null;
    if (map && coordinates) {
      if (!marker) {
        map.flyTo({
          center: coordinates,
        });
      }
      thismarker = new mapboxgl.Marker({
        color: "black",
      }).setLngLat(coordinates);
      setMarker(thismarker);
      thismarker.addTo(map);
    }
    return () => {
      thismarker && thismarker.remove();
      marker && marker.remove();
    };
  }, [coordinates, map]);

  return (
    <div
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
      }}
      ref={mapContainerRef}
    />
  );
}
