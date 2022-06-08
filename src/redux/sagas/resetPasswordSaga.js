import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { takeLatest } from 'redux-saga/effects'

export const RESET_PASSWORD_SAGA = 'RESET_PASSWORD_SAGA'

const notify = (text) =>
	toast.info(text, {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined
	})

export function* resetPasswordWorker({ email }) {
	return yield sendPasswordResetEmail(auth, email)
		.then(() => {
			notify('Проверьте вашу почту')
		})
		.catch(() => {
			notify('Ошибка')
		})
}

export function* resetPasswordWatcher() {
	yield takeLatest(RESET_PASSWORD_SAGA, resetPasswordWorker)
}
