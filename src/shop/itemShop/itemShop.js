// oggetto lista per l'elenco dei prodotti

import { ListGroupItem } from "react-bootstrap";

const ItemShop = ({chiave, funzione, prodotto}) => (

	// eslint-disable-next-line
	<ListGroupItem key={chiave} variant='info' onClick={funzione} className='text-center'>
		{prodotto}
	</ListGroupItem>
)

export default ItemShop;