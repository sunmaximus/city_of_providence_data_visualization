import React, { Component } from 'react';

import Chart from 'chart.js';
import mapboxgl from 'mapbox-gl'
import Datamap from 'datamaps';

import { getRandomColor } from '../module/providence';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
class ProvidenceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationZip: {
      },
      locationZipAssessment: {
      },
      lng: 5,
      lat: 34,
      zoom: 1.5
    }
  }

  componentWillMount() {
    this.props.fetchProvidenceData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.length === 0 && this.props.data.length > 0) {
      this.props.data.forEach(property => {
        const { location_zip, total_assessment } = property;
        this.setState(prevState => {
          return {
            locationZip: {
              ...prevState.locationZip,
              [location_zip]: prevState.locationZip[location_zip] ? prevState.locationZip[location_zip] + 1 : 1,
            },
            locationZipAssessment: {
              ...prevState.locationZipAssessment,
              [location_zip]: prevState.locationZipAssessment[location_zip] ? prevState.locationZip[location_zip] + total_assessment : total_assessment,
            }
          };
        })
      })
    }

    const horizontalBar = this.horizontalBar, bar = this.bar, pie = this.pie;
    const { locationZip, locationZipAssessment } = this.state;
    let zipCodesCount = [], zipCodeColor = [], totalAssessmentByZip = [];
    let zipCodes = Object.keys(locationZip);
    zipCodes.forEach(zip => {
      zipCodesCount = [...zipCodesCount, locationZip[zip]];
      zipCodeColor = [...zipCodeColor, getRandomColor()];
      totalAssessmentByZip = [...totalAssessmentByZip, locationZipAssessment[zip]]
    })

    new Chart(horizontalBar, {
      type: "horizontalBar",
      data: {
        labels: zipCodes,
        datasets: [
          {
            label: "Property Zip Code Count",
            data: zipCodesCount,
            backgroundColor: zipCodeColor,
          }
        ]
      },
    });

    new Chart(bar, {
      type: "bar",
      data: {
        labels: zipCodes,
        datasets: [
          {
            label: "Total Assessment of Each ZipCode",
            data: totalAssessmentByZip,
            backgroundColor: zipCodeColor,
          }
        ]
      },
    });

    new Chart(pie, {
      type: "pie",
      data: {
        labels: zipCodes,
        datasets: [
          {
            label: "Total Assessment of Each ZipCode Pie Chart",
            data: totalAssessmentByZip,
            backgroundColor: zipCodeColor,
            borderWidth: 0,
          }
        ]
      },
    });

  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    const datamap = this.datamap

    var arcs = new Datamap({
      element: datamap,
      scope: 'usa',
      fills: {
        defaultFill: "#ABDDA4",
        win: '#0fa0fa'
      },
      data: {
        'TX': { fillKey: 'win' },
        'FL': { fillKey: 'win' },
        'NC': { fillKey: 'win' },
        'CA': { fillKey: 'win' },
        'NY': { fillKey: 'win' },
        'CO': { fillKey: 'win' }
      }
    });

    // Arcs coordinates can be specified explicitly with latitude/longtitude,
    // or just the geographic center of the state/country.
    arcs.arc([
      {
        origin: 'CA',
        destination: 'TX'
      },
      {
        origin: 'OR',
        destination: 'TX'
      },
      {
        origin: 'NY',
        destination: 'TX'
      },
      {
          origin: {
              latitude: 40.639722,
              longitude: -73.778889
          },
          destination: {
              latitude: 37.618889,
              longitude: -122.375
          }
      },
      {
          origin: {
              latitude: 30.194444,
              longitude: -97.67
          },
          destination: {
              latitude: 25.793333,
              longitude: -80.290556
          },
          options: {
            strokeWidth: 2,
            strokeColor: 'rgba(100, 10, 200, 0.4)',
            greatArc: true
          }
      },
      {
          origin: {
              latitude: 39.861667,
              longitude: -104.673056
          },
          destination: {
              latitude: 35.877778,
              longitude: -78.7875
          }
      }
    ],  {strokeWidth: 1, arcSharpness: 1.4});

  }

  render() {
    const { lng, lat, zoom } = this.state;
    return(
      <div>
        <h2>Total Properties for Each ZipCode</h2>
        <canvas ref={horizontalBar => (this.horizontalBar = horizontalBar)} />
        <h2>Total Assessments for Each ZipCode</h2>
        <canvas ref={bar => (this.bar = bar)} />
        <canvas ref={pie => (this.pie = pie)} />

        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} style={{ height: '800px', width: '100%' }} />

        <div ref={datamap => this.datamap = datamap} style={{ height: '800px', width: '100%' }} />
      </div>
    )
  }
}

export default ProvidenceComponent;