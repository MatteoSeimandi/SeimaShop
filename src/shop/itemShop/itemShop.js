// oggetto lista per l'elenco dei prodotti

import { ListGroupItem } from "react-bootstrap";

const ItemShop = ({chiave, funzione, prodotto}) => (

	// eslint-disable-next-line
	<ListGroupItem key={chiave} variant='info' onClick={funzione} className='text-center'>
		<p className='fs-4 my-0'>
			{prodotto}
		</p>
	</ListGroupItem>
)

export default ItemShop;