import { IonButton } from "@ionic/react";
import { isMobile } from "mobile-device-detect";
import "./Mmodal.css";
const Mmodal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const viewWidth = isMobile ? "90%" : "auto";
  return (
    <div className={showHideClassName}>
      <section
        className="modal-main br4 shadow-2"
        style={{ width: { viewWidth } }}
      >
        {children}
        <div className="tr ma2">
          <IonButton size="small" color="danger" onClick={handleClose}>
            Close
          </IonButton>
        </div>
      </section>
    </div>
  );
};

export default Mmodal;
