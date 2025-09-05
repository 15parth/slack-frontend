import { useMutation } from '@tanstack/react-query';

import { signUpRequest } from '@/api/auth';
import { toast } from 'sonner';

export const useSignup = () => {
    const { isPending, isSuccess, error, mutateAsync: signupMutation } = useMutation({
        mutationFn: signUpRequest,
        onSuccess: (data) => {
            console.log('Scuccessfuilly signed up', data);
           toast("Successfully signed up")
        },
        onError: (error) => {
            console.error('Failed to sign up', error);
           toast.error("Form submission failed")
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        signupMutation
    };
};