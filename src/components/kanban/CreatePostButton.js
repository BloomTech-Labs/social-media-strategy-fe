import React, { useState } from 'react';
import CreatePostModal from './CreatePostModal';
import { Button } from '@material-ui/core';

const CreatePostButton = ({ listId }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button fullWidth onClick={() => setIsOpen(true)}>+</Button>
            <CreatePostModal listId={listId} open={isOpen} handleClose={() => setIsOpen(false)} />
        </>
    );
}

export default CreatePostButton;
