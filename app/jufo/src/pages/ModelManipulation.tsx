import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonRange, IonLabel, IonIcon, IonItemDivider, IonBackButton, IonButtons, IonTextarea, IonInput, IonListHeader } from '@ionic/react';
import { analytics, cloud, colorFill, sunny, business, home, text } from 'ionicons/icons';
import { io, Socket } from "socket.io-client";
import './ModelManipulation.css';
import { urls } from "../vars/vars";


const ModelManipulation: React.FC = () => {

  const housevbRange = useRef<HTMLIonRangeElement>(null);
  const companyvbRange = useRef<HTMLIonRangeElement>(null);
  const windRange = useRef<HTMLIonRangeElement>(null);
  const sunRange = useRef<HTMLIonRangeElement>(null);
  const ekarmaRange = useRef<HTMLIonRangeElement>(null);

  const [response, setResponse] = useState<any>({housevb:0, companyvb:0, sun:0, wind:0, ekarma:0});

  const [currentSocket, setSocket] = useState(io());

  useEffect(() => {
    const socket = io(urls.SOCKET_ENDPOINT);
    setSocket(socket);
    socket.emit("manipulation");
    socket.on("FromAPI", (data: any) => {
      setResponse(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const [value, setValue] = useState(0);
  const [rangeValue, setRangeValue] = useState<{
    lower: number;
    upper: number;
  }>({ lower: 0, upper: 0 });

  const pushRangeChange = (rangeElement: React.RefObject<HTMLIonRangeElement>) => {
    currentSocket.emit("rangeChange", {param: rangeElement.current!.name, value: rangeElement.current!.value});
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>Schieberegler</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
        <IonListHeader>Passwort eingeben</IonListHeader>
          <IonItem>
            <IonInput placeholder="Passwort" type="password" ></IonInput>
          </IonItem>
          <IonItemDivider>Häuserverbauch</IonItemDivider>
          <IonItem>
            <IonRange ref={housevbRange} name="housevb" min={0} max={1} step={0.01} value={response.housevb} disabled={true} onIonChange={() => {pushRangeChange(housevbRange)}} >
              <IonIcon size="small" slot="start" icon={home} />
              <IonIcon slot="end" icon={home} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Sonne</IonItemDivider>
          <IonItem>
            <IonRange ref={sunRange} name="sun" min={0} max={1} step={0.01} value={response.sun} onIonChange={() => {pushRangeChange(sunRange);}} >
              <IonIcon size="small" slot="start" icon={sunny}/>
              <IonIcon slot="end" icon={sunny} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Firmaverbrauch</IonItemDivider>
          <IonItem>
            <IonRange ref={companyvbRange} name="companyvb" min={0} max={1} step={0.01} value={response.companyvb} onIonChange={() => {pushRangeChange(companyvbRange);}} >
              <IonIcon size="small" slot="start" icon={business}/>
              <IonIcon slot="end" icon={business} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Wind</IonItemDivider>
          <IonItem>
            <IonRange ref={windRange} name="wind" min={0} max={1} step={0.01} value={response.wind} onIonChange={() => {pushRangeChange(windRange);}} >
              <IonIcon size="small" slot="start" icon={cloud} />
              <IonIcon slot="end" icon={cloud} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Vorhersage</IonItemDivider>
          <IonItem>
            <IonRange ref={ekarmaRange} name="ekarma" min={0} max={1} step={0.01} value={response.ekarma} onIonChange={() => {pushRangeChange(ekarmaRange);}} >
              <IonIcon size="small" slot="start" icon={analytics} />
              <IonIcon slot="end" icon={analytics} />
            </IonRange>
          </IonItem>
          
          
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ModelManipulation;