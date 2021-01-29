import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

import { Line } from "react-chartjs-2"
import { urls } from '../vars/urls';

const Company: React.FC = () => {

  const [produktschnitt, setproduktschnitt] = useState<number>(0);
  const [sonne, setSonne] = useState<number>(0);
  const [wind, setWind] = useState<number>(0);

  const [Produktivität, setProduktivität] = useState({
    labels: ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"],
    datasets: [
      {
        label: "Produktivität",
        data: [33, 53, 85, 41, 44, 65, 33, 100, 45, 32, 24, 23, 32, 100, 78, 86],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(204,0,0,1)",
        tension: 0
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

    socket.emit("company");
    socket.emit("produktivitaet");
    socket.on("produktivitaet", (data: any) => {

      let hourPrd = [];
      let hourList = [];
      var temp = 0;

      for(let i = 0; i <=23; i++){
        hourPrd.push(Math.round(data[i].value*10000)/100);
        temp = temp + data[i].value*100;
        hourList.push(data[i].hour)
      }
      setproduktschnitt(Math.round(temp / 16));
      console.log(hourPrd);

      let newDataProduktivität = {
        labels: hourList,
        datasets: [
          {
            label: "Produktivität",
            data: hourPrd,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(204,0,0,1)",
            tension: 0
          }
        ]
      }
      setProduktivität(newDataProduktivität);
      });

      socket.on("windsun", (data: any) => {
        var temp = 0;
        let sonnelist = [];
        for(let i = 0; i <=23; i++){;
          sonnelist.push(Math.round(data.sun[i].value*100*40)/100)
          temp = temp + data.sun[i].value*40;
        };
        setSonne(Math.round(temp));

        var temp = 0;
        let windlist = [];
        let hourList = [];
        for(let i = 0; i <=23; i++){;
          windlist.push(Math.round(data.wind[i].value*100*20)/100)
          temp = temp + data.wind[i].value*20;
          hourList.push(data.wind[i].hour)
        };
        setWind(Math.round(temp));

        let newDataFirma = {
          labels: hourList,
          datasets: [
            {
              label: "Sonne in kW",
              data: sonnelist,
              fill: true,
              backgroundColor: "rgba(0,205,0,0.2)",
              borderColor: "rgba(0,204,0,1)"
            },
            {
              label: "Wind in kW",
              data: windlist,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)"
            },
          ]
        }
        setFirma(newDataFirma);
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
            <IonCardSubtitle>Durchschnittl. Produktivität: {produktschnitt}%</IonCardSubtitle>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonCardTitle>Tagesüberblick</IonCardTitle>
            <Line data={Firma}/>
            <IonCardSubtitle>Stromproduktion Solar: {Math.round(sonne)}kW</IonCardSubtitle>
            <IonCardSubtitle>Stromproduktion Wind: {Math.round(wind)}kW</IonCardSubtitle>
          </IonCardContent>
        </IonCard>
    </IonContent>
  </IonPage>
  );
};

export default Company;