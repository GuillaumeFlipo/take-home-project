import React from 'react'
import { Messages } from './App'
import styled, { keyframes } from 'styled-components'


interface Props {
	message: Messages,
	id1:string,
}


const messageAnimation_player_1 = keyframes`
    from{
      transform: translateX(30%);
      opacity: 0;
    }to{
      transform: translateX(0);
      opacity: 1;
    }
`

const messageAnimation_player_2 = keyframes`
    from{
      transform: translateX(-30%);
      opacity: 0;
    }to{
      transform: translateX(0);
      opacity: 1;
    }
`

const ChatPlayer1 = styled.div`
  animation-name: ${messageAnimation_player_1};
  background-color: rgba(25, 153, 179,0.7);
  padding:1px 10px;
  border-radius:0px 5px 5px 0px;
  justify-self: flex-start;
  animation-fill-mode: both;
  animation-duration: .8s;
  transition-timing-function: cubic-bezier(0.7, 1, 0.7, 1);

`

const ChatPlayer2 = styled.div`
  animation-name: ${messageAnimation_player_2};
  text-align: right;
  background-color: rgba(63, 96, 145,0.7);
  padding:1px 10px;
  border-radius:5px 0px 0px 5px;
  align-self: flex-end;
  animation-fill-mode: both;
  animation-duration: .8s;
  transition-timing-function: cubic-bezier(0.7, 1, 0.7, 1);

 

  
`

const MessageContainerPlayer1 = styled.div`
  margin:3px auto;  
  display: flex;
  justify-content: flex-start;

`

const MessageContainerPlayer2 = styled.div`
  margin:3px auto;  
  animation-fill-mode: both;
  animation-duration: .8s;
  transition-timing-function: cubic-bezier(0.7, 1, 0.7, 1);
  display: flex;
  justify-content: flex-end;

`

const chatLayout = (props: Props): JSX.Element => {

  
	const display = (): JSX.Element =>{
		if (props.message.user === props.id1){
			return (
				<MessageContainerPlayer1>
					<ChatPlayer1>
						<p>{props?.message?.message}</p>
					</ChatPlayer1>
				</MessageContainerPlayer1>)
		} else {
			return (
				<MessageContainerPlayer2>
					<ChatPlayer2>
						<p>{props?.message?.message}</p>
					</ChatPlayer2>
				</MessageContainerPlayer2>)
		}
	}

	return display()

 
}

export default chatLayout