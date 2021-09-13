// Componente per la generazione del messaggio email

const MailDoc = ({data}) => (
	<div>
		{
			data && data.map( (item, index) => (
				<div>
					<h2>{item.tipo} #{item.id}</h2>
					<h3>Data: {item.data}</h3>
					<h3>Ora: {item.ora}</h3>
					<h3>--------SPESA--------</h3>
					{
						item.spesa && item.spesa.map( (articolo, indice) =>
							<h4 key={indice}>{indice + 1}. {articolo.nome} x {articolo.quantita} [ {articolo.totale} ]</h4>
						)
					}
					<h3>Totale: {item.totale}</h3>
				</div>
			))
		}
		</div>
)

export default MailDoc;