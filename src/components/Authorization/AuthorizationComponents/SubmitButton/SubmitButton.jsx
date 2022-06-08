import React from 'react'
import { Button } from 'reactstrap'

import s from './submitButton.module.scss'

const SubmitButton = ({ handleClick, text }) => {
	return (
		<Button
			onClick={handleClick}
			className={s.button}
			block
			color="primary"
			size="lg"
			type="submit"
		>
			{text}
		</Button>
	)
}

export default SubmitButton
