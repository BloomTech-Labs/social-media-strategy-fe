import React from 'react';
import {
    InputBase,
    IconButton,
    makeStyles
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
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
}))

const EditList = props => {
    const {
        listTitle,
        handleInputText,
        submit
    } = props;

    const {
        form,
        iconButton
    } = useStyles();

    return (
        <form onSubmit={submit} className={form} style={{width: '100%'}}>
            <InputBase
                autoFocus
                onBlur={submit}
                onChange={handleInputText}
                id="standard-error-helper-text"
                defaultValue={listTitle}
                fullWidth
                inputProps={{
                'aria-label': 'edit tile',
                }}
            />
            <IconButton type="submit" className={iconButton} aria-label="confirm edit">
                <EditIcon />
            </IconButton>
            <IconButton className={iconButton} aria-label="delete list">
                <DeleteIcon />
            </IconButton>
        </form>
    );
}

export default React.memo(EditList);
