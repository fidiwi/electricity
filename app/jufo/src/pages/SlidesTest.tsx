import React from 'react';
import { IonSlides, IonSlide, IonContent, IonItem, IonLabel, IonCard, IonButton, IonIcon } from '@ionic/react';
import './SlidesTest.css';
import { arrowForward } from 'ionicons/icons';

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400
};

const SlidesTest: React.FC = () => (
  <IonContent fullscreen class="ion-padding">
    <IonSlides pager={true} options={slideOpts}>
      <IonSlide>
        <img src="https://hackr.io/blog/ionic-framework/thumbnail/large"/>
      </IonSlide>
      <IonSlide>
      <h2>What is Ionic?</h2>
          <p><b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.</p>
      </IonSlide>
      <IonSlide>
        <IonButton routerLink="/dashboard" fill="clear">Weiter zur Dashboard <IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>
      </IonSlide>
    </IonSlides>
  </IonContent>
);

export default SlidesTest;