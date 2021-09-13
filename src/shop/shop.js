// Ui per la scheda dello shop

import { useEffect, useState } from "react";
import { Container , Row, Col, Figure, ListGroup , Button, Modal} from "react-bootstrap";
import ItemShop from "./itemShop/itemShop";

const Shop = ({tipo, setReg, nScon, setScon ,nFat, setFat}) => {
	let url = 'https://raw.githubusercontent.com/icobasco/sample_data_files/master/scontrino_json';
	let [carrello, setCarrello] = useState([]);		// carrello
	let [id, setId] = useState(0);			// numero di articoli nel carrello
	let [data, setData] = useState([]);		// risposta JSON
	let [src, setSrc] = useState( url + '/img/8000500227848.png');		// immagine sorgente
	let [name, setName] = useState('Nutella B-ready 6 x 22 g');			// nome del prodotto in focus
	let [quantita, setQuantita] = useState(0);		// quantita da acquistare
	let [max, setMax] = useState(120);			// quantita massima per articolo
	let [btnPlus, setBtnPlus] = useState(false);		// controllo sul bottone +
	let [btnMinus, setBtnMinus] = useState(false);	// controllo sul bottone -
	let [prezzo, setPrezzo] = useState('1.67');		// prezzo unitario
	let [tot, setTot] = useState('0');			// prezzo totale
	let [disable, setDisable] = useState(true);		// controllo bottone elimina
	let [totale, setTotale] = useState(0);				// totale della ricevuta
	let [doc, setDoc] = useState(tipo);		// tipo di documento
	let [numDoc, setNumDoc] = useState(1);				// numero attuale della ricevuta
	let [numScontrini, setNumScontrini] = useState(nScon);	// numero dello scontrino in corso
	let [numFatture, setNumFatture] = useState(nFat);
	let [showUpdate, setShowUpdate] = useState(false);
	let [showAdd, setShowAdd] = useState(false);

	// aggiorno il tipo quando cambiano le props
	useEffect( () => setNumScontrini(nScon), [nScon]); // eslint-disable-next-line
	useEffect( () => setWhichNumber(), [numScontrini]);
	useEffect( () => setNumFatture(nFat), [nFat]);  // eslint-disable-next-line
	useEffect( () => setWhichNumber(), [numFatture]);

	useEffect(() => {
		setDoc(tipo);
		setWhichNumber(); // eslint-disable-next-line
	}, [tipo]);

	let setWhichNumber = () => tipo === 'Scontrino' ? setNumDoc(numScontrini) : setNumDoc(numFatture);

	let load = () => {
		fetch( url + '/magazzino_negozio.json')
		.then(res => res.json())
		.then(res => setData(res))
	};

	// aggiorna il prezzo totale dell'articolo
	let updateToT = () => setTot(
		Math.round(
			parseFloat(prezzo.replace(/,/, '.')) * parseFloat(quantita) * 100
		) / 100
	);

	// cambia le info del prodotto sullo schermo
	let changeItem = (index) => {
		setSrc( url + '/img/' + data[index].codice_ean +'.png');
		setQuantita(0);
		setMax(data[index].quantita);
		setPrezzo(data[index].prezzo_unitario);
		setName(data[index].prodotto);
		setTot(0);
	};

	let increase = () => {
		if ( quantita > max-1) {
			setBtnPlus(true);
		} else {
			setBtnMinus(false);
			setQuantita( quantita += 1 );
		}
		updateToT();
	}

	let decrease = () => {
		if ( quantita <= 1) {
			setBtnMinus(true);
		} else {
			setBtnPlus(false);
			setQuantita( quantita -= 1 );
		}
		updateToT();
	}

	// abilita o disabilita i pulsanti per le ricevute
	let deleteControl = () => {
		if ( id < 1 )
			setDisable(true);
		else
			setDisable(false);
	}

	// aggiunge un prodotto al carrello
	let addItem = () => {
		setCarrello( prev => [...prev, {
			'id': id,
			'nome': name,
			'quantita': quantita,
			'totale': tot
		}]);
		setTotale(totale += tot);
		setShowAdd(true);
		setId(id += 1);
		deleteControl();
	}

	// rimuove un prodotto dal cancello
	let deleteItem = () => {
		let number = parseInt(prompt('numero'));
		let vettore = [];
		vettore = carrello;
		vettore.map( value => {
			if ( value.id === number ) {
				vettore.splice(value, 1);
				alert('Articolo n° ' + id + ' rimosso!');
				setId(id -= 1);
				setTotale(totale += value.tot);
				setCarrello( vettore );
				deleteControl();
			}
			return null;
		})
	}

	// valida il carrello per una ricevuta
	let update = () => {
		setWhichNumber();
		let vettore = {
			'tipo': tipo,
			'id': numDoc,
			'data': new Date().toLocaleDateString(),
			'ora': new Date().toLocaleTimeString(),
			'totale': totale,
			'spesa': carrello
		};

		setReg(prev => [...prev, vettore]);
		setCarrello([]);
		setDisable(true);
		tipo === 'Scontrino' ? setScon(numScontrini += 1) : setFat(prev => prev += 1);
		setTotale(0);
		setId(0);
		setShowUpdate(true);
	}

	let deleteAll = () => {
		if (window.confirm('Vuoi annullare il carrello?')) {
			setCarrello([]);
			setDisable(true);
			setTotale(0);
			setId(0);
		}
	}

	return(
		<>
			<Modal show={showUpdate} onHide={() => setShowUpdate(false)}>
				<Modal.Header closeButton>
					<p className='fs-4 my-1'>
						<i className="bi bi-check2-square fs-3"></i>
						{'\t'}
						Operazione Riuscita
					</p>
				</Modal.Header>
				<Modal.Body>
					<p className='fs-3 my-1 text-center'>
						Ricevuta Effettuata!
					</p>
				</Modal.Body>
			</Modal>
			<Modal show={showAdd} onHide={() => setShowAdd(false)}>
				<Modal.Header closeButton>
					<p className='fs-4 my-1'>
						<i className="bi bi-check2-square fs-3"></i>
						{'\t'}
						Operazione Riuscita
					</p>
				</Modal.Header>
				<Modal.Body>
					<p className='fs-3 my-1 text-center'>
						Articolo n° {id} aggiunto al carrello!
					</p>
				</Modal.Body>
			</Modal>
			<Container className='bg-info' fluid>
				<Row className='d-flex justify-content-center'>
					<Col xxl={2} xl={4} xs={3} className='d-flex justify-content-center align-items-center'>
						<p className='fs-3 ms-4 my-2 mb-4 px-2 text-center bg-white rounded-pill'>
							{doc} n° {numDoc}
						</p>
					</Col>
					<Col xxl={2} xl={4} xs={5} className='d-flex justify-content-center align-items-center'>
						<p className='fs-1 ms-4 my-2 mb-4 text-center'>
							Shop
						</p>
					</Col>
					<Col xxl={2} xl={4} xs={4} className='d-flex justify-content-center align-items-center'>
						<p className='fs-2 ms-4 my-2 mb-4 px-2 text-center bg-white rounded-pill'>
							<i className="bi bi-cart-check fs-1"></i>
							{'\t'}
							{id}
						</p>
					</Col>
				</Row>
				<Row className='d-flex justify-content-center' xxl={0}>
					<Col className='mx-5 bg-info' xxl={3} >
						<Row>
							<Col className='d-flex justify-content-center'>
								<Figure>
									<Figure.Image width={300} height={300} src={src} />
								</Figure>
							</Col>
						</Row>
						<Row className='mb-2'>
							<Col className='d-flex justify-content-end'>
								<Button variant='outline-primary' disabled={btnPlus} onClick={increase}>
									<i className="bi bi-caret-up fs-5"></i>
								</Button>
							</Col>
							<Col className='d-flex justify-content-center'>
								<p className='fs-3 p-0 px-2 text-center m-0 bg-white rounded-pill w-50'>
									{quantita}
								</p>
							</Col>
							<Col className='d-flex justify-content-start'>
								<Button variant='outline-primary' disabled={btnMinus} onClick={decrease} >
									<i className="bi bi-caret-down fs-5"></i>
								</Button>
							</Col>
						</Row>
						<Row className='my-2'>
							<Col className='d-flex justify-content-center'>
								<p className='fs-3 px-2 text-center m-0 bg-white rounded-pill w-50'>
									€ {prezzo}
								</p>
							</Col>
							<Col className='d-flex justify-content-center'>
								<p className='fs-3 px-2 text-center m-0 bg-white rounded-pill w-50'>
									€ {tot}
								</p>
							</Col>
						</Row>
						<Row>
							<Col className='d-flex justify-content-center m-1'>
								<Button size='lg' variant='outline-primary' className='p-2 p-md-2' onClick={addItem}>
									<i className="bi bi-check-lg fs-6"></i>
									{'\t'}
									AGGIUNGI
								</Button>
							</Col>
							<Col className='d-flex justify-content-center m-1'>
								<Button size='lg' variant='outline-danger' className='p-2 p-md-2' onClick={deleteItem} disabled={disable}>
									<i className="bi bi-x-lg fs-6"></i>
									{'\t'}
									ELIMINA
								</Button>
							</Col>
						</Row>
						<Row className='mb-2'>
							<Col className='d-flex justify-content-center m-1'>
								<Button size='lg' variant='outline-success' className='p-2 p-md-2'  onClick={update} disabled={disable}>
									<i className="bi bi-bag-check"></i>
									{'\t'}
									VALIDA
								</Button>
							</Col>
							<Col className='d-flex justify-content-center m-1'>
								<Button size='lg' variant='outline-danger' className='p-2 p-md-2' onClick={deleteAll} disabled={disable}>
									<i className="bi bi-bag-dash"></i>
									{'\t'}
									ANNULLA
								</Button>
							</Col>
						</Row>
					</Col>
					<Col className=' overflow-auto mx-5' xxl={3} style={{height: '500px'}}>
						<ListGroup variant='flush'>
							{load()}
							{data.map((item, index) =>
								<ItemShop chiave={index} funzione={() => changeItem(index)} prodotto={item.prodotto} />
							)}
						</ListGroup>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Shop;