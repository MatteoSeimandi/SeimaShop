// UI per la scheda dello storico

import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ListStorico from './listStorico/listStorico';
import PdfDownload from "./pdfDownload/pdfDownload";
import FormEmail from "./formEmail/formEmail";

const Storico = ({registro, setRegistro ,setScon, setFat}) => {
	let [reg, setReg] = useState(registro);
	let [disable, setDisable] = useState(true);

	useEffect( () => setReg(registro), [registro]);
	useEffect( () => {
		if ( reg.length !== 0 )
			setDisable(false);
		else
			setDisable(true);
	}, [reg]);

	let deleteStorico = () => {
		if (window.confirm('Vuoi cancellare tutto lo storico?')) {
			setRegistro([]);
			setScon(1);
			setFat(1);
			alert('Storico Cancellato');
		}
	}

	return(
		<Container className='bg-info' fluid>
			<Row className='d-flex justify-content-center'>
				<Col xxl={1}>
					<p className='fs-1 mt-2'> Storico </p>
				</Col>
			</Row>
			<Row xxl={10} className='d-flex justify-content-center overflow-auto mb-3' style={{height: '600px'}} >
				<Col xxl={5}  className='text-center bg-white p-0 rounded'>
					<ListStorico registro={reg}/>
				</Col>
			</Row>
			<Row className='mb-3'>
				<Col className='d-flex justify-content-end px-0 mb-2' xxl={5} xs={4}>
					<Button size='lg' variant='outline-danger' className='px-md-3 p-2' onClick={deleteStorico} disabled={disable}>
						<i className="bi bi-bag-dash"></i>
						{'\t'}
						Cancella
					</Button>
				</Col>
				<Col className='d-flex justify-content-center px-0 mb-2' xxl={2} xs={4}>
					<Button size='lg' variant='outline-success' className='px-md-3 p-2' disabled={disable}>
						<i className="bi bi-download"></i>
						{'\t'}
						<PdfDownload data={reg} testo='Stampa' />
					</Button >
				</Col>
				<Col className='d-flex justify-content-start px-0 mb-2' xxl={5} xs={4}>
					<FormEmail data={reg} disable={disable} testo='Invia' />
				</Col>
			</Row>
		</Container>
	)
}

export default Storico;