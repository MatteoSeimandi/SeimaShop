// file principale che funge da root e contenitore di variabili globali

import { useState } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import Testata from './testata/testata.js';
import Home from './home/home.js';
import Shop from './shop/shop.js';
import Storico from './storico/storico.js';

const Main = () => {
	let [doc, setDoc] = useState('Scontrino');	// gloabal var che indica se scelgo scontrino o fattura
	let [registro, setRegistro] = useState([]);	// registro storico di scontrini e fatture
	let [numScontrini, setNumScontrini] = useState(1);	// numero del scontirno in corso
	let [numFatture, setNumFatture] = useState(1);

	return(
		<Container fluid className='bg-primary'>
			<Testata />
			<Tabs defaultActiveKey="home" className="justify-content-center nav-fill bg-info rounded-3">
				<Tab
					eventKey="home"
					title={
						<p className='fs-3'>
							<i className="bi bi-house"></i>
							{'\t'}
							Home
						</p>
					}
				>
					<Home funzione={setDoc}/>
				</Tab>
				<Tab
					eventKey="shop"
					title={
						<p className='fs-3'>
							<i className="bi bi-handbag"></i>
							{'\t'}
							Shop
						</p>
					}
				>
					<Shop
						tipo={doc}
						setReg={setRegistro}
						nScon={numScontrini}
						setScon={setNumScontrini}
						nFat={numFatture}
						setFat={setNumFatture}
					/>
				</Tab>
				<Tab
					eventKey="Storico"
					title={
						<p className='fs-3'>
							<i className="bi bi-clipboard-check"></i>
							{'\t'}
							Storico
						</p>
					}
				>
					<Storico
						registro={registro}
						setRegistro={setRegistro}
						setScon={setNumScontrini}
						setFat={setNumFatture}
					/>
				</Tab>
			</Tabs>
		</Container>
	)
}

export default Main;