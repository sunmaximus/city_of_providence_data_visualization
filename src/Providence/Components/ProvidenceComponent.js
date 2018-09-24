import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getRandomColor } from '../module/providence';
import OwnerState from './OwnerState';
import TotalPropertiesPerZipCode from './TotalPropertiesPerZipCode';
import TotalAssessmentPerZipCode from './TotalAssessmentPerZipCode';
class ProvidenceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationZip: {}, // total properties count for each zip code in Providence
      locationZipAssessment: {}, // total assessment value for each zip code in Providence
      ownerState: {} // keep track of all the state that have an owner
    }
  }

  componentWillMount() {
    this.props.fetchProvidenceData()
  }

  componentDidUpdate(prevProps) {
    // if data is fetched then scrape/filter and sum specific data
    if (prevProps.data.length === 0 && this.props.data.length > 0) {
      this.props.data.forEach(property => {
        const { location_zip, total_assessment, owner_state } = property;
        this.setState(prevState => {
          return {
            locationZip: {
              ...prevState.locationZip,
              [location_zip]: prevState.locationZip[location_zip] ? prevState.locationZip[location_zip] + 1 : 1,
            },
            locationZipAssessment: {
              ...prevState.locationZipAssessment,
              [location_zip]: prevState.locationZipAssessment[location_zip] ? prevState.locationZip[location_zip] + total_assessment : total_assessment,
            },
            ownerState: {
              ...prevState.ownerState,
              [owner_state]: { fillKey: 'win' } // Use to color a US State blue on the map
            }
          };
        })
      })
    }
  }

  render() {
    const { ownerState, locationZip, locationZipAssessment } = this.state;

    // flatten data and pass to Child component to visualize data
    let zipCodesCount = [], zipCodeColor = [], totalAssessmentByZip = [];
    let zipCodes = Object.keys(locationZip);
    zipCodes.forEach(zip => {
      zipCodesCount = [...zipCodesCount, locationZip[zip]];
      zipCodeColor = [...zipCodeColor, getRandomColor()];
      totalAssessmentByZip = [...totalAssessmentByZip, locationZipAssessment[zip]]
    })

    return(
      <div>
        <TotalPropertiesPerZipCode
          zipCodes={zipCodes}
          zipCodesCount={zipCodesCount}
          zipCodeColor={zipCodeColor}
        />
        <TotalAssessmentPerZipCode
          zipCodes={zipCodes}
          totalAssessmentByZip={totalAssessmentByZip}
          zipCodeColor={zipCodeColor}        
        />
        <OwnerState ownerState={ownerState}/>
      </div>
    )
  }
}

ProvidenceComponent.propTypes = {
  fetchProvidenceData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ProvidenceComponent;