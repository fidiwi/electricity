import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const ModelManipulation: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons>
                    <IonBackButton defaultHref="/dashboard"/>
                </IonButtons>
                <IonTitle>
                    Modelleinstellungen
                </IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <h1>moin</h1>
            </IonContent>
        </IonPage>
        );
};

export default ModelManipulation;