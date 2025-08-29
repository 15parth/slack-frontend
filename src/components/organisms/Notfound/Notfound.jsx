import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Notfound = () => {
    const navigate= useNavigate()
  return (
  <>
    <div className='flex h-screen w-full flex-col justify-center bg-gray-200 items-center'>
      <Card className="text-center shadow-lg max-w-lg bg-white">
        {/* <CardHeader>404 Not found</CardHeader> */}
        <p className='mt-4'>The page you are looking for does not exist</p>
        <CardContent>
            <img 
            className='shadow-lg'
            src="https://cbx-prod.b-cdn.net/COLOURBOX41281019.jpg?width=800&height=800&quality=70" alt="404_Not_Found" />
          <Button 
            onClick={()=>navigate(-1)}           
          className="bg-gray-950 mt-4 text-white cursor-pointer">Go back</Button>
        </CardContent>
      </Card>
    </div>

  </>
  )
}

export default Notfound
