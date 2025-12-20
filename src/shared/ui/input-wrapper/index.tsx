import { InputHTMLAttributes, memo } from 'react';

type InputWrapperProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

function InputWrapper(props: InputWrapperProps): JSX.Element {
  const { label, ...attributes } = props;

  return (
    <div className="login__input-wrapper form__input-wrapper">
      <label className="visually-hidden">{label}</label>
      <input className="login__input form__input" {...attributes} />
    </div>
  );
}

const MemoizedInputWrapper = memo(InputWrapper);

export { MemoizedInputWrapper as InputWrapper };
