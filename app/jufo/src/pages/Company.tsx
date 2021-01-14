import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { construct } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

import { Line } from "react-chartjs-2"
import { urls } from '../vars/vars';

const Company: React.FC = () => {
  const [Produktivität, setProduktivität] = useState({
    labels: ["06", "08", "10", "12", "14", "16", "18", "20", "22"],
    datasets: [
      {
        label: "Produktivität",
        data: [33, 53, 85, 41, 44, 65, 33, 100, 45],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(204,0,0,1)"
      }
    ]
  });

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
  useEffect(() => {
    const socket = io(urls.SOCKET_ENDPOINT);

    socket.emit("produktivitaet");
    socket.on("FromAPI", (data: any) => {

      console.log("api received:");
      console.log(data);
      let hourList = [];

      for(let hour = 6; hour <=21; hour++){
        hourList.push(data[hour]*100);
      }
      console.log(hourList);

      let newDataProduktivität = {
        labels: ["06", "08", "10", "12", "14", "16", "18", "20", "22"],
        datasets: [
          {
            label: "Produktivität",
            data: hourList,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(204,0,0,1)"
          }
        ]
      }
      setProduktivität(newDataProduktivität);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  
  
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
        <IonCard>
          <IonCardContent>
            <IonCardTitle>Produktivität</IonCardTitle>
            <Line data={Produktivität}/>
            <IonCardSubtitle>Produktivität: 90%</IonCardSubtitle>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonCardTitle>Wochenüberblick</IonCardTitle>
            <Line data={Firma}/>
            <IonCardSubtitle>Stromproduktion Solar: 12kW</IonCardSubtitle>
            <IonCardSubtitle>Stromproduktion Wind: 12kW</IonCardSubtitle>
            <IonCardSubtitle>Stromverbrauch: 20kW</IonCardSubtitle>
          </IonCardContent>
        </IonCard>
      <IonList>
        <IonItem>
          <IonLabel>Firma an- oder ausschalten</IonLabel>
          <IonToggle slot="start" name="Firma" color="success" checked></IonToggle>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
  );
};

export default Company;