import NotificationButton from '../NotificationButton'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './styles.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/request';
import { Sale } from '../../models/sale';

function SalesCard() {

const min = new Date(new Date().setDate(new Date().getDate() - 365));
const max = new Date(); 

//Declaração de um estado/dado composto
//Dado e função que vai mudar o dado
 const [minDate, setMinDate] = useState(min); //Dado <-> função = useState
 const [maxDate, setMaxDate] = useState(max); //Dado <-> função = useState

 //UseState tipado, sendo uma lista de sabe
const [sales, setSales] = useState<Sale[]>([]);

 useEffect(() => {
  const dmin = minDate.toISOString().slice(0, 10);
  const dmax = maxDate.toISOString().slice(0, 10);

  axios.get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`).then(response => {
    setSales(response.data.content);
  })
 }, [minDate, maxDate]) //Coloca para rodar de novo, assim que um desses dados muda

  return (
    <div className="dsmeta-card">
    <h2 className="dsmeta-sales-title">Vendas</h2>
    <div>
      <div className="dsmeta-form-control-container">
        <DatePicker
            selected={minDate}
            // Ao alterar a data, a função captura o valor para mudar o dado, 
            // e como consequência mudar o visual do componente
            onChange={(date: Date) => {setMinDate(date)}} 
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
            />
      </div>
      <div className="dsmeta-form-control-container">
      <DatePicker
            selected={maxDate}
            onChange={(date: Date) => {setMaxDate(date)}}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
            />
      </div>
    </div>

    <div>
      <table className="dsmeta-sales-table">
        <thead>
          <tr>
            <th className="show992">ID</th>
            <th className="show576">Data</th>
            <th>Vendedor</th>
            <th className="show992">Visitas</th>
            <th className="show992">Vendas</th>
            <th>Total</th>
            <th>Notificar</th>
          </tr>
        </thead>
        <tbody>
          {
            sales.map(sale => {
              return (
                    <tr key={sale.id}>
                      <td className="show992">{sale.id}</td>
                      <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                      <td>{sale.sellerName}</td>
                      <td className="show992">{sale.visited}</td>
                      <td className="show992">{sale.deals}</td>
                      <td>R$ {sale.amount.toFixed(2)}</td>
                      <td>
                        <div className="dsmeta-red-btn-container">
                          <NotificationButton />
                        </div>
                      </td>
                    </tr>
              )
            })
          }
          
        </tbody>

      </table>
    </div>

  </div>
  )
}

export default SalesCard

