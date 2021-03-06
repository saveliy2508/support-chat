import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Field, Form } from 'react-final-form'
import { Button, Input } from 'reactstrap'
import { get, ref, set } from 'firebase/database'
import { dataBase } from '../../../../firebase'
import { useDispatch, useSelector } from 'react-redux'

import s from './profileSettings.module.scss'

import { setProfileSettings } from '../../../../redux/actions/userActions'
import { ToastContainer } from 'react-toastify'
import { resetPasswordSaga } from '../../../../redux/actions/sagaAuthorizationActions'

const ProfileSettings = ({ setIsOpenModal }) => {
	const { id, name, avatar, email } = useSelector((state) => state.user)

	const dispatch = useDispatch()

	const onSubmit = async ({ name, avatar }) => {
		if (name) {
			await set(ref(dataBase, `users/${id}/name`), name)
		}
		if (avatar) {
			await set(ref(dataBase, `users/${id}/avatar`), avatar)
		}

		const userDataIdRef = ref(dataBase, `users/${id}`)
		await get(userDataIdRef).then((snapshot) => {
			let data = snapshot.val()

			let name
			let avatar
			if (data.hasOwnProperty('name')) {
				name = data.name
			}
			if (data.hasOwnProperty('avatar')) {
				avatar = data.avatar
			}

			dispatch(
				setProfileSettings({
					name: name,
					avatar: avatar
				})
			)
			setIsOpenModal(false)
		})
	}

	const [currentAvatarInput, setCurrentAvatarInput] = React.useState(avatar)

	const validate = (e) => {
		setCurrentAvatarInput(e.avatar)
	}

	const handleResetPassword = async () => {
		dispatch(resetPasswordSaga(email))
	}

	const initialData = { name: name, avatar: currentAvatarInput }
	return (
		<div className={s.modal}>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className={s.settings}>
				<Form
					onSubmit={onSubmit}
					validate={validate}
					initialValues={initialData}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<div className={s.name}>
								<Field
									name="name"
									render={({ input }) => (
										<div>
											<label className={s.text}>??????:</label>
											<Input
												{...input}
												autoComplete="off"
												placeholder="?????????????? ??????..."
											/>
										</div>
									)}
								/>
							</div>
							<div className={s.avatar}>
								<Field
									name="avatar"
									render={({ input }) => (
										<div>
											<label className={s.text}>????????????:</label>
											<span className={s.avatarImg}>
												{currentAvatarInput ? (
													<img
														src={currentAvatarInput}
														alt="????????????"
														className={s.img}
													/>
												) : (
													<FontAwesomeIcon icon={faUser} className={s.img} />
												)}
											</span>
											<Input
												{...input}
												autoComplete="no"
												placeholder="?????????????? url ?????????? ??????????????????????..."
												className={s.avatarImgInput}
											/>
										</div>
									)}
								/>
							</div>
							<br />
							<Button type="submit">?????????????????? ?????????????????? ?????????? ?? ??????????????</Button>
						</form>
					)}
				/>
				<div className={s.passwordChange}>
					<div className={s.text}>?????????????????? ????????????</div>
					<Button type="submit" onClick={handleResetPassword}>
						?????????????????? ???????????? ???? ??????????
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ProfileSettings
