// form per il tipo di ricevuta da effettuare

import { Form, Col, Row } from "react-bootstrap";

const FormIva = ({cliccato}) => (
	<>
		{
			cliccato === false ?
				<Form>
					<Row className='justify-content-center'>
						<Col xxl={10}>
							<Form.Group className='mb-3'>
								<Form.Label>
									<p className='fs-4 my-0'>
										Partitita IVA
									</p>
								</Form.Label>
								<Form.Control size='lg' placeholder="IVA" required/>
							</Form.Group>
						</Col>
						<Col xxl={10}>
							<Form.Group className='mb-3'>
								<Form.Label>
									<p className='fs-4 my-0'>
										Nominativo
									</p>
								</Form.Label>
								<Form.Control size='lg' placeholder="Nome" required/>
							</Form.Group>
						</Col>
					</Row>
				</Form> : null
		}
	</>
)


export default FormIva;