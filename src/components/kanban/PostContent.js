import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDate, getTime } from "../../utils/dateFunctions";
// Actions
import { updatePost } from "../../actions/postsActions";
import { postTweet } from "../../actions/twitterActions";
// Material-UI
import { Typography, makeStyles, Button } from "@material-ui/core";
// Components
import EditPostText from "./EditPostText";
import PostMenu from "./PostMenu";
import SchedulePost from "./SchedulePost";
import Modal from "../templates/Modal";

const useStyles = makeStyles((theme) => ({
	schedule: {
		display: "flex",
		justifyContent: "space-between",
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	scheduleText: {
		fontWeight: "700",
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

const PostContent = ({ post }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const {
		schedule,
		scheduleText,
		contentContainer,
		postText,
		image,
		actionsContainer,
	} = useStyles();

	const dispatch = useDispatch();

	const [text, setText] = useState(post.post_text || "");

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
		<>
			{post.scheduled_time && !post.posted && (
				<div className={schedule}>
					<Typography className={scheduleText} variant="subtitle2" color="secondary">
						{getDate(post.scheduled_time, false, true)}
					</Typography>
					<Typography className={scheduleText} variant="subtitle2" color="secondary">
						{getTime(post.scheduled_time)}
					</Typography>
				</div>
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
						<Typography onClick={() => setIsEditing(true)} className={postText}>
							{text} | {post.index}
						</Typography>
						<PostMenu post={post} setEditing={() => setIsEditing(true)} />
					</>
				)}
			</div>
			{post.imageUrl && <img className={image} src={post.imageUrl} alt="Post" />}

			<div className={actionsContainer}>
				{post.posted ? (
					<Button disabled>{`Posted - ${getDate(
						post.scheduled_time,
						true,
					)} | ${getTime(post.scheduled_time)}`}</Button>
				) : (
					<>
						{!post.posted && (
							<SchedulePost scheduledTime={post.scheduled_time} postId={post.id} />
						)}
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
		</>
	);
};

export default React.memo(PostContent);
