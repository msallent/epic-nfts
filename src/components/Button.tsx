import { FunctionComponent } from 'react';

interface ButtonProps {
  label: string;
  isLoading?: boolean;
  onClick: () => void;
}

export const Button: FunctionComponent<ButtonProps> = ({ label, isLoading, onClick }) => (
  <button
    type="button"
    disabled={isLoading}
    className="flex items-center justify-center py-2 px-10 mx-auto rounded-md font-bold text-white h-11 bg-gradient-to-r from-purple-400 to-pink-600 hover:animate-pulse disabled:pointer-events-none"
    onClick={onClick}
  >
    {isLoading ? (
      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
    ) : (
      label
    )}
  </button>
);
