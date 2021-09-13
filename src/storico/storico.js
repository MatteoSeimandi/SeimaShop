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
		setRegistro([]);
		setScon(1);
		setFat(1);
		alert('Storico Cancellato');
	}

	return(
		<Container className='bg-info' fluid>
			<Row className='d-flex justify-content-center'>
				<Col xxl={1}>
					<p className='fs-1 mt-2'> Storico </p>
				</Col>
			</Row>
			<Row xxl={10} className='d-flex justify-content-center overflow-auto mb-3' style={{height: '500px'}} >
				<Col xxl={5}  className='text-center bg-primary'>
					<ListStorico registro={reg}/>
				</Col>
			</Row>
			<Row>
				<Col className='d-flex justify-content-end px-0' xxl={5} xs={4}>
					<Button size='lg' variant='outline-danger' onClick={deleteStorico} disabled={disable}>
						<i className="bi bi-bag-dash"></i>
						{'\t'}
						Cancella
					</Button>
				</Col>
				<Col className='d-flex justify-content-center px-0' xxl={2} xs={4}>
					<Button size='lg' variant='outline-primary' disabled={disable}>
						<i className="bi bi-download"></i>
						{'\t'}
						<PdfDownload data={reg} testo='Stampa' />
					</Button >
				</Col>
				<Col className='d-flex justify-content-start px-0' xxl={5} xs={4}>
					<FormEmail data={reg} disable={disable} testo='Invia' />
				</Col>
			</Row>


		</Container>
	)
}

export default Storico;