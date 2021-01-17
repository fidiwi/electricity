import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { construct } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

import { Line } from "react-chartjs-2"
import { urls } from '../vars/vars';

const Company: React.FC = () => {

  const [produktschnitt, setproduktschnitt] = useState<number>(0);

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

    socket.emit("");
    socket.on("", (data: any) => {

      console.log("api received:");
      console.log(data);
      let hourSonne = [];

      for(let hour = 0; hour <=23; hour++){
        hourSonne.push(data[hour]*40);
      }
      console.log(hourSonne);

      let hourList: Array<string> = [];

      data.vb.array.forEach((element: string) => {
        hourList.push(element);
      });

      let newDataFirma = {
        labels: hourList,
        datasets: [
          {
            label: "Solar in kWh",
            data: hourSonne,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(0,204,0,1)"
          }
        ]
      }
      setFirma(newDataFirma);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const socket = io(urls.SOCKET_ENDPOINT);

    socket.emit("produktivitaet");
    socket.on("FromAPI", (data: any) => {

      console.log("api received:");
      console.log(data);
      let hourPrd = [];
      var temp = 0

      for(let hour = 6; hour <=21; hour++){
        hourPrd.push(Math.round(data[hour]*10000)/100);
        temp = temp + data[hour]*100;
      }
      setproduktschnitt(Math.round(temp / 16));
      
      console.log(hourPrd);

      let hourList: Array<string> = Object.keys(data);

      let newDataProduktivität = {
        labels: hourList,
        datasets: [
          {
            label: "Produktivität",
            data: hourPrd,
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
            <IonCardSubtitle>Produktivität: {produktschnitt}%</IonCardSubtitle>
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
    </IonContent>
  </IonPage>
  );
};

export default Company;