import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignInCard = () => {
    const navigate= useNavigate();
    const [signinForm, setSigninForm]= useState({
        email:'',
        password:'',
        username:''
    })
  return (
    <div>
      <Card className="w-full h-full bg-white">
        <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription className="text-gray-500">Sign in to access your account</CardDescription>
        </CardHeader>
        <CardContent>
            <form action="" className='space-y-3'>
                <Input 
                disabled={false}
                placeholder="Email"
                type="email"
                value={signinForm.email}
                onChange={(e)=> setSigninForm({...signinForm, email:e.target.value})}
                />
                 <Input 
                disabled={false}
                placeholder="Password"
                type="password"
                value={signinForm.password}
                onChange={(e)=> setSigninForm({...signinForm, password:e.target.value})}
                />

                <Button className="w-full bg-black text-white"
                 disabled={false}
                 type="submit"
                 size="lg"
                >Continue</Button>
            </form>

            <Separator className="bg-gray-400  mt-3"/>
           <p className='text-xs text-gray-500 mt-4'>Do not have an account? 
            <span className='text-black hover:underline cursor-pointer'
            onClick={()=> navigate('/auth/signup')}
            >Sign up</span>
            </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignInCard
