import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Settings: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons>
                    <IonBackButton defaultHref="/dashboard"/>
                </IonButtons>
                <IonTitle>
                So ein geiles Haus
                </IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <h1>moin</h1>
            </IonContent>
        </IonPage>
        );
};

export default Settings;