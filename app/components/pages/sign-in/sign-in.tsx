import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '~/contexts/auth';
import { Button } from '~/components/atoms/button/button';
import { Message } from '~/components/atoms/message/message';
import { FormInput } from '~/components/atoms/form-input/form-input';
import './sign-in.css';

const signInSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError('root', {
          message: error.message,
        });
      } else {
        setError('root', {
          message: 'An error occurred while signing in',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="sign-in-header">
        <h1 className="title">Welcome back</h1>
        <p className="sign-in-subtitle">
          Don't have an account?{' '}
          <Link to="/sign-up" className="login-link">
            Sign up
          </Link>
        </p>
      </header>

      <form
        className="sign-in-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {errors.root && (
          <Message variant="error">{errors.root.message}</Message>
        )}

        <FormInput
          label="Email"
          type="email"
          id="email"
          error={errors.email?.message}
          autoComplete="email"
          {...register('email')}
        />

        <div className="password-field">
          <FormInput
            label="Password"
            type="password"
            id="password"
            error={errors.password?.message}
            showPassword={true}
            autoComplete="current-password"
            {...register('password')}
          />
        </div>

        <div className="links-group">
          <Link to="/forgot-password" className="login-link">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" disabled={isLoading} fullWidth>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </>
  );
}
