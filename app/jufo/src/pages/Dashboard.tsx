import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonPopover, IonProgressBar, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { ellipsisVertical} from 'ionicons/icons'

import './Dashboard.css';

import { io } from "socket.io-client";
import erzeugungpic from '../bilder/erzeugung.jpg';
import verbrauchpic from '../bilder/verbrauch.jpg'
import logo from '../bilder/logo.svg'

import { Line } from "react-chartjs-2"
import { urls } from '../vars/urls';
import { prdlist, getHaustyp, tagesVbrlist, hausStrings } from '../vars/vars';

const Dashboard: React.FC = () => {

  var prd = prdlist[getHaustyp()];
  // R = 3.75; E = 18.75; M = 8.75; A = 12.5  ÜBERALL
  var hausvbr = tagesVbrlist[getHaustyp()];
  // M = 2; R = 0.37; E = 0.51; A = 2.85      NUR BEI TAGESVERBRAUCH

  useEffect(() => {
    const socket = io(urls.SOCKET_ENDPOINT);
    socket.emit("dashboard");
    socket.on("battery", (data: any) => {
      setVal(Math.round(data[23].value));
    });

    socket.on("vb", (data: any) => {
      var temp = 0;
      for(let i = 0; i <=23; i++){;
        temp = temp + data[i].value*hausvbr;
      };
      setVerbrauch(Math.round(temp));
    });
    

    socket.on("sun", (data: any) => {
      var temp = 0;
      for(let i = 0; i <=23; i++){;
        temp = temp + data[i].value*prd;
      };
      setErzeugung(Math.round(temp));
    });

    socket.emit("estatus");
    socket.on("estatus", (data: any) => {
      let karma = [];
      let hourList = [];

      for(let i = 0; i <=23; i++){
        karma.push(data[i].value);
        hourList.push(data[i].hour);
      }
      setEstatus(data[23].value);
      let newDataStatus = {
        labels: hourList,
        datasets: [
          {
            label: "Energiestatus",
            data: karma,
            fill: false,
            backgroundColor: "rgba(56,128,255,0.2)",
            borderColor: "rgba(56,128,255,1)",
            tension: 0
          },
        ],
      }
      setdata(newDataStatus);
    }
    );

    return () => {
      socket.disconnect();
    };
  }, [getHaustyp()]);

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
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: false,
        backgroundColor: "rgba(56,128,255,0.2)",
        borderColor: "rgba(56,128,255,1)",
        tension: 0
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
          <IonButtons slot="start">
            <IonIcon slot="icon-only" icon={logo} size="large" router-direction="/dashboard"/>
          </IonButtons>
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
            <IonText color="primary">  electri</IonText>
            <IonText color="dark">CITY</IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonPopover
          event={popoverState.event}
          isOpen={popoverState.showPopover}
          onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}>
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
            <IonItem href="https://github.com/fidiwi/electricity">
              <IonLabel>Quellcode</IonLabel>
            </IonItem>
          </IonList>
        </IonPopover>
        <IonGrid>
        <IonRow>
          <IonCol>
            <div className="ion-text-center"><h4>{hausStrings[getHaustyp()]}</h4></div>
          </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
              <IonCard routerLink="/battery">
                <IonCardHeader>
                    <IonCardSubtitle>Stromspeicher</IonCardSubtitle>
                    <IonCardTitle text-center>{moin} kWh | {Math.round(moin/3.5)}%</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="bar">
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
                <IonCardTitle>{estatusdic[Math.abs(Estatus)]}  | {Estatus}</IonCardTitle>
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
