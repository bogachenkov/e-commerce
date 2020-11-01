import React from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import Field from '../Field/Field';

interface IInputFieldProps {
  name: string;
  id: string;
  label: string;
  type: string;
  mask?: string;
  register: ReturnType<typeof useForm>['register'];
  error: any;
}

const InputField:React.FC<IInputFieldProps> = ({ name, id, label, mask, type, register, error }) => {
  return (
    <Field id={id} label={label} error={error}>
      { mask &&
        <InputMask mask={mask} maskPlaceholder={null}>
          <input id={id} type={type} name={name} ref={register({ required: true })}/>
        </InputMask>
      }
      { !mask && <input id={id} type={type} name={name} ref={register({ required: true })}/> }
    </Field>
  );
};

export default InputField;