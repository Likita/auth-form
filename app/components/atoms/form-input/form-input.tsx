import type { InputHTMLAttributes } from 'react';
import { PasswordToggle } from '~/components/atoms/password-toggle/password-toggle';
import { useState } from 'react';
import './form-input.css';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  type: string;
  showPassword?: boolean;
  className?: string;
}

export function FormInput({
  id,
  label,
  error,
  type,
  showPassword,
  className = '',
  ...props
}: FormInputProps) {
  const inputClasses = ['form-input', error ? 'error' : '', className]
    .filter(Boolean)
    .join(' ');
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="form-input-wrap">
        <input
          id={id}
          className={inputClasses}
          type={isPasswordShown ? 'text' : type}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {showPassword && (
          <PasswordToggle
            isVisible={isPasswordShown}
            onClick={() => setIsPasswordShown(!isPasswordShown)}
          />
        )}
      </div>
      {error && <div className="form-error" id={`${id}-error`}>{error}</div>}
    </div>
  );
}
