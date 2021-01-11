import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonRange, IonLabel, IonIcon, IonItemDivider, IonBackButton, IonButtons, IonTextarea } from '@ionic/react';
import { analytics, cloud, colorFill, sunny, business, home } from 'ionicons/icons';
import { io } from "socket.io-client";
import './ModelManipulation.css';
import { urls } from "../vars/vars";

const ModelManipulation: React.FC = () => {

  const housevbRange = useRef<HTMLIonRangeElement>(null);
  const companyvbRange = useRef<HTMLIonRangeElement>(null);
  const windRange = useRef<HTMLIonRangeElement>(null);
  const sunRange = useRef<HTMLIonRangeElement>(null);
  const ekarmaRange = useRef<HTMLIonRangeElement>(null);

  const [response, setResponse] = useState<any>({housevb:0, companyvb:0, sun:0, wind:0, ekarma:0});

  const socket = io(urls.SOCKET_ENDPOINT);

  useEffect(() => {
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
    socket.emit("rangeChange", rangeElement.current!.value);
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
          <IonItemDivider>Häuserverbauch</IonItemDivider>
          <IonItem>
            <IonRange ref={housevbRange} min={0} max={1} step={0.05} color="danger" snaps={true} value={response.housevb} onIonChange={() => {pushRangeChange(housevbRange);}} >
              <IonIcon size="small" slot="start" icon={home} />
              <IonIcon slot="end" icon={home} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Sonne</IonItemDivider>
          <IonItem>
            <IonRange ref={sunRange} min={0} max={1} step={0.01} value={response.sun} onIonChange={() => {pushRangeChange(sunRange);}} >
              <IonIcon size="small" slot="start" icon={sunny}/>
              <IonIcon slot="end" icon={sunny} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Firmaverbrauch</IonItemDivider>
          <IonItem>
            <IonRange ref={companyvbRange} min={0} max={1} step={0.01} value={response.companyvb} onIonChange={() => {pushRangeChange(companyvbRange);}} >
              <IonIcon size="small" slot="start" icon={business}/>
              <IonIcon slot="end" icon={business} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Wind</IonItemDivider>
          <IonItem>
            <IonRange ref={windRange} min={0} max={1} step={0.01} value={response.wind} onIonChange={() => {pushRangeChange(windRange);}} >
              <IonIcon size="small" slot="start" icon={cloud} />
              <IonIcon slot="end" icon={cloud} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Vorhersage</IonItemDivider>
          <IonItem>
            <IonRange ref={ekarmaRange} min={0} max={1} step={0.01} value={response.ekarma} onIonChange={() => {pushRangeChange(ekarmaRange);}} >
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