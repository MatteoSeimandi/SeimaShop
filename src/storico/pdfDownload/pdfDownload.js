// link per il download delle ricevute

import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDoc from './pdfDoc/pdfDoc';

const PdfDownload = ({data, testo}) => (
	<PDFDownloadLink document={<PdfDoc documento={data} />} fileName="Spesa.pdf">
   	{({ blob, url, loading, error }) =>
      	loading ? 'Attendi...' : testo
 		}
  </PDFDownloadLink>
);

export default PdfDownload