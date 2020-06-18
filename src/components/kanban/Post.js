import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { getDate, getTime } from "../../utils/dateFunctions";
// Actions
import { updatePost } from "../../actions/listsActions";
import { postTweet } from "../../actions/twitterActions";
// Components
import EditPostText from "./EditPostText";
import PostMenu from "./PostMenu";
import SchedulePost from "./SchedulePost";
import Modal from "../templates/Modal";
// Material-UI
import { Typography, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingBottom: theme.spacing(1),
		paddingTop: theme.spacing(1),
		marginTop: 4,
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "#FFF",
	},
	contentContainer: {
		userSelect: "none",
		padding: theme.spacing(1),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		borderLeft: "solid 3px gray",
		minHeight: "50px",
		maxWidth: "100%",
		display: "flex",
		alignItems: "flex-start",
	},
	postText: {
		flexGrow: "1",
		cursor: "pointer",
		maxWidth: "100%",
		lineBreak: "anywhere",
	},
	image: {
		width: "100%",
		maxHeight: "140px",
		objectFit: "cover",
	},
	actionsContainer: {
		display: "flex",
		justifyContent: "space-between",
		margin: theme.spacing(1),
		marginRight: theme.spacing(2),
		marginBottom: 0,
	},
}));

const Post = ({ post }) => {
	const {
		container,
		contentContainer,
		postText,
		image,
		actionsContainer,
	} = useStyles();

	const dispatch = useDispatch();

	const [text, setText] = useState(post.post_text || "");
	const [isEditing, setIsEditing] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const postToTwitter = async () => {
		await dispatch(postTweet(post.id));
	};

	const handleInputText = (e) => {
		if (e.keyCode === 13) {
			handlePostUpdate(e);
		} else {
			setText(e.currentTarget.value.trim());
		}
	};

	const handlePostUpdate = (e) => {
		e.preventDefault();

		// if input is empty set text with the previous post text value
		if (!text.trim()) {
			setText(post.post_text);
		} else if (text !== post.post_text) {
			dispatch(updatePost(post.id, { post_text: text }));
		}

		setIsEditing(false);
	};

	return (
		post && (
			<Draggable key={post.id} draggableId={post.id} index={post.index}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={container}
						style={{ ...provided.draggableProps.style }}
					>
						{post.scheduled_time && (
							<Typography>
								{getDate(post.scheduled_time, false, true)}
								<br />
								{getTime(post.scheduled_time)}
							</Typography>
						)}
						<div className={contentContainer}>
							{isEditing ? (
								<EditPostText
									text={text}
									handleInputText={handleInputText}
									submit={handlePostUpdate}
								/>
							) : (
								<>
									<Typography
										onClick={() => setIsEditing(true)}
										className={postText}
									>
										{text}
										<br />
										{`Index: ${post.index}`}
									</Typography>
									<PostMenu post={post} setEditing={() => setIsEditing(true)} />
								</>
							)}
						</div>
						{post.imageUrl && (
							<img className={image} src={post.imageUrl} alt="Post" />
						)}

						<div className={actionsContainer}>
							{post.posted ? (
								<Button disabled>Posted</Button>
							) : (
								<>
									{!post.scheduled_time && <SchedulePost postId={post.id} />}
									<Button
										disabled={post.posted}
										onClick={() => setModalOpen(true)}
										color="primary"
									>
										Post Now
									</Button>
									<Modal
										open={modalOpen}
										handleClose={() => setModalOpen(false)}
										title="Confirm post to twitter?"
										handleConfirmation={postToTwitter}
									/>
								</>
							)}
						</div>
					</div>
				)}
			</Draggable>
		)
	);
};

export default React.memo(Post);
