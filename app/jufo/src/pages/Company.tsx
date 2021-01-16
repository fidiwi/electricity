import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { construct } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

import { Line } from "react-chartjs-2"
import { urls } from '../vars/vars';

const Company: React.FC = () => {
  const [Produktivität, setProduktivität] = useState({
    labels: ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"],
    datasets: [
      {
        label: "Produktivität",
        data: [33, 53, 85, 41, 44, 65, 33, 100, 45, 32, 24, 23, 32, 100, 78, 86],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(204,0,0,1)"
      }
    ]
  });

  const [Firma, setFirma] = useState({
    labels: ["00", "01", "02", "03", "04", "05","06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
    datasets: [
      {
        label: "Solar in kW",
        data: [33, 25, 35, 51, 54, 76, 33, 33, 25, 35, 51, 54, 76, 33, 33, 25, 35, 51, 54, 76, 33, 33, 25, 35],
        fill: true,
        backgroundColor: "rgba(0,204,0,0.2)",
        borderColor: "rgba(0,204,0,1)"
      },
      {
        label: "Wind in kW",
        data: [3, 53, 5, 41, 24, 5, 51, 3, 53, 5, 41, 24, 5, 51, 3, 53, 5, 41, 24, 5, 51, 3, 53, 5, 41, 24, 5],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
    ]
  });

  const options = {
    scales: {
        yAxes: [
        {
            ticks: {
            suggestedMin: 0,
            suggestedMax: 100
            }
        }
        ]
    }
    
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
        labels: ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"],
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
            <Line data={Produktivität} options={options}/>
            <IonCardSubtitle>Produktivität: 90%</IonCardSubtitle>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonCardTitle>Tagesüberblick</IonCardTitle>
            <Line data={Firma}/>
            <IonCardSubtitle>Stromproduktion Solar: 12kW</IonCardSubtitle>
            <IonCardSubtitle>Stromproduktion Wind: 12kW</IonCardSubtitle>
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