import React from 'react'
import moment from 'moment'
import 'moment/locale/ru'

import s from './activeDialogCardComponent.module.scss'

import { Button } from 'reactstrap'

const ActiveDialogCardComponent = ({
	clientName,
	startTime,
	dialogData,
	handleContinue,
	messages,
	handleSaveDialog,
	addDialogToEnded
}) => {
	const [grade, setGrade] = React.useState('')

	const startMoment = moment(startTime).locale('ru').fromNow()

	return (
		<div className={s.dialogCard}>
			<div className={s.clientInfo}>
				{clientName}
				<div className={s.test}>
					<br />
					<br />
					<input
						type="number"
						placeholder="оценка от 1 до 5"
						value={grade}
						onChange={(e) => setGrade(e.target.value)}
					/>
					<button onClick={() => addDialogToEnded(dialogData.dialogId, grade)}>
						Закончить диалог (временно)
					</button>
				</div>
			</div>
			<div className={s.lastMessage}>
				{Object.values(messages)[Object.values(messages).length - 1].text}
			</div>
			<div className={s.dialogInfo}>
				<Button
					color="primary"
					block
					onClick={() => handleContinue(dialogData.dialogId)}
				>
					Продолжить
				</Button>
				<p>Начат {startMoment}</p>
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

export default ActiveDialogCardComponent
