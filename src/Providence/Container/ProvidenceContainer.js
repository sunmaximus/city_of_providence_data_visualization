import { connect } from 'react-redux';
import ProvidenceComponent from '../Components/ProvidenceComponent';
import { fetchProvidenceData } from '../module/providence';

const mapStateToProps = (state) => ({
  data: state.providence.data,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProvidenceData: () => dispatch(fetchProvidenceData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProvidenceComponent);