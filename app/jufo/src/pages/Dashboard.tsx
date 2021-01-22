import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonPopover, IonProgressBar, IonRange, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { analytics, ellipsisHorizontal, ellipsisVertical, settingsOutline, batteryFull, batteryDead } from 'ionicons/icons'

import './Dashboard.css';

import { io, Socket } from "socket.io-client";

import erzeugungpic from '../bilder/erzeugung.jpg';
import verbrauchpic from '../bilder/verbrauch.jpg'
import logo from '../bilder/logo.svg'

import { Line } from "react-chartjs-2"
import { urls } from '../vars/urls';
import { changeHaustyp, getHaustyp, hausStrings } from '../vars/vars';

const Dashboard: React.FC = () => {

  var prd = 12.6
  // R = 3.75; E = 18.75; M = 8.75; A = 12.5  ÜBERALL
  var hausvbr = 2.85;
  // M = 2; R = 0.37; E = 0.51; A = 2.85      NUR BEI TAGESVERBRAUCH

  useEffect(() => {
    const socket = io(urls.SOCKET_ENDPOINT);
    socket.emit("dashboard");
    socket.on("battery", (data: any) => {
      setVal(data[23]);
    });

    socket.on("vb", (data: any) => {
      var temp = 0;
      for(let hour = 0; hour <=23; hour++){;
        temp = temp + data[hour]*hausvbr;
      };
      setVerbrauch(Math.round(temp));
    });
    

    socket.on("sun", (data: any) => {
      var temp = 0;
      for(let hour = 0; hour <=23; hour++){;
        temp = temp + data[hour]*prd;
      };
      setErzeugung(Math.round(temp));
    });

    socket.emit("estatus");
    socket.on("estatus", (data: any) => {
      console.log("api received:");
      console.log(data);
      let karma = [];
      let hourList = Object.keys(data);

      for(let hour = 0; hour <=23; hour++){
        karma.push(data[hour]);
      }
      setEstatus(data[23]);
      console.log(karma);
      let newDataStatus = {
        labels: hourList,
        datasets: [
          {
            label: "Energiestatus",
            data: karma,
            fill: false,
            backgroundColor: "rgba(56,128,255,0.2)",
            borderColor: "rgba(56,128,255,1)"
          },
        ],
      }
      setdata(newDataStatus);

    }
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  var estatusdic = ["Optimal", "Sehr gut", "Gut", "In Ordnung", "Grenzwertig", "Kritisch"];

  const [moin, setVal] = useState<number>(0);

  const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });

  const [Verbrauch, setVerbrauch] = useState<number>(0);

  const [Erzeugung, setErzeugung] = useState<number>(0);

  const [Estatus, setEstatus] = useState<number>(0);

  const [data, setdata] = useState({
    labels: ["00", "01", "02", "03", "04", "05","06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
    datasets: [
      {
        label: "Energiestatus",
        data: [-4, -4, -4, -4, -4, -4, -3, -3, 0, 0, 1, 1, 3, 3, 3, 3, 1, 1, 0, 0, -1, -1, -2, -2],
        fill: false,
        backgroundColor: "rgba(56,128,255,0.2)",
        borderColor: "rgba(56,128,255,1)"
      },
    ],
  });

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
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={
            (e: any) => {
            e.persist();
            setShowPopover({ showPopover: true, event: e })
            }}>
              <IonIcon slot="icon-only" icon={ellipsisVertical}/>
            </IonButton>
          </IonButtons>
          <IonTitle>
            <IonIcon icon={logo} size="large"/>
            <IonText color="primary">  electri</IonText>
            <IonText color="dark">CITY</IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonPopover
          event={popoverState.event}
          isOpen={popoverState.showPopover}
          onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
        >
          <IonList onClick={
              (e: any) => {
                e.persist();
                setShowPopover({showPopover:false, event: e})
              }}>
            <IonItem routerLink="/settings">
              <IonLabel>Einstellungen</IonLabel>
            </IonItem>
            <IonItem routerLink="/company">
              <IonLabel>Firmenansicht</IonLabel>
            </IonItem>
            <IonItem routerLink="/manipulateModel">
              <IonLabel>Modellwerte verändern</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Schließen</IonLabel>
            </IonItem>
          </IonList>
        </IonPopover>
        <IonItemDivider text-center>{hausStrings[getHaustyp()]}</IonItemDivider>
        <IonGrid>
        <IonRow>
            <IonCol>
              <IonCard routerLink="/battery">
                <IonCardHeader>
                    <IonCardSubtitle>Stromspeicher</IonCardSubtitle>
                    <IonCardTitle text-center>{moin} kWh | {Math.round(moin/3.5)}%</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div  className="bar">
                    <IonProgressBar color="success" value={moin/350}/>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonCard routerLink="/price">
                <Line data={data} options={options}/>
                <IonCardHeader>
                  <IonCardSubtitle>Energiestatus</IonCardSubtitle>
                  <IonCardTitle>{estatusdic[Math.abs(Estatus)]} | {Estatus}</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonCard routerLink="/consum">
                <img src={erzeugungpic}/>
                <IonCardHeader>
                  <IonCardSubtitle>Meine Erzeugung</IonCardSubtitle>
                  <IonCardTitle>{Erzeugung}kW</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard routerLink="/consum">
                <img src={verbrauchpic}/>
                <IonCardHeader>
                  <IonCardSubtitle>Mein Verbrauch</IonCardSubtitle>
                  <IonCardTitle>{Verbrauch}kW</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
