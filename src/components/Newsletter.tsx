import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NewsletterProps, NewsletterFormData } from '../types';
import { isValidEmail, getEmailErrorMessage } from '../utils/validation';

export const Newsletter: React.FC<NewsletterProps> = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    mode: 'onChange',
  });

  const onFormSubmit = async (data: NewsletterFormData) => {
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await onSubmit(data.email);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      
      // Handle different error types
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setErrorMessage('Unable to connect. Please check your connection.');
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-primary-100">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text mb-3 sm:mb-4 md:mb-6">
          Subscribe to Updates
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-6 sm:mb-8">
          Get the latest articles and insights delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit(onFormSubmit)} className="w-full max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg border text-base ${
                  errors.email
                    ? 'border-error focus:ring-error focus:border-error'
                    : 'border-border focus:ring-accent focus:border-accent'
                } focus:outline-none focus:ring-2 transition-colors min-h-[44px] bg-primary`}
                {...register('email', {
                  required: 'Email address is required',
                  validate: (value) => isValidEmail(value) || getEmailErrorMessage(value),
                })}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-error text-sm sm:text-base mt-2 text-left">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base min-h-[44px] min-w-[120px]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Subscribing...
                </span>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>

          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-success-light border border-success rounded-lg">
              <p className="text-success-dark text-sm sm:text-base">
                ✓ Successfully subscribed! Check your email for confirmation.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-error-light border border-error rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-error-dark text-sm sm:text-base">
                  ✗ {errorMessage || 'Something went wrong. Please try again.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitStatus('idle');
                    setErrorMessage('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-error-dark border border-error rounded-lg hover:bg-error hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 min-h-[44px]"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
