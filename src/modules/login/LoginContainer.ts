import { connect } from 'react-redux';
import { Login } from './Login';
import { AppState } from '../../App';
import { Dispatch } from 'redux';
import { LoginState, loginAggregate } from './LoginMT';

const mapState = (state: AppState) => state.login;
const mapDispatch = (dispatch: Dispatch) => {
  return {
    changeFormValue(
      form: LoginState['form'],
      changed: { [key in keyof LoginState['form']]: string },
    ) {
      dispatch(loginAggregate.creators.changeFormValue({ ...form, ...changed }));
    },
    submit(form: LoginState['form']) {
      dispatch(loginAggregate.creators.login(form));
    },
  };
};

export type LoginProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const LoginContainer = connect(
  mapState,
  mapDispatch,
)(Login);
