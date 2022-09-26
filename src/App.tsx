import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { db } from './firestore'
import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc } from '@firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import ChatLayout from './ChatLayout'
import { toInt } from './Utils'


const Root = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
`

const Container = styled.div`
	height: 100%;
	width: 100%;
`

const ChatContainer = styled.div`
	margin: 5rem auto 0rem;
	width: 80%;
	box-shadow: 0 2px 5px rgba(90, 91, 94, 0.2), 0 2px 5px rgba(14, 21, 47, 0.2);	
	padding:1rem;
	border-radius:5px;

`

export interface Messages {
	timeStamp: string,
	user:string,
	message: string | null,

}


const pushToFirebase = async (user: string, text: string): Promise<void> => {
	// we push to the database
	const now = Date.now()

	// the user object will be:
	// user: {
	// 	[randomUuid]: { 
	// 		messages: {
	// 			someTimeStamp: 'someMessage'
	// 			someOtherTimeStamp: 'someOtherMessage'
	// 		}
	// 	}
	// }

	const userRef = doc(db, `users/${user}`)
	setDoc(userRef, {
		messages: { [now]: text, },
	}, { merge: true, })
}  

const Player = ({ id, }: { id: string, }) => {
	// a controlled form where on submit we send some data to firebase
	const [ text, setText, ] = useState('')

	return (
		<div>
			Your message:
			<form onSubmit={(e) => {
				e.preventDefault()
				setText('')
				pushToFirebase(id, text)
			}}
			>
				<input value={text} onChange={e => setText(e.target.value)}/>
			</form>
		</div>
	)
}



const Chat = ({ id1, id2, }: { id1: string, id2: string, }): JSX.Element => {
	// TODO: Implement snapshot listeners on player 1 and player2. Display a chat of their messages.
	// https://firebase.google.com/docs/firestore/query-data/listen for snapshot documentation.
	// i have disabled all security, so you should not worry about that :)

	
	const [messages, setMessages,] = useState<null | Messages[]>(null)
	const [messages_player_1, setMessages_player1,] = useState<null | Messages[]>(null)
	const [messages_player_2, setMessages_player2,] = useState<null | Messages[]>(null)

	useEffect(()=>{
		const Messages:Messages[] = []
		messages_player_1?.map((val)=> Messages.push(val))
		messages_player_2?.map((val)=> Messages.push(val))
		setMessages(Messages)
		
	}, [messages_player_1, messages_player_2,])

	
	useEffect(()=>{
		onSnapshot(doc(db, `users/${id1}`), (doc1) => {
			const messages_update: string[] | null= Object.values(doc1.data()?.messages)
			const timeStamp: string[] | null= Object.keys(doc1.data()?.messages)
			const Messages: Messages[] = []
		
			if (messages_update && timeStamp){
				for (let i = 0; i < messages_update.length; i++){
					Messages.push({
						timeStamp : timeStamp[i],
						message : messages_update[i],
						user: id1,
					})
				}
			}	
			setMessages_player1(Messages)
		  })
		onSnapshot(doc(db, `users/${id2}`), (doc2) => {
			const messages_update: string[] | null= Object.values(doc2.data()?.messages)
			const timeStamp: string[] | null= Object.keys(doc2.data()?.messages)
			const Messages: Messages[] = []
	
		
			if (messages_update && timeStamp){
				for (let i = 0; i < messages_update.length; i++){
					Messages.push({
						timeStamp : timeStamp[i],
						message : messages_update[i],
						user: id2,
					})
				}
			}	
			setMessages_player2(Messages)
		  })
		  
	  
	}, [])
		
	return (
		<ChatContainer>
			{messages?.sort((a, b)=> toInt(a.timeStamp) - toInt(b.timeStamp)).map((val, key)=> 
				<ChatLayout key={key} message={val} id1={id1}/>)}
		</ChatContainer>
	)
}

const App = (): JSX.Element => {
	// we generate a random uid for each player. We use this as their database id. 
	// note: this means you cannot retrieve chats on page reload!

	const [idPlayerOne,] = useState(uuidv4())
	const [idPlayerTwo,] = useState(uuidv4())

	return (
		<Root>
			<Container>
				<Player id={idPlayerOne} />
			</Container>
			<Container>
				<Chat id1={idPlayerOne} id2={idPlayerTwo}/>
			</Container>
			<Container>
				<Player id={idPlayerTwo} />
			</Container>
		</Root>
	)
}

export default App
