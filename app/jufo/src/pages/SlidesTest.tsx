import React from 'react';
import { IonSlides, IonSlide, IonContent, IonItem, IonLabel, IonCard, IonButton, IonIcon, IonText } from '@ionic/react';
import './SlidesTest.css';
import { arrowForward } from 'ionicons/icons';
import logo from '../bilder/logo.svg'
import modell from '../bilder/modell.jpg'

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
        <h1><IonText color="primary">  electri</IonText>
        <IonText color="dark">CITY</IonText></h1>
        <img src={logo}/>
        <h2>Willkommen</h2>
        <p>In diesen kurzen <b>Einführung</b> lernen sie unsere App kennen.</p>
      </IonSlide>
      <IonSlide>
        <img src={modell}/>
        <h2>What is Ionic?</h2>
        <p><b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.</p>
      </IonSlide>
      <IonSlide>
        <h2>Ready to Play?</h2>
        <IonButton routerLink="/dashboard" fill="clear">Weiter zur Dashboard <IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>
      </IonSlide>
    </IonSlides>
  </IonContent>
);

export default SlidesTest;