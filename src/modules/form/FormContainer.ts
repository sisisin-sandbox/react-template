import { AppState } from '../../App';
import { connect } from 'react-redux';
import { Form } from './Form';
import { Dispatch } from 'redux';
import { formAggregate, FormState } from './FormMT';

const mapState = (state: AppState) => state.form;
const mapDispatch = (dispatch: Dispatch) => ({
  init() {
    dispatch(formAggregate.creators.init());
  },
  changeFormValue(form: FormState['form']) {
    dispatch(formAggregate.creators.changeFormValue(form));
  },
  submit() {
    console.log('submit');
  },
});
export type FormProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const FormContainer = connect(
  mapState,
  mapDispatch,
)(Form);
