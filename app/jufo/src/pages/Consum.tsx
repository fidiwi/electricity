import React, { useRef, useState } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Consum.css';

import { Line } from "react-chartjs-2"

const Consum: React.FC = () => {
  const dataJahr = {
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
        data: [33, 25, 35, 51, 54, 76, 33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(0,204,0,0.2)",
        borderColor: "rgba(0,204,0,1)"
      }
    ]
  };

  const dataMonat = {
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
      }
    ]
  };

  const dataTag = {
    labels: ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22", "24"],
    datasets: [
      {
        label: "Stromverbrauch in kW",
        data: [33, 53, 85, 41, 44, 65, 33, 25, 35, 51, 54, 76, 12],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(204,0,0,1)"
      },
      {
        label: "Stromproduktion in kW",
        data: [33, 25, 35, 51, 54, 76, 33, 53, 85, 41, 44, 65, 23],
        fill: true,
        backgroundColor: "rgba(0,204,0,0.2)",
        borderColor: "rgba(0,204,0,1)"
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Stromverbrauch und Stromerzeugung</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
        <IonRow>
          <IonCol>
            <IonCard>
              <Line data={dataTag}/>
              <IonCardHeader>
                  <IonCardSubtitle>Tagesüberblick</IonCardSubtitle>
                  <IonCardTitle>30kW</IonCardTitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <Line data={dataMonat}/>
              <IonCardHeader>
                  <IonCardSubtitle>Monatsüberblick</IonCardSubtitle>
                  <IonCardTitle>300kW</IonCardTitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <Line data={dataJahr}/>
              <IonCardHeader>
                  <IonCardSubtitle>Jahresüberblick</IonCardSubtitle>
                  <IonCardTitle>3400kW</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Consum;
