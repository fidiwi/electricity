import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Dashboard from './pages/Dashboard';
import Price from './pages/Price';
import Consum from './pages/Consum';
import Settings from './pages/Settings';
import Company from './pages/Company';
import ModelManipulation from './pages/ModelManipulation';
import Battery from './pages/Battery';
import SlidesTest from './pages/SlidesTest';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


const App: React.FC = () => {
  

  return(
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/price" component={Price} />
          <Route path="/consum" component={Consum} />
          <Route path="/settings" component={Settings} />
          <Route path="/company" component={Company} />
          <Route path="/manipulateModel" component={ModelManipulation} />
          <Route path="/battery" component={Battery} />
          <Route path="/slidestest" component={SlidesTest} />
          <Redirect exact from="/" to="/slidestest" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
