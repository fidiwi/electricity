(this.webpackJsonpjufo=this.webpackJsonpjufo||[]).push([[1],{114:function(e,t,a){e.exports=a.p+"static/media/erzeugung.7d2cbc72.jpg"},115:function(e,t,a){e.exports=a.p+"static/media/verbrauch.d530d00d.jpg"},116:function(e,t,a){e.exports=a.p+"static/media/logo.d736cfee.svg"},121:function(e,t,a){e.exports=a(272)},127:function(e,t,a){var n={"./ion-action-sheet.entry.js":[274,5],"./ion-alert.entry.js":[275,6],"./ion-app_8.entry.js":[276,7],"./ion-avatar_3.entry.js":[277,17],"./ion-back-button.entry.js":[278,18],"./ion-backdrop.entry.js":[279,43],"./ion-button_2.entry.js":[280,19],"./ion-card_5.entry.js":[281,20],"./ion-checkbox.entry.js":[282,21],"./ion-chip.entry.js":[283,22],"./ion-col_3.entry.js":[284,44],"./ion-datetime_3.entry.js":[285,10],"./ion-fab_3.entry.js":[286,23],"./ion-img.entry.js":[287,45],"./ion-infinite-scroll_2.entry.js":[288,46],"./ion-input.entry.js":[289,24],"./ion-item-option_3.entry.js":[290,25],"./ion-item_8.entry.js":[291,26],"./ion-loading.entry.js":[292,27],"./ion-menu_3.entry.js":[293,28],"./ion-modal.entry.js":[294,8],"./ion-nav_2.entry.js":[295,14],"./ion-popover.entry.js":[296,9],"./ion-progress-bar.entry.js":[297,29],"./ion-radio_2.entry.js":[298,30],"./ion-range.entry.js":[299,31],"./ion-refresher_2.entry.js":[300,11],"./ion-reorder_2.entry.js":[301,16],"./ion-ripple-effect.entry.js":[302,47],"./ion-route_4.entry.js":[303,32],"./ion-searchbar.entry.js":[304,33],"./ion-segment_2.entry.js":[305,34],"./ion-select_3.entry.js":[306,35],"./ion-slide_2.entry.js":[307,48],"./ion-spinner.entry.js":[308,13],"./ion-split-pane.entry.js":[309,49],"./ion-tab-bar_2.entry.js":[310,36],"./ion-tab_2.entry.js":[311,15],"./ion-text.entry.js":[312,37],"./ion-textarea.entry.js":[313,38],"./ion-toast.entry.js":[314,39],"./ion-toggle.entry.js":[315,12],"./ion-virtual-scroll.entry.js":[316,50]};function r(e){if(!a.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],r=t[0];return a.e(t[1]).then((function(){return a(r)}))}r.keys=function(){return Object.keys(n)},r.id=127,e.exports=r},129:function(e,t,a){var n={"./ion-icon.entry.js":[318,57]};function r(e){if(!a.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],r=t[0];return a.e(t[1]).then((function(){return a(r)}))}r.keys=function(){return Object.keys(n)},r.id=129,e.exports=r},134:function(e,t,a){},258:function(e,t,a){},259:function(e,t,a){},260:function(e,t,a){},271:function(e,t,a){},272:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(54),o=a.n(l),u=a(22),c=a(1),s=a(112),i=a(3),m=a(10),d=(a(134),a(13)),b=a(114),E=a.n(b),h=a(115),g=a.n(h),f=a(116),v=a.n(f),j=a(16),k="http://blattgruen.eu:4001",p=2,O=function(){return p},M=["Apartmenthaus","Reihenhaus","Mehrfamilienhaus","Einfamilienhaus"],y=[.5,.064,.346,.09],C=[12.5,3.75,8.75,18.75],S=[2.85,.37,2,.51],W=function(){var e=C[O()],t=S[O()];Object(n.useEffect)((function(){var a=Object(d.io)(k);return a.emit("dashboard"),a.on("battery",(function(e){u(e[23].value)})),a.on("vb",(function(e){for(var a=0,n=0;n<=23;n++)a+=e[n].value*t;x(Math.round(a))})),a.on("sun",(function(t){for(var a=0,n=0;n<=23;n++)a+=t[n].value*e;A(Math.round(a))})),a.emit("estatus"),a.on("estatus",(function(e){console.log("api received:"),console.log(e);for(var t=[],a=[],n=0;n<=23;n++)t.push(e[n].value),a.push(e[n].hour);P(e[23].value),console.log(t),G({labels:a,datasets:[{label:"Energiestatus",data:t,fill:!1,backgroundColor:"rgba(56,128,255,0.2)",borderColor:"rgba(56,128,255,1)",tension:0}]})})),function(){a.disconnect()}}),[O()]);var a=Object(n.useState)(0),l=Object(i.a)(a,2),o=l[0],u=l[1],s=Object(n.useState)({showPopover:!1,event:void 0}),b=Object(i.a)(s,2),h=b[0],f=b[1],p=Object(n.useState)(0),y=Object(i.a)(p,2),W=y[0],x=y[1],w=Object(n.useState)(0),D=Object(i.a)(w,2),_=D[0],A=D[1],q=Object(n.useState)(0),I=Object(i.a)(q,2),H=I[0],P=I[1],T=Object(n.useState)({labels:["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],datasets:[{label:"Energiestatus",data:[-4,-4,-4,-4,-4,-4,-3,-3,0,0,1,1,3,3,3,3,1,1,0,0,-1,-1,-2,-2],fill:!1,backgroundColor:"rgba(56,128,255,0.2)",borderColor:"rgba(56,128,255,1)",tension:0}]}),z=Object(i.a)(T,2),L=z[0],G=z[1];return r.a.createElement(c.v,null,r.a.createElement(c.n,null,r.a.createElement(c.G,null,r.a.createElement(c.d,{slot:"start"},r.a.createElement(c.o,{slot:"icon-only",icon:v.a,size:"large","router-direction":"/dashboard"})),r.a.createElement(c.d,{slot:"end"},r.a.createElement(c.c,{onClick:function(e){e.persist(),f({showPopover:!0,event:e})}},r.a.createElement(c.o,{slot:"icon-only",icon:m.k}))),r.a.createElement(c.F,null,r.a.createElement(c.E,{color:"primary"},"  electri"),r.a.createElement(c.E,{color:"dark"},"CITY")))),r.a.createElement(c.k,{fullscreen:!0},r.a.createElement(c.w,{event:h.event,isOpen:h.showPopover,onDidDismiss:function(){return f({showPopover:!1,event:void 0})}},r.a.createElement(c.t,{onClick:function(e){e.persist(),f({showPopover:!1,event:e})}},r.a.createElement(c.q,{routerLink:"/settings"},r.a.createElement(c.s,null,"Einstellungen")),r.a.createElement(c.q,{routerLink:"/company"},r.a.createElement(c.s,null,"Firmenansicht")),r.a.createElement(c.q,{routerLink:"/manipulateModel"},r.a.createElement(c.s,null,"Modellwerte ver\xe4ndern")),r.a.createElement(c.q,{href:"https://github.com/fidiwi/electricity"},r.a.createElement(c.s,null,"Quellcode")))),r.a.createElement(c.m,null,r.a.createElement(c.B,null,r.a.createElement(c.j,null,r.a.createElement("div",{className:"ion-text-center"},r.a.createElement("h4",null,M[O()])))),r.a.createElement(c.B,null,r.a.createElement(c.j,null,r.a.createElement(c.e,{routerLink:"/battery"},r.a.createElement(c.g,null,r.a.createElement(c.h,null,"Stromspeicher"),r.a.createElement(c.i,{"text-center":!0},o," kWh | ",Math.round(o/3.5),"%")),r.a.createElement(c.f,null,r.a.createElement("div",{className:"bar"},r.a.createElement(c.x,{color:"success",value:o/350})))))),r.a.createElement(c.B,null,r.a.createElement(c.j,null,r.a.createElement(c.e,{routerLink:"/price"},r.a.createElement(j.Line,{data:L,options:{scales:{yAxes:[{ticks:{suggestedMin:-5,suggestedMax:5}}]}}}),r.a.createElement(c.g,null,r.a.createElement(c.h,null,"Energiestatus"),r.a.createElement(c.i,null,["Optimal","Sehr gut","Gut","In Ordnung","Grenzwertig","Kritisch"][Math.abs(H)],"  | ",H))))),r.a.createElement(c.B,null,r.a.createElement(c.j,null,r.a.createElement(c.e,{routerLink:"/consum"},r.a.createElement("img",{src:E.a}),r.a.createElement(c.g,null,r.a.createElement(c.h,null,"Meine Erzeugung"),r.a.createElement(c.i,null,_,"kW")))),r.a.createElement(c.j,null,r.a.createElement(c.e,{routerLink:"/consum"},r.a.createElement("img",{src:g.a}),r.a.createElement(c.g,null,r.a.createElement(c.h,null,"Mein Verbrauch"),r.a.createElement(c.i,null,W,"kW"))))))))},x=(a(258),function(){var e=Object(n.useState)({labels:["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],datasets:[{label:"Energiestatus",data:[0,0,0,0,0,0,0,0,0,0,0,1,3,3,3,0,0,0,0,0,-1,-1,-2,-2],fill:!1,backgroundColor:"rgba(56,128,255,0.2)",borderColor:"rgba(56,128,255,1)",tension:0}]}),t=Object(i.a)(e,2),a=t[0],l=t[1],o=Object(n.useState)(Object(d.io)()),u=Object(i.a)(o,2),s=u[0],m=u[1];Object(n.useEffect)((function(){var e=Object(d.io)(k);return m(e),e.emit("estatus"),e.on("estatus",(function(e){for(var t=[],a=[],n=0;n<=23;n++)t.push(e[n].value),a.push(e[n].hour);O(e[23].value),l({labels:a,datasets:[{label:"Energiestatus",data:t,fill:!1,backgroundColor:"rgba(56,128,255,0.2)",borderColor:"rgba(56,128,255,1)",tension:0}]})})),e.on("hl",(function(e){S(e.abgabe),D(e.annahme)})),e.on("cars",(function(e){console.log(e),I(e.start),z(e.end),g(e.id)})),function(){e.disconnect()}}),[]);var b=Object(n.useState)(0),E=Object(i.a)(b,2),h=E[0],g=E[1],f=Object(n.useState)(0),v=Object(i.a)(f,2),p=v[0],O=v[1],M=Object(n.useState)(0),y=Object(i.a)(M,2),C=y[0],S=y[1],W=Object(n.useState)(0),x=Object(i.a)(W,2),w=x[0],D=x[1],_=Object(n.useState)("20:20"),A=Object(i.a)(_,2),q=A[0],I=A[1],H=Object(n.useState)("06:06"),P=Object(i.a)(H,2),T=P[0],z=P[1];return r.a.createElement(c.v,null,r.a.createElement(c.n,null,r.a.createElement(c.G,null,r.a.createElement(c.d,{slot:"start"},r.a.createElement(c.b,{defaultHref:"/dashboard"})),r.a.createElement(c.F,null,"Energiestatus"))),r.a.createElement(c.k,null,r.a.createElement(c.e,null,r.a.createElement(j.Line,{data:a,options:{scales:{yAxes:[{ticks:{suggestedMin:-5,suggestedMax:5}}]}}}),r.a.createElement(c.g,null,r.a.createElement(c.h,null,"Tages\xfcberblick"),r.a.createElement(c.i,null,["Optimal","Sehr gut","Gut","In Ordnung","Grenzwertig","Kritisch"][Math.abs(p)]," | ",p))),r.a.createElement(c.t,null,r.a.createElement(c.r,null,"Stromaustauch mit der Hauptleitung"),r.a.createElement(c.q,null,r.a.createElement(c.s,null,"An die Hauptleitung abgegebener Strom: ",C,"kWh")),r.a.createElement(c.q,null,r.a.createElement(c.s,null,"Von der Hauptleitung bezogener Strom: ",w,"kWh")),r.a.createElement(c.r,null,"E-Auto Aufladeplan"),r.a.createElement(c.q,null,r.a.createElement(c.s,null,"Auto wird angeschlossen ab: "),r.a.createElement(c.l,{"display-format":"HH:mm","picker-format":"HH:mm",value:q,onIonChange:function(e){var t;console.log(e.detail.value),t=e.detail.value,I(t),s.emit("startChange",{start:t,id:h})}})),r.a.createElement(c.q,null,r.a.createElement(c.s,null,"Auto soll aufgeladen sein bis: "),r.a.createElement(c.l,{"display-format":"HH:mm","picker-format":"HH:mm",value:T,onIonChange:function(e){var t;console.log(e.detail.value),t=e.detail.value,z(t),s.emit("endChange",{end:t,id:h})}})))))}),w=(a(259),function(){var e=y[O()],t=C[O()],a=S[O()],l=Object(n.useState)(0),o=Object(i.a)(l,2),u=o[0],s=o[1],m=Object(n.useState)(0),b=Object(i.a)(m,2),E=b[0],h=b[1],g=Object(n.useState)({labels:["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],datasets:[{label:"Stromverbrauch in kWh",data:[Math.round(416e3*e)/100,Math.round(42e4*e)/100,Math.round(418e3*e)/100,Math.round(419e3*e)/100,4170*e,Math.round(415e3*e)/100,Math.round(416e3*e)/100,Math.round(414e3*e)/100,Math.round(415500*e)/100,Math.round(416e3*e)/100,Math.round(416e3*e)/100,Math.round(417e3*e)/100],fill:!1,backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(204,0,0,1)"},{label:"Stromproduktion in kWh",data:[Math.round(2337*t)/100,Math.round(6352*t)/100,Math.round(6423*t)/100,Math.round(12767*t)/100,Math.round(11986*t)/100,Math.round(14608*t)/100,Math.round(12530*t)/100,Math.round(13039*t)/100,Math.round(9442*t)/100,Math.round(6350*t)/100,Math.round(2870*t)/100,Math.round(1970*t)/100],fill:!0,backgroundColor:"rgba(0,204,0,0.2)",borderColor:"rgba(0,204,0,1)"}]}),f=Object(i.a)(g,2),v=f[0],p=(f[1],Object(n.useState)({labels:["01","04","07","10","13","16","19","22","25","28","31"],datasets:[{label:"Stromverbrauch in kWh",data:[Math.round(41800*e)/100,Math.round(42e3*e)/100,Math.round(41900*e)/100,Math.round(41600*e)/100,Math.round(41500*e)/100,Math.round(41700*e)/100,Math.round(41600*e)/100,Math.round(41400*e)/100,Math.round(41550*e)/100,Math.round(41600*e)/100,Math.round(41600*e)/100,Math.round(41700*e)/100],fill:!1,backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(204,0,0,1)"},{label:"Stromproduktion in kWh",data:[Math.round(980*t)/100,Math.round(1730*t)/100,Math.round(1880*t)/100,Math.round(1120*t)/100,Math.round(1360*t)/100,Math.round(1500*t)/100,Math.round(1190*t)/100,Math.round(780*t)/100,Math.round(1440*t)/100,Math.round(1880*t)/100,Math.round(580*t)/100],fill:!0,backgroundColor:"rgba(0,204,0,0.2)",borderColor:"rgba(0,204,0,1)"}]})),M=Object(i.a)(p,2),W=M[0],x=(M[1],Object(n.useState)({labels:["Mon","Tue","Wed","Thur","Fri","Sat","Sun"],datasets:[{label:"Stromverbrauch in kWh",data:[Math.round(13300*e)/100,Math.round(13500*e)/100,Math.round(13400*e)/100,Math.round(13700*e)/100,Math.round(13900*e)/100,Math.round(14100*e)/100,Math.round(13900*e)/100],fill:!1,backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(204,0,0,1)"},{label:"Stromproduktion in kWh",data:[Math.round(400*t)/100,Math.round(580*t)/100,Math.round(460*t)/100,Math.round(650*t)/100,Math.round(630*t)/100,Math.round(600*t)/100,Math.round(580*t)/100],fill:!0,backgroundColor:"rgba(0,204,0,0.2)",borderColor:"rgba(0,204,0,1)"}]})),w=Object(i.a)(x,2),D=w[0],_=(w[1],Object(n.useState)({labels:["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],datasets:[{label:"Stromverbrauch in kWh",data:[33,53,85,41,44,65,33,25,35,51,54,76,12,33,53,85,41,44,65,33,25,35,51,54,76,12],fill:!1,backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(204,0,0,1)"},{label:"Stromproduktion in kWh",data:[33,25,35,51,54,76,33,53,85,41,44,65,23,33,25,35,51,54,76,33,53,85,41,44,65,23],fill:!0,backgroundColor:"rgba(0,204,0,0.2)",borderColor:"rgba(0,204,0,1)"}]})),A=Object(i.a)(_,2),q=A[0],I=A[1];return Object(n.useEffect)((function(){var e=Object(d.io)(k);return e.emit("housestat"),e.on("FromAPI",(function(e){console.log("api received:"),console.log(e);for(var n=[],r=0,l=0;l<=23;l++)n.push(Math.round(100*e.vb[l].value*a)/100),r+=Math.round(100*e.vb[l].value*a)/100;console.log(n),s(r);var o=[],u=[];r=0;for(var c=0;c<=23;c++)o.push(Math.round(100*e.sun[c].value*t)/100),r+=Math.round(100*e.sun[c].value*t)/100,u.push(e.sun[c].hour);console.log(o),h(r);var i={labels:u,datasets:[{label:"Stromverbrauch in kWh",data:n,fill:!1,backgroundColor:"rgba(204,0,0,0.2)",borderColor:"rgba(204,0,0,1)"},{label:"Stromproduktion in kWh",data:o,fill:!0,backgroundColor:"rgba(0,204,0,0.2)",borderColor:"rgba(0,204,0,1)"}]};console.log(i),I(i),console.log(q)})),function(){e.disconnect()}}),[]),r.a.createElement(c.v,null,r.a.createElement(c.n,null,r.a.createElement(c.G,null,r.a.createElement(c.d,{slot:"start"},r.a.createElement(c.b,{defaultHref:"/dashboard"})),r.a.createElement(c.F,null,"Stromverbrauch/ -erzeugung"))),r.a.createElement(c.k,null,r.a.createElement(c.m,null,r.a.createElement(c.B,null,r.a.createElement(c.j,null,r.a.createElement(c.e,null,r.a.createElement(c.g,null,r.a.createElement(c.i,null,"Tages\xfcberblick"),r.a.createElement(j.Line,{data:q})),r.a.createElement(c.f,null,r.a.createElement(c.h,null,"Stromverbrauch: ",Math.round(u),"kWh"),r.a.createElement(c.h,null,"Stromproduktion: ",Math.round(E),"kWh"),r.a.createElement(c.h,null,"Differenz: ",Math.round(E-u),"kWh"))),r.a.createElement(c.e,null,r.a.createElement(c.g,null,r.a.createElement(c.i,null,"Wochen\xfcberblick"),r.a.createElement(j.Line,{data:D})),r.a.createElement(c.f,null,r.a.createElement(c.h,null,"Stromverbrauch: ",Math.round(959*e),"kWh"),r.a.createElement(c.h,null,"Stromproduktion: ",Math.round(39*t),"kWh"),r.a.createElement(c.h,null,"Differenz: ",Math.round(39*t)-Math.round(959*e),"kWh"))),r.a.createElement(c.e,null,r.a.createElement(c.g,null,r.a.createElement(c.i,null,"Monats\xfcberblick"),r.a.createElement(j.Line,{data:W})),r.a.createElement(c.f,null,r.a.createElement(c.h,null,"Stromverbrauch: ",Math.round(4157*e),"kWh"),r.a.createElement(c.h,null,"Stromproduktion: ",Math.round(120*t),"kWh"),r.a.createElement(c.h,null,"Differenz: ",Math.round(120*t)-Math.round(4157*e),"kWh"))),r.a.createElement(c.e,null,r.a.createElement(c.g,null,r.a.createElement(c.i,null,"Jahres\xfcberblick"),r.a.createElement(j.Line,{data:v})),r.a.createElement(c.f,null,r.a.createElement(c.h,null,"Stromverbrauch: ",Math.round(5e4*e),"kWh"),r.a.createElement(c.h,null,"Stromproduktion: ",Math.round(1e3*t),"kWh"),r.a.createElement(c.h,null,"Differenz: ",Math.round(1e3*t)-Math.round(5e4*e),"kWh"))))))))}),D=function(e){var t=Object(d.io)(k);t.emit("password"),t.on("password",(function(t){e(t)}))},_=function(){var e=Object(n.useState)(Object(d.io)()),t=Object(i.a)(e,2),a=t[0],l=t[1],o=Object(n.useRef)(null),u=Object(n.useRef)(null),s=Object(n.useRef)(null),m=Object(n.useRef)(null),b=Object(n.useRef)(null),E=Object(n.useState)("0"),h=Object(i.a)(E,2),g=h[0],f=h[1],v=Object(n.useState)("1"),j=Object(i.a)(v,2),y=j[0],C=j[1],S=Object(n.useState)("1"),W=Object(i.a)(S,2),x=W[0],w=W[1],_=Object(n.useState)("3"),A=Object(i.a)(_,2),q=A[0],I=A[1],H=Object(n.useState)("2"),P=Object(i.a)(H,2),T=P[0],z=[f,C,w,I,P[1]],L=Object(n.useState)(!0),G=Object(i.a)(L,2),F=G[0],R=G[1];Object(n.useEffect)((function(){var e=Object(d.io)(k);l(e),e.emit("settings"),e.on("FromAPI",(function(e){var t;console.log(e),e.forEach((function(e){var t=e.id,a=e.house;z[t-1](String(a))})),console.log(null===(t=u.current)||void 0===t?void 0:t.value)}))}),[]);var N=function(e,t){a.emit("houseChange",{id:t,house:e}),z[t-1](String(e))};return r.a.createElement(c.v,null,r.a.createElement(c.n,null,r.a.createElement(c.G,null,r.a.createElement(c.d,{slot:"start"},r.a.createElement(c.b,{defaultHref:"/dashboard"})),r.a.createElement(c.F,null,"Einstellungen"))),r.a.createElement(c.k,null,r.a.createElement(c.t,null,r.a.createElement(c.u,null,r.a.createElement(c.s,null,"Angezeigten Haustyp ausw\xe4hlen")),r.a.createElement(c.q,null,r.a.createElement(c.s,null,"Aktueller angezeigter Haustyp:"),r.a.createElement(c.C,{value:""+O(),okText:"Okay",cancelText:"Cancel",onIonChange:function(e){return t=e.detail.value,void(p=t);var t}},r.a.createElement(c.D,{value:"1"},M[1]),r.a.createElement(c.D,{value:"2"},M[2]),r.a.createElement(c.D,{value:"3"},M[3]),r.a.createElement(c.D,{value:"0"},M[0]))),r.a.createElement(c.u,null,"Passwort eingeben"),r.a.createElement(c.q,null,r.a.createElement(c.p,{placeholder:"Passwort",type:"password",debounce:1039,onIonChange:function(e){return t=e.detail.value,void D((function(e){R(t!=e)}));var t}})),r.a.createElement(c.u,null,"Grundst\xfcckbelegung manuell ausw\xe4hlen"),r.a.createElement(c.q,null,r.a.createElement(c.s,null,"Grundst\xfcck 1:"),r.a.createElement(c.C,{ref:o,value:g,okText:"Okay",cancelText:"Cancel",disabled:F,onIonChange:function(e){return N(e.detail.value,1)}},r.a.createElement(c.D,{value:"1"},M[1]),r.a.createElement(c.D,{value:"2"},M[2]),r.a.createElement(c.D,{value:"3"},M[3]),r.a.createElement(c.D,{value:"0"},M[0]))),r.a.createElement(c.q,null,r.a.createElement(c.s,null,"Grundst\xfcck 2:"),r.a.createElement(c.C,{ref:u,value:y,okText:"Okay",cancelText:"Cancel",disabled:F,onIonChange:function(e){return N(e.detail.value,2)}},r.a.createElement(c.D,{value:"1"},M[1]),r.a.createElement(c.D,{value:"2"},M[2]),r.a.createElement(c.D,{value:"3"},M[3]),r.a.createElement(c.D,{value:"0"},M[0]))),r.a.createElement(c.q,null,r.a.createElement(c.s,null,"Grundst\xfcck 3:"),r.a.createElement(c.C,{ref:s,value:x,okText:"Okay",cancelText:"Cancel",disabled:F,onIonChange:function(e){return N(e.detail.value,3)}},r.a.createElement(c.D,{value:"1"},M[1]),r.a.createElement(c.D,{value:"2"},M[2]),r.a.createElement(c.D,{value:"3"},M[3]),r.a.createElement(c.D,{value:"0"},M[0]))),r.a.createElement(c.q,null,r.a.createElement(c.s,null,"Grundst\xfcck 4:"),r.a.createElement(c.C,{ref:m,value:q,okText:"Okay",cancelText:"Cancel",disabled:F,onIonChange:function(e){return N(e.detail.value,4)}},r.a.createElement(c.D,{value:"1"},M[1]),r.a.createElement(c.D,{value:"2"},M[2]),r.a.createElement(c.D,{value:"3"},M[3]),r.a.createElement(c.D,{value:"0"},M[0]))),r.a.createElement(c.q,null,r.a.createElement(c.s,null,"Grundst\xfcck 5:"),r.a.createElement(c.C,{ref:b,value:T,okText:"Okay",cancelText:"Cancel",disabled:F,onIonChange:function(e){return N(e.detail.value,5)}},r.a.createElement(c.D,{value:"1"},M[1]),r.a.createElement(c.D,{value:"2"},M[2]),r.a.createElement(c.D,{value:"3"},M[3]),r.a.createElement(c.D,{value:"0"},M[0]))),r.a.createElement(c.u,null,"Standardbelegung"),r.a.createElement(c.q,null,"Apartment, 2x Reihenhaus, Einfamilienhaus, Mehrfamilienhaus"))))},A=function(){var e=Object(n.useState)(0),t=Object(i.a)(e,2),a=t[0],l=t[1],o=Object(n.useState)(0),u=Object(i.a)(o,2),s=u[0],m=u[1],b=Object(n.useState)(0),E=Object(i.a)(b,2),h=E[0],g=E[1],f=Object(n.useState)({labels:["06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21"],datasets:[{label:"Produktivit\xe4t",data:[33,53,85,41,44,65,33,100,45,32,24,23,32,100,78,86],fill:!1,backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(204,0,0,1)",tension:0}]}),v=Object(i.a)(f,2),p=v[0],O=v[1],M=Object(n.useState)({labels:["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],datasets:[{label:"Solar in kW",data:[33,25,35,51,54,76,33,33,25,35,51,54,76,33,33,25,35,51,54,76,33,33,25,35],fill:!0,backgroundColor:"rgba(0,204,0,0.2)",borderColor:"rgba(0,204,0,1)"},{label:"Wind in kW",data:[3,53,5,41,24,5,51,3,53,5,41,24,5,51,3,53,5,41,24,5,51,3,53,5,41,24,5],fill:!1,backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(75,192,192,1)"}]}),y=Object(i.a)(M,2),C=y[0],S=y[1];return Object(n.useEffect)((function(){var e=Object(d.io)(k);return e.emit("company"),e.emit("produktivitaet"),e.on("produktivitaet",(function(e){for(var t=[],a=[],n=0,r=0;r<=23;r++)t.push(Math.round(1e4*e[r].value)/100),n+=100*e[r].value,a.push(e[r].hour);l(Math.round(n/16)),console.log(t),O({labels:a,datasets:[{label:"Produktivit\xe4t",data:t,fill:!1,backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(204,0,0,1)",tension:0}]})})),e.on("windsun",(function(e){for(var t=0,a=[],n=0;n<=23;n++)a.push(Math.round(100*e.sun[n].value*40)/100),t+=40*e.sun[n].value;m(Math.round(t));t=0;for(var r=[],l=[],o=0;o<=23;o++)r.push(Math.round(100*e.wind[o].value*5)/100),t+=40*e.wind[o].value,l.push(e.wind[o].hour);g(Math.round(t)),S({labels:l,datasets:[{label:"Sonne in kW",data:a,fill:!0,backgroundColor:"rgba(0,205,0,0.2)",borderColor:"rgba(0,204,0,1)"},{label:"Wind in kW",data:r,fill:!1,backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(75,192,192,1)"}]})})),function(){e.disconnect()}}),[]),r.a.createElement(c.v,null,r.a.createElement(c.n,null,r.a.createElement(c.G,null,r.a.createElement(c.d,{slot:"start"},r.a.createElement(c.b,{defaultHref:"/dashboard"})),r.a.createElement(c.F,null,"Firmenansicht"))),r.a.createElement(c.k,{fullscreen:!0},r.a.createElement(c.e,null,r.a.createElement(c.f,null,r.a.createElement(c.i,null,"Produktivit\xe4t"),r.a.createElement(j.Line,{data:p,options:{scales:{yAxes:[{ticks:{suggestedMin:0,suggestedMax:100}}]}}}),r.a.createElement(c.h,null,"Produktivit\xe4t: ",a,"%"))),r.a.createElement(c.e,null,r.a.createElement(c.f,null,r.a.createElement(c.i,null,"Tages\xfcberblick"),r.a.createElement(j.Line,{data:C}),r.a.createElement(c.h,null,"Stromproduktion Solar: ",s,"kW"),r.a.createElement(c.h,null,"Stromproduktion Wind: ",h,"kW")))))},q=(a(260),function(){var e=Object(n.useRef)(null),t=Object(n.useRef)(null),a=Object(n.useRef)(null),l=Object(n.useRef)(null),o=Object(n.useRef)(null),u=Object(n.useState)({housevb:0,companyvb:0,sun:0,wind:0,ekarma:0}),s=Object(i.a)(u,2),b=s[0],E=s[1],h=Object(n.useState)(Object(d.io)()),g=Object(i.a)(h,2),f=g[0],v=g[1],j=Object(n.useState)(!0),p=Object(i.a)(j,2),O=p[0],M=p[1];Object(n.useEffect)((function(){var e=Object(d.io)(k);return v(e),e.emit("manipulation"),e.on("FromAPI",(function(e){E(e)})),function(){e.disconnect()}}),[]);var y=function(e){f.emit("rangeChange",{param:e.current.name,value:e.current.value});var t=b;t[e.current.name]=e.current.value,E(t)};return r.a.createElement(c.v,null,r.a.createElement(c.n,null,r.a.createElement(c.G,null,r.a.createElement(c.d,{slot:"start"},r.a.createElement(c.b,{defaultHref:"/dashboard"})),r.a.createElement(c.F,null,"Schieberegler"))),r.a.createElement(c.k,null,r.a.createElement(c.t,null,r.a.createElement(c.u,null,"Passwort eingeben"),r.a.createElement(c.q,null,r.a.createElement(c.p,{placeholder:"Passwort",type:"password",debounce:1083,onIonChange:function(e){return t=e.detail.value,void D((function(e){M(t!=e)}));var t}})),r.a.createElement(c.r,null,"H\xe4userverbauch"),r.a.createElement(c.q,null,r.a.createElement(c.y,{pin:!1,ref:e,name:"housevb",min:0,max:1,step:.01,value:b.housevb,disabled:O,onIonChange:function(){y(e)}},r.a.createElement(c.o,{size:"small",slot:"start",icon:m.l}),r.a.createElement(c.o,{slot:"end",icon:m.l}))),r.a.createElement(c.r,null,"Sonne"),r.a.createElement(c.q,null,r.a.createElement(c.y,{ref:l,name:"sun",min:0,max:1,step:.01,value:b.sun,disabled:O,onIonChange:function(){y(l)}},r.a.createElement(c.o,{size:"small",slot:"start",icon:m.s}),r.a.createElement(c.o,{slot:"end",icon:m.s}))),r.a.createElement(c.r,null,"Werksverbrauch"),r.a.createElement(c.q,null,r.a.createElement(c.y,{ref:t,name:"companyvb",min:0,max:1,step:.01,value:b.companyvb,disabled:O,onIonChange:function(){y(t)}},r.a.createElement(c.o,{size:"small",slot:"start",icon:m.c}),r.a.createElement(c.o,{slot:"end",icon:m.c}))),r.a.createElement(c.r,null,"Wind"),r.a.createElement(c.q,null,r.a.createElement(c.y,{ref:a,name:"wind",min:0,max:1,step:.01,value:b.wind,disabled:O,onIonChange:function(){y(a)}},r.a.createElement(c.o,{size:"small",slot:"start",icon:m.j}),r.a.createElement(c.o,{slot:"end",icon:m.j}))),r.a.createElement(c.r,null,"Vorhersage"),r.a.createElement(c.q,null,r.a.createElement(c.y,{ref:o,name:"ekarma",min:0,max:1,step:.01,value:b.ekarma,disabled:O,onIonChange:function(){y(o)}},r.a.createElement(c.o,{size:"small",slot:"start",icon:m.a}),r.a.createElement(c.o,{slot:"end",icon:m.a}))))))}),I=function(){Object(n.useEffect)((function(){var e=Object(d.io)(k);return e.emit("battery"),e.on("battery",(function(e){for(var t=[],a=[],n=0;n<=23;n++)t.push(Math.round(e[n].value/3.5*100)/100),a.push(e[n].hour);console.log(t),l(e[23].value),m({labels:a,datasets:[{label:"Akkustand",data:t,fill:!1,backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(0,204,0,1)"}]})})),e.on("sender",(function(e){for(var t=[],a=[],n=1;n<=7;n++)t.push(Math.round(100*e[n].abgabe)/100),a.push(Math.round(100*e[n].annahme)/100);var r={type:"pie",datasets:[{data:a,backgroundColor:["rgba(255, 99, 132)","rgba(54, 162, 235)","rgba(255, 206, 86)","rgba(75, 192, 192)","rgba(153, 102, 255)","rgba(255, 159, 64)","rgba(21, 160, 14)"],borderColor:"rgba(255,255,255)"}],labels:["1","2","3","4","5","6","7"]};g({type:"pie",datasets:[{data:t,backgroundColor:["rgba(255, 99, 132)","rgba(54, 162, 235)","rgba(255, 206, 86)","rgba(75, 192, 192)","rgba(153, 102, 255)","rgba(255, 159, 64)","rgba(21, 160, 14)"],borderColor:"rgba(255,255,255)"}],labels:["1","2","3","4","5","6","7"]}),O(r)})),function(){e.disconnect()}}),[]);var e=Object(n.useState)(0),t=Object(i.a)(e,2),a=t[0],l=t[1],o=Object(n.useState)({labels:["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],datasets:[{label:"Akkustand",data:[33,53,85,41,44,65,33,25,35,51,54,76,12,33,53,85,41,44,65,33,25,35,51,54,76,12],fill:!1,backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(0,204,0,1)"}]}),u=Object(i.a)(o,2),s=u[0],m=u[1],b=Object(n.useState)({type:"pie",datasets:[{data:[1,1,1,1,1,1,1],backgroundColor:["rgba(255, 99, 132)","rgba(54, 162, 235)","rgba(255, 206, 86)","rgba(75, 192, 192)","rgba(153, 102, 255)","rgba(255, 159, 64)","rgba(21, 160, 14)"],borderColor:"rgba(255,255,255)"}],labels:["1","2","3","4","5","6","7"]}),E=Object(i.a)(b,2),h=E[0],g=E[1],f=Object(n.useState)({type:"pie",datasets:[{data:[1,1,1,1,1,1,1],backgroundColor:["rgba(255, 99, 132)","rgba(54, 162, 235)","rgba(255, 206, 86)","rgba(75, 192, 192)","rgba(153, 102, 255)","rgba(255, 159, 64)","rgba(21, 160, 14)"],borderColor:"rgba(255,255,255)"}],labels:["1","2","3","4","5","6","7"]}),v=Object(i.a)(f,2),p=v[0],O=v[1];return r.a.createElement(c.v,null,r.a.createElement(c.n,null,r.a.createElement(c.G,null,r.a.createElement(c.d,{slot:"start"},r.a.createElement(c.b,{defaultHref:"/dashboard"})),r.a.createElement(c.F,null,"Stromspeicher"))),r.a.createElement(c.k,{fullscreen:!0},r.a.createElement(c.e,{routerLink:"/battery"},r.a.createElement(c.g,null,r.a.createElement(c.h,null,"Stromspeicher"),r.a.createElement(c.i,{"text-center":!0},a," kWh | ",Math.round(a/3.5),"%")),r.a.createElement(c.f,null,r.a.createElement("div",{className:"bar"},r.a.createElement(c.x,{color:"success",value:Math.round(a/3.5)/100})))),r.a.createElement(c.e,null,r.a.createElement(c.g,null,r.a.createElement(c.i,null,"Akkustand"),r.a.createElement(j.Line,{data:s,options:{scales:{yAxes:[{ticks:{suggestedMin:0,suggestedMax:100}}]}}}),r.a.createElement(c.h,null,"Aktueller Stand: ",a," kWh | ",Math.round(a/3.5),"%"))),r.a.createElement(c.e,null,r.a.createElement(c.g,null,r.a.createElement(c.i,null,"Zusammensetzung des Speicherstroms"),r.a.createElement(j.Pie,{data:h}))),r.a.createElement(c.e,null,r.a.createElement(c.g,null,r.a.createElement(c.i,null,"Abnehmer des Speicherstroms"),r.a.createElement(j.Pie,{data:p})))))},H=(a(261),a(262),a(263),a(264),a(265),a(266),a(267),a(268),a(269),a(270),a(271),function(){return r.a.createElement(c.a,null,r.a.createElement(s.a,null,r.a.createElement(c.A,null,r.a.createElement(u.b,{path:"/dashboard",component:W}),r.a.createElement(u.b,{path:"/price",component:x}),r.a.createElement(u.b,{path:"/consum",component:w}),r.a.createElement(u.b,{path:"/settings",component:_}),r.a.createElement(u.b,{path:"/company",component:A}),r.a.createElement(u.b,{path:"/manipulateModel",component:q}),r.a.createElement(u.b,{path:"/battery",component:I}),r.a.createElement(u.a,{exact:!0,from:"/",to:"/dashboard"}))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(H,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[121,3,4]]]);
//# sourceMappingURL=main.fc44d628.chunk.js.map