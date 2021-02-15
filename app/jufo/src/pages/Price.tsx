import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Price.css';

import { Line } from "react-chartjs-2"
import { urls } from '../vars/urls';
import { io } from 'socket.io-client';

const Price: React.FC = () => {
  const [dataTag, setDataTag] = useState({
    labels: ["00", "01", "02", "03", "04", "05","06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
    datasets: [
      {
        label: "Energiestatus",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: false,
        backgroundColor: "rgba(56,128,255,0.2)",
        borderColor: "rgba(56,128,255,1)",
        tension: 0
      },
    ],
  });
  const options = {
    scales: {
        yAxes: [
        {
            ticks: {
            suggestedMin: -5,
            suggestedMax: 5
            }
        }
        ]
    }
  }

  var estatusdic = ["Optimal", "Sehr gut", "Gut", "In Ordnung", "Grenzwertig", "Kritisch"];

  const [currentSocket, setSocket] = useState(io());

  useEffect(() => {
    const socket = io(urls.SOCKET_ENDPOINT);
    setSocket(socket);
    socket.emit("estatus");
    socket.on("estatus", (data: any) => {

      let hourStatus = [];
      let hourList = [];

      for(let i = 0; i <=23; i++){
        hourStatus.push(data[i].value);
        hourList.push(data[i].hour)
      } 
      setEstatus(data[23].value); 
      let newDataTag = {
        labels: hourList,
        datasets: [
          {
            label: "Energiestatus",
            data: hourStatus,
            fill: false,
            backgroundColor: "rgba(56,128,255,0.2)",
            borderColor: "rgba(56,128,255,1)",
            tension: 0
          },
        ],
      }
      setDataTag(newDataTag);
    });

    socket.on("hl", (data: any) => {
      setHlabgabe(data.abgabe);
      setHlannahme(data.annahme);
      });
    
    socket.on("cars", (data: any) => {
      setaufladpunkt(data.start);
      setfertig(data.end);
      setId(data.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const [id, setId] = useState<number>(0);
  const [Estatus, setEstatus] = useState<number>(0);
  const [hlabgabe, setHlabgabe] = useState<number>(0);
  const [hlannahme, setHlannahme] = useState<number>(0);
  const [aufladpunkt, setaufladpunkt] = useState<string>("20:20");
  const [fertig, setfertig] = useState<string>("06:06");

  const pushStartChange = (value:string) => {
    setaufladpunkt(value);
    currentSocket.emit("startChange", {start: value, id: id});
  };
  const pushEndChange = (value:string) => {
    setfertig(value);
    currentSocket.emit("endChange", {end: value, id: id});
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>Energiestatus</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <Line data={dataTag} options={options}/>
          <IonCardHeader>
              <IonCardSubtitle>Tagesüberblick</IonCardSubtitle>
              <IonCardTitle>{estatusdic[Math.abs(Estatus)]} | {Estatus}</IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <IonList>
          <IonItemDivider>Stromaustauch mit der Hauptleitung</IonItemDivider>
          <IonItem>
            <IonLabel>An die Hauptleitung abgegebener Strom: {Math.round(hlabgabe)}kWh</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Von der Hauptleitung bezogener Strom: {Math.round(hlannahme)}kWh</IonLabel>
          </IonItem>
          <IonItemDivider>E-Auto Aufladeplan</IonItemDivider>
          <IonItem>
            <IonLabel>Auto wird angeschlossen ab: </IonLabel>
            <IonDatetime display-format="HH:mm" picker-format="HH:mm" value={aufladpunkt} onIonChange={e => {pushStartChange(e.detail.value!);}}></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Auto soll aufgeladen sein bis: </IonLabel>
            <IonDatetime display-format="HH:mm" picker-format="HH:mm" value={fertig} onIonChange={e => {pushEndChange(e.detail.value!);}}></IonDatetime>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Price;
