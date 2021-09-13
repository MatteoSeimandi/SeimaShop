// componente header contenente l'orario e la data di sistema e il logo dello shop

import { useState , useEffect} from 'react';
import { Row, Col, Figure } from 'react-bootstrap';
import img from '../img/logo.png';

const Testata = () => {
	let [ora, setOra] = useState(new Date().toLocaleTimeString());
	let [data, setData] = useState(new Date().toLocaleDateString());

	let clock = () => {
		setOra(new Date().toLocaleTimeString());
		setData(new Date().toLocaleDateString());
	}

	useEffect( () => {
		var id = setInterval(clock, 1000);
		return function cleanup() { clearInterval(id); }
	}, [])

	return (
		<Row>
			<Col className='d-flex justify-content-center' xxl={6} xs={12}>
				<Col className='d-flex align-items-center justify-content-start' sm={8}>
					<Figure className='m-0 mx-3'>
						<Figure.Image width={77} height={77} src={img} />
					</Figure>
					<p className='m-1 fs-1 p-2 rounded-pill bg-info text-center'>
						SEIMA SHOP
					</p>
				</Col>
			</Col>
			<Col className='d-flex justify-content-end ' xxl={6} xs={12}>
				<Col className='m-0 d-flex align-items-center justify-content-center' xxl={3} xs={6}>
					<p className='m-1 mt-2 fs-3 p-2 px-3 rounded-pill bg-info text-center'>
						<i className="bi bi-clock"></i>
						{'\t'}
						{ora}
					</p>
				</Col>
				<Col className='m-0 d-flex align-items-center justify-content-center' xxl={3} xs={6}>
					<p className='m-1 mt-2 fs-3 p-2 px-3 rounded-pill bg-info text-center'>
						<i className="bi bi-calendar"></i>
						{'\t'}
						{data}
					</p>
				</Col>
			</Col>
		</Row>
	)
}

export default Testata;