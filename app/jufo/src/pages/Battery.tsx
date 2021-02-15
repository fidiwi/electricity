import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonProgressBar, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

import { Line, Pie } from "react-chartjs-2"
import { urls } from '../vars/urls';

const Battery: React.FC = () => {
    useEffect(() => {
        const socket = io(urls.SOCKET_ENDPOINT);
        socket.emit("battery");
        socket.on("battery", (data: any) => {
            let batterylist = [];
            let hourList = [];
            for(let i = 0; i <=23; i++){
                batterylist.push(Math.round(data[i].value/3.5*100)/100);
                hourList.push(data[i].hour);
              }
        setProzent(Math.round(data[23].value));
          
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
        socket.on("sender", (data: any) => {
            let abgebendata = [];
            let annehmendata = [];
            for(let i = 1; i <=7; i++){
                abgebendata.push(Math.round(data[i].abgabe*100)/100);
                annehmendata.push(Math.round(data[i].annahme*100)/100);
              }
            let abgebenfinal = {
              type: 'pie',
              datasets: [{
                  data: abgebendata,
                  backgroundColor: ['rgba(255, 99, 132)',
                                  'rgba(54, 162, 235)',
                                  'rgba(255, 206, 86)',
                                  'rgba(75, 192, 192)',
                                  'rgba(153, 102, 255)',
                                  'rgba(255, 159, 64)',
                                  'rgba(21, 160, 14)'],
                  borderColor: "rgba(255,255,255)"
              }],
            
              labels: [
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7'
              ]
            }
            let annehmenfinal = {
                type: 'pie',
                datasets: [{
                    data: annehmendata,
                    backgroundColor: ['rgba(255, 99, 132)',
                                    'rgba(54, 162, 235)',
                                    'rgba(255, 206, 86)',
                                    'rgba(75, 192, 192)',
                                    'rgba(153, 102, 255)',
                                    'rgba(255, 159, 64)',
                                    'rgba(21, 160, 14)'],
                    borderColor: "rgba(255,255,255)"
                }],
              
                labels: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7'
                ]
              }
              setSender(abgebenfinal);
              setReserver(annehmenfinal);
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
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(0,204,0,1)"
          }
        ],
    });

    const [sender, setSender] = useState({
        type: 'pie',
        datasets: [{
            data: [1, 1, 1, 1, 1, 1, 1],
            backgroundColor: ['rgba(255, 99, 132)',
                            'rgba(54, 162, 235)',
                            'rgba(255, 206, 86)',
                            'rgba(75, 192, 192)',
                            'rgba(153, 102, 255)',
                            'rgba(255, 159, 64)',
                            'rgba(21, 160, 14)'],
            borderColor: "rgba(255,255,255)"
        }],
    
        labels: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7'
        ]

    })

    const [receiver, setReserver] = useState({
        type: 'pie',
        datasets: [{
            data: [1, 1, 1, 1, 1, 1, 1],
            backgroundColor: ['rgba(255, 99, 132)',
                            'rgba(54, 162, 235)',
                            'rgba(255, 206, 86)',
                            'rgba(75, 192, 192)',
                            'rgba(153, 102, 255)',
                            'rgba(255, 159, 64)',
                            'rgba(21, 160, 14)'],
            borderColor: "rgba(255,255,255)"
        }],
    
        labels: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7'
        ]

    })

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
                <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Zusammensetzung des Speicherstroms</IonCardTitle>
                    <Pie data={sender}/>
                </IonCardHeader>
                </IonCard>
                <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Abnehmer des Speicherstroms</IonCardTitle>
                    <Pie data={receiver}/>
                </IonCardHeader>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};
  
export default Battery;