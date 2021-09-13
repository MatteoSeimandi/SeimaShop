// componente dell form per l'url di sorgente

import { useState } from "react";
import { Form, Col } from "react-bootstrap";

const FormUrl = () => {
	let [auto, setAuto] = useState(false);
	let click = () => setAuto(!auto);

	return(
		<>
			{
				auto === true ?
				<Form.Group className='mb-3'>
					<Form.Label>
						<p className='fs-4 my-0'>
							URL Sorgente
						</p>
					</Form.Label>
					<Form.Control size='lg' placeholder="URL" required disabled/>	{/* url disabilitato */}
				</Form.Group>
				:
				<Form.Group className='mb-3'>
				<Form.Label>
					<p className='fs-4 my-0'>
						URL Sorgente
					</p>
				</Form.Label>
					<Form.Control size='lg' placeholder="URL" required/>		{/* url abilitato */}
				</Form.Group>
			}

			<Form.Group className='mb-4'>
				<Form.Check
					type='checkbox'
					className='m-0'
					label={
						<p className='fs-4'>
							Automatico
						</p>
					}
					onClick={click}/>
			</Form.Group>
		</>
	)
}

export default FormUrl;