import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption, IonPage, IonItemDivider, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { io } from "socket.io-client";
import { urls } from '../vars/vars';
import { Interface } from 'readline';

const Settings: React.FC = () => {

  const [currentSocket, setSocket] = useState(io());

  const slot0 = useRef<HTMLIonSelectElement>(null);
  const slot1 = useRef<HTMLIonSelectElement>(null);
  const slot2 = useRef<HTMLIonSelectElement>(null);
  const slot3 = useRef<HTMLIonSelectElement>(null);
  const slot4 = useRef<HTMLIonSelectElement>(null);

  const [hausmodell, sethausmodell] = useState<string>("Reihenhaus");
  const [grundstück1, sethausmodell1] = useState<number>(0);
  const [grundstück2, sethausmodell2] = useState<number>(1);
  const [grundstück3, sethausmodell3] = useState<number>(1);
  const [grundstück4, sethausmodell4] = useState<number>(3);
  const [grundstück5, sethausmodell5] = useState<number>(2);

  const stateList = [sethausmodell1, sethausmodell2, sethausmodell3, sethausmodell4, sethausmodell5];

  useEffect(() => {
    const socket = io(urls.SOCKET_ENDPOINT);
    setSocket(socket);

    socket.emit("settings");
    socket.on("FromAPI", (data: Array<{
      id: number;
      house: number;
    }>) => {
      data.forEach((slot) => {
        const id = slot.id;
        const value = slot.house;
        stateList[id](value);
      });
    });
  }, []);

  const updateHouses = (value: Number, id: Number) => {
    currentSocket.emit("houseChange", {id: id, house: value});
  };

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
              <IonSelectOption value="1">Reihenhaus</IonSelectOption>
              <IonSelectOption value="2">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="3">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="0">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem><IonLabel>Die Grundstücke manuell auswählen</IonLabel></IonItem>
          <IonItem>
            <IonLabel>Grundstück 1:</IonLabel>
            <IonSelect ref={slot0} value={grundstück1} okText="Okay" cancelText="Cancel" onIonChange={e => updateHouses(e.detail.value, 0)}>
              <IonSelectOption value="1">Reihenhaus</IonSelectOption>
              <IonSelectOption value="2">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="3">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="0">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 2:</IonLabel>
            <IonSelect ref={slot1} value={grundstück2} okText="Okay" cancelText="Cancel" onIonChange={e => updateHouses(e.detail.value, 1)}>
              <IonSelectOption value="1">Reihenhaus</IonSelectOption>
              <IonSelectOption value="2">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="3">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="0">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 3:</IonLabel>
            <IonSelect ref={slot2} value={grundstück3} okText="Okay" cancelText="Cancel" onIonChange={e => updateHouses(e.detail.value, 2)}>
              <IonSelectOption value="1">Reihenhaus</IonSelectOption>
              <IonSelectOption value="2">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="3">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="0">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 4:</IonLabel>
            <IonSelect ref={slot3} value={grundstück4} okText="Okay" cancelText="Cancel" onIonChange={e => updateHouses(e.detail.value, 3)}>
              <IonSelectOption value="1">Reihenhaus</IonSelectOption>
              <IonSelectOption value="2">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="3">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="0">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 5:</IonLabel>
            <IonSelect ref={slot4} value={grundstück5} okText="Okay" cancelText="Cancel" onIonChange={e => updateHouses(e.detail.value, 4)}>
              <IonSelectOption value="1">Reihenhaus</IonSelectOption>
              <IonSelectOption value="2">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="3">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="0">Apartment</IonSelectOption>
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