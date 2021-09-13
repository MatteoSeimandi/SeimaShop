// form principale della scheda Home

import { useState } from "react";
import { InputGroup , Form, Col } from "react-bootstrap";
import FormIva from "../formIva/formIva";
import FormUrl from "../formUrl/formUrl";
import './myForm.css';

const MyForm = ({funzione}) => {
	let [label, setLabel ] = useState('Scontrino');
	let [clicked, setClicked ] = useState(true);

	let click = () => {
		if ( clicked === false) {
			setLabel('Scontrino');
			funzione('Scontrino')
		} else {
			setLabel('Fattura');
			funzione('Fattura');
		}
		setClicked(!clicked);
	}

	return (
		<InputGroup hasValidation className='d-flex justify-content-center'>
			<Col xxl={5} className='d-flex justify-content-center'>
				<Form.Check type='switch' label={<p className='fs-3'> {label} </p>} onClick={click}/>
			</Col>
			<FormIva cliccato={clicked} />
			<Col xxl={10} xs={12} className='justify-content-center'>
				<FormUrl />
			</Col>
		</InputGroup>
	)
}

export default MyForm;