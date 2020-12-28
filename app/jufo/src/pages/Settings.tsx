import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonRange, IonLabel, IonIcon, IonItemDivider } from '@ionic/react';
import { cloud, sunny } from 'ionicons/icons';
import { home } from 'ionicons/icons';
import { RangeValue } from '@ionic/core';

export const Settings: React.FC = () => {

  const [value, setValue] = useState(0);
  const [rangeValue, setRangeValue] = useState<{
    lower: number;
    upper: number;
  }>({ lower: 0, upper: 0 });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Schieberegler</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItemDivider>Häuserverbauch</IonItemDivider>
          <IonItem>
            <IonRange min={0} max={100} step={1}>
              <IonIcon size="small" slot="start" icon={home} />
              <IonIcon slot="end" icon={home} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Sonne</IonItemDivider>
          <IonItem>
            <IonRange min={0} max={100} step={1}>
              <IonIcon size="small" slot="start" icon={sunny} />
              <IonIcon slot="end" icon={sunny} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Firmaverbrauch</IonItemDivider>
          <IonItem>
            <IonRange min={0} max={100} step={1}>
              <IonIcon size="small" slot="start" icon={sunny} />
              <IonIcon slot="end" icon={sunny} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Wind</IonItemDivider>
          <IonItem>
            <IonRange min={0} max={100} step={1}>
              <IonIcon size="small" slot="start" icon={cloud} />
              <IonIcon slot="end" icon={cloud} />
            </IonRange>
          </IonItem>
          <IonItemDivider>Vorhersage</IonItemDivider>
          <IonItem>
            <IonRange min={0} max={100} step={1}>
              <IonIcon size="small" slot="start" icon={sunny} />
              <IonIcon slot="end" icon={sunny} />
            </IonRange>
          </IonItem>
          
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;