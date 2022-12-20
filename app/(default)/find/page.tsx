'use client'

import * as mapboxgl from 'mapbox-gl'
import {useEffect, useRef} from "react";

// @ts-expect-error
mapboxgl.accessToken = 'pk.eyJ1IjoicWluZ3VhbiIsImEiOiJjbDRzbG00aWcwM3F4M2pvd2hwMGZqMXM5In0.Hrs3-ffnUNMXMYttOq9Vew';

export default function FindPage() {
  const map = useRef<mapboxgl.Map>()

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [103.90215026158484, 1.3880573878458051],
      zoom: 8
    });

    map.current.on('load', () => {
      map.current?.loadImage('./orange-bincent-50.png', (error, image) => {
        if (error || !image) throw error

        map.current?.addImage('bincent', image)
        map.current?.addSource('points', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                // feature for Mapbox DC
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [
                    103.9627694476958, 1.341293768422969
                  ]
                },
                'properties': {
                  'title': 'Bincent SUTD'
                }
              },
            ]
          }
        });

        map.current?.addLayer({
          'id': 'points',
          'type': 'symbol',
          'source': 'points',
          'layout': {
            'icon-image': 'bincent',
          }
        });
      })
    })

    map.current.on('click', (event) => {
      const features = map.current?.queryRenderedFeatures(event.point, {});
      if (!features?.length) {
        return;
      }
      const feature = features[0];

      new mapboxgl.Popup({offset: [0, -15]})
        // @ts-expect-error
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
          `<h3>${feature.properties?.title}</h3>`
        )
        .addTo(map.current!);
    })

    return () => {
      map.current?.remove()
    }
  }, [])

  return (
    <div className="flex h-full flex-col">
      <h1 className="font-semibold text-xl">Find a Bincent</h1>
      <div id="map" className="flex-1 mt-3"/>
    </div>
  )
}
