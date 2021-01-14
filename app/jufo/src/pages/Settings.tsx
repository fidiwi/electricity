import React, { useState } from 'react';
import { IonContent, IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption, IonPage, IonItemDivider, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

const Settings: React.FC = () => {

  const [hausmodell, sethausmodell] = useState<string>("Reihenhaus");

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
            <IonLabel>Aktueller Haustyp:</IonLabel>
            <IonSelect value={hausmodell} okText="Okay" cancelText="Cancel" onIonChange={e => sethausmodell(e.detail.value)}>
              <IonSelectOption value="Reihenhaus">Reihenhaus</IonSelectOption>
              <IonSelectOption value="Mehrfamilienhaus">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="Einfamilienhaus">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItemDivider>Aktuelle Auswahl</IonItemDivider>
          <IonItem>Aktueller Haustyp: {hausmodell}</IonItem>
          <IonItem><IonLabel>Die Grundstücke manuell auswählen</IonLabel></IonItem>
          <IonItem>
            <IonLabel>Grundstück 1:</IonLabel>
            <IonSelect value={hausmodell} okText="Okay" cancelText="Cancel" onIonChange={e => sethausmodell(e.detail.value)}>
              <IonSelectOption value="Reihenhaus">Reihenhaus</IonSelectOption>
              <IonSelectOption value="Mehrfamilienhaus">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="Einfamilienhaus">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 2:</IonLabel>
            <IonSelect value={hausmodell} okText="Okay" cancelText="Cancel" onIonChange={e => sethausmodell(e.detail.value)}>
              <IonSelectOption value="Reihenhaus">Reihenhaus</IonSelectOption>
              <IonSelectOption value="Mehrfamilienhaus">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="Einfamilienhaus">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 3:</IonLabel>
            <IonSelect value={hausmodell} okText="Okay" cancelText="Cancel" onIonChange={e => sethausmodell(e.detail.value)}>
              <IonSelectOption value="Reihenhaus">Reihenhaus</IonSelectOption>
              <IonSelectOption value="Mehrfamilienhaus">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="Einfamilienhaus">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 4:</IonLabel>
            <IonSelect value={hausmodell} okText="Okay" cancelText="Cancel" onIonChange={e => sethausmodell(e.detail.value)}>
              <IonSelectOption value="Reihenhaus">Reihenhaus</IonSelectOption>
              <IonSelectOption value="Mehrfamilienhaus">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="Einfamilienhaus">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 5:</IonLabel>
            <IonSelect value={hausmodell} okText="Okay" cancelText="Cancel" onIonChange={e => sethausmodell(e.detail.value)}>
              <IonSelectOption value="Reihenhaus">Reihenhaus</IonSelectOption>
              <IonSelectOption value="Mehrfamilienhaus">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="Einfamilienhaus">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>        
      </IonContent>
    </IonPage>
  );
};

export default Settings;