import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Company: React.FC = () => {
    return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
          <IonButtons slot="start">
              <IonBackButton defaultHref="/dashboard" />
            </IonButtons>
            <IonTitle>Firmenansicht</IonTitle>
          </IonToolbar>
        </IonHeader>
            <IonContent fullscreen>
                <h1>moin</h1>
            </IonContent>
        </IonPage>
        );
};

export default Company;