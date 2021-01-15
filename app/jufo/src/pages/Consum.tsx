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

  var vbr = 0.346
  // R = 0.064; E = 0.09; M = 0.346; A = 0.5
  var prd = 8.75
  // R = 3.75; E = 18.75; M = 8.75; A = 12.5

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
        data: [Math.round(416000*vbr)/100, Math.round(420000*vbr)/100, Math.round(418000*vbr)/100, Math.round(419000*vbr)/100, 4170*vbr, Math.round(415000*vbr)/100, Math.round(416000*vbr)/100, Math.round(414000*vbr)/100, Math.round(415500*vbr)/100, Math.round(416000*vbr)/100, Math.round(416000*vbr)/100, Math.round(417000*vbr)/100],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(204,0,0,1)"
      },
      {
        label: "Stromproduktion in kW",
        data: [Math.round(2337*prd)/100, Math.round(6352*prd)/100, Math.round(6423*prd)/100, Math.round(12767*prd)/100, Math.round(11986*prd)/100, Math.round(14608*prd)/100, Math.round(12530*prd)/100, Math.round(13039*prd)/100, Math.round(9442*prd)/100, Math.round(6350*prd)/100, Math.round(2870*prd)/100, Math.round(1970*prd)/100],
        fill: true,
        backgroundColor: "rgba(0,204,0,0.2)",
        borderColor: "rgba(0,204,0,1)"
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
    labels: ["01", "04", "07", "10", "13", "16", "19", "22", "25", "28", "31"],
    datasets: [
      {
        label: "Stromverbrauch in kW",
        data: [Math.round(41800*vbr)/100, Math.round(42000*vbr)/100, Math.round(41900*vbr)/100, Math.round(41600*vbr)/100, Math.round(41500*vbr)/100, Math.round(41700*vbr)/100, Math.round(41600*vbr)/100, Math.round(41400*vbr)/100, Math.round(41550*vbr)/100, Math.round(41600*vbr)/100, Math.round(41600*vbr)/100, Math.round(41700*vbr)/100],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(204,0,0,1)"
      },
      {
        label: "Stromproduktion in kW",
        data: [Math.round(980*prd)/100, Math.round(1730*prd)/100, Math.round(1880*prd)/100, Math.round(1120*prd)/100, Math.round(1360*prd)/100, Math.round(1500*prd)/100, Math.round(1190*prd)/100, Math.round(780*prd)/100, Math.round(1440*prd)/100, Math.round(1880*prd)/100, Math.round(580*prd)/100],
        fill: true,
        backgroundColor: "rgba(0,204,0,0.2)",
        borderColor: "rgba(0,204,0,1)"
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
        data: [Math.round(13300*vbr)/100, Math.round(13500*vbr)/100, Math.round(13400*vbr)/100, Math.round(13700*vbr)/100, Math.round(13900*vbr)/100, Math.round(14100*vbr)/100, Math.round(13900*vbr)/100],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(204,0,0,1)"
      },
      {
        label: "Stromproduktion in kW",
        data: [Math.round(400*prd)/100, Math.round(580*prd)/100, Math.round(460*prd)/100, Math.round(650*prd)/100, Math.round(630*prd)/100, Math.round(600*prd)/100, Math.round(580*prd)/100],
        fill: true,
        backgroundColor: "rgba(0,204,0,0.2)",
        borderColor: "rgba(0,204,0,1)"
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
    var hausvbr = 2;
    // M = 2; R = 0.37; E = 0.51; A = 2.85

    socket.emit("housevb");
    socket.on("FromAPI", (data: any) => {

      console.log("api received:");
      console.log(data);
      let hourList = [];

      for(let hour = 0; hour <=24; hour++){
        hourList.push(Math.round(data[hour]*100)/100);
      } 
      console.log(hourList);

      let newDataTag = {
        labels: ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22", "24"],
        datasets: [
          {
            label: "SVB",
            data: hourList,
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
          }
        ]
      }
      console.log(newDataTag);
      setTag(newDataTag);
      console.log(dataTag);
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
                <IonCardSubtitle>Stromverbrauch: {Math.round(vbr*137)}kW</IonCardSubtitle>
                <IonCardSubtitle>Stromproduktion: {Math.round(prd*6)}kW</IonCardSubtitle>
                <IonCardSubtitle>Differenz: 12kW</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <IonCardHeader> 
                <IonCardTitle>Wochenüberblick</IonCardTitle>
                <Line data={dataWoche}/>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>Stromverbrauch: {Math.round(vbr*959)}kW</IonCardSubtitle>
                <IonCardSubtitle>Stromproduktion: {Math.round(prd*39)}kW</IonCardSubtitle>
                <IonCardSubtitle>Differenz: {Math.round(prd*39)-Math.round(vbr*959)}kW</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Monatsüberblick</IonCardTitle>
                <Line data={dataMonat}/>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>Stromverbrauch: {Math.round(vbr*4157)}kW</IonCardSubtitle>
                <IonCardSubtitle>Stromproduktion: {Math.round(prd*120)}kW</IonCardSubtitle>
                <IonCardSubtitle>Differenz: {Math.round(prd*120)-Math.round(vbr*4157)}kW</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Jahresüberblick</IonCardTitle>
                <Line data={dataJahr}/>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>Stromverbrauch: {Math.round(vbr*50000)}kW</IonCardSubtitle>
                <IonCardSubtitle>Stromproduktion: {Math.round(prd*1000)}kW</IonCardSubtitle>
                <IonCardSubtitle>Differenz: {Math.round(prd*1000)-Math.round(vbr*50000)}kW</IonCardSubtitle>
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
