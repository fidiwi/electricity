import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonPage, IonRange, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { construct } from 'ionicons/icons';
import React from 'react';

import { Line } from "react-chartjs-2"

const Company: React.FC = () => {
  const Firma = {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Solar in kW",
        data: [33, 25, 35, 51, 54, 76, 33],
        fill: true,
        backgroundColor: "rgba(0,204,0,0.2)",
        borderColor: "rgba(0,204,0,1)"
      },
      {
        label: "Wind in kW",
        data: [3, 53, 5, 41, 24, 5, 51],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Verbrauch",
        data: [33, 53, 85, 41, 44, 65, 33],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(204,0,0,1)"
      },
    ]
  };
  
  const Produktivität = {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Produktivität",
        data: [33, 53, 85, 41, 44, 65, 33],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(204,0,0,1)"
      }
    ]
  }
  
  return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/dashboard" />
        </IonButtons>
        <IonTitle>Firmenansicht</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent>
                <IonCardTitle>Produktivität</IonCardTitle>
                <Line data={Produktivität}/>
                <IonCardSubtitle>Produktivität: 90%</IonCardSubtitle>
                <IonCardTitle>Wochenüberblick</IonCardTitle>
                <Line data={Firma}/>
                <IonCardSubtitle>Stromproduktion Solar: 12kW</IonCardSubtitle>
                <IonCardSubtitle>Stromproduktion Wind: 12kW</IonCardSubtitle>
                <IonCardSubtitle>Stromverbrauch: 20kW</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonItemDivider>Produktivität manuell setzen</IonItemDivider>
          <IonItem>
            <IonRange min={0} max={100} step={1}>
              <IonIcon size="small" slot="start" icon={construct} />
              <IonIcon slot="end" icon={construct} />
            </IonRange>
          </IonItem>
    </IonContent>
  </IonPage>
  );
};

export default Company;