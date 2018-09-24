import React, { Component } from 'react'
import Chart from 'chart.js';

class TotalAssessmentPerZipCode extends Component {
  componentDidUpdate(prevProps) {
    const { zipCodes, totalAssessmentByZip, zipCodeColor } = this.props;
    if (prevProps.zipCodes.length === 0 && zipCodes.length > 0) {
      const bar = this.bar, pie = this.pie;

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
  }

  render() {
    return (
      <div>
        <h2>Total Assessments for Each ZipCode</h2>
        <canvas ref={bar => (this.bar = bar)} />
        <canvas ref={pie => (this.pie = pie)} />
      </div>
    )    
  }

}

export default TotalAssessmentPerZipCode;