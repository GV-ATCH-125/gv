"use client";

import { useEffect } from "react";
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { TYPE_COLORS, type LatLng, type Partner } from "@/lib/partners";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? "DEMO_MAP_ID";
const AUSTRIA_CENTER: LatLng = { lat: 47.6, lng: 13.8 };

export type GeocodeFn = (query: string) => Promise<LatLng | null>;

type Props = {
  /** Partners to draw as markers. */
  partners: Partner[];
  /** Currently selected partner (gets a bigger pin + info window). */
  selected: Partner | null;
  /** Search origin (blue dot). The map fits itself around it when it changes. */
  origin: LatLng | null;
  onSelectPartner: (id: string | null) => void;
  /** Called once the Google Geocoder is ready, so the parent can resolve addresses. */
  onGeocoderReady?: (geocode: GeocodeFn) => void;
};

/** Pans / zooms the map in response to selection and search changes. */
function CameraController({
  selected,
  origin,
  partners,
}: Pick<Props, "selected" | "origin" | "partners">) {
  const map = useMap();

  useEffect(() => {
    if (!map || !selected) return;
    map.panTo({ lat: selected.lat, lng: selected.lng });
    map.setZoom(Math.max(map.getZoom() ?? 0, 14));
  }, [map, selected]);

  useEffect(() => {
    if (!map || !origin) return;
    //const bounds = new google.maps.LatLngBounds(origin);
    //partners.slice(0, 5).forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
    //map.fitBounds(bounds, 80);
    // Only refit when the origin changes, not on every filter tweak.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, origin]);

  return null;
}

/** Exposes a geocode function to the parent once the Maps API is loaded. */
function GeocoderBridge({ onReady }: { onReady?: (fn: GeocodeFn) => void }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !onReady) return;
    //const geocoder = new google.maps.Geocoder();
    //onReady(async (query) => {
     // const res = await geocoder.geocode({ address: query, region: "AT" });
     // const loc = res.results[0]?.geometry.location;
     // return loc ? { lat: loc.lat(), lng: loc.lng() } : null;
  //  });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return null;
}

export default function AyvensMapsGoogleMapView({
  partners,
  selected,
  origin,
  onSelectPartner,
  onGeocoderReady,
}: Props) {
  if (!API_KEY) {
    return (
      <div className="notice">
        <div>
          <h2>Google Maps key missing</h2>
          <p>
            Copy <code>.env.local.example</code> to <code>.env.local</code>, set{" "}
            <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> and restart <code>npm run dev</code>.
          </p>
          <p>Enable the Maps JavaScript API and Geocoding API for the key.</p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId={MAP_ID}
        defaultCenter={AUSTRIA_CENTER}
        defaultZoom={7}
        gestureHandling="greedy"
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
        style={{ width: "100%", height: "100%" }}
        onClick={() => onSelectPartner(null)}
      >
        <GeocoderBridge onReady={onGeocoderReady} />
        <CameraController selected={selected} origin={origin} partners={partners} />

        {origin && (
          <AdvancedMarker position={origin} title="Search location">
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#1a73e8",
                border: "3px solid #fff",
                boxShadow: "0 0 0 2px rgba(26,115,232,.4)",
              }}
            />
          </AdvancedMarker>
        )}

        {partners.map((p) => (
          <AdvancedMarker
            key={p.id}
            position={{ lat: p.lat, lng: p.lng }}
            title={p.name}
            onClick={() => onSelectPartner(p.id)}
          >
            <Pin
              background="#0F3549"
              borderColor="#ffffff"
              glyphColor="#ffffff"
              scale={p.id === selected?.id ? 1.3 : 1}
            />
          </AdvancedMarker>
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            pixelOffset={[0, -40]}
            onCloseClick={() => onSelectPartner(null)}
          >
            <div className="info">
              <h4>{selected.name}</h4>
              <p>
                {selected.street}, {selected.zip} {selected.city}
              </p>
              <p>{selected.hours}</p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
