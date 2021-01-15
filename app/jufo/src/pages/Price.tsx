import React, { useRef, useState } from 'react';
import { IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonHeader, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Price.css';

import { Line } from "react-chartjs-2"

const Price: React.FC = () => {
  const dataTag = {
    labels: ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22", "24"],
    datasets: [
      {
        label: "Energiestatus",
        data: [-4, -4, -4, -3, 0, 1, 3, 3, 1, 0, -1, -2, -2],
        fill: false,
        backgroundColor: "rgba(56,128,255,0.2)",
        borderColor: "rgba(56,128,255,1)"
      },
    ],
  };
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
          <Line data={dataTag}/>
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
