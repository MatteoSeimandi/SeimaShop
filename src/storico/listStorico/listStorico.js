// lista storico per tutti gli scontrini e fatture

import { useEffect, useState } from 'react';
import { ListGroup, Accordion, Button } from 'react-bootstrap';
import FormEmail from '../formEmail/formEmail';
import PdfDownload from '../pdfDownload/pdfDownload';

const ListStorico = ({registro}) => {
	let [data, setData] = useState(registro);
	useEffect( () => setData(registro), [registro]);

	return(
		<>
		{
			data.length !== 0 ?
				<ListGroup variant='flush' >
					<Accordion flush>
						{
							data.map( (item, index) => {
								return <ListGroup.Item eventKey={index} variant='info'>
											<Accordion.Item eventKey={index}>
												<Accordion.Header>
													<p className='fs-4 m-0'>{item.tipo} #{item.id} </p>
												</Accordion.Header>
												<Accordion.Body className='text-start bg-white'>
													<p className='text-dark fs-4 m-1'> Data: { item.data } </p>
													<p className='text-dark fs-4 m-1'> Ora: { item.ora } </p>
													<p className='text-dark fs-4 m-1'> Totale: { item.totale } </p>
													<p className='text-dark fs-4 m-1'> ---------Spesa--------- </p>
													<ol>
														{
															item.spesa.map( (oggetto, indice) => {
																return <li key={indice} className='text-dark fs-5 m-1'> {oggetto.nome} x {oggetto.quantita} </li>
															})
													}
													</ol>
													<Button size='lg' variant='outline-success' className='mx-3'>
														<i className="bi bi-download"></i>
														{'\t'}
														<PdfDownload data={[item]} testo='Stampa' />
													</Button>
														<FormEmail data={[item]} disable={false} testo='Invia' />
												</Accordion.Body>
											</Accordion.Item>
										</ListGroup.Item>
							})
						}
					</Accordion>
				</ListGroup>
			:
			<p className='fs-1 ms-3'>
				Lo storico e' vuoto
			</p>

		}
		</>
	)
}

export default ListStorico;