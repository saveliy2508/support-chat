import React from 'react'
import { useSelector } from 'react-redux'

import s from './navbarContentPage.module.scss'

import TypeDialogsSwitcher from '../DialogsComponents/typeDialogsSwitcher/TypeDialogsSwitcher'

const NavbarContentPage = () => {
	const { newDialogs } = useSelector((state) => state.data)
	const newDialogsCounter = newDialogs ? Object.keys(newDialogs).length : 0
	return (
		<div className={s.navbarWrapper}>
			<TypeDialogsSwitcher
				path={'/newDialogs'}
				title="Новые диалоги"
				counter={newDialogsCounter}
				text="клиентов ожидают очереди"
			/>
			<TypeDialogsSwitcher
				path={'/activeDialogs'}
				title="Активные диалоги"
				counter={-1}
				text="клиентов ожидают ответа"
			/>
			<TypeDialogsSwitcher
				path={'/endedDialogs'}
				title="Завершенные диалоги"
				counter={-1}
			/>
			<TypeDialogsSwitcher
				path={'/savedDialogs'}
				title="Сохраненные диалоги"
				counter={-1}
			/>
		</div>
	)
}

export default NavbarContentPage
