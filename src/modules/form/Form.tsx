import * as React from 'react';
import { FormProps } from './FormContainer';
import { FormState } from './FormMT';

export const Form: React.FC<FormProps> = props => {
  const handleOnChange = (value: string, key: keyof FormState['form']) => {
    const form: FormState['form'] = {
      ...props.form,
      [key]: value,
    };
    props.changeFormValue(form);
  };
  return (
    <form>
      <input
        type="text"
        name="userName"
        value={props.form.userName}
        onChange={e => handleOnChange(e.target.value, 'userName')}
      />
      <br />
      <input type="button" value="submit" onClick={props.submit} />
    </form>
  );
};
