import React from 'react';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';

import Field from '../Field/Field';

interface ISelectFieldProps {
  name: string;
  id: string;
  label: string;
  control: ReturnType<typeof useForm>['control'];
  options: {
    value: string;
    label: string;
  }[],
  error: any;
}

const SelectField:React.FC<ISelectFieldProps> = ({ name, id, label, control, options, error }) => {
  return (
    <Field id={id} label={label} error={error}>
      <div data-testid="react-select">
        <Controller as={Select}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={null}
                    options={options}
                    className="field__select-container"
                    classNamePrefix="field__select"
                    placeholder="Select country..."
                    aria-label="Country"
                    id={id}
                    inputId={id}
                    name={name} />
      </div>
    </Field>
  );
};

export default SelectField;