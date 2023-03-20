import icon from '../../assets/img/notification-icon.svg'
import './styles.css'
import axios from 'Axios';
import { BASE_URL } from '../../utils/request';

//Atributo que será necessário
type Props = {
    saleId: number;
}

function handleClick(id :number){
    axios(`${BASE_URL}/sales/${id}/notification`)
        .then(response => {
            console.log('sucesso!')
    });
}

function NotificationButton( {saleId} : Props ) { //Passando uma prop para o componente

    return (
            <div className="dsmeta-red-btn" onClick={() => handleClick(saleId)}>
                <img src={icon} alt="Notificar" />
            </div>
    )
  }
  
  export default NotificationButton
  