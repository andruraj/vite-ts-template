import { FormEvent } from "react";

interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  children: React.ReactNode;
  onSubmit?: (
    e: FormEvent<HTMLFormElement>,
    data?: Record<string, any>
  ) => void;
}

export const Form = ({ onSubmit, children, ...props }: FormProps) => {
  /**
   * Validate custom elements with 'formElement' attribute
   * @param {HTMLFormElement} formElement The form element
   * @returns {boolean} Whether all custom elements are valid
   */
  const validateCustomElements = (formElement: HTMLFormElement): boolean => {
    let isValid = true;

    // Recursively check validity of elements with 'data-input' attribute
    const recursiveCheckValidity = (element: HTMLElement) => {
      if (element.dataset.input) {
        // Check if element is mandatory
        const mandatoryElement = element.querySelector(
          "[data-mandatory]"
        ) as HTMLElement | null;

        if (mandatoryElement && mandatoryElement.dataset.mandatory === "true") {
          if (!mandatoryElement.textContent?.trim()) {
            isValid = false;
            element.dataset.invalid = "true";

            const firstChild = mandatoryElement.children[0];
            if (firstChild) {
              firstChild.dispatchEvent(new Event("invalid"));
            }
          }
        }
      }

      // Recursively check children
      Array.from(element.children).forEach((child) => {
        recursiveCheckValidity(child as HTMLElement);
      });
    };

    // Start recursion from the form element
    recursiveCheckValidity(formElement);

    return isValid;
  };

  /**
   * @param {FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;

    // Check the validity of all form controls
    const isFormValid = formElement.checkValidity();

    // Additional validation for elements with 'formElement' attribute
    const isCustomValid = validateCustomElements(formElement);

    // Focus the first invalid field
    if (!isFormValid || !isCustomValid) {
      const firstInvalidField = formElement.querySelector(
        "[data-input][data-invalid], :invalid"
      ) as HTMLElement | null;

      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // Submit the data if both form and custom validations pass
    const formData = new FormData(formElement);
    if (onSubmit) onSubmit(e, Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSubmit} noValidate {...props}>
      {children}
    </form>
  );
};
