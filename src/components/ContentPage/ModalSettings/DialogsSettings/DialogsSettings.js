import React from 'react'
import { Button, Input, InputGroup } from 'reactstrap'
import { Field, FieldArray, Form, Formik } from 'formik'
import { push, ref, set } from 'firebase/database'
import { dataBase } from '../../../../firebase'
import { useDispatch, useSelector } from 'react-redux'

import s from './dialogsSettings.module.scss'

import {
	setAutoGreening,
	setDialogsSettings
} from '../../../../redux/actions/userActions'

const DialogsSettings = () => {
	const { id, templatePhrases, autoGreeting } = useSelector(
		(state) => state.user
	)

	const dispatch = useDispatch()

	const updateDialogsSettings = async (values) => {
		await set(ref(dataBase, `users/${id}/templatePhrases`), null)
		await values.templatePhrases.forEach((item) => {
			if (item !== '') {
				const newPhraseListRef = ref(dataBase, `users/${id}/templatePhrases`)
				const newPhraseRef = push(newPhraseListRef)
				set(newPhraseRef, {
					phraseId:
						newPhraseRef._path.pieces_[
							Object.keys(newPhraseRef._path.pieces_).length - 1
						],
					text: item
				})
			}
		})
		await set(ref(dataBase, `users/${id}/autoGreeting`), autoGreeting)
		dispatch(
			setDialogsSettings({
				templatePhrases: values.templatePhrases,
				autoGreeting: autoGreeting
			})
		)
	}

	return (
		<>
			<div className={s.greeding}>
				<div className={s.text}>Автоматическое приветствие:</div>
				<Input
					value={autoGreeting}
					onChange={(e) => dispatch(setAutoGreening(e.target.value))}
				/>
			</div>
			<div className={s.phrases}>
				<Formik
					initialValues={{
						templatePhrases: templatePhrases
					}}
					onSubmit={(values) => updateDialogsSettings(values)}
				>
					{({ values }) => (
						<Form className={s.phrasesForm}>
							<FieldArray name="templatePhrases">
								{(fieldArrayProps) => {
									const { push, remove, form } = fieldArrayProps
									const { values } = form
									const { templatePhrases } = values
									return (
										<div>
											<label className={s.text}>Готовые фразы:</label>
											<Button onClick={() => push('')} className={s.addButton}>
												Добавить фразу
											</Button>
											{templatePhrases &&
												templatePhrases.map((phrase, index) => (
													<div className={s.phrase} key={index}>
														<Field
															name={`templatePhrases[${index}]`}
															value={phrase}
														>
															{({ field }) => (
																<>
																	<InputGroup>
																		<Input {...field} />
																		<Button onClick={() => remove(index)}>
																			Удалить
																		</Button>
																	</InputGroup>
																</>
															)}
														</Field>
													</div>
												))}
										</div>
									)
								}}
							</FieldArray>
							<Button type="submit">Обновить настройки</Button>
						</Form>
					)}
				</Formik>
			</div>
		</>
	)
}

export default DialogsSettings
