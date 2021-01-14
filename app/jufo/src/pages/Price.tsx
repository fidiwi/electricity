import React, { useRef, useState } from 'react';
import { IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Price.css';

import { Line } from "react-chartjs-2"

const Price: React.FC = () => {
  const dataTag = {
    labels: ["02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22", "24"],
    datasets: [
      {
        label: "First dataset",
        data: [3, -3, 5, 4, -4, -5, 3, 2, 3, 1, 4, -2],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
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
          <IonTitle>Preisverlauf</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <Line data={dataTag}/>
          <IonCardHeader>
              <IonCardSubtitle>Tagesüberblick</IonCardSubtitle>
              <IonCardTitle>10kW</IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <IonItem>
          <IonLabel>Auto soll angschlossen sein: </IonLabel>
          <IonSelect value={aufladpunkt} okText="Okay" cancelText="Cancel" onIonChange={e => setaufladpunkt(e.detail.value)}>
            <IonSelectOption value="16">16 Uhr</IonSelectOption>
            <IonSelectOption value="17">17 Uhr</IonSelectOption>
            <IonSelectOption value="18">18 Uhr</IonSelectOption>
            <IonSelectOption value="19">19 Uhr</IonSelectOption>
            <IonSelectOption value="20">20 Uhr</IonSelectOption>
            <IonSelectOption value="21">21 Uhr</IonSelectOption>
            <IonSelectOption value="22">22 Uhr</IonSelectOption>
            <IonSelectOption value="23">23 Uhr</IonSelectOption>
            <IonSelectOption value="24">24 Uhr</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Auto soll aufgeladen sein: </IonLabel>
          <IonSelect value={fertig} okText="Okay" cancelText="Cancel" onIonChange={e => setfertig(e.detail.value)}>
            <IonSelectOption value="05">05 Uhr</IonSelectOption>
            <IonSelectOption value="06">06 Uhr</IonSelectOption>
            <IonSelectOption value="07">07 Uhr</IonSelectOption>
            <IonSelectOption value="08">08 Uhr</IonSelectOption>
            <IonSelectOption value="09">09 Uhr</IonSelectOption>
            <IonSelectOption value="10">10 Uhr</IonSelectOption>
            <IonSelectOption value="11">11 Uhr</IonSelectOption>
            <IonSelectOption value="12">12 Uhr</IonSelectOption>
            <IonSelectOption value="13">13 Uhr</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Price;
