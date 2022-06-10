import React from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import s from './modalSettings.module.scss'

import DialogsSettings from './DialogsSettings/DialogsSettings'
import ProfileSettings from './ProfileSettings/ProfileSettings'

const ModalSettings = ({ setIsOpenModal }) => {
	const [settingsType, setSettingsType] = React.useState('profile')

	return (
		<>
			<div className={s.modalHeader}>
				<div className={s.title}>
					Настройки
					<ButtonGroup className={s.settingsType}>
						<Button
							color="secondary"
							onClick={() => setSettingsType('profile')}
						>
							профиля
						</Button>
						<Button
							color="secondary"
							onClick={() => setSettingsType('dialogs')}
						>
							диалогов
						</Button>
					</ButtonGroup>
				</div>
				<div className={s.xmark}>
					<FontAwesomeIcon
						className={s.xmark}
						icon={faXmark}
						onClick={() => setIsOpenModal(false)}
					/>
				</div>
			</div>
			{settingsType === 'profile' ? (
				<ProfileSettings setIsOpenModal={setIsOpenModal} />
			) : (
				<DialogsSettings />
			)}
		</>
	)
}

export default ModalSettings
