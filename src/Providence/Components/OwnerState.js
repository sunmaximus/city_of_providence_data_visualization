import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Datamap from 'datamaps';

class OwnerState extends Component {
  componentDidUpdate(prevProps) {
    const { ownerState } = this.props;
    if (Object.keys(prevProps.ownerState).length === 0 && Object.keys(ownerState).length > 0) {
      const datamap = this.datamap
      var arcs = new Datamap({
        element: datamap,
        scope: 'usa',
        fills: {
          defaultFill: "#ABDDA4",
          win: '#0fa0fa'
        },
        data: ownerState
      });

      // Arcs coordinates can be specified explicitly with latitude/longtitude,
      // or just the geographic center of the state/country.
      const originAndDestination = Object.keys(ownerState).map(state => ({ origin: 'RI', destination: state }))
      arcs.arc(originAndDestination,  {strokeWidth: 1, arcSharpness: 1.4});
      arcs.labels()
    }

  }

  render() {
    return (
      <div>
        <h2>Where Property Owner Lives </h2>
        <div ref={datamap => this.datamap = datamap} style={{ height: '600px', width: '100%' }} />
      </div>
    );
  }
}

OwnerState.propTypes = {
  ownerState: PropTypes.object.isRequired
}

export default OwnerState;