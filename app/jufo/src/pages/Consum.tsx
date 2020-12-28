import React, { useRef, useState } from 'react';
import { IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Consum.css';

import { Line } from "react-chartjs-2"


const Consum: React.FC = () => {

  const [Jahresgraph, setJahr] = useState<object>({});

  const [Wochengraph, setWoche] = useState<object>({});

  const [Monatsgraph, setMonat] = useState<object>({});

  const [Tagesgraph, setTag] = useState<object>({});

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
      },
      {
        label: "Differenz",
        data: [-33, 53, 5, -41, 24, 5, 51, 54, 76, -33, 53, 85, -41],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  const dataWoche = {
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
      },
      {
        label: "Differenz",
        data: [-33, 53, 5, -41, 24, 5, 51, 54, 76, -33, 53, 85, -41],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };
  
  
  
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
      <IonContent fullscreen>
        <IonGrid>
        <IonRow>
          <IonCol>
            <IonCard>
              <Line data={dataTag}/>
              <IonCardHeader>
                  <IonCardTitle>Tagesüberblick</IonCardTitle>
                  <IonCardSubtitle>Stromberbrauch: 12kW</IonCardSubtitle>
                  <IonCardSubtitle>Stromproduktion: 12kW</IonCardSubtitle>
                  <IonCardSubtitle>Differenz: 12kW</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <Line data={dataWoche}/>
              <IonCardHeader>
                  <IonCardTitle>Wochenüberblick</IonCardTitle>
                  <IonCardSubtitle>Stromberbrauch: 75kW</IonCardSubtitle>
                  <IonCardSubtitle>Stromproduktion: 75kW</IonCardSubtitle>
                  <IonCardSubtitle>Differenz: 75kW</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <Line data={dataMonat}/>
              <IonCardHeader>
                  <IonCardTitle>Monatsüberblick</IonCardTitle>
                  <IonCardSubtitle>Stromberbrauch: 300kW</IonCardSubtitle>
                  <IonCardSubtitle>Stromproduktion: 300kW</IonCardSubtitle>
                  <IonCardSubtitle>Differenz: 300kW</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <Line data={dataJahr}/>
              <IonCardHeader>
                  <IonCardTitle>Jahresüberblick</IonCardTitle>
                  <IonCardSubtitle>Stromberbrauch: 3400kW</IonCardSubtitle>
                  <IonCardSubtitle>Stromproduktion: 3400kW</IonCardSubtitle>
                  <IonCardSubtitle>Differenz: 3400kW</IonCardSubtitle>
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
