import React from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import s from './endedDialogCardComponent.module.scss'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const EndedDialogCardComponent = ({
	clientName,
	dialogData,
	handleContinue,
	messages,
	handleSaveDialog,
	grade
}) => {
	//Логика отображения количества звезд по оценке(grade)
	let stars = []
	for (let i = 0; i < grade; i++) {
		stars.push('0')
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
					onClick={() => handleContinue(dialogData.dialogId)}
				>
					Читать
				</Button>
				<p className={s.grade}>
					{stars.map((item, index) => (
						<FontAwesomeIcon
							key={`star${index}`}
							className={s.star}
							icon={faStar}
						/>
					))}
				</p>
				<Button
					color="primary"
					block
					onClick={() => handleSaveDialog(dialogData.dialogId)}
				>
					Сохранить диалог
				</Button>
			</div>
		</div>
	)
}

export default EndedDialogCardComponent
