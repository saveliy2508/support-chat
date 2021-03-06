import React from 'react'
import { Button, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { push, ref, set } from 'firebase/database'
import { dataBase } from '../../../../firebase'
import Picker from 'emoji-picker-react'
import PubNub from 'pubnub'

import s from './chatWindow.module.scss'

import ChatMessage from './ChatMessage'

const ChatWindow = () => {
	const navigate = useNavigate()

	const handleNavigateBack = () => {
		navigate(-1)
	}

	const { currentDialog, email, templatePhrases } = useSelector(
		(state) => state.user
	)
	const { activeDialogs } = useSelector((state) => state.data)

	const [typeIndicator, setTypeIndicator] = React.useState('typing_off')

	const pubnub = new PubNub({
		publishKey: 'pub-c-74326154-1826-48fd-aa1e-ca4bf9faec67',
		subscribeKey: 'sub-c-9bc9e87c-2b1a-4bcb-8320-f81758e0101e',
		uuid: email
	})

	pubnub.subscribe({
		channels: [currentDialog]
	})

	pubnub.addListener({
		message: function (e) {
			setTypeIndicator(e.message)
		}
	})

	const dialog =
		activeDialogs[
			activeDialogs.indexOf(
				activeDialogs.find((item) => item.dialogId === currentDialog)
			)
		]

	const [textarea, setTextarea] = React.useState('')

	const [openInput, setOpenInput] = React.useState(false)
	const [inputImgValue, setInputImgValue] = React.useState('')

	const [showPicker, setShowPicker] = React.useState(false)

	const handlePushNewMessage = () => {
		if (textarea) {
			const date = new Date()
			const newMessageListRef = ref(
				dataBase,
				`activeDialogs/${currentDialog}/messages`
			)
			const newMessageRef = push(newMessageListRef)
			set(newMessageRef, {
				messageId:
					newMessageRef._path.pieces_[
						Object.keys(newMessageRef._path.pieces_).length - 1
					],
				text: textarea,
				timestamp: date.getTime(),
				senderName: email
			})
			setTextarea('')
		}
	}

	const handlePushNewImgMessage = () => {
		if (inputImgValue) {
			const date = new Date()
			const newMessageListRef = ref(
				dataBase,
				`activeDialogs/${currentDialog}/messages`
			)
			const newMessageRef = push(newMessageListRef)
			set(newMessageRef, {
				messageId:
					newMessageRef._path.pieces_[
						Object.keys(newMessageRef._path.pieces_).length - 1
					],
				imgSrc: inputImgValue,
				timestamp: date.getTime(),
				senderName: email
			})
			setInputImgValue('')
		}
		setOpenInput(false)
	}

	const handleTextareaChange = async (e) => {
		setTextarea(e.target.value)
		if (typeIndicator === 'typing_off') {
			await pubnub.publish({
				message: 'typing_on',
				channel: currentDialog
			})
			setTimeout(
				() =>
					pubnub.publish({
						message: 'typing_off',
						channel: currentDialog
					}),
				3000
			)
		}
		if (e.target.value === '') {
			pubnub.publish({
				message: 'typing_off',
				channel: currentDialog
			})
		}
	}

	const onEmojiClick = (event, emojiObject) => {
		setShowPicker(!showPicker)
		setTextarea((prevInput) => prevInput + emojiObject.emoji)
	}

	return (
		<div className={s.chatWindow}>
			<div className={s.title}>
				<div className={s.clientName}>
					Client Name <br />
					<Button
						onClick={handleNavigateBack}
						color="primary"
					>{`<-- ??????????`}</Button>
				</div>
				<div className={s.searchInput}>
					??????????:
					<Input />
				</div>
			</div>
			<div className={s.chat}>
				<div className={s.messages}>
					{dialog?.messages &&
						Object.values(dialog.messages).map((item, index) => (
							<ChatMessage
								key={'currentDialog' + index}
								index={index}
								text={item.text}
								senderName={item.senderName}
								timestamp={item.timestamp}
								imgSrc={item.imgSrc}
							/>
						))}
				</div>
			</div>
			{typeIndicator === 'typing_on' && <>???????????????????? ????????????????...</>}
			{!dialog.ended ? (
				<div className={s.answerForm}>
					<div className={s.answerInput}>
						{/*<div className={s.typeIndicator}>*/}
						{/*	{typeIndicator === 'typing_on' && (*/}
						{/*		<>???????????????????? ????????????????...</>*/}
						{/*	)}*/}
						{/*</div>*/}
						?????????????? ??????????:
						<Input
							value={textarea}
							onChange={(e) => handleTextareaChange(e)}
							className={s.textarea}
							bsSize="sm"
							type="text"
							list="answers"
						/>
						<datalist id="answers">
							{templatePhrases &&
								templatePhrases.map((item, index) => (
									<option key={`operator${index}`} value={item} />
								))}
						</datalist>
						<Button onClick={handlePushNewMessage}>??????????????????</Button>
					</div>
					<div className={s.template}>
						{openInput ? (
							<Button onClick={handlePushNewImgMessage}>
								?????????????????? ??????????????????????
							</Button>
						) : (
							<Button onClick={() => setOpenInput(true)}>
								???????????????? ??????????????????????
							</Button>
						)}
						<Button onClick={() => setShowPicker(!showPicker)}>????????????</Button>
						{openInput && (
							<Input
								value={inputImgValue}
								onChange={(e) => setInputImgValue(e.target.value)}
								placeholder="?????????????? ???????????? ???? ??????????????????????"
								type="text"
							/>
						)}
						{showPicker && (
							<div className={s.picker}>
								<Picker onEmojiClick={onEmojiClick} />
							</div>
						)}
					</div>
				</div>
			) : (
				<div className={s.isDialogEnded}>???????????? ????????????????</div>
			)}
		</div>
	)
}

export default ChatWindow
