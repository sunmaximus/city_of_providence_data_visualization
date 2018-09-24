import React, { Component } from 'react'
import Chart from 'chart.js';

class TotalPropertiesPerZipCode extends Component {

  componentDidUpdate(prevProps) {
    const { zipCodes, zipCodesCount, zipCodeColor } = this.props;
    if (prevProps.zipCodes.length === 0 && zipCodes.length > 0) {
      const horizontalBar = this.horizontalBar;
      const { zipCodes, zipCodesCount, zipCodeColor } = this.props;
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

export default TotalPropertiesPerZipCode;