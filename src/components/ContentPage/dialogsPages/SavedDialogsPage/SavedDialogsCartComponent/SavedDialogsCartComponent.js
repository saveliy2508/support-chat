import React from 'react'
import { Button } from 'reactstrap'
import { useSelector } from 'react-redux'
import { ref, set } from 'firebase/database'
import { dataBase } from '../../../../../firebase'

import s from './savedDialogsCartComponent.module.scss'

const SavedDialogCardComponent = ({
	clientName,
	dialogData,
	handleContinue,
	messages
}) => {
	const { id } = useSelector((state) => state.user)
	const handleDeleteFromSaved = () => {
		set(
			ref(dataBase, `users/${id}/savedDialogsId/${dialogData.dialogId}`),
			null
		)
	}
	return (
		<div className={s.dialogCard}>
			<div className={s.clientInfo}>{clientName}</div>
			<div className={s.lastMessage}>
				{`${
					messages &&
					Object.values(messages)[
						Object.values(messages).length - 1
					].text.slice(0, 80)
				}...`}
			</div>
			<div className={s.dialogInfo}>
				<Button
					color="primary"
					block
					className={s.continueButton}
					onClick={() => handleContinue(dialogData.dialogId)}
				>
					Продолжить
				</Button>
				<Button color="primary" block onClick={handleDeleteFromSaved}>
					Удалить из сохраненных
				</Button>
			</div>
		</div>
	)
}

export default SavedDialogCardComponent
