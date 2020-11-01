import React from 'react';
import { Range, getTrackBackground } from 'react-range';

interface IRangeComponentProps {
  values: number[];
  onChange: React.Dispatch<React.SetStateAction<number[]>>
}

const RangeComponent:React.FC<IRangeComponentProps> = ({ values, onChange }) => {
  return (
    <Range
      values={values}
      step={250}
      min={0}
      max={6000}
      onChange={values => onChange(values)}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: '36px',
            display: 'flex',
            width: '100%'
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: '3px',
              width: '100%',
              borderRadius: '3px',
              background: getTrackBackground({
                values: values,
                colors: ['#f3f3f3', '#000', '#f3f3f3'],
                min: 0,
                max: 6000
              }),
              alignSelf: 'center'
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            outline: 'none',
            height: '18px',
            width: '18px',
            borderRadius: '50%',
            backgroundColor: '#000000',
            boxShadow: '0px 2px 6px #AAA'
          }}
        />
      )}
    />
  );
};

export default RangeComponent;