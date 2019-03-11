import { createAggregate } from '@sisisin/redux-aggregate';
// import { FormResponse } from '../../entity/FormResponse';
import { makeActionFilters } from '../../services/util';
// import * as epics from './FormEpics';

export interface FormState {
  x: string | null;
  form: {
    userName: string;
    sex: 'male' | 'female' | null;
    mail: string;
    mailCheck: string;
  };
}

const formMT = {
  init(state: FormState): FormState {
    return state;
  },
  changeFormValue(state: FormState, form: FormState['form']): FormState {
    return {
      ...state,
      form,
    };
  },
};

export const formAggregate = createAggregate(formMT, 'form/');
export const formFilters = makeActionFilters(formAggregate);
export const formReducer = formAggregate.reducerFactory<FormState>({
  x: null,
  form: { userName: '', sex: null, mail: '', mailCheck: '' },
});
// export const formEpics = epics;
