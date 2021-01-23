import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption, IonPage, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonInput } from '@ionic/react';
import { io } from "socket.io-client";
import { urls } from '../vars/urls';
import { passwordExport } from '../vars/password';
import { changeHaustyp, getHaustyp, hausStrings } from '../vars/vars';

const Settings: React.FC = () => {

  const [currentSocket, setSocket] = useState(io());

  const slot0 = useRef<HTMLIonSelectElement>(null);
  const slot1 = useRef<HTMLIonSelectElement>(null);
  const slot2 = useRef<HTMLIonSelectElement>(null);
  const slot3 = useRef<HTMLIonSelectElement>(null);
  const slot4 = useRef<HTMLIonSelectElement>(null);

  const [grundstück1, sethausmodell1] = useState<string>("0");
  const [grundstück2, sethausmodell2] = useState<string>("1");
  const [grundstück3, sethausmodell3] = useState<string>("1");
  const [grundstück4, sethausmodell4] = useState<string>("3");
  const [grundstück5, sethausmodell5] = useState<string>("2");

  const stateList = [sethausmodell1, sethausmodell2, sethausmodell3, sethausmodell4, sethausmodell5];

  const [blocken, setblocken] = useState<boolean>(true);

  const passwordCheck = (password:string) => {
    if (password == passwordExport){
      setblocken(false);
    }
    else{
      setblocken(true);
    }
  };

  useEffect(() => {
    const socket = io(urls.SOCKET_ENDPOINT);
    setSocket(socket);

    socket.emit("settings");
    socket.on("FromAPI", (data: Array<{
      id: number;
      house: number;
    }>) => {
      console.log(data);
      data.forEach((slot) => {
        const id = slot.id;
        const value = slot.house;
        stateList[id-1](String(value));
      });
      console.log(slot1.current?.value);
    });
  }, []);

  const updateHouses = (value: number, id: number) => {
    currentSocket.emit("houseChange", {id: id, house: value});
    stateList[id-1](String(value));
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
            <IonLabel>Aktueller Haustyp:</IonLabel>
            <IonSelect value={""+getHaustyp()} okText="Okay" cancelText="Cancel" onIonChange={e => changeHaustyp(e.detail.value)}>
              <IonSelectOption value="1">{hausStrings[1]}</IonSelectOption>
              <IonSelectOption value="2">{hausStrings[2]}</IonSelectOption>
              <IonSelectOption value="3">{hausStrings[3]}</IonSelectOption>
              <IonSelectOption value="0">{hausStrings[0]}</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonListHeader>Passwort eingeben</IonListHeader>
          <IonItem>
            <IonInput placeholder="Passwort" type="password" debounce={1039} onIonChange={e => passwordCheck(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem><IonLabel>Die Grundstücke manuell auswählen</IonLabel></IonItem>
          <IonItem>
            <IonLabel>Grundstück 1:</IonLabel>
            <IonSelect ref={slot0} value={grundstück1} okText="Okay" cancelText="Cancel" disabled={blocken} onIonChange={e => updateHouses(e.detail.value, 1)}>
              <IonSelectOption value="1">Reihenhaus</IonSelectOption>
              <IonSelectOption value="2">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="3">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="0">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 2:</IonLabel>
            <IonSelect ref={slot1} value={grundstück2} okText="Okay" cancelText="Cancel" disabled={blocken} onIonChange={e => updateHouses(e.detail.value, 2)}>
              <IonSelectOption value="1">Reihenhaus</IonSelectOption>
              <IonSelectOption value="2">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="3">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="0">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 3:</IonLabel>
            <IonSelect ref={slot2} value={grundstück3} okText="Okay" cancelText="Cancel" disabled={blocken} onIonChange={e => updateHouses(e.detail.value, 3)}>
              <IonSelectOption value="1">Reihenhaus</IonSelectOption>
              <IonSelectOption value="2">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="3">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="0">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 4:</IonLabel>
            <IonSelect ref={slot3} value={grundstück4} okText="Okay" cancelText="Cancel" disabled={blocken} onIonChange={e => updateHouses(e.detail.value, 4)}>
              <IonSelectOption value="1">Reihenhaus</IonSelectOption>
              <IonSelectOption value="2">Mehrfamilienhaus</IonSelectOption>
              <IonSelectOption value="3">Einfamilienhaus</IonSelectOption>
              <IonSelectOption value="0">Apartment</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Grundstück 5:</IonLabel>
            <IonSelect ref={slot4} value={grundstück5} okText="Okay" cancelText="Cancel" disabled={blocken} onIonChange={e => updateHouses(e.detail.value, 5)}>
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