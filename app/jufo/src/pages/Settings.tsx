import React, { useState } from 'react';
import { IonContent, IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption, IonPage, IonItemDivider, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

const Settings: React.FC = () => {

  const [hausmodell, sethausmodell] = useState<string>("Reihenhaus");
  const [grundstück1, sethausmodell1] = useState<string>("Apartment");
  const [grundstück2, sethausmodell2] = useState<string>("Reihenhaus");
  const [grundstück3, sethausmodell3] = useState<string>("Reihenhaus");
  const [grundstück4, sethausmodell4] = useState<string>("Einfamilienhaus");
  const [grundstück5, sethausmodell5] = useState<string>("Mehrfamilienhaus");


  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>Einstellungen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>
              Haustyp auswählen
            </IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>Aktuelles Grundstück:</IonLabel>
            <IonSelect value={hausmodell} okText="Okay" cancelText="Cancel" onIonChange={e => sethausmodell(e.detail.value)}>
              <IonSelectOption value="Reihenhaus">Reihenhaus</IonSelectOption>
              <IonSelectOption value="Mehrfamilienhaus">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="Einfamilienhaus">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem><IonLabel>Die Grundstücke manuell auswählen</IonLabel></IonItem>
          <IonItem>
            <IonLabel>Grundstück 1:</IonLabel>
            <IonSelect value={grundstück1} okText="Okay" cancelText="Cancel" onIonChange={e => sethausmodell1(e.detail.value)}>
              <IonSelectOption value="Reihenhaus">Reihenhaus</IonSelectOption>
              <IonSelectOption value="Mehrfamilienhaus">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="Einfamilienhaus">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 2:</IonLabel>
            <IonSelect value={grundstück2} okText="Okay" cancelText="Cancel" onIonChange={e => sethausmodell2(e.detail.value)}>
              <IonSelectOption value="Reihenhaus">Reihenhaus</IonSelectOption>
              <IonSelectOption value="Mehrfamilienhaus">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="Einfamilienhaus">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 3:</IonLabel>
            <IonSelect value={grundstück3} okText="Okay" cancelText="Cancel" onIonChange={e => sethausmodell3(e.detail.value)}>
              <IonSelectOption value="Reihenhaus">Reihenhaus</IonSelectOption>
              <IonSelectOption value="Mehrfamilienhaus">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="Einfamilienhaus">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 4:</IonLabel>
            <IonSelect value={grundstück4} okText="Okay" cancelText="Cancel" onIonChange={e => sethausmodell4(e.detail.value)}>
              <IonSelectOption value="Reihenhaus">Reihenhaus</IonSelectOption>
              <IonSelectOption value="Mehrfamilienhaus">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="Einfamilienhaus">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 5:</IonLabel>
            <IonSelect value={grundstück5} okText="Okay" cancelText="Cancel" onIonChange={e => sethausmodell5(e.detail.value)}>
              <IonSelectOption value="Reihenhaus">Reihenhaus</IonSelectOption>
              <IonSelectOption value="Mehrfamilienhaus">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="Einfamilienhaus">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem><IonLabel>Unsere Siedlung ist aus Apartment, Reihenhaus,</IonLabel></IonItem>
          <IonItem><IonLabel>Reihenhaus, Einfamilienhaus, Mehrfamilienhaus</IonLabel></IonItem>
        </IonList>        
      </IonContent>
    </IonPage>
  );
};

export default Settings;