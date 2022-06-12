import React from 'react'

import s from './BurgerMenu.module.scss'
import TypeDialogsSwitcher from '../../DialogsComponents/typeDialogsSwitcher/TypeDialogsSwitcher'

const BurgerMenu = ({ setIsOpenBurger }) => {
	return (
		<div className={s.burgerMenu} onClick={setIsOpenBurger}>
			<TypeDialogsSwitcher
				path={'/newDialogs'}
				title="Новые диалоги"
				counter={-1}
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

export default BurgerMenu
