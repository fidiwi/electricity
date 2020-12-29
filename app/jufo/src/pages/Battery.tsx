import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';

const Battery: React.FC = () => {

    const [hausmodell, sethausmodell] = useState<string>("Reihenhaus");
  
    return (
      <IonPage>
          <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/dashboard" />
            </IonButtons>
            <IonTitle>Stromspeicher</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <h1>moin</h1>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Battery;