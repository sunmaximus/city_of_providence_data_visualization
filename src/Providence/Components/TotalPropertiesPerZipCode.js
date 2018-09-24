import React, { Component } from 'react'
import PropTypes from 'prop-types';

import Chart from 'chart.js';

class TotalPropertiesPerZipCode extends Component {

  componentDidUpdate(prevProps) {
    const { zipCodes, zipCodesCount, zipCodeColor } = this.props;
    if (prevProps.zipCodes.length === 0 && zipCodes.length > 0) {
      const horizontalBar = this.horizontalBar;
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
    }
  }

  render() {
    return (
      <div>
        <h2>Total Properties for Each ZipCode</h2>
        <canvas ref={horizontalBar => (this.horizontalBar = horizontalBar)} />
      </div>
    )    
  }
}

TotalPropertiesPerZipCode.propTypes = {
  zipCodes: PropTypes.array.isRequired,
  zipCodesCount: PropTypes.array.isRequired,
  zipCodeColor: PropTypes.array.isRequired,
}

export default TotalPropertiesPerZipCode;