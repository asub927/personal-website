import React from 'react';
import { ContactInfo } from '../components/ContactInfo';
import { ContactForm } from '../components/ContactForm';
import { ContactFormData } from '../types';

const Contact: React.FC = () => {
  /**
   * Form submission handler with error handling for network failures
   * This is a placeholder that can be replaced with actual service integration:
   * - Formspree: https://formspree.io/
   * - EmailJS: https://www.emailjs.com/
   * - Custom backend API endpoint
   * - Netlify Forms: https://docs.netlify.com/forms/setup/
   * - AWS SES or similar email service
   */
  const handleFormSubmit = async (data: ContactFormData): Promise<void> => {
    try {
      // Simulate API call delay for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log form data for development/debugging
      console.log('Form submission:', data);

      // TODO: Replace with actual service integration
      // Example with fetch to a backend API:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Server error. Please try again later.');
      // }

      // Simulate random success/failure for demonstration purposes
      // Remove this block when implementing actual service
      const shouldSucceed = Math.random() > 0.2; // 80% success rate for demo
      
      if (!shouldSucceed) {
        throw new Error('Something went wrong. Please try again.');
      }

      // Success: Form will display success message and reset automatically
    } catch (error) {
      // Handle network failures and other errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        // Network error - no connection or fetch failed
        throw new Error('Unable to connect. Please check your connection.');
      } else if (error instanceof Error) {
        // Re-throw with original error message
        throw error;
      } else {
        // Unknown error type
        throw new Error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <main 
      className="min-h-screen pt-16 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-primary" 
      id="main-content"
      role="main"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
          <h1 
            id="contact-heading" 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] font-black text-navy mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight leading-tight"
          >
            Get In Touch
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-[17px] text-text-secondary max-w-3xl leading-relaxed md:leading-loose">
            I'd love to hear from you. Whether you have a question, a project idea, or just want to connect, 
            feel free to reach out through the form or contact information below.
          </p>
        </header>

        {/* Two-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
          {/* Contact Information Section */}
          <aside 
            role="complementary" 
            aria-labelledby="contact-info-heading" 
            className="order-2 lg:order-1"
          >
            <ContactInfo />
          </aside>

          {/* Contact Form Section */}
          <section 
            role="region" 
            aria-labelledby="contact-form-heading" 
            className="order-1 lg:order-2"
          >
            <div className="bg-primary-100 rounded-sm p-5 sm:p-6 md:p-8 lg:p-10 border border-border h-full">
              <h2 
                id="contact-form-heading" 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold text-navy mb-5 sm:mb-6 md:mb-7 lg:mb-8 leading-snug"
              >
                Send a Message
              </h2>
              
              <ContactForm onSubmit={handleFormSubmit} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Contact;
