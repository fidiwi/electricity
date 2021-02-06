import React from 'react';
import { IonSlides, IonSlide, IonContent, IonItem, IonLabel, IonCard, IonButton, IonIcon, IonText } from '@ionic/react';
import './SlidesTest.css';
import { arrowForward } from 'ionicons/icons';
import logo from '../bilder/logo.svg'
import modell from '../bilder/modell.jpg'
import schieberegler from '../bilder/schieberegler.jpg'
import dashboard from '../bilder/dashboard.jpg'

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400
};

const SlidesTest: React.FC = () => (
  <IonContent fullscreen class="ion-padding">
    <IonSlides pager={false} options={slideOpts}>
      <IonSlide>
        <h1><IonText color="primary">  electri</IonText>
        <IonText color="dark">CITY</IonText></h1>
        <img src={logo}/>
        <h2>Willkommen</h2>
        <p>In diesen kurzen <b>Einführung</b> lernen sie unsere App kennen.</p>
      </IonSlide>
      <IonSlide>
        <img src={modell}/>
        <h2>Die App</h2>
        <p>Mit der <b>App</b> können sie mit dem <b>Modell</b> interagieren. Die Werte und Graphen zeigen die aktuellen Daten der Siedlung, da die App und die Siedlung mit einem <b>Server</b> in Verbindung stehen.</p>
      </IonSlide>
      <IonSlide>
        <img src={schieberegler}/>
        <h2>Interaktion mit der App</h2>
        <p>Mit den <b>Schieberegler</b> können Sie die Modellwerte der App ändern. Dafür müssen Sie das von uns genannte <b>Passwort</b> eingeben. Das gleiche gilt für die <b>Einstellungen</b>, wenn Sie die Grundstücke ändern möchten.</p>
      </IonSlide>
      <IonSlide>
        <img src={dashboard}/>
        <h2>Viel Spaß beim Ausprobieren!</h2>
        <IonButton routerLink="/dashboard" fill="clear">Weiter zur Dashboard <IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>
        <p><b>Info:</b> Es kann manchmal ein paar Sekunden dauern, bis Ihr Smartphone die Werte vom Server erhält. Wie bitten Sie um etwas Geduld.</p>
      </IonSlide>
    </IonSlides>
  </IonContent>
);

export default SlidesTest;