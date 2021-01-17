import React, { useEffect, useRef, useState } from 'react';
import { IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonHeader, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Price.css';

import { Line } from "react-chartjs-2"
import { urls } from '../vars/vars';
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

  useEffect(() => {
    const socket = io(urls.SOCKET_ENDPOINT);
    socket.emit("estatus");
    socket.on("estatus", (data: any) => {

      let hourStatus = [];
      let hourList = Object.keys(data);
      let temp = 0;

      for(let hour = 0; hour <=23; hour++){
        hourStatus.push(data[hour]);
      } 
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

    return () => {
      socket.disconnect();
    };
  }, []);


  
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
              <IonCardTitle>Sehr gut | 1</IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <IonItem>
          <IonLabel>Auto soll angschlossen sein: </IonLabel>
          <IonDatetime display-format="HH:mm" picker-format="HH:mm" value="2021-02-17 20:00"></IonDatetime>
        </IonItem>
        <IonItem>
          <IonLabel>Auto soll aufgeladen sein: </IonLabel>
          <IonDatetime display-format="HH:mm" picker-format="HH:mm" value="2021-02-18 06:00"></IonDatetime>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Price;
