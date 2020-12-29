import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonProgressBar, IonRange, IonTitle, IonToolbar } from '@ionic/react';
import { options } from 'ionicons/icons';
import React, { useRef, useState } from 'react';

import { Line } from "react-chartjs-2"

const Battery: React.FC = () => {

    const rangeElement = useRef<HTMLIonRangeElement>(null);

    const [Prozent, setProzent] = useState<number>(0);
    
    const setRange = () => {
        setProzent(+rangeElement.current!.value);
    };

    const Akkustand = {
        labels: ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22", "24"],
        datasets: [
          {
            label: "Akkustand",
            data: [33, 53, 85, 41, 44, 65, 33, 25, 35, 51, 54, 76, 12],
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(0,204,0,1)"
          }
        ],
    };

    const options = {
        scales: {
            yAxes: [
            {
                ticks: {
                suggestedMin: 0,
                suggestedMax: 100
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
                    <IonBackButton defaultHref="/dashboard" />
                </IonButtons>
                <IonTitle>Stromspeicher</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard routerLink="/battery">
                    <IonCardHeader>
                        <IonCardSubtitle>Stromspeicher</IonCardSubtitle>
                        <IonCardTitle text-center>{Math.round(350*(Prozent/100))} kWh | {Prozent}%</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                    <div  className="bar">
                        <IonProgressBar color="success" value={Prozent/100}/>
                    </div>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Akkustand</IonCardTitle>
                    <Line data={Akkustand} options={options}/>
                    <IonCardSubtitle>Aktueller Stand: {Math.round(3.5*Prozent)} kWh | {Prozent}%</IonCardSubtitle>
                </IonCardHeader>
                </IonCard>
                <IonRange ref={rangeElement} min={0} max={100} color="secondary" onIonChange={setRange}>
            </IonRange>
            </IonContent>
        </IonPage>
    );
};
  
export default Battery;