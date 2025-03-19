import { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '~/components/atoms/button/button';
import { Message } from '~/components/atoms/message/message';
import { FormInput } from '~/components/atoms/form-input/form-input';
import './forgot-password.css';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
  });

  const [isEmailSent, setIsEmailSent] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsEmailSent(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <header className="forgot-password-header">
        <h2 className="title">Reset your password</h2>
        <p className="forgot-password-subtitle">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="forgot-password-form"
        noValidate
      >
        <div className="form-group">
          <FormInput
            label="Email address"
            type="email"
            id="email"
            error={errors.email?.message}
            autoComplete="email"
            placeholder="you@example.com"
            {...register('email')}
          />
          {isEmailSent && (
            <Message variant="success">Password reset link sent!</Message>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || isEmailSent}
        >
          {isSubmitting ? (
            <span className="loading-text">Sending reset link...</span>
          ) : (
            'Send reset link'
          )}
        </Button>

        <div className="link-group">
          <Link to="/" className="login-link">
            Back to sign in
          </Link>
        </div>
      </form>
    </>
  );
}
