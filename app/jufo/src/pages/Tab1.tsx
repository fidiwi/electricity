import React, { useRef, useState } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonProgressBar, IonRange, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { analytics } from 'ionicons/icons'
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';



const Tab1: React.FC = () => {
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
                <IonCard>
                  <img src="https://cdn.pixabay.com/photo/2016/11/27/21/42/stock-1863880_960_720.jpg"/>
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
                      <IonCard>
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
                      <IonCard>
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

export default Tab1;
