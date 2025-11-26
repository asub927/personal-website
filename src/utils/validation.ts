/**
 * Validates email format using regex pattern
 * @param email - The email address to validate
 * @returns true if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Generates error message for invalid email format
 * @param email - The email address that failed validation
 * @returns Error message string
 */
export const getEmailErrorMessage = (email: string): string => {
  if (!email || email.trim() === '') {
    return 'Email address is required';
  }
  return 'Please enter a valid email address';
};
