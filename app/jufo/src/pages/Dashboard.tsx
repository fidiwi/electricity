import React, { useRef, useState } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonProgressBar, IonRange, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { analytics } from 'ionicons/icons'

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

  const setRange = () => {
    setVal(+rangeElement.current!.value);
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              So ein geiles Haus
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
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
                  <IonProgressBar className="bar" color="secondary" value={moin/100}>
                  </IonProgressBar>
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
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
