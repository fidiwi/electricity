import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonRange, IonIcon, IonItemDivider, IonBackButton, IonButtons, IonInput, IonListHeader } from '@ionic/react';
import { analytics, cloud, sunny, business, home} from 'ionicons/icons';
import { io } from "socket.io-client";
import './ModelManipulation.css';
import { urls } from "../vars/urls";
import { passwordExport } from '../vars/password';


const ModelManipulation: React.FC = () => {

  const housevbRange = useRef<HTMLIonRangeElement>(null);
  const companyvbRange = useRef<HTMLIonRangeElement>(null);
  const windRange = useRef<HTMLIonRangeElement>(null);
  const sunRange = useRef<HTMLIonRangeElement>(null);
  const ekarmaRange = useRef<HTMLIonRangeElement>(null);

  const [response, setResponse] = useState<any>({housevb:0, companyvb:0, sun:0, wind:0, ekarma:0});

  const [currentSocket, setSocket] = useState(io());

  const [blocken, setblocken] = useState<boolean>(true);

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

  const passwordCheck = (input:string) => {
    passwordExport((password:string) => {
      if (input == password){
        setblocken(false);
      }
      else{
        setblocken(true);
      }
    }) 
  };

  const pushRangeChange = (rangeElement: React.RefObject<HTMLIonRangeElement>) => {
    currentSocket.emit("rangeChange", {param: rangeElement.current!.name, value: rangeElement.current!.value});
    let newData = response;
    newData[rangeElement.current!.name] = rangeElement.current!.value;
    setResponse(newData);
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
            <IonInput placeholder="Passwort" type="password" debounce={503} onIonChange={e => passwordCheck(e.detail.value!)} ></IonInput>
          </IonItem>
          <IonItemDivider>Häuserverbauch</IonItemDivider>
          <IonItem>
            <IonRange pin={false} ref={housevbRange} name="housevb" min={0} max={1} step={0.01} value={response.housevb} disabled={blocken} onIonChange={() => {pushRangeChange(housevbRange)}} >
              <IonIcon size="small" slot="start" icon={home} />
              <IonIcon slot="end" icon={home} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Sonne</IonItemDivider>
          <IonItem>
            <IonRange ref={sunRange} name="sun" min={0} max={1} step={0.01} value={response.sun} disabled={blocken} onIonChange={() => {pushRangeChange(sunRange);}} >
              <IonIcon size="small" slot="start" icon={sunny}/>
              <IonIcon slot="end" icon={sunny} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Werksverbrauch</IonItemDivider>
          <IonItem>
            <IonRange ref={companyvbRange} name="companyvb" min={0} max={1} step={0.01} value={response.companyvb} disabled={blocken} onIonChange={() => {pushRangeChange(companyvbRange);}} >
              <IonIcon size="small" slot="start" icon={business}/>
              <IonIcon slot="end" icon={business} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Wind</IonItemDivider>
          <IonItem>
            <IonRange ref={windRange} name="wind" min={0} max={1} step={0.01} value={response.wind} disabled={blocken} onIonChange={() => {pushRangeChange(windRange);}} >
              <IonIcon size="small" slot="start" icon={cloud} />
              <IonIcon slot="end" icon={cloud} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Vorhersage</IonItemDivider>
          <IonItem>
            <IonRange ref={ekarmaRange} name="ekarma" min={0} max={1} step={0.01} value={response.ekarma} disabled={blocken} onIonChange={() => {pushRangeChange(ekarmaRange);}} >
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