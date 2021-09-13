// componente per la generazione del documento pdf

import { Document, Page, View, Text } from '@react-pdf/renderer';

const PdfDoc = ({documento}) => (
	<Document>
		{
			documento.map( (ogg, indice) => (
				<Page size='A4'>
					<View>
						<Text style={{textAlign: 'center', fontSize: 25, padding: 10}}>
							SEIMA SHOP
						</Text>
						<Text style={{ fontSize: 20,  padding: 5}}>
							Ora: {ogg.ora}
						</Text>
						<Text style={{ fontSize: 20,  padding: 5}}>
							Data: {ogg.data}
						</Text>
						<Text style={{ textAlign: 'center',  padding: 10, fontSize: 20}}>
							{ogg.tipo} #{ogg.id}
						</Text>
						<Text style={{ textAlign: 'center', fontSize: 20, padding: 7}}>
							--------------------------- Spesa --------------------------
						</Text>
							{
								ogg.spesa.map( (item, index) =>
									<Text style={{fontSize: 18, padding: 4, marginLeft: 20}}>
										{index + 1}. {item.nome} x {item.quantita} [ {item.totale} ]
									</Text>
								)
							}
						<Text style={{ textAlign: 'center', padding: 10}}>
							---------------------------------------------------------------------
						</Text>
						<Text style={{ fontSize: 20, padding: 10}}>
							Totale: {ogg.totale}
						</Text>
					</View>
				</Page>
			))
		}
	</Document>
)

export default PdfDoc;