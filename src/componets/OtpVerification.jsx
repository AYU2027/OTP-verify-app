// src/components/OtpVerification.jsx
import React, { useState, useRef, useEffect } from 'react';

const OtpVerification = () => {
    // Change OTP length to 4 digits
    const OTP_LENGTH = 4;
    const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
    // null: no validation yet, true: valid, false: invalid
    const [isValid, setIsValid] = useState(null);
    const [message, setMessage] = useState('');
    const inputRefs = useRef([]);

    // Focus on the first input field when the component mounts
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (e, index) => {
        const { value } = e.target;
        const newOtp = [...otp];

        // Only allow single digit input and remove non-digit characters
        const sanitizedValue = value.replace(/\D/g, '').slice(0, 1);

        newOtp[index] = sanitizedValue;
        setOtp(newOtp);

        // Move focus to the next input field if a digit is entered and it's not the last one
        if (sanitizedValue && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1].focus();
        }
        // If the last input is filled, optionally trigger validation immediately
        if (index === OTP_LENGTH - 1 && sanitizedValue) {
            handleVerifyOtp();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            // Prevent default backspace behavior to control it manually
            e.preventDefault();
            // If the current input has a value, clear it
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            }
            // If the current input is empty (or just cleared) and not the first one,
            // move focus to the previous input and clear its value as well
            else if (index > 0) {
                inputRefs.current[index - 1].focus();
                const newOtp = [...otp];
                newOtp[index - 1] = ''; // Clear the previous input's value
                setOtp(newOtp);
            }
        } else if (e.key === 'ArrowLeft') {
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        } else if (e.key === 'ArrowRight') {
            if (index < OTP_LENGTH - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
        // Allow only numeric input for other keys
        else if (!/^\d$/.test(e.key) && e.key.length === 1) {
            e.preventDefault(); // Prevent non-digit characters from being typed
        }
    };

    const handleVerifyOtp = () => {
        const enteredOtp = otp.join(''); // Join the array to get the full OTP string
        console.log('Entered OTP:', enteredOtp); // For debugging: check what OTP is being processed
        // This is a placeholder. In a real app, send this to your backend for verification.
        const predefinedCorrectOtp = '1234'; // Updated for 4 digits

        if (enteredOtp === predefinedCorrectOtp) {
            setIsValid(true);
            setMessage('OTP Verified Successfully!');
            // Optionally, clear OTP or navigate away after a short delay
            setTimeout(() => {
                // You might want to navigate or show a different screen here
                // For demonstration, we'll just reset the form
                setOtp(new Array(OTP_LENGTH).fill(''));
                setIsValid(null);
                setMessage('');
                if (inputRefs.current[0]) inputRefs.current[0].focus();
            }, 1500); // Message visible for 1.5 seconds
        } else {
            setIsValid(false);
            setMessage('Invalid OTP. Please try again.');
            // Clear OTP for re-entry on invalid attempt after a delay
            setTimeout(() => {
                setOtp(new Array(OTP_LENGTH).fill(''));
                setIsValid(null); // Reset validation state
                setMessage(''); // Clear message
                if (inputRefs.current[0]) inputRefs.current[0].focus(); // Focus first input
            }, 1500); // Message visible for 1.5 seconds
        }
    };

    return (
        // This container only handles the component's styling and centering on the global gradient.
        <div className="flex flex-col items-center p-12 border border-gray-700 rounded-3xl shadow-2xl bg-gray-800 bg-opacity-90 max-w-lg w-full font-inter transform hover:scale-[1.01] transition-transform duration-300 ease-in-out backdrop-blur-sm">
            <h2 className="text-5xl font-extrabold text-white mb-4 tracking-tight text-shadow-lg">Verify your email address</h2>
            <p className="text-xl text-gray-300 text-center mb-10 leading-relaxed">
                Please enter the <span className="font-bold text-blue-400">4-digit code</span> sent to your email to verify your identity.
            </p>

            <div className="flex gap-5 mb-10">
                {otp.map((data, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={data}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={(e) => e.target.select()} // Select existing text on focus
                        inputMode="numeric" // Hint mobile devices to show numeric keyboard
                        pattern="[0-9]*" // Ensure only numbers are considered valid input
                        className={`
              w-20 h-20 text-center text-5xl font-bold
              border-2 rounded-2xl outline-none bg-gray-700 text-white
              transition-all duration-300 ease-in-out
              focus:border-blue-500 focus:shadow-xl focus:shadow-blue-500/40
              ${isValid === true ? 'border-green-500 shadow-xl shadow-green-500/40' : ''}
              ${isValid === false ? 'border-red-500 shadow-xl shadow-red-500/40' : ''}
              ${isValid === null ? 'border-gray-600' : ''}
            `}
                        ref={(el) => (inputRefs.current[index] = el)}
                    />
                ))}
            </div>

            <button
                onClick={handleVerifyOtp}
                className="
          py-4 px-10 bg-blue-600 text-white font-bold text-2xl rounded-2xl
          hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-80
          transition-all duration-300 ease-in-out
          transform hover:scale-105 active:scale-95
          shadow-lg hover:shadow-xl
        "
            >
                Verify OTP
            </button>

            {message && (
                <p className={`mt-10 p-5 rounded-lg w-full text-center text-xl font-medium
          ${isValid === true ? 'bg-green-700 text-green-100 border border-green-600 shadow-md' : ''}
          ${isValid === false ? 'bg-red-700 text-red-100 border border-red-600 shadow-md' : ''}
        `}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default OtpVerification;
