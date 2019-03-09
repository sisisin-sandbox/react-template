import * as React from 'react';
import { LoginProps } from './LoginContainer';

export const Login: React.FC<LoginProps> = props => {
  return (
    <div>
      <input
        type="text"
        value={props.form.password}
        onChange={e => props.changeFormValue(props.form, { ['password']: e.target.value })}
      />
      <br />
      <button onClick={() => props.submit(props.form)}>login</button>
    </div>
  );
};
