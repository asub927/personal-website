import React from 'react';

const Contact: React.FC = () => {
  return (
    <main className="min-h-screen pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4 sm:mb-6 md:mb-8">
          Get In Touch
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 sm:mb-10 md:mb-12 lg:mb-16 leading-relaxed">
          I'd love to hear from you. Whether you have a question, a project idea, or just want to connect.
        </p>
        
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          <div className="bg-primary-100 rounded-lg p-6 sm:p-8 md:p-10 border border-border">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-text mb-3 sm:mb-4 md:mb-5">
              Contact Information
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-5 sm:mb-6 md:mb-8">
              This is a placeholder for your contact page. You can add your preferred contact methods here.
            </p>
            
            <div className="space-y-5 sm:space-y-6 md:space-y-7 text-base sm:text-lg md:text-xl text-text-secondary">
              <div>
                <h3 className="font-semibold text-text mb-2 text-base sm:text-lg">Email</h3>
                <p className="text-text-secondary">your.email@example.com</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-text mb-2 text-base sm:text-lg">Social Media</h3>
                <p className="text-text-secondary">Connect with me on LinkedIn, Twitter, or GitHub</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-text mb-2 text-base sm:text-lg">Location</h3>
                <p className="text-text-secondary">Your City, Country</p>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-100 rounded-lg p-6 sm:p-8 md:p-10 border border-border">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-text mb-3 sm:mb-4 md:mb-5">
              Contact Form
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary">
              You can add a contact form here to allow visitors to send you messages directly 
              from your website. Consider integrating with a service like Formspree or building 
              a custom backend endpoint.
            </p>
          </div>
          
          <div className="bg-accent-50 border border-accent-100 rounded-lg p-5 sm:p-6 md:p-8">
            <p className="text-base sm:text-base md:text-lg text-accent-700">
              <strong>Note:</strong> This is a placeholder page. Replace this content with your 
              actual contact information and preferred communication methods.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
