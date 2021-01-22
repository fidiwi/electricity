import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

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

    socket.emit("company");
    socket.emit("produktivitaet");
    socket.on("produktivitaet", (data: any) => {

      let hourPrd = [];
      var temp = 0;

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

      socket.on("windsun", (data: any) => {
        var temp = 0;
        let sonnelist = [];
        for(let hour = 0; hour <=23; hour++){;
          sonnelist.push(Math.round(data.sun[hour]*100*40)/100)
          temp = temp + data.sun[hour]*40;
        };
        setSonne(Math.round(temp));

        var temp = 0;
        let windlist = [];
        for(let hour = 0; hour <=23; hour++){;
          windlist.push(Math.round(data.wind[hour]*100*5)/100)
          temp = temp + data.wind[hour]*40;
        };
        setWind(Math.round(temp));

        let hourList: Array<string> = Object.keys(data.sun);

        let newDataFirma = {
          labels: hourList,
          datasets: [
            {
              label: "Sonne in kW",
              data: sonnelist,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.2)",
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
            <IonCardSubtitle>Produktivität: {produktschnitt}%</IonCardSubtitle>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonCardTitle>Tagesüberblick</IonCardTitle>
            <Line data={Firma}/>
            <IonCardSubtitle>Stromproduktion Solar: {sonne}kW</IonCardSubtitle>
            <IonCardSubtitle>Stromproduktion Wind: {wind}kW</IonCardSubtitle>
          </IonCardContent>
        </IonCard>
    </IonContent>
  </IonPage>
  );
};

export default Company;