import React from 'react';
import { IonSlides, IonSlide, IonContent, IonItem, IonLabel, IonCard, IonButton, IonIcon, IonText } from '@ionic/react';
import './SlidesTest.css';
import { arrowForward } from 'ionicons/icons';
import logo from '../bilder/logo.svg'
import modell from '../bilder/modell.jpg'
import schieberegler from '../bilder/schieberegler.jpg'
import dashboard from '../bilder/dashboard.jpg'
import server from '../bilder/server.png'

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
        <p>In dieser kurzen <b>Einführung</b> lernen sie unsere App näher kennen.</p>
      </IonSlide>
      <IonSlide>
        <img src={modell}/>
        <h2>Die App</h2>
        <p>Über die <b>App</b> können sie mit dem <b>Modell</b> interagieren. Die Werte und Graphen zeigen die aktuellen Daten der Siedlung, da die App über den <b>Server</b> mit dieser in Verbindung steht.</p>
        <img src={server}/>
      </IonSlide>
      <IonSlide>
        <img src={schieberegler}/>
        <h2>Benutzung mit der App</h2>
        <p>Mit den <b>Schiebereglern</b> können Sie die Modellwerte ändern. Dafür müssen Sie das von uns in der Präsentation genannte <b>Passwort</b> eingeben. Das Gleiche gilt für die <b>Einstellungen</b>, wenn Sie die Grundstücke ändern möchten.</p>
      </IonSlide>
      <IonSlide>
        <img src={dashboard}/>
        <h2>Viel Spaß beim Ausprobieren!</h2>
        <IonButton routerLink="/dashboard" fill="clear">Weiter zum Dashboard <IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>
        <p><b>Info:</b> Es kann manchmal ein paar Sekunden dauern, bis Ihr Smartphone die Werte vom Server erhält. Wie bitten Sie daher um etwas Geduld.</p>
      </IonSlide>
    </IonSlides>
  </IonContent>
);

export default SlidesTest;