import { LogOutIcon, PencilIcon, SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/context/useAuth';
import { toast } from 'sonner';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';

export const UserButton = () => {

    const navigate = useNavigate();

    const { auth, logout } = useAuth();

    const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    function openWorkspaceCreateModal() {
        setOpenCreateWorkspaceModal(true);
    }

    async function handleLogout() {
        await logout();
        toast('Successfully signed out');
        navigate('/auth/signin');

    }

    console.log('avatar image --> ',auth?.user?.avatar)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none relative'>
                <Avatar className='size-10 transition cursor-pointer'>
                    <AvatarImage src={auth?.user?.avatar} className="bg-gray-300" />
                    <AvatarFallback>{auth?.user?.userName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
                <DropdownMenuItem 
                onClick={openWorkspaceCreateModal}
                className="hover:bg-gray-400"
                >
                    <PencilIcon className='size-4 mr-2 h-10' />
                    Create Workspace
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-400">
                    <SettingsIcon className='size-4 mr-2 h-10' />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="hover:bg-gray-400">
                    <LogOutIcon className='size-4 mr-2 h-10' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
    
};