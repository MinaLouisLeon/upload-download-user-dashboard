import { IonButton } from '@ionic/react';
import './Mmodal.css';
const Mmodal = ({handleClose,show,children}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none"
    return(
        <div className={showHideClassName}>
            <section className='modal-main br4 shadow-2'>
                {children}
                <div className='tr ma2'>
                <IonButton size='small' color="danger" onClick={handleClose}>Close</IonButton>
                </div>
            </section>
        </div>
    )
}

export default Mmodal;