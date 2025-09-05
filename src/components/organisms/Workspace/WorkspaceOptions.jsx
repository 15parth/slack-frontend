import { useGetWorkspaceById } from '@/hooks/api/workspaces/useGetWorkspaceById'
import { Loader } from 'lucide-react'
import React from 'react'
import { useParams } from 'react-router-dom'

const WorkspaceOptions = () => {

    const {workspaceId}= useParams()

    const {isLoading, workspace}= useGetWorkspaceById(workspaceId);

    if(isLoading){
        return <Loader className='animate-spin ml-2'/>
    }

  return (
    <nav className='flex items-center justify-center h-10 p-1.5 bg-[#481349]'>
      
    </nav>
  )
}

export default WorkspaceOptions 
