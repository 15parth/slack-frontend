import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { Separator } from '../../ui/separator';

const SignupCard = () => {
    const [signupForm, setSignForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username:''
    });

    return (
        <Card className="w-full h-full bg-white">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription className="text-gray-400">Sign up to access your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form action="" className='space-y-4'>
                    <Input
                        placeholder="Email"
                        required
                        onChange={(e) => setSignForm({ ...signupForm, email: e.target.value })}
                        value={signupForm.email}
                        type="email"
                        disabled={false}
                    />

                    <Input
                        placeholder="Password"
                        required
                        onChange={(e) => setSignForm({ ...signupForm, password: e.target.value })}
                        value={signupForm.password}
                        type="password"
                        disabled={false}
                    />

                    <Input
                        placeholder="Confirm Password"
                        required
                        onChange={(e) => setSignForm({ ...signupForm, confirmPassword: e.target.value })}
                        value={signupForm.confirmPassword}
                        disabled={false}
                    />
                    <Input
                        placeholder="Your username"
                        required
                        onChange={(e) => setSignForm({ ...signupForm, username: e.target.value })}
                        value={signupForm.username}
                        type="text"
                        disabled={false}
                    />

                   <Button 
                   disabled={false}
                     size="lg"
                    type="submit"
                    className="w-full bg-black text-white"
                   >
                     Sign up
                   </Button>
                </form>
                <Separator />
                <p className='text-xs text-gray-500 mt-4'>Already have an account? <span className='text-black hover:underline cursor-pointer'>Sign in</span></p>
            </CardContent>
        </Card>
    )
}

export default SignupCard
