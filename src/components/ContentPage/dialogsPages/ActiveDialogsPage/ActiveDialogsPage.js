import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ref, set } from 'firebase/database'
import { dataBase } from '../../../../firebase'

import s from './activeDialogsPage.module.scss'

import DialogCardComponent from './ActiveDialogsCardComponent/ActiveDialogCardComponent'
import { setCurrentDialog } from '../../../../redux/actions/userActions'

const ActiveDialogsPage = ({ addDialogToEnded }) => {
	const { activeDialogs } = useSelector((state) => state.data)
	const { id } = useSelector((state) => state.user)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleContinue = (dialogId) => {
		dispatch(setCurrentDialog(dialogId))
		navigate(`/contentPage/${dialogId}`)
	}

	const handleSaveDialog = (dialogId) => {
		const saveDialogRef = ref(
			dataBase,
			`users/${id}/savedDialogsId/${dialogId}`
		)
		set(saveDialogRef, {
			dialogId
		})
	}

	return (
		<>
			<div className={s.title}>ActiveDialogsPage</div>
			<div className={s.dialogsCards}>
				{activeDialogs &&
					activeDialogs
						.filter((item) => item.ended !== true)
						.map((item, index) => (
							<div className={s.card} key={'activeDialogs' + index}>
								<DialogCardComponent
									addDialogToEnded={addDialogToEnded}
									clientName={item.clientName}
									startTime={item.startTime}
									dialogData={item}
									messages={item.messages}
									handleContinue={handleContinue}
									handleSaveDialog={handleSaveDialog}
								/>
							</div>
						))}
			</div>
		</>
	)
}

export default ActiveDialogsPage