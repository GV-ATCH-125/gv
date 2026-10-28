"use client";

import { useCallback, useMemo, useState } from "react";
import AyvensMapsGoogleMapView, {
  type GeocodeFn,
} from "@/components/map/ayvens-maps-google-map-view";
import AyvensMapsSidebar from "@/components/layout/ayvens-maps-sidebar";
import AyvensMapsButton from "@/components/layout/ayvens-maps-button";
import { useAyvensMapsToggle } from "@/components/functionality/ayvens-maps-toggle";
import {
  distanceKm,
  PARTNERS,
  TYPE_COLORS,
  TYPE_LABELS,
  type LatLng,
  type PartnerType,
} from "@/lib/partners";

const ALL_TYPES = Object.keys(TYPE_LABELS) as PartnerType[];

/** Owns the app state (search, filters, selection) and wires map + sidebar together. */
export default function Locator() {
  const { open, setOpen, toggle } = useAyvensMapsToggle(true);
  const [query, setQuery] = useState("");
  const [types, setTypes] = useState<PartnerType[]>(ALL_TYPES);
  const [radius, setRadius] = useState(100);
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [geocode, setGeocode] = useState<GeocodeFn | null>(null);
  const [status, setStatus] = useState("");

  const visible = useMemo(() => {
    const list = PARTNERS.filter((p) => types.includes(p.type)).map((p) => ({
      p,
      d: origin ? distanceKm(origin.lat, origin.lng, p.lat, p.lng) : null,
    }));
    const filtered = origin ? list.filter((x) => (x.d ?? 0) <= radius) : list;
    if (origin) filtered.sort((a, b) => (a.d ?? 0) - (b.d ?? 0));
    return filtered;
  }, [types, origin, radius]);

  const selected = PARTNERS.find((p) => p.id === selectedId) ?? null;

  const toggleType = (t: PartnerType) =>
    setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const search = useCallback(async () => {
    const q = query.trim();
    if (!q) {
      setOrigin(null);
      setStatus("");
      return;
    }
    if (!geocode) {
      setStatus("Map is still loading…");
      return;
    }
    setStatus("Searching…");
    try {
      const loc = await geocode(q);
      if (loc) {
        setOrigin(loc);
        setStatus("");
      } else {
        setStatus("Location not found.");
      }
    } catch {
      setStatus("Search failed. Check your API key and enabled APIs.");
    }
  }, [query, geocode]);

  const locateMe = () => {
    if (!navigator.geolocation) return setStatus("Geolocation not supported.");
    setStatus("Locating…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setQuery("My location");
        setStatus("");
      },
      () => setStatus("Could not get your location."),
    );
  };

  return (
    <div className="app">
      <div className="map-layer">
        <AyvensMapsGoogleMapView
          partners={visible.map((v) => v.p)}
          selected={selected}
          origin={origin}
          onSelectPartner={(id) => {
            setSelectedId(id);
            if (id) setOpen(true);
          }}
          onGeocoderReady={(fn) => setGeocode(() => fn)}
        />
      </div>

      <AyvensMapsSidebar open={open} onToggle={toggle}>
        <div className="sb-controls">
          <form
            className="search-row"
            onSubmit={(e) => {
              e.preventDefault();
              search();
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Address, ZIP or city"
              aria-label="Search location"
            />
            <AyvensMapsButton type="submit">Search</AyvensMapsButton>
          </form>

          <AyvensMapsButton variant="ghost" onClick={locateMe}>
            ◎ Use my location
          </AyvensMapsButton>

          <div className="chips">
            {ALL_TYPES.map((t) => (
              <span
                key={t}
                role="button"
                tabIndex={0}
                className={`chip ${types.includes(t) ? "active" : ""}`}
                onClick={() => toggleType(t)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleType(t)}
              >
                <span className="dot" style={{ background: TYPE_COLORS[t] }} />
                {TYPE_LABELS[t]}
              </span>
            ))}
          </div>

          <div className="radius-row">
            <span>Radius</span>
            <input
              type="range"
              min={5}
              max={300}
              step={5}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              disabled={!origin}
            />
            <span style={{ width: 52, textAlign: "right" }}>{radius} km</span>
          </div>
          {status && <div style={{ fontSize: 13, color: "#b3261e" }}>{status}</div>}
        </div>

        <div className="result-meta">
          {visible.length} partner{visible.length === 1 ? "" : "s"}
          {origin ? ` within ${radius} km` : " in Austria"}
        </div>

        <div className="results">
          {visible.length === 0 && (
            <div className="empty">No partners found. Try a larger radius or other filters.</div>
          )}
          {visible.map(({ p, d }) => (
            <div
              key={p.id}
              className={`card ${p.id === selectedId ? "selected" : ""}`}
              onClick={() => setSelectedId(p.id)}
            >
              {d !== null && <span className="dist">{d.toFixed(1)} km</span>}
              <span className="tag" style={{ background: TYPE_COLORS[p.type] }}>
                {TYPE_LABELS[p.type]}
              </span>
              <h3>{p.name}</h3>
              <div className="line">
                {p.street}, {p.zip} {p.city}
              </div>
              <div className="line">{p.hours}</div>
              <div className="actions">
                <a href={`tel:${p.phone.replace(/\s/g, "")}`} onClick={(e) => e.stopPropagation()}>
                  Call
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </AyvensMapsSidebar>
    </div>
  );
}
