// Ui della scheda Home che contiene i form per l'url e il tipo di ricevuta

import { Row, Container, Col } from "react-bootstrap";
import MyForm from "./myForm/myForm";

const Home = ({funzione}) => (
	<Container fluid className='bg-info'>
		<Row className='d-flex justify-content-center'>
			<Col xxl={2} xs={8}>
				<p className='fs-1 ms-4 mt-2'>
					Impostazioni
				</p>
			</Col>
		</Row>
		<Row className='d-flex justify-content-center'>
			<Col xxl={4} xs={9}>
				<MyForm funzione={funzione}/>
			</Col>
		</Row>
	</Container>
)

export default Home;