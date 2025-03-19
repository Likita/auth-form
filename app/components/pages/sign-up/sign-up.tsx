import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router';
import { addUser } from '~/services/db';
import { Button } from '~/components/atoms/button/button';
import { Message } from '~/components/atoms/message/message';
import { FormInput } from '~/components/atoms/form-input/form-input';
import './sign-up.css';

const signUpSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z
      .string()
      .email('Please enter a valid email address')
      .min(1, 'Email is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password is too long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);
      await addUser(data.email, data.password, data.name);
      navigate('/sign-in');
    } catch (error) {
      if (error instanceof Error) {
        setError('root', {
          message: error.message,
        });
      } else {
        setError('root', {
          message: 'An error occurred while creating your account',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="sign-up-header">
        <h1 className="title">Create an account</h1>
        <p className="sign-up-subtitle">
          Already have an account?{' '}
          <Link to="/sign-in" className="login-link">
            Sign in
          </Link>
        </p>
      </header>

      <form
        className="sign-up-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {errors.root && (
          <Message variant="error">{errors.root.message}</Message>
        )}

        <FormInput
          label="Name"
          type="text"
          id="name"
          error={errors.name?.message}
          autoComplete="name"
          {...register('name')}
        />

        <FormInput
          label="Email"
          type="email"
          id="email"
          error={errors.email?.message}
          autoComplete="email"
          {...register('email')}
        />

        <div className="form-group">
          <FormInput
            label="Password"
            type="password"
            id="password"
            error={errors.password?.message}
            autoComplete="new-password"
            showPassword={true}
            {...register('password')}
          />
        </div>

        <FormInput
          label="Confirm password"
          type="password"
          id="confirmPassword"
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
          showPassword={true}
          {...register('confirmPassword')}
        />

        <Button type="submit" variant="primary" disabled={isLoading} fullWidth>
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </>
  );
}
