import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateChannelModal } from '@/hooks/context/useCreateChannelModal';
import { toast } from 'sonner';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useAddChannelToWorkspace } from '@/hooks/api/workspaces/useAddChannelToWorkspace';

export const CreateChannelModal = () => {


    const queryClient = useQueryClient();
    
    const { openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();

    const [channelName, setChannelName] = useState('');

    const { addChannelToWorkspaceMutation } = useAddChannelToWorkspace();

    const {currentWorkspace} = useCurrentWorkspace();

    function handleClose() {
        setOpenCreateChannelModal(false);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        await addChannelToWorkspaceMutation({
            workspaceId: currentWorkspace?._id,
            channelName: channelName
        });


        queryClient.invalidateQueries(`fetchWorkspaceById-${currentWorkspace?._id}`);

        handleClose();
    }

    return (
        <Dialog
            open={openCreateChannelModal}
            onOpenChange={handleClose}
        >
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Create a channel</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleFormSubmit}>
                    <Input 
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        minLength={3}
                        placeholder="Channel Name e.g. team-announcements"
                        required
                    />

                    <div className='flex justify-end mt-4'>
                        <Button className="bg-black text-white cursor-pointer">
                            Create Channel
                        </Button>
                    </div>
                </form>
            </DialogContent>
            
        </Dialog>
    );
};