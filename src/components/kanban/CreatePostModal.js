import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList, addPost } from "../../actions/listsActions";
import TwitterCharCount from "./TwitterCharCount";
import {
	makeStyles,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Fab,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	content: {
		width: "400px",
		maxWidth: "100%",
	},
	formControl: {
		minWidth: 200,
		marginTop: theme.spacing(2),
	},
}));

const CreatePostModal = (props) => {
	const { listId, open, handleClose } = props;
	const { content, formControl } = useStyles();
	const dispatch = useDispatch();
	const { lists } = useSelector((state) => state.kanban);
	const [post, setPost] = useState({
		list_id: "",
		post_text: "",
		image_url: "",
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (lists) {
			const drafts = Object.values(lists).find(
				(list) => list.title === "Drafts",
			);

			if (!drafts) {
				// create Drafts list
				(async () => {
					await dispatch(addList("Drafts"));
				})();
			} else {
				// set Drafts or listId from param as default list
				setPost((prevPost) => ({
					...prevPost,
					list_id: listId ? listId : drafts.id,
				}));
			}
		}
	}, [lists, listId, dispatch]);

	const handlePostText = (e) => {
		// Check if Enter was pressed
		if (e.keyCode === 13) {
			handleCreatePost(e);
		} else {
			const target = e.currentTarget;
			setPost((prevPost) => ({
				...prevPost,
				[target.id]: target.value?.trim(),
				
			}));
		}
	};

	const handleSelectList = (e) => {
		const target = e.target;

		setPost((prevPost) => ({
			...prevPost,
			list_id: target.value,			
		}));
	};

	const handleCreatePost = (e) => {
		e.preventDefault();

		if (post.post_text) {
			console.log(post);
			dispatch(addPost(post));
			handleClose();
			
 		}
	};

	const handleImageUpload = async e => {
		const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'somefileupload');
        setLoading(true);
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/someapp/image/upload',
            {
                method: 'Post',
                body: data
            }
        );
        const file = await res.json();
		
		setPost((prevPost) => ({
			...prevPost,
			image_url: file.secure_url
		}));
		setLoading(false);
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">Create a Post</DialogTitle>
			<label htmlFor="upload-photo">
				<input
					style={{ display: 'none' }}
					id="upload-photo"
					name="upload-photo"
					type="file"
					onChange={ handleImageUpload }
				/>

				<Fab
					color="primary"
					size="small"
					component="span"
					aria-label="add"
					variant="extended"
					style={{ width: '100%', borderRadius: '0', margin: '-10px 0 10px' }}
					
				>
					+ Upload photo
				</Fab>
			</label>
			<img src={post.image_url} style={{ width: '300px', margin: '0 auto'}}/>
			<DialogContent className={content}>
				{/* Post text */}
				<TextField
					autoFocus
					id="post_text"
					label="Post text"
					fullWidth
					multiline
					rows={4}
					rowsMax={7}
					variant="outlined"
					onChange={handlePostText}
					onKeyDown={handlePostText}
					inputProps={{
						maxLength: 280,
					}}
				/>
				<TwitterCharCount text={post.post_text} />

				{/* List Select */}
				<FormControl className={formControl}>
					<InputLabel id="list_label">Category</InputLabel>
					<Select
						labelId="list_label"
						id="list_select"
						value={post.list_id}
						onChange={handleSelectList}
					>
						{lists &&
							Object.values(lists).map((list) => {
								return (
									<MenuItem key={list.id} value={list.id}>
										{list.title}
									</MenuItem>
								);
							})}
					</Select>
				</FormControl>

				{/* Image upload */}
				{/* <input
            accept="image/*"
            style={{ display: "none" }}
            id="create-tweet"
            multiple
            type="file"
          />
          <label htmlFor="create-tweet">
            <AddAPhotoIcon />
          </label> */}
			</DialogContent>

			<DialogActions style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleCreatePost} color="primary">
					Add to List
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CreatePostModal;
