import React, { Component } from 'react';
import { getRandomColor } from '../module/providence';
import OwnerState from './OwnerState';
import TotalPropertiesPerZipCode from './TotalPropertiesPerZipCode';
import TotalAssessmentPerZipCode from './TotalAssessmentPerZipCode';
class ProvidenceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationZip: {},
      locationZipAssessment: {},
      ownerState: {}
    }
  }

  componentWillMount() {
    this.props.fetchProvidenceData()
  }

  componentDidUpdate(prevProps) {
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
              [owner_state]: { fillKey: 'win' }
            }
          };
        })
      })
    }

    const { locationZip, locationZipAssessment } = this.state;
    let zipCodesCount = [], zipCodeColor = [], totalAssessmentByZip = [];
    let zipCodes = Object.keys(locationZip);
    zipCodes.forEach(zip => {
      zipCodesCount = [...zipCodesCount, locationZip[zip]];
      zipCodeColor = [...zipCodeColor, getRandomColor()];
      totalAssessmentByZip = [...totalAssessmentByZip, locationZipAssessment[zip]]
    })
  }

  render() {
    const { ownerState, locationZip, locationZipAssessment } = this.state;
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
        {Object.keys(ownerState).length > 0 && <OwnerState ownerState={ownerState}/> }
      </div>
    )
  }
}

export default ProvidenceComponent;