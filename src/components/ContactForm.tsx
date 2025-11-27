import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContactFormProps, ContactFormData } from '../types';
import { isValidEmail, getEmailErrorMessage } from '../utils/validation';

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    mode: 'onBlur',
  });

  const onFormSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await onSubmit(data);
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
    <form 
      onSubmit={handleSubmit(onFormSubmit)} 
      className="w-full"
      noValidate
      aria-describedby={submitStatus === 'success' ? 'form-success-message' : submitStatus === 'error' ? 'form-error-message' : undefined}
    >
      {/* Name Field */}
      <div className="mb-5 sm:mb-6">
        <label 
          htmlFor="name" 
          className="block text-sm sm:text-base md:text-[16px] font-bold text-text mb-2"
        >
          Name <span className="text-error" aria-label="required">*</span>
        </label>
        <input
          id="name"
          type="text"
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-sm border-2 text-sm sm:text-base md:text-[16px] transition-all duration-300 ${
            errors.name
              ? 'border-error focus:ring-error focus:border-error bg-error-light'
              : 'border-border focus:ring-accent focus:border-accent bg-primary'
          } focus:outline-none focus:ring-2 min-h-[44px]`}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
          disabled={isLoading}
          aria-required="true"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-error text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center" role="alert">
            <span className="mr-1">✗</span>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="mb-5 sm:mb-6">
        <label 
          htmlFor="email" 
          className="block text-sm sm:text-base md:text-[16px] font-bold text-text mb-2"
        >
          Email <span className="text-error" aria-label="required">*</span>
        </label>
        <input
          id="email"
          type="email"
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-sm border-2 text-sm sm:text-base md:text-[16px] transition-all duration-300 ${
            errors.email
              ? 'border-error focus:ring-error focus:border-error bg-error-light'
              : 'border-border focus:ring-accent focus:border-accent bg-primary'
          } focus:outline-none focus:ring-2 min-h-[44px]`}
          {...register('email', {
            required: 'Email is required',
            validate: (value) => isValidEmail(value) || getEmailErrorMessage(value),
          })}
          disabled={isLoading}
          aria-required="true"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-error text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center" role="alert">
            <span className="mr-1">✗</span>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div className="mb-5 sm:mb-6">
        <label 
          htmlFor="subject" 
          className="block text-sm sm:text-base md:text-[16px] font-bold text-text mb-2"
        >
          Subject <span className="text-error" aria-label="required">*</span>
        </label>
        <input
          id="subject"
          type="text"
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-sm border-2 text-sm sm:text-base md:text-[16px] transition-all duration-300 ${
            errors.subject
              ? 'border-error focus:ring-error focus:border-error bg-error-light'
              : 'border-border focus:ring-accent focus:border-accent bg-primary'
          } focus:outline-none focus:ring-2 min-h-[44px]`}
          {...register('subject', {
            required: 'Subject is required',
            minLength: { value: 3, message: 'Subject must be at least 3 characters' },
          })}
          disabled={isLoading}
          aria-required="true"
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className="text-error text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center" role="alert">
            <span className="mr-1">✗</span>
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="mb-5 sm:mb-6">
        <label 
          htmlFor="message" 
          className="block text-sm sm:text-base md:text-[16px] font-bold text-text mb-2"
        >
          Message <span className="text-error" aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-sm border-2 text-sm sm:text-base md:text-[16px] transition-all duration-300 resize-vertical ${
            errors.message
              ? 'border-error focus:ring-error focus:border-error bg-error-light'
              : 'border-border focus:ring-accent focus:border-accent bg-primary'
          } focus:outline-none focus:ring-2 min-h-[120px]`}
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'Message must be at least 10 characters' },
          })}
          disabled={isLoading}
          aria-required="true"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-error text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center" role="alert">
            <span className="mr-1">✗</span>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div 
          id="form-success-message"
          className="mb-5 sm:mb-6 p-3 sm:p-4 bg-success-light border-2 border-success rounded-sm" 
          role="status" 
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-success-dark text-sm sm:text-base md:text-[16px] flex items-center">
            <span className="mr-2 text-base sm:text-lg flex-shrink-0" aria-hidden="true">✓</span>
            <span>Message sent successfully! I'll get back to you soon.</span>
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div 
          className="mb-5 sm:mb-6 p-3 sm:p-4 bg-error-light border-2 border-error rounded-sm" 
          role="alert" 
          aria-live="assertive"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-error-dark text-sm sm:text-base md:text-[16px] flex items-center">
              <span className="mr-2 text-base sm:text-lg flex-shrink-0">✗</span>
              <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitStatus('idle');
                setErrorMessage('');
              }}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-error-dark border-2 border-error rounded-sm hover:bg-error hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 min-h-[44px] whitespace-nowrap flex-shrink-0"
              aria-label="Dismiss error and try again"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-accent text-white font-bold text-sm sm:text-base md:text-[16px] rounded-sm hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 min-h-[44px] shadow-sm hover:shadow-md"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
};
