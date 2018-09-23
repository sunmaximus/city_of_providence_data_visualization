import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';

class ProvidenceComponent extends Component {
  componentWillMount() {
    this.props.fetchProvidenceData()
  }

  render() {
    return(
      <div>Hello My</div>
    )
  }
}

export default ProvidenceComponent;