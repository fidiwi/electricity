import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

import { Line } from "react-chartjs-2"

const Tab3: React.FC = () => {
  const dataJahr = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65, 33, 25, 35, 51, 54, 76],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76, 33, 53, 85, 41, 44, 65],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

  const dataMonat = {
    labels: ["01", "03", "06", "09", "12", "15", "18", "21", "24", "27", "30", "31"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65, 33, 25, 35, 51, 54, 76],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76, 33, 53, 85, 41, 44, 65],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

  const dataTag = {
    labels: ["02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22", "24"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65, 33, 25, 35, 51, 54, 76],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76, 33, 53, 85, 41, 44, 65],
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
            <IonTitle>Stromverbrauch udn Stromerzeugung</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
                <IonCol>
                  <IonCard>
                    <Line data={data}/>
                    <IonCardHeader>
                        <IonCardSubtitle>Jahresüberblick</IonCardSubtitle>
                        <IonCardTitle>3400kW</IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 3</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer name="Tab 3 page" />
        </IonContent>
      </IonPage>
  );
};

export default Tab3;
