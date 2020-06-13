import React from 'react';
import {
    InputBase,
    IconButton,
    makeStyles
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
    form: {
        padding: '2px 0',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderRadius: theme.shape.borderRadius,
        width: '100%',
        height: 'max-content',
        backgroundColor: '#fff',
    },
    iconButton: {
        padding: 10,
    }
}))

const EditPostText = props => {
    const {
        text,
        handleInputText,
        submit
    } = props;

    const {
        form,
        iconButton,
    } = useStyles();

    const handleBlur = e => {
        submit(e);
    }

    return (
        <>
            <form onSubmit={submit} className={form} style={{width: '100%'}}>
                <InputBase
                    autoFocus
                    onFocus={e => e.target.select()}
                    onBlur={handleBlur}
                    onChange={handleInputText}
                    id="standard-error-helper-text"
                    defaultValue={text}
                    multiline
                    rows={4}
                    fullWidth
                    inputProps={{
                        'aria-label': 'edit post',
                    }}
                />
                <IconButton type="submit" className={iconButton} aria-label="confirm edit">
                    <CheckIcon />
                </IconButton>
            </form>
        </>
    );
}

export default React.memo(EditPostText);
