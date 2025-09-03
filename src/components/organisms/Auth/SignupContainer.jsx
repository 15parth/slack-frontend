import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { SignupCard } from './SignupCard';
import { useSignup } from '@/hooks/api/auth/useSignup';

export const SignupContainer = () => {
    const navigate = useNavigate();

    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        userName: ''
    });

    const [validationError, setValidationError] = useState(null);

    const { isPending, isSuccess, error, signupMutation } = useSignup();

    console.log('this is isSuccess', isSuccess)

    async function onSignupFormSubmit(e) {
        e.preventDefault();
        console.log('Signup form submitted', signupForm);

        if (!signupForm.email || !signupForm.password || !signupForm.confirmPassword || !signupForm.userName) {
            console.error('All fields are required');
            setValidationError({ message: 'All fields are required' });
            return;
        }

        if (signupForm.password !== signupForm.confirmPassword) {
            console.error('Passwords do not match');
            setValidationError({ message: 'Passwords do not match' });
            return;
        }

        setValidationError(null);

        await signupMutation({
            email: signupForm.email,
            password: signupForm.password,
            userName: signupForm.userName
        });


    }

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigate('/auth/signin');
            }, 3000);
        }

    }, [isSuccess, navigate]);

    return (
        <SignupCard
            error={error}
            isPending={isPending}
            isSuccess={isSuccess}
            signupForm={signupForm}
            setSignupForm={setSignupForm}
            validationError={validationError}
            onSignupFormSubmit={onSignupFormSubmit}
        />
    );
};