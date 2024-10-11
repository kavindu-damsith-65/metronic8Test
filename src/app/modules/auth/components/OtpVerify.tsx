import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { defaultReqPost } from '../../../request/main'
import { TrigToast } from '../../../request/Toast';




interface OtpVerifyState {
    email: string;

}

const OtpVerification: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate()

    const state = location.state as { email: string, role: string }
    const email = state.email
    const role = state.role

    const [otp, setOtp] = useState(Array(6).fill(""));
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const [error, setError] = useState("")

    // Focus on the first input when the component loads
    useEffect(() => {
        if (inputsRef.current[0]) {
            inputsRef.current[0].focus();
        }
    }, []);

    const isNumber = (value: string): boolean => {
        return /^\d+$/.test(value);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, otp.length);
        const pasteOtp = [...pastedData.split(""), ...Array(otp.length - pastedData.length).fill("")]
        if (isNumber(pasteOtp.join(""))) {
            setOtp(pasteOtp);
            inputsRef.current[pastedData.length]?.focus();
            checkIfComplete(pasteOtp);
        } else {
            return
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (!/^[0-9]$/.test(value)) return; // Only accept numeric input

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== "" && index < otp.length - 1) {
            inputsRef.current[index + 1]?.removeAttribute('disabled');
            inputsRef.current[index + 1]?.focus();
        }

        checkIfComplete(newOtp);
    };

    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
            checkIfComplete(newOtp);
        }
    };

    const checkIfComplete = (otpArr: string[]) => {
        const isComplete = otpArr.every(value => value !== "");

        setIsButtonDisabled(!isComplete);
    };

    const handelSubmit = async () => {
        if (isNumber(otp.join(""))) {
            try {
                setError("")
                const response = await defaultReqPost({ email: email, role: role, otp: otp.join("") }, 'user/verify-otp')
                TrigToast("Verification Successfull", "success")
                navigate('/auth/password-reset', { state: {email:email,role:role} });
            } catch (error: any) {
                setError(error.response.data.message)
                TrigToast(error.response.data.message, "error")
            }
        }

    }


    return (
        <section className="container-fluid bg-body-tertiary d-block">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-4" style={{ minWidth: "500px" }}>
                    <div className="card bg-white">
                        <div className="card-body p-5 text-center">
                            <h1 className='text-dark fw-bolder mb-3'>Verify OTP</h1>
                            {error ?
                                <div className='mb-10 bg-light-danger p-5 rounded'>
                                    <div className='text-danger'>{error}</div>
                                </div> :
                                <div className='mb-10 bg-light-info p-5 rounded'>
                                    <div className='text-info'>Sent password reset OTP. Please check your email</div>
                                </div>
                            }


                            <div className="otp-field mb-4">
                                {otp.map((_, index) => (
                                    <input
                                        key={index}
                                        type="number"
                                        maxLength={1}
                                        value={otp[index]}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleBackspace(e, index)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        ref={(el) => (inputsRef.current[index] = el)}
                                        disabled={index !== 0 && otp[index - 1] === ""}
                                        style={{ fontWeight: 'bold' }}
                                    />
                                ))}
                            </div>

                            <button onClick={handelSubmit} className="btn btn-primary mb-3" disabled={isButtonDisabled}>
                                Verify
                            </button>

                            <p className="resend text-muted mb-0">
                                Didn't receive code? <Link to='/auth/forgot-password'>Try again</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OtpVerification;
