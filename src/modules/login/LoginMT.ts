import { createAggregate } from '@sisisin/redux-aggregate';
import { Epic, ofType } from 'redux-observable';
import { map, mergeMap, filter } from 'rxjs/operators';
import { AppState } from '../../App';
import { httpClient } from '../../services/HttpClient';
import { EpicDependencies } from '../../store';
import { createActionFilters } from '../../services/createActionFilters';

export interface LoginState {
  form: {
    password: string;
  };
}

export const loginMT = {
  loginFullfilled(state: LoginState): LoginState {
    return state;
  },
  changeFormValue(state: LoginState, form: LoginState['form']): LoginState {
    return { form };
  },
  login(state: LoginState, form: LoginState['form']): LoginState {
    return state;
  },
};

export const loginAggregate = createAggregate(loginMT, 'login/');
export const loginFilters = createActionFilters(loginAggregate);
export const loginReducer = loginAggregate.reducerFactory<LoginState>({ form: { password: '' } });

type Actions = ReturnType<typeof loginAggregate.creators[keyof typeof loginAggregate.creators]>;
type LoginEpic = Epic<Actions, Actions, AppState, EpicDependencies>;

export const loginEpics: { login: LoginEpic } = {
  login: (action$, state$, dependencies) =>
    action$.pipe(
      filter(loginFilters.login),
      mergeMap(action => {
        return httpClient.get('/login', { ...action.payload });
      }),
      map(() => loginAggregate.creators.loginFullfilled()),
    ),
};
