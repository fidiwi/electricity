import React from 'react';
import { IonSlides, IonSlide, IonContent, IonItem, IonLabel } from '@ionic/react';
import './SlidesTest.css';

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400
};

const SlidesTest: React.FC = () => (
  <IonContent>
    <IonSlides pager={true} options={slideOpts}>
      <IonSlide>
        <h1>Slide 1</h1>
      </IonSlide>
      <IonSlide>
        <h1>Slide 2</h1>
      </IonSlide>
      <IonSlide>
        <h1>Slide 3</h1>
        <IonItem routerLink="/dashboard">
          <IonLabel>Weiter zur Dashboard</IonLabel>
        </IonItem>
      </IonSlide>
    </IonSlides>
  </IonContent>
);

export default SlidesTest;