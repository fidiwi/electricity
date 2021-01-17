import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonProgressBar, IonRange, IonTitle, IonToolbar } from '@ionic/react';
import { options, batteryDead, batteryFull } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from "socket.io-client";

import { Line } from "react-chartjs-2"
import { urls } from '../vars/vars';

const Battery: React.FC = () => {
    useEffect(() => {
        const socket = io(urls.SOCKET_ENDPOINT);
        socket.emit("battery");
        socket.on("battery", (data: any) => {
            let batterylist = [];
            for(let hour = 0; hour <=23; hour++){
                batterylist.push(Math.round(data[hour]/3.5*100)/100);
              }
              console.log(batterylist);
          setProzent(data[23]);
          let hourList: Array<string> = Object.keys(data);
          
          let batterylistfinal = {
            labels: hourList,
            datasets: [
            {
                label: "Akkustand",
                data: batterylist,
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(0,204,0,1)"
            }
            ],
        }
        setAkkusstand(batterylistfinal);

        });
    
        return () => {
          socket.disconnect();
        };
        }, []);

    const [Prozent, setProzent] = useState<number>(0);

    const [Akkustand, setAkkusstand] = useState({
        labels: ["00", "01", "02", "03", "04", "05","06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], // hourList
        datasets: [
          {
            label: "Akkustand",
            data: [33, 53, 85, 41, 44, 65, 33, 25, 35, 51, 54, 76, 12, 33, 53, 85, 41, 44, 65, 33, 25, 35, 51, 54, 76, 12],
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(0,204,0,1)"
          }
        ],
    });

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
                        <IonCardTitle text-center>{Prozent} kWh | {Math.round(Prozent/3.5)}%</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                    <div  className="bar">
                        <IonProgressBar color="success" value={Math.round(Prozent/3.5)/100}/>
                    </div>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Akkustand</IonCardTitle>
                    <Line data={Akkustand} options={options}/>
                    <IonCardSubtitle>Aktueller Stand: {Prozent} kWh | {Math.round(Prozent/3.5)}%</IonCardSubtitle>
                </IonCardHeader>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};
  
export default Battery;