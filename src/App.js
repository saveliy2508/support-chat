import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './firebase'
import * as Sentry from '@sentry/react'

import s from './App.module.scss'

import LogInPage from './components/Authorization/LogInPage/LogInPage'
import RegistrationForm from './components/Authorization/SignUpPage/SignUpPage'
import ForgetPassword from './components/Authorization/ForgotPasswordPage/ForgotPasswordPage'
import ContentPage from './components/ContentPage/ContentPage'

function App() {
	const { email } = useSelector((state) => state.user)

	return (
		<div className={s.App}>
			<div className={s.appWrapper}>
				<Routes>
					<Route
						path="*"
						element={
							!!email ? (
								<Navigate to="/contentPage/newDialogs" />
							) : (
								<Navigate to="/authorization/login" />
							)
						}
					/>
					<Route
						path="/authorization/login"
						element={
							!!email ? (
								<Navigate to="/contentPage/newDialogs" />
							) : (
								<LogInPage />
							)
						}
					/>
					<Route
						path="/authorization/registration"
						element={
							!!email ? (
								<Navigate to="/contentPage/newDialogs" />
							) : (
								<RegistrationForm />
							)
						}
					/>
					<Route
						path="/authorization/forgetPassword"
						element={
							!!email ? (
								<Navigate to="/contentPage/newDialogs" />
							) : (
								<ForgetPassword />
							)
						}
					/>
					<Route
						path="/contentPage/*"
						element={
							!!email ? <ContentPage /> : <Navigate to="/authorization/login" />
						}
					/>
				</Routes>
			</div>
		</div>
	)
}

export default Sentry.withProfiler(App)
