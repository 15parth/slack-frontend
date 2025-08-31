import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Auth } from './pages/Auth/Auth'
import SignupCard from '@/components/organisms/Auth/SignupCard'
import SignInCard from '@/components/organisms/Auth/SignInCard'
import Notfound from '@/components/organisms/Notfound/Notfound'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SignupContainer from '@/components/organisms/Auth/SignupContainer'

function App() {

  const queryClient= new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/auth/signup" element={<Auth> <SignupContainer/></Auth>}/>
      <Route path="/auth/signin" element={<Auth> <SignInCard/></Auth>}/>
      <Route path="/*" element={<Notfound/> }/>
    </Routes>
    </QueryClientProvider>
  )
}

export default App
