import React, { useState } from 'react';
import {
    InputBase,
    IconButton,
    makeStyles,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    form: {
        padding: '2px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: theme.shape.borderRadius,
        width: '100%',
        height: 'max-content',
        backgroundColor: '#fff',
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}))

const EditList = props => {
    const {
        listTitle,
        handleInputText,
        submit
    } = props;

    const {
        form,
        iconButton,
        divider
    } = useStyles();

    const [modalOpen, setModalOpen] = useState(false);

    const deleteList = () => {
        console.log('delete list');
    }

    const handleBlur = e => {
        if (!modalOpen) {
            submit(e);
        } 
    }

    return (
        <>
            <form onSubmit={submit} className={form} style={{width: '100%'}}>
                <InputBase
                    autoFocus
                    onBlur={handleBlur}
                    onChange={handleInputText}
                    id="standard-error-helper-text"
                    defaultValue={listTitle}
                    fullWidth
                    inputProps={{
                        'aria-label': 'edit title',
                    }}
                />
                <IconButton type="submit" className={iconButton} aria-label="confirm edit">
                    <CheckIcon />
                </IconButton>
                <Divider className={divider} orientation="vertical" />
                <IconButton onClick={() => setModalOpen(true)} className={iconButton} aria-label="delete list">
                    <DeleteIcon />
                </IconButton>
            </form>

            <Dialog
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby='dialog-title'
            >
                <DialogTitle id='dialog-title'>
                    {`Would you like to delete the ${listTitle} list?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-description">
                        {`Confirming this action all posts in the list will also be deleted.`}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setModalOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteList} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default React.memo(EditList);
