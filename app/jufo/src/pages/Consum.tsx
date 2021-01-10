import React, { useEffect, useRef, useState } from 'react';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Consum.css';

import { Line } from "react-chartjs-2"
import { io } from 'socket.io-client';
import { urls } from '../vars/vars';
import { number } from 'yargs';
import { Interface } from 'readline';


const Consum: React.FC = () => {

  const [dataJahr, setJahr] = useState<{
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        backgroundColor: string;
        borderColor: string;
    }[];
  }>({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Stromverbrauch in kW",
        data: [33, 53, 85, 41, 44, 65, 33, 25, 35, 51, 54, 76],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(204,0,0,1)"
      },
      {
        label: "Stromproduktion in kW",
        data: [330, 25, 35, 510, 54, 76, 33, 3, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(0,204,0,0.2)",
        borderColor: "rgba(0,204,0,1)"
      },
      {
        label: "Differenz",
        data: [-33, 53, 5, -41, 24, 5, 51, 54, 76, -33, 53, 85, -41],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  });

  const [dataMonat, setMonat] = useState<{
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        backgroundColor: string;
        borderColor: string;
    }[];
  }>({
    labels: ["01", "03", "06", "09", "12", "15", "18", "21", "24", "27", "30", "31"],
    datasets: [
      {
        label: "Stromverbrauch in kW",
        data: [33, 53, 85, 41, 44, 65, 33, 25, 35, 51, 54, 76],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(204,0,0,1)"
      },
      {
        label: "Stromproduktion in kW",
        data: [33, 25, 35, 51, 54, 76, 33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(0,204,0,0.2)",
        borderColor: "rgba(0,204,0,1)"
      },
      {
        label: "Differenz",
        data: [-33, 53, 5, -41, 24, 5, 51, 54, 76, -33, 53, 85, -41],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  });

  const [dataWoche, setWoche] = useState<{
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        backgroundColor: string;
        borderColor: string;
    }[];
  }>({
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Stromverbrauch in kW",
        data: [33, 53, 85, 41, 44, 65, 33],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(204,0,0,1)"
      },
      {
        label: "Stromproduktion in kW",
        data: [33, 25, 35, 51, 54, 76, 33],
        fill: true,
        backgroundColor: "rgba(0,204,0,0.2)",
        borderColor: "rgba(0,204,0,1)"
      },
      {
        label: "Differenz",
        data: [-33, 53, 5, -41, 24, 5, 51, 54, 76, -33, 53, 85, -41],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  });

  const [dataTag, setTag] = useState<{
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        backgroundColor: string;
        borderColor: string;
    }[];
  }>({
    labels: ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22", "24"],
    datasets: [
      {
        label: "SVB",
        data: [33, 53, 85, 41, 44, 65, 33, 25, 35, 51, 54, 76, 12],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(204,0,0,1)"
      },
      {
        label: "Produktion",
        data: [33, 25, 35, 51, 54, 76, 33, 53, 85, 41, 44, 65, 23],
        fill: true,
        backgroundColor: "rgba(0,204,0,0.2)",
        borderColor: "rgba(0,204,0,1)"
      },
      {
        label: "Differenz",
        data: [-33, 53, 5, -41, 24, 5, 51, 54, 76, -33, 53, 85, -41],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  });

  const legend = {
    display: true,
    labels: {
      fontColor: "#323130",
      fontSize: 10
    }
  }


  useEffect(() => {
    const socket = io(urls.SOCKET_ENDPOINT);

    socket.emit("login", "housevb");
    socket.on("FromAPI", (data: any) => {

      let newDataTag = dataTag;
      let hourList = [];

      for(let hour = 0; hour <=24; hour++){
        hourList.push(data.hour);
      }

      newDataTag.datasets[0].data = hourList;
      setTag(newDataTag);
      
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
          <IonTitle>Stromverbrauch/erzeugung</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Tagesüberblick</IonCardTitle>
                <Line data={dataTag} legend={legend}/>
                <IonCardSubtitle>Stromverbrauch: 12kW</IonCardSubtitle>
                <IonCardSubtitle>Stromproduktion: 12kW</IonCardSubtitle>
                <IonCardSubtitle>Differenz: 12kW</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <IonCardHeader> 
                <IonCardTitle>Wochenüberblick</IonCardTitle>
                <Line data={dataWoche}/>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>Stromverbrauch: 75kW</IonCardSubtitle>
                <IonCardSubtitle>Stromproduktion: 75kW</IonCardSubtitle>
                <IonCardSubtitle>Differenz: 75kW</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Monatsüberblick</IonCardTitle>
                <Line data={dataMonat}/>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>Stromverbrauch: 300kW</IonCardSubtitle>
                <IonCardSubtitle>Stromproduktion: 300kW</IonCardSubtitle>
                <IonCardSubtitle>Differenz: 300kW</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Jahresüberblick</IonCardTitle>
                <Line data={dataJahr}/>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>Stromverbrauch: 3400kW</IonCardSubtitle>
                <IonCardSubtitle>Stromproduktion: 3400kW</IonCardSubtitle>
                <IonCardSubtitle>Differenz: 3400kW</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Consum;
