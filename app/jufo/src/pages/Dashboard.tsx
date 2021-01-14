import React, { useRef, useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonPopover, IonProgressBar, IonRange, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { analytics, ellipsisHorizontal, ellipsisVertical, settingsOutline, batteryFull, batteryDead } from 'ionicons/icons'

import './Dashboard.css';

import erzeugungpic from '../bilder/erzeugung.jpg';
import verbrauchpic from '../bilder/verbrauch.jpg'

import { Line } from "react-chartjs-2"

const Dashboard: React.FC = () => {

  const data = {
    labels: ["02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22", "24"],
    datasets: [
      {
        label: "First dataset",
        data: [3, -3, 5, 4, -4, -5, 3, 2, 3, 1, 4, -2],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
    ],
  };
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
    
};

  const rangeElement = useRef<HTMLIonRangeElement>(null);
  
  const [moin, setVal] = useState<number>(0);

  const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });

  const setRange = () => {
    setVal(+rangeElement.current!.value);
  };
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
          <IonTitle color="primary">
            <IonText color="primary">electri</IonText>
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
        <IonGrid>
        <IonRow>
            <IonCol>
              <IonCard routerLink="/battery">
                <IonCardHeader>
                    <IonCardSubtitle>Stromspeicher</IonCardSubtitle>
                    <IonCardTitle text-center>{Math.round(350*(moin/100))} kWh | {moin}%</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div  className="bar">
                    <IonProgressBar color="success" value={moin/100}/>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonCard routerLink="/price">
                <Line data={data}/>
                <IonCardHeader>
                  <IonCardSubtitle>Mein Energiekarma</IonCardSubtitle>
                  <IonCardTitle>Sehr gut</IonCardTitle>
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
                  <IonCardTitle>5kW</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard routerLink="/consum">
                <img src={verbrauchpic}/>
                <IonCardHeader>
                  <IonCardSubtitle>Meine Verbrauch</IonCardSubtitle>
                  <IonCardTitle>3kW</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonRange ref={rangeElement} min={0} max={100} color="secondary" onIonChange={setRange}>
              <IonIcon slot="start" icon={batteryDead} />
              <IonIcon slot="end" icon={batteryFull} />
            </IonRange>
          </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
