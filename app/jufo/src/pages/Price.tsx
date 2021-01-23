import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 0, 0, 0, 0, 0, -1, -1, -2, -2],
        fill: false,
        backgroundColor: "rgba(56,128,255,0.2)",
        borderColor: "rgba(56,128,255,1)"
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

  useEffect(() => {
    const socket = io(urls.SOCKET_ENDPOINT);
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
            borderColor: "rgba(56,128,255,1)"
          },
        ],
      }
      setDataTag(newDataTag);
    });

      socket.on("hl", (data: any) => {
        setHlabgabe(data.abgabe);
        setHlannahme(data.annahme);
        });

    return () => {
      socket.disconnect();
    };
  }, []);


  const [Estatus, setEstatus] = useState<number>(0);
  const [hlabgabe, setHlabgabe] = useState<number>(0);
  const [hlannahme, setHlannahme] = useState<number>(0);
  const [aufladpunkt, setaufladpunkt] = useState<string>("20");
  const [fertig, setfertig] = useState<string>("06");

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
          <IonItem>
            <IonLabel>{hlabgabe} kWh wurden an die HL abgegeben</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>{hlannahme} kWh wurden von der HL bezogen</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Auto soll angschlossen sein: </IonLabel>
            <IonDatetime display-format="HH:mm" picker-format="HH:mm" value="2021-02-17 20:00"></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Auto soll aufgeladen sein: </IonLabel>
            <IonDatetime display-format="HH:mm" picker-format="HH:mm" value="2021-02-18 06:00"></IonDatetime>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Price;
