import React from 'react';

interface AlertProps {
    message: string;
    title: string | null;
    closeModal: () => void;
}

const Error = ({ message, title, closeModal }: AlertProps) => {
    return (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-4">
                <span className="text-red-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="red" // Fill color for the triangle
                        stroke="white" // Stroke color for the exclamation mark
                        strokeWidth="2.5" // Increased stroke width for a bold effect
                        className="size-6"
                    >
                        <path
                            d="M12 2L2 22h20L12 2z" // Triangle path
                        />
                        <path
                            d="M12 8v4m0 4h.01" // Exclamation mark
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>

                <div className="flex-1">
                    <strong className="block font-medium text-red-900">{title}</strong>

                    <p className="mt-1 text-sm text-red-700">{message}</p>
                </div>

                <button className="text-red-500 transition hover:text-red-600" onClick={closeModal}>
                    <span className="sr-only">Dismiss popup</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Error;
