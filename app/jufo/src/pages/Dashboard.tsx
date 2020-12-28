import React, { useRef, useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonPopover, IonProgressBar, IonRange, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { analytics, ellipsisHorizontal, ellipsisVertical, settingsOutline } from 'ionicons/icons'

import './Dashboard.css';

import { Line } from "react-chartjs-2"

const Dashboard: React.FC = () => {

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
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
          <IonTitle>
            So ein geiles Haus
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
          </IonList>
        </IonPopover>
        <IonGrid>
        <IonRow>
            <IonCol>
              <IonCard routerLink="/price">
                <Line data={data}/>
                <IonCardHeader>
                    <IonCardSubtitle>Der aktuelle Preis</IonCardSubtitle>
                    <IonCardTitle>30 Cent</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonCard>
                <img src="https://pixabay.com/get/52e1d1474854ac14f6d1867dda3536781536deed51557041_1920.jpg"/>
                <div>
                <div className="bar">
                  <IonProgressBar color="secondary" value={moin/100} >
                    <IonLabel slot="start">Moin</IonLabel>
                  </IonProgressBar>
                </div>
                </div>
                <IonCardHeader>
                    <IonCardSubtitle>Der Akku</IonCardSubtitle>
                    <IonCardTitle>30%</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonCard routerLink="/consum">
                    <img src="https://cdn.pixabay.com/photo/2017/09/12/13/22/photovoltaic-system-2742304_960_720.jpg"/>
                    <IonCardHeader>
                      <IonCardSubtitle>Meine Erzeugung</IonCardSubtitle>
                      <IonCardTitle>5kW</IonCardTitle>
                    </IonCardHeader>
                    </IonCard>
                  </IonCol>
                </IonRow>
                
                <IonRow>
                  <IonCol>
                    <IonCard routerLink="/consum">
                      <img src="https://cdn.pixabay.com/photo/2013/03/26/06/44/electricity-meter-96863_960_720.jpg"/>
                      <IonCardHeader>
                        <IonCardSubtitle>Meine Verbrauch</IonCardSubtitle>
                        <IonCardTitle>3kW</IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <progress className="bar" max={100} value={moin}/>
            </IonCol>
            <IonCol>
              <h2>djflajldf <IonIcon name="accesability"></IonIcon> </h2>
            </IonCol>
            <IonCol>
              <div className="bar">
                <IonProgressBar color="secondary" value={moin/100}>
                  <IonLabel slot="start">Moin</IonLabel>
                </IonProgressBar>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonRange ref={rangeElement} min={0} max={100} color="secondary" onIonChange={setRange}>
            </IonRange>
          </IonRow>

          </IonGrid>
          <h1>moin</h1>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
