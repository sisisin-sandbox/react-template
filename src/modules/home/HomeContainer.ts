import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../App';
import { Home } from './Home';
import { homeAggregate } from './HomeMT';

const mapState = (state: AppState) => {
  return state.home;
};
const mapDispatch = (dispach: Dispatch) => {
  return {
    setX(x: string) {
      dispach(homeAggregate.creators.setX(x));
    },
    init() {
      dispach(homeAggregate.creators.init());
    },
  };
};
export const HomeContainer = connect(
  mapState,
  mapDispatch,
)(Home);

export type HomeProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
