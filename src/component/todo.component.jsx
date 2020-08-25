import React, { useState } from 'react';
import { ListItem, ListItemText, Button, Modal } from '@material-ui/core';
import db from '../firebase/firebase.conf';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const Todo = ({ todo }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState('');

	const update = () => {
		db.collection('todos').doc(todo.id).set(
			{
				todo: input,
			},
			{ merge: true }
		);
		setOpen(false);
		setInput('');
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div className={classes.paper}>
					<h1>model</h1>
					<input
						placeholder={todo.todo}
						onChange={(e) => setInput(e.target.value)}
						value={input}
					/>
					<Button
						onClick={update}
						disabled={!input}
						variant="contained"
						color="primary"
					>
						update
					</Button>
				</div>
			</Modal>
			<ListItem>
				<ListItemText primary={todo.todo} secondary="Dummy deadline" />
				<Button
					onClick={() => db.collection('todos').doc(todo.id).delete()}
					variant="contained"
					color="secondary"
				>
					delete
				</Button>
				<Button
					onClick={() => setOpen(true)}
					variant="contained"
					color="primary"
				>
					edit
				</Button>
			</ListItem>
		</div>
	);
};

export default Todo;
