import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import s from '../AuthorisationStyles.module.scss'

import Form from './../AuthorizationComponents/Form/Form'
import SubmitButton from './../AuthorizationComponents/SubmitButton/SubmitButton'
import Input from '../AuthorizationComponents/Input/Input'
import { useDispatch } from 'react-redux'
import { resetPasswordSaga } from '../../../redux/actions/sagaAuthorizationActions'

const ForgetPassword = () => {
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const [emailInput, setEmailInput] = React.useState('')

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
	const handleResetPassword = async () => {
		dispatch(resetPasswordSaga(emailInput))
		await delay(6000)
		navigate('/authorization/login')
	}

	return (
		<div className={s.authorizationFormContainer}>
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
			<div className={s.authorizationForm}>
				<Form formTitle="Восстановление пароля" />
				<div className={s.form}>
					<label htmlFor="email">Почта</label>
					<Input
						type="text"
						name="email"
						value={emailInput}
						onChange={(e) => setEmailInput(e.target.value)}
					/>
					<SubmitButton
						handleClick={handleResetPassword}
						text="Отправить ссылку"
					/>
				</div>
				<div className={s.directions}>
					<Link to="/authorization/login">Войти</Link>
					<Link to="/authorization/registration">Регистрация</Link>
				</div>
			</div>
		</div>
	)
}

export default ForgetPassword
