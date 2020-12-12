(this["webpackJsonpbouncy-balls"]=this["webpackJsonpbouncy-balls"]||[]).push([[0],{21:function(t,e,i){},27:function(t,e,i){},28:function(t,e,i){},29:function(t,e,i){},30:function(t,e,i){"use strict";i.r(e);var n=i(0),s=i(4),a=i.n(s),o=i(13),c=i.n(o),r=(i(21),i(7)),l=i(2),h=i(3),u=i(6),d=i(5),v=i(8),b=i(9),j=i(14),f=function(){function t(e,i){Object(l.a)(this,t),this.x=0,this.y=0,this.mag=0,e&&(this.x=e),i&&(this.y=i),this.mag=Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}return Object(h.a)(t,[{key:"add",value:function(e){return new t(this.x+e.x,this.y+e.y)}},{key:"sub",value:function(e){return new t(this.x-e.x,this.y-e.y)}},{key:"mul",value:function(e){return new t(this.x*e.x,this.y*e.y)}},{key:"mulScalar",value:function(e){return new t(this.x*e,this.y*e)}},{key:"euclidDistace",value:function(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))}},{key:"dot",value:function(t){return this.x*t.x+this.y*t.y}},{key:"value",value:function(){return this.mag}},{key:"scale",value:function(e,i){return this.mul(new t(e,i))}}]),t}(),g=function(){function t(e,i,n,s){Object(l.a)(this,t),this.position=new f(0,0),this.velocity=new f(0,0),this.acceleration=new f(0,0),this.scale=new f(1,1),this.position=null!==e&&void 0!==e?e:this.position,this.velocity=null!==i&&void 0!==i?i:this.velocity,this.acceleration=null!==n&&void 0!==n?n:this.acceleration,this.scale=null!==s&&void 0!==s?s:this.scale}return Object(h.a)(t,[{key:"update",value:function(t,e,i){this.position=this.position.add(this.velocity.mulScalar(i)),this.velocity=this.velocity.add(this.acceleration.mulScalar(i))}}]),t}(),p=function(t){Object(u.a)(i,t);var e=Object(d.a)(i);function i(){var t;Object(l.a)(this,i);for(var n=arguments.length,s=new Array(n),a=0;a<n;a++)s[a]=arguments[a];return(t=e.call.apply(e,[this].concat(s))).renderingContext=void 0,t.canvasEl=void 0,t}return Object(h.a)(i,[{key:"setCanvas",value:function(t){var e;this.canvasEl=t,this.renderingContext=null!==(e=t.getContext("2d"))&&void 0!==e?e:void 0}},{key:"getRenderingContext",value:function(){return this.renderingContext}},{key:"beforeRender",value:function(t){this.canvasEl&&(t.save(),t.clearRect(0,0,this.canvasEl.width,this.canvasEl.height),t.transform(1,0,0,-1,0,this.canvasEl.height))}},{key:"afterRender",value:function(t){t.restore()}}]),i}(function(){function t(){Object(l.a)(this,t),this.drawables=[]}return Object(h.a)(t,[{key:"add",value:function(t){this.drawables.push(t)}},{key:"remove",value:function(t){this.drawables=this.drawables.filter((function(e){return e!==t}))}},{key:"render",value:function(t,e,i){var n=this.getRenderingContext();n?(this.beforeRender(n),this.drawables.forEach((function(s){try{s.render(n,t,e,i)}catch(a){console.error("Failed to draw",s,"; error:",a)}})),this.afterRender(n)):console.error("Rendering context not available. Will not render.")}},{key:"beforeRender",value:function(t){}},{key:"afterRender",value:function(t){}}]),t}()),y=function t(e,i,n){Object(l.a)(this,t),this.fillColor=void 0,this.borderColor=void 0,this.borderWidth=void 0,this.fillColor=e,this.borderColor=i,this.borderWidth=n},m=function(t){Object(u.a)(i,t);var e=Object(d.a)(i);function i(t,n,s,a,o,c){var r;return Object(l.a)(this,i),(r=e.call(this,s,a,o,c)).radius=0,r.specs=void 0,r.radius=t,r.specs=n,r}return Object(h.a)(i,[{key:"render",value:function(t,e,i,n){this.radius<=0||(t.save(),t.fillStyle=this.specs.fillColor,t.strokeStyle=this.specs.borderColor,t.beginPath(),t.arc(this.position.x+this.radius,this.position.y+this.radius,this.radius,0,2*Math.PI),t.closePath(),t.fill(),this.specs.borderWidth&&t.stroke(),t.restore())}},{key:"getBoundingBox",value:function(){return{x:this.position.x,y:this.position.y,width:2*this.radius,height:2*this.radius}}}]),i}(g),O=function(){function t(){Object(l.a)(this,t),this.running=!1,this.frameTickHandler=void 0,this.frame=0,this.lastFrameAt=void 0,this.tickDone=!0,this.handlers=[]}return Object(h.a)(t,[{key:"tick",value:function(){var t;if(this.running){var e=this.frame+1,i=new Date,n=(this.lastFrameAt?i.getTime()-(null===(t=this.lastFrameAt)||void 0===t?void 0:t.getTime()):0)/1e3;this.handlers.forEach((function(t){try{t(e,i,n)}catch(s){console.log("Error:",s,"at handler:",t)}})),this.lastFrameAt=i}}},{key:"start",value:function(){this.running||(this.running=!0,this.lastFrameAt=new Date,this.frameTickHandler=this.scheduleTick(this.tick.bind(this)))}},{key:"stop",value:function(){this.running&&(this.frameTickHandler&&this.cancelTick(this.frameTickHandler),this.running=!1)}},{key:"isRunning",value:function(){return this.running}},{key:"addHandler",value:function(t){this.handlers.push(t)}}]),t}(),k=function(t){Object(u.a)(i,t);var e=Object(d.a)(i);function i(){return Object(l.a)(this,i),e.apply(this,arguments)}return Object(h.a)(i,[{key:"scheduleTick",value:function(t){var e=this;return requestAnimationFrame((function i(n){t(),e.isRunning()&&(e.frameTickHandler=requestAnimationFrame(i))}))}},{key:"cancelTick",value:function(t){this.frameTickHandler&&cancelAnimationFrame(this.frameTickHandler)}}]),i}(O),w=function(t){Object(u.a)(i,t);var e=Object(d.a)(i);function i(t){var n;return Object(l.a)(this,i),(n=e.call(this)).fps=60,n.fps=t,n}return Object(h.a)(i,[{key:"scheduleTick",value:function(t){var e=1e3/this.fps;return setInterval(t,e)}},{key:"cancelTick",value:function(t){clearInterval(t)}}]),i}(O),x=function(){function t(e,i){Object(l.a)(this,t),this.animationLoop=void 0,this.updateLoop=void 0,this.settings=void 0,this.drawingProvider=void 0,this.objects=[],this.settings=e,this.animationLoop=new k,this.updateLoop=new w(e.fps),this.drawingProvider=i}return Object(h.a)(t,[{key:"start",value:function(){this.setupWorld(),this.updateLoop.start(),this.animationLoop.start()}},{key:"setupWorld",value:function(){this.updateLoop.addHandler(this.boundaryCheck.bind(this)),this.updateLoop.addHandler(this.baseObjectsUpdate.bind(this)),this.updateLoop.addHandler(this.bounceBack.bind(this)),this.updateLoop.addHandler(this.collisionPhysics.bind(this)),this.animationLoop.addHandler(this.drawingProvider.render.bind(this.drawingProvider))}},{key:"boundaryCheck",value:function(t,e,i){var n=this.settings.world.width,s=[];this.objects=this.objects.filter((function(t){if(t instanceof g){var e=t,i=e.position.x;return!(i<0&&e.velocity.x<0||i>n&&e.velocity.x>0)||(s.push(t),!1)}return!1}));var a=this.drawingProvider;s.forEach((function(t){return a.remove(t)}))}},{key:"baseObjectsUpdate",value:function(t,e,i){this.objects.forEach((function(n){n.update(t,e,i)}))}},{key:"bounceBack",value:function(t,e,i){var n=this.settings.elasticity;this.objects.forEach((function(t){if(t instanceof g){var e=t,s=e.getBoundingBox();if(s.y<=0){e.position=new f(e.position.x,0);var a=e.velocity.y;s.y<0&&(a-=e.acceleration.y*i),e.velocity=new f(e.velocity.x,-a*n)}}}))}},{key:"collisionPhysics",value:function(t,e,i){var n=this.objects.filter((function(t){return t instanceof m})).map((function(t){return t})),s=[];n.forEach((function(t,e){var i=t;n.slice(e+1).forEach((function(t){var e=i.position.euclidDistace(t.position),n=i.radius+t.radius;if(e<=n&&(s.push([i,t]),e<n)){var a=n-e,o=t.position.sub(i.position),c=(o.mag+a)/o.mag;t.position=o.scale(c,c).add(i.position)}}))})),s.forEach((function(t){var e=Object(r.a)(t,2),i=e[0],n=e[1],s=Math.pow(i.radius,3),a=Math.pow(n.radius,3),o=i.position.add(new f(i.radius,i.radius)),c=n.position.add(new f(n.radius,n.radius)),l=i.velocity.sub(o.sub(c).mulScalar(i.velocity.sub(n.velocity).dot(o.sub(c))/Math.pow(o.sub(c).value(),2)).mulScalar(2*a/(s+a))),h=n.velocity.sub(c.sub(o).mulScalar(n.velocity.sub(i.velocity).dot(c.sub(o))/Math.pow(c.sub(o).value(),2)).mulScalar(2*s/(s+a)));i.velocity=l,n.velocity=h}))}},{key:"stop",value:function(){this.animationLoop.stop(),this.updateLoop.stop()}},{key:"updateWorldSize",value:function(t,e){this.settings.world={width:t,height:e}}},{key:"addObject",value:function(t){this.drawingProvider.add(t),this.objects.push(t)}}]),t}(),C=(i(27),function(t){Object(u.a)(i,t);var e=Object(d.a)(i);function i(t){var n;return Object(l.a)(this,i),(n=e.call(this,t)).drawingProvider=void 0,n.canvas=void 0,n.drawingProvider=n.props.drawingProvider,n}return Object(h.a)(i,[{key:"componentDidMount",value:function(){this.drawingProvider&&this.canvas&&this.drawingProvider.setCanvas(this.canvas),window.addEventListener("resize",this.updateCanvasWidthAndHeight.bind(this)),this.updateCanvasWidthAndHeight()}},{key:"componentDidUpdate",value:function(){this.drawingProvider&&this.canvas&&this.drawingProvider.setCanvas(this.canvas)}},{key:"updateCanvasWidthAndHeight",value:function(){if(this.canvas){var t=this.getSize(),e=Object(r.a)(t,2),i=e[0],n=e[1];this.canvas.width=null!==i&&void 0!==i?i:0,this.canvas.height=null!==n&&void 0!==n?n:0}}},{key:"handleClick",value:function(t){if(this.props.onClick){var e,i={x:t.clientX,y:t.clientY,event:t},n=null===(e=this.canvas)||void 0===e?void 0:e.getBoundingClientRect();n&&(i.x-=n.left,i.y-=n.top),this.props.onClick(i)}}},{key:"getSize",value:function(){var t,e=null===(t=this.canvas)||void 0===t?void 0:t.getBoundingClientRect();return[null===e||void 0===e?void 0:e.width,null===e||void 0===e?void 0:e.height]}},{key:"render",value:function(){var t=this;return Object(n.jsx)("canvas",{ref:function(e){return t.canvas=e},onClick:this.handleClick.bind(this),className:"drawing-canvas","data-testid":"canvas"})}}]),i}(a.a.Component)),S=i(15),P=(i(28),{Red:"#c4014c",Magenta:"#f3008e",Green:"#09d877",Teal:"#12cebe",Blue:"#4596f1",Yellow:"#ffdc3d"}),N={Little:7,Small:10,Medium:20,Large:25,Huge:50},z=function(t){Object(u.a)(i,t);var e=Object(d.a)(i);function i(t){var n;Object(l.a)(this,i),n=e.call(this,t);var s=t.settings;return n.state=Object(S.a)({settingsOpen:!1},s),n}return Object(h.a)(i,[{key:"saveSettings",value:function(){var t=this.state;this.props.onSetSettings&&this.props.onSetSettings({newObjectsPerClick:t.newObjectsPerClick,objectsColor:t.objectsColor,objectsSize:t.objectsSize,elasticity:t.elasticity})}},{key:"closeSettings",value:function(){this.props.onClose&&this.props.onClose()}},{key:"updateState",value:function(t){this.setState(Object.assign(this.state,t)),this.saveSettings()}},{key:"toggleSettings",value:function(){var t=this.state;this.setState(Object.assign(this.state,{settingsOpen:!t.settingsOpen}))}},{key:"render",value:function(){var t=this,e=this.state,i=Object.entries(P).map((function(t,e){var i=Object(r.a)(t,2),s=i[0],a=i[1];return Object(n.jsx)("option",{value:a,children:s},e)})),s=Object.entries(N).map((function(t,e){var i=Object(r.a)(t,2),s=i[0],a=i[1];return Object(n.jsx)("option",{value:a,children:s},e)}));return Object(n.jsx)("div",{className:"settings",children:Object(n.jsxs)("div",{className:"settings-form",children:[Object(n.jsxs)("div",{className:"input-group",children:[Object(n.jsx)("label",{htmlFor:"objects-per-click",children:"Objects per click"}),Object(n.jsx)("input",{name:"objects-per-click",type:"number",value:e.newObjectsPerClick,min:"1",max:"500",title:"Number of objects to create per single click.",placeholder:"Number of objects","data-testid":"objects-per-click",onChange:function(e){return t.updateState({newObjectsPerClick:Number(e.target.value)})}})]}),Object(n.jsxs)("div",{className:"input-group",children:[Object(n.jsx)("label",{htmlFor:"objects-color",children:"Objects color"}),Object(n.jsx)("select",{name:"objects-color",value:e.objectsColor,title:"The color of the newly created objects.",placeholder:"Select a color from the list","data-testid":"objects-color",onChange:function(e){return t.updateState({objectsColor:e.target.value})},children:i})]}),Object(n.jsxs)("div",{className:"input-group",children:[Object(n.jsx)("label",{htmlFor:"objects-size",children:"Objects size"}),Object(n.jsx)("select",{name:"objects-size",value:e.objectsSize,title:"Approximate size of the newly created objects.",placeholder:"Select the approximate size of the objects.","data-testid":"objects-size",onChange:function(e){return t.updateState({objectsSize:Number(e.target.value)})},children:s})]}),Object(n.jsxs)("div",{className:"input-group",children:[Object(n.jsx)("label",{htmlFor:"elasticity",children:"Elasticity"}),Object(n.jsx)("input",{name:"elasiticity",type:"number",min:"0",max:"1",step:"0.01",title:"How elastic should the collision should be. 1 - completely elastic; 0 - will not bounce at all.",placeholder:"Choose a value between 0 and 1 (for example 0.7).","data-testid":"elasticity",value:this.state.elasticity,onChange:function(e){return t.updateState({elasticity:Number(e.target.value)})}})]})]})})}}]),i}(a.a.Component),M=i.p+"static/media/logo.7b4ef71f.svg",E=(i(29),function(t){Object(u.a)(i,t);var e=Object(d.a)(i);function i(t){var n;Object(l.a)(this,i),(n=e.call(this,t)).drawingProvider=void 0,n.canvas=void 0,n.engine=void 0,n.drawingProvider=new p;var s={elasticity:.7,newObjectsPerClick:5,objectsColor:P.Red,objectsSize:N.Medium};return n.state={settingsVisible:!1,settings:s},n.engine=new x({fps:60,world:{width:0,height:0},elasticity:s.elasticity},n.drawingProvider),n}return Object(h.a)(i,[{key:"componentDidMount",value:function(){var t=this.updateWorldSize.bind(this);window.addEventListener("resize",(function(e){t()})),t(),this.engine.start()}},{key:"updateWorldSize",value:function(){var t,e,i=null!==(t=null===(e=this.canvas)||void 0===e?void 0:e.getSize())&&void 0!==t?t:[0,0],n=Object(r.a)(i,2),s=n[0],a=n[1];this.engine.updateWorldSize(null!==s&&void 0!==s?s:0,null!==a&&void 0!==a?a:0)}},{key:"createBall",value:function(t,e){var i=this.state.settings,n=new f(t,e),s=new f(0,-1471.5),a=400,o=new f(Math.random()*a-200,Math.random()*a-200);return new m(i.objectsSize/2+Math.random()*(i.objectsSize/2),new y(i.objectsColor,"black",1),n,o,s)}},{key:"onClick",value:function(t){for(var e=this.state.settings.newObjectsPerClick,i=this.engine.settings.world.height-t.y;e;)this.engine.addObject(this.createBall(t.x,i)),e--}},{key:"changeSettings",value:function(t){this.setState(Object.assign(this.state,{settings:t})),this.engine.settings.elasticity=t.elasticity}},{key:"toggleSettings",value:function(){this.setState(Object.assign(this.state,{settingsVisible:!this.state.settingsVisible}))}},{key:"closeSettings",value:function(){this.setState(Object.assign(this.state,{settingsVisible:!1}))}},{key:"render",value:function(){var t=this,e=this.state.settingsVisible?Object(n.jsx)(z,{settings:this.state.settings,onSetSettings:this.changeSettings.bind(this),onClose:this.closeSettings.bind(this)}):Object(n.jsx)(n.Fragment,{}),i=this.state.settingsVisible?Object(n.jsx)(v.a,{icon:b.c}):Object(n.jsx)(v.a,{icon:b.b});return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsxs)("header",{className:"App-header",title:"Click anywhere on the screen :)",children:[Object(n.jsxs)("div",{className:"header-menu",children:[Object(n.jsx)("div",{className:"logo-wrap",children:Object(n.jsx)("img",{src:M,alt:"logo",className:"logo"})}),Object(n.jsx)("div",{className:"header-title",children:Object(n.jsx)("h1",{children:"Bouncy Balls"})}),Object(n.jsx)("div",{className:"header-actions header-docitem",children:Object(n.jsxs)("button",{onClick:this.toggleSettings.bind(this),className:"header-button",title:"Click here to change the settings",children:[Object(n.jsx)(v.a,{icon:b.d})," ",Object(n.jsx)("label",{children:"Settings"})," ",i]})}),Object(n.jsxs)("div",{className:"header-docitem",children:[Object(n.jsxs)("a",{href:"docs",className:"header-button",title:"Check out the docs!",children:[Object(n.jsx)(v.a,{icon:b.a})," ",Object(n.jsx)("label",{children:"Docs"})]}),Object(n.jsx)("a",{href:"https//github.com/natemago/bouncy-balls",className:"header-button",title:"Visit the source code repository on Github!",children:Object(n.jsx)(v.a,{icon:j.a})})]})]}),e]}),Object(n.jsx)("section",{className:"main-section",children:Object(n.jsx)(C,{drawingProvider:this.drawingProvider,onClick:this.onClick.bind(this),ref:function(e){return t.canvas=e}})})]})}}]),i}(a.a.Component)),L=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,31)).then((function(e){var i=e.getCLS,n=e.getFID,s=e.getFCP,a=e.getLCP,o=e.getTTFB;i(t),n(t),s(t),a(t),o(t)}))};c.a.render(Object(n.jsx)(a.a.StrictMode,{children:Object(n.jsx)(E,{})}),document.getElementById("root")),L()}},[[30,1,2]]]);
//# sourceMappingURL=main.3114cb05.chunk.js.map