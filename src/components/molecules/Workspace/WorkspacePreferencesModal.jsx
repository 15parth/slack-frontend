import { useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { useWorkspacePreferencesModal } from '@/hooks/context/useWorkspacePreferencesModal';
import { useDeleteWorkspace } from '@/hooks/api/workspaces/useDeleteWorskspace';
import { useUpdateWorkspace } from '@/hooks/api/workspaces/useUpdateWorkspace';
// import { useConfirm } from '@/hooks/useConfirm';

export const WorkspacePreferencesModal = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    // const { toast } = useToast();
    const [workspaceId, setWorkspaceId] = useState(null);
    const [editOpen, setEditOpen] = useState(false);


    const { initialValue, openPreferences, setOpenPreferences, workspace } = useWorkspacePreferencesModal();
    const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);
    const { isPending, updateWorkspaceMutation } = useUpdateWorkspace(workspaceId);
   
    // const { confirmation, ConfirmDialog } = useConfirm({ title: 'Do you want to delete the workspace?', message: 'This action cannot be undone.' });

    // const { confirmation: updateConfirmation, ConfirmDialog: UpdateDialog } = useConfirm({ title: 'Do you want to update the workspace?', message: 'This action cannot be undone.' });

    const [renameValue, setRenameValue] = useState(workspace?.name);

    function handleClose() {
        setOpenPreferences(false);
    }

    useEffect(() => {
        setWorkspaceId(workspace?._id);
        setRenameValue(workspace?.name);
    }, [workspace]);

    async function handleDelete() {
        try {
            // const ok = await confirmation();
            // console.log('Confimation received');
            // if(!ok) {
            //     return;
            // }
            await deleteWorkspaceMutation();
            navigate('/home');
            queryClient.invalidateQueries('fetchWorkspaces');
            setOpenPreferences(false);
            console.log('workspace deleted')
        } catch(error) {
            console.log('Error in deleting workspace', error);
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        try {
            // const ok = await updateConfirmation();
            // console.log('Confimation received');
            // if(!ok) {
            //     return;
            // }
            await updateWorkspaceMutation(renameValue);
            queryClient.invalidateQueries(`fetchWorkspaceById-${workspace?._id}`);
            setOpenPreferences(false);
           console.log('workspace updated')
        } catch(error) {
            console.log('Error in updating workspace', error);
        }
    }

    return (
        <>
        {/* <ConfirmDialog /> */}
        {/* <UpdateDialog /> */}
        <Dialog open={openPreferences} onOpenChange={handleClose}>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>
                        {initialValue}
                    </DialogTitle>
                </DialogHeader>

                <div className='px-4 pb-4 flex flex-col gap-y-2'>

                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogTrigger>
                                <div
                                    className='px-5 py-4 bg-gray-300 rounded-lg border cursor-pointer hover:bg-gray-400'
                                >   
                                    <div className='flex items-center justify-between'>
                                        <p
                                            className='font-semibold text-sm'
                                        >
                                            Workspace Name
                                        </p>
                                        <p
                                            className='text-sm font-semibold hover:underline'
                                        >
                                            Edit
                                        </p>
                                    </div>

                                    <p
                                        className='text-sm'
                                    >
                                        {initialValue}
                                    </p>
                             </div>

                        </DialogTrigger>
                        <DialogContent className="bg-white">
                            <DialogHeader>
                                <DialogTitle>
                                    Rename Workspace
                                </DialogTitle>
                            </DialogHeader>

                            <form className='space-y-4' 
                            onSubmit={handleFormSubmit}
                            >
                                <Input
                                    value={renameValue}
                                    onChange={(e) => setRenameValue(e.target.value)}
                                    required
                                    autoFocus
                                    minLength={3}
                                    maxLength={50}
                                    // disabled={isPending}
                                    placeholder='Workspace Name e.g. Design Team'
                                />
                            

                                <DialogFooter>
                                    <DialogClose>
                                        <Button
                                            variant="outline"
                                            // disabled={isPending}
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        // disabled={isPending}
                                        className="bg-black text-white"
                                    >
                                        Save
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    
                    <button
                        className='flex items-center gap-x-2 px-5 py-4 bg-gray-300 rounded-lg border cursor-pointer hover:bg-gray-500'
                        onClick={handleDelete}
                    >
                        <TrashIcon className='size-5' />
                        <p
                            className='text-sm font-semibold'
                        >
                            Delete Workspace
                        </p>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
        </>
    );
};