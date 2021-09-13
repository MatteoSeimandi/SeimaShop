// Form per l'email del destinatario

import { renderToStaticMarkup } from 'react-dom/server';
import { useState, useEffect } from 'react';
import { Modal, InputGroup, Form, Button } from 'react-bootstrap';
import emailjs, { init } from 'emailjs-com';
import MailDoc from './mailDoc/mailDoc';

const FormEmail = ({data, disable, testo}) => {
	let [ricevuta, setRicevuta] = useState(data);	// ricevute da inviare
	let [show, setShow] = useState(false);		// stato del modal
	let [email, setEmail] = useState('');		// email del destinatario
	useEffect( () => setRicevuta(data), [data]);
	let mex = renderToStaticMarkup(<MailDoc data={ricevuta} />);
	let [stato, setStato] = useState(disable);
	useEffect( () => setStato(disable), [disable])

	let sendEmail = e => {
		init("user_fLIjlW3q18H0Pq6nKCgXz");
		e.preventDefault();

		emailjs.send('service_gmail', 'template_tpsi', { message: mex, email: email} ,'user_fLIjlW3q18H0Pq6nKCgXz')
		.then( (result) => {
			console.log(result.text);
		}, (error) => {
			console.log(error.text);
		});
	}

	return(
		<>
			<Button size='lg' variant='outline-primary' onClick={() => setShow(true)} disabled={stato} >
				<i className="bi bi-share"></i>
				{'\t'}
				{testo}
			</Button>
			<Modal
				size="lg"
      		show={show}
       		onHide={() => setShow(false)}
       		aria-labelledby="example-modal-sizes-title-lg"
   	   >
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						Large Modal
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={sendEmail} noValidate>
						<InputGroup hasValidation >
							<InputGroup.Text>@</InputGroup.Text>
							<Form.Control type="text" required onChange={ e => setEmail(e.target.value)} />
							<Form.Control.Feedback type="invalid">
								Scrivi un'email
							</Form.Control.Feedback>
							<Button type='submit'>Invia</Button>
						</InputGroup>
					</form>
				</Modal.Body>
      	</Modal>
		</>
	)
}

export default FormEmail;