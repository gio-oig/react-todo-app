import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';

import Todo from './component/todo.component';

import db from './firebase/firebase.conf';
import './App.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	useEffect(() => {
		// db is database connection
		// .collection(param) gives us all param collection document data in array
		// .onSnapshot is like listener and listens to the data change
		// snapshot is collection
		//
		db.collection('todos')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				// Collection - Documents[] - Data{}
				setTodos(
					snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
				);
			});
	}, []);

	const addTodo = (e) => {
		e.preventDefault();

		db.collection('todos').add({
			todo: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setInput('');
	};

	return (
		<div className="App">
			<h1>Todo App</h1>
			<form>
				<FormControl>
					<InputLabel>Write Todo</InputLabel>
					<Input onChange={(e) => setInput(e.target.value)} value={input} />
				</FormControl>
				<Button
					disabled={!input}
					onClick={addTodo}
					type="submit"
					variant="contained"
					color="primary"
				>
					add
				</Button>
			</form>
			<ul>
				{todos.map((todo) => (
					<Todo todo={todo}></Todo>
				))}
			</ul>
		</div>
	);
}

export default App;
