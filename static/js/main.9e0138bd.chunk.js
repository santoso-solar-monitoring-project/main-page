(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,n){e.exports=n(39)},28:function(e,t,n){},30:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"ignoreUndefined",function(){return w}),n.d(r,"defaultMerger",function(){return y}),n.d(r,"mergeIntersect",function(){return j}),n.d(r,"mergeIntersectWith",function(){return O}),n.d(r,"merge",function(){return E}),n.d(r,"mergeWith",function(){return k}),n.d(r,"_mergeDeepWith",function(){return S}),n.d(r,"_mergeDeep",function(){return C});var a=n(0),i=n.n(a),c=n(18),o=n.n(c),u=(n(28),n(3)),l=n(6),s=n(9),f=n(8),m=n(10),d=(n(30),n(5)),h=n(16),p=n(14),v=n(4),b=n(13),g=n(15);function w(e,t){return void 0===t?e:t}function y(e,t){return t}function j(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return O.apply(void 0,[w,e].concat(n))}function O(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var i=Object.keys(t);return r=r.filter(Boolean).map(function(e){return e instanceof Array?e:Object.keys(e).filter(function(e){return i.includes(e)}).reduce(function(t,n){return Object(p.a)({},t,Object(b.a)({},n,e[n]))},{})}),k.apply(void 0,[e,t].concat(Object(v.a)(r)))}function E(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return k.apply(void 0,[w].concat(t))}function k(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return S.apply(void 0,[e].concat(n)).toJS()}function x(e){return e&&"object"===typeof e&&"function"===typeof e.mergeWith&&!g.a.isList(e)}function S(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return n.slice(1).reduce(function(t,n){return function t(n,r,a){return x(n)&&null!==r?n.mergeWith(t,r):g.a.isList(n)&&g.a.isList(r)?r.reduce(function(n,r,a){var i=n.get(a);return x(i)?n.set(a,i.mergeWith(t,r)):n.set(a,e(i,r,a))},n):e(n,r,a)}(t,Object(g.b)(n))},Object(g.b)(null!=n[0]?n[0]:{}))}function C(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return S.apply(void 0,[y].concat(t))}var L={hello:3,canvasStyle:[1,2,3],canvasEffects:function(){}},z={hello:"world",canvasStyle:[3,,1],poop:"hiii"},M=(E(L,z),E.apply(void 0,Object(v.a)([L,z])),function(){});function R(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];var i=E.apply(r,Object(v.a)(n.map(function(e){return e.defaults})).concat([e.defaults]));Object.keys(i).forEach(function(e){"children"===e?M("Don't use a default children prop! Refs will be lost."):"object"===typeof i[e]&&"current"in i[e]&&M("Found an default property with a 'current' property. If this is a 'React.RefObject' beware that the ref may be lost! ".concat(e,":"),i[e])});var c={defaults:i,required:{},injected:{},propsIn:{},propsOut:{},own:e,bases:n,extend:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return R(e,R.apply(void 0,[this].concat(n)))}},o=function(e){return Object(p.a)({},e,j(i,e))},s=![e].concat(n).some(function(e){return"required"in e}),f=function(){function e(){Object(u.a)(this,e)}return Object(l.a)(e,null,[{key:"default",value:function(t){return Object.assign(function(e,n){for(var r=arguments.length,a=new Array(r>2?r-2:0),i=2;i<r;i++)a[i-2]=arguments[i];return t.apply(void 0,[o(e),n].concat(a))},c,{wrap:e.default})}},{key:"optional",value:function(t){return Object.assign(function(e,n){for(var r=arguments.length,a=new Array(r>2?r-2:0),i=2;i<r;i++)a[i-2]=arguments[i];return t.apply(void 0,[o(e),n].concat(a))},c,{wrap:e.optional})}}]),e}();return f.decorator=s?f.optional:f.default,Object.assign(o,c,{wrap:f.decorator})}function A(){var e,t;return R((t=e=function e(){Object(u.a)(this,e)},e.required=void 0,t))}function D(){for(var e,t,n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return R((t=e=function e(){Object(u.a)(this,e)},e.defaults=E.apply(r,Object(v.a)(a.reverse())),t))}var N=n(7),F=R(A(),D({circleStyle:{r:3,fill:"hsl(330, 100%, 75%)",stroke:"hsl(330, 100%, 50%)",strokeWidth:.5},textStyle:{fill:"hsl(330, 100%, 75%)",style:{font:"16px ubuntu mono, monospace"}}}),A()).wrap(function(e){var t=e.ticks,n=e.ticksScale,r=e.data,a=e.count,c=e.curve,o=e.scaleY,u=e.circleStyle,l=e.textStyle,s=Object(h.a)(e,["ticks","ticksScale","data","count","curve","scaleY","circleStyle","textStyle"]);return i.a.createElement(N.a.g,s,Object(v.a)(Array(a)).map(function(e,a){var s=t.interpolate(function(e){return e[a]||0}).interpolate(function(e){return n(e)}),f=s.interpolate(function(e){return 0!==e&&r.current.length&&c.interpolate(e,r.current)||-1}),m=f.interpolate(function(e){return-1!==e?"visible":"hidden"});return i.a.createElement(N.a.g,{key:a,visibility:m,transform:Object(N.b)([s,f],function(e,t){return"translate(".concat(e,",").concat(t,")")})},i.a.createElement(N.a.circle,Object.assign({cx:0,cy:0},u)),i.a.createElement(N.a.text,Object.assign({x:5,y:4},l),f.interpolate(function(e){return o.invert(e).toFixed(1)})))}))}),T=n(12),X=D({style:{}}),I=R(A(),X),W=R(A(),D({line:"d3.line().curve(d3.curveCatmullRom.alpha(0.5))"}),D({fill:"transparent",stroke:"hsl(330, 100%, 67%)",strokeWidth:1.5}),I).wrap(function(e){var t=e.data,n=e.clock,r=e.line,c=Object(h.a)(e,["data","clock","line"]),o=Object(a.useMemo)(function(){return"string"===typeof r?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Function.apply(void 0,Object(v.a)(Object.keys(t)).concat(["'use strict';return ".concat(e)])).apply(void 0,Object(v.a)(Object.keys(t).map(function(e){return t[e]})))}(r,{d3:T}):r},[r]);return i.a.createElement(N.a.path,Object.assign({d:n.interpolate(function(){return o(t.current)||"M0,0"})},c))});function B(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=Object(a.useState)(e),n=Object(d.a)(t,2),r=n[0],i=n[1];return[r,Object(a.useCallback)(function(){return i(function(e){return e+1})},[])]}var Y=function(){},P=R(A(),D({timeout:250,first:Y,last:Y})).wrap(function(e,t){var n=e.event,r=e.first,i=e.last,c=e.timeout;Object(a.useEffect)(function(){if(n){var e,t=!1,a=function(){t||(r&&r(),t=!0),e&&clearTimeout(e),e=window.setTimeout(function(){t=!1,i&&i()},c)};return window.addEventListener(n,a),function(){return window.removeEventListener(n,a)}}},t)});var q=n(17),V=n.n(q);var Z={maxSize:1/0};var _=D({initialValue:0,minDelta:10,maxDelta:1/0,halfLife:250}),H=A();_.wrap(function(e){var t=e.initialValue,n=e.minDelta,r=e.maxDelta,i=e.halfLife,c=Object(a.useRef)(t);return H.wrap(function(e){var t=e.datum,a=e.delta,o=Math.pow(.5,a/i);return a<n||(c.current=a>r?1e3/a:o*c.current+(1-o)*t),isNaN(c.current)&&(M("Signal was NaN..."),c.current=0),c.current})});n(20);var J=n(21),U=n.n(J),$=[3.1,3.2,2.1,2,2.9,1.8,4.5,4.2],G=[Math.min.apply(Math,$),Math.max.apply(Math,$)],K=G[0],Q=G[1],ee=(Object(v.a)(Array(100)).map(function(e,t){return[Date.now()+(99-t)/100*-1e4,Math.random()*(Q-K)+K]}),R(A(),D({pusher:{key:"9dfb7224d7fd60cc9c5f",options:{cluster:"us2",forceTLS:!0},event:"new-data"},maxSize:100,initialValue:[]})).wrap(function(e){var t=e.samplePeriod,n=e.maxSize,i=e.initialValue,c=e.pusher,o=c.key,u=c.options,l=c.channelName,s=c.event,f=function(e){var t=r.merge(Z,e),n=t.initialValue,i=t.maxSize,c=Object(a.useMemo)(function(){return n?new V.a(n):new V.a},[]),o=Object(a.useCallback)(function(e){c.splice.apply(c,[c.length,0].concat(Object(v.a)(e))),c.length>i&&c.splice(0,c.length-i)},[]);return[c,o]}({maxSize:n,initialValue:i}),m=Object(d.a)(f,2),h=m[0],p=m[1];return Object(a.useEffect)(function(){if("debug"===l){var e;return function n(){p([[Date.now(),Math.random()*(Q-K)+K]]),e=window.setTimeout(n,t+250*(Math.random()-.5))}(),function(){return clearTimeout(e)}}var n=new U.a(o,u);return n.subscribe(l).bind(s,function(e){var t=e.payload;p(t),Object.assign(window,{buffer:h,payload:t})}),function(){return n.unsubscribe(l)}},[]),h}));function te(e){var t=e.width,n=void 0===t?0:t,r=e.height,a=void 0===r?0:r;return n*this.width+a*this.height}var ne=function(e,t){var n=r.mergeIntersect([-1/0,1/0],t),a=Object(d.a)(n,2),i=a[0],c=a[1];return Math.min(c,Math.max(i,e))},re=R(A(),D({extraHistory:0})).wrap(function(e){var t=e.scaleX,n=e.scaleY,r=e.buffer,i=e.extraHistory,c=Object(N.c)(function(){return{extent:[0,0],config:{tension:60,friction:10}}}),o=Object(d.a)(c,2),u=o[0].extent,l=o[1],s=t.copy(),f=Object(a.useMemo)(function(){return T.bisector(function(e){return e[0]})},[]),m=Object(a.useRef)([]);Object(a.useEffect)(function(){s.domain(t.domain()).range(t.range())});return[m,function(){var e=Date.now(),a=s.domain(t.domain().map(function(t){return t+e})).domain(),c=Object(d.a)(a,2),o=c[0],h=c[1],p=i*(h-o),v=f.left(r,o-p),b=f.right(r,h,v),g=ne(b+2,[,r.length]),w=ne(v-2,[0]),y=r.slice(w,g);y.length&&l({extent:T.extent(y,function(e){return e[1]})}),n.domain(u.value),m.current=y.map(function(e){var t=Object(d.a)(e,2),r=t[0],a=t[1];return[s(r),n(a)]})},s]}),ae=A().wrap(function(e){var t=e.timespan,n=e.dims,r=e.padDomain,i=e.padRange,c=Object(h.a)(e,["timespan","dims","padDomain","padRange"]);Object(a.useEffect)(function(){var e=function(e){var t=e.x,n=void 0===t?{}:t,r=e.y,a=void 0===r?{}:r;return{x:te.call(this,n),y:te.call(this,a)}}.call(n.current,i),a=e.x,o=e.y;c.scaleX.domain([-t.current-r,-r]),c.scaleX.range([a,n.current.width-a]),c.scaleY.range([o,n.current.height-o])});var o=re(c),u=Object(d.a)(o,3),l=u[0],s=u[1],f=u[2];return Object(p.a)({view:l,update:s,currentScaleX:f},c)}),ie=function(e){return e},ce=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ie;return+t(e[1])-+t(e[0])},oe=R(A(),D({textStyle:{fill:"#888",style:{font:"14px ubuntu mono, monospace"}},lineStyle:{stroke:"#444"}})).wrap(function(e){var t=e.clock,n=e.scale,r=e.timespan,a=e.dims,c=e.count,o=e.textStyle,u=e.lineStyle,l=T.scaleTime(),s=l.tickFormat(),f=t.interpolate(function(){l.domain(n.domain()).range(n.range());var e=ce(l.domain(),function(e){return e.getTime()}),t=ne(e/r.current,[1]),i=l.ticks(T.timeSecond.every(t)),c=ce(i.slice(0,2),l)||0;return{ticks:i,pad:ne(.05*c,[1]),height:a.current.height}});return[A().wrap(function(e){return i.a.createElement("g",e,Object(v.a)(Array(c)).map(function(e,t){var n=f.interpolate(function(e){return e.ticks[t]||0}),r=n.interpolate(function(e){return l(e)}),a=f.interpolate(function(e){return e.height}),c=f.interpolate(function(e){return e.pad});return i.a.createElement(N.a.g,{key:t,transform:r.interpolate(function(e){return"translate(".concat(e,",0)")}),visibility:n.interpolate(function(e){return 0!==e?"visible":"hidden"})},i.a.createElement(N.a.line,Object.assign({y2:a},u)),i.a.createElement(N.a.text,Object.assign({x:c,y:Object(N.b)([a,c],function(e,t){return e-t})},o),n.interpolate(function(e){return s(e)})))}))}),f.interpolate(function(e){return e.ticks}),l]}),ue=R(A(),D({dblclick:150})),le=ue.wrap(function(e){var t=e.scale,n=e.svgRef,r=e.dims,i=e.dblclick,c=t.copy(),o=Object(a.useRef)(Y),u=Object(a.useMemo)(function(){return T.zoom().scaleExtent([.2,1])},[]);Object(a.useEffect)(function(){var e=r.current.width;u.extent([[0,0],[e,0]]),u.translateExtent([[-1/0,0],[e,0]]),c.domain(t.domain()).range(t.range())}),Object(a.useEffect)(function(){var e=T.select(n.current);u.on("zoom",function(){var e=T.event.transform;t.domain(e.rescaleX(c).domain())}).duration(i);var r=function(t){return function(){var n=Date.now()-t;t+=n;var r,a=n*(ce((r=c).range())/ce(r.domain()));u.translateBy(e,a,0)}},a=NaN,l="unpaused",s=function e(t){var n=l;switch(l=t){case"unpaused":o.current=Y;break;case"waiting":if("waiting"===n)break;var c={unpaused:"paused",paused:"unpaused"};a=window.setTimeout(function(){e(c[n])},i);break;case"paused":o.current=r(Date.now());break;case"cancelling":window.clearTimeout(a)}};return e.call(u).on("dblclick.zoom",function(){!function(){var r,a=T.zoomTransform(n.current),i=ce(t.range()),o=a.x+i/2,l=.33*T.interpolateZoom([o,0,i],[(r=c.range(),r.length?r.reduce(function(e,t){return e+t},0)/r.length:0),0,ce(c.range())]).duration;e.transition().duration(l).call(u.transform,T.zoomIdentity)}(),s("cancelling"),s("unpaused")}).on("click",function(){return s("waiting")}),function(){return e.on(".zoom",null)}});return function(){return o.current()}}),se=new Map,fe=D({silent:!0,interval:16,batch:NaN});function me(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0,r=fe(t),i=r.silent,c=r.interval,o=r.batch,u=Object(a.useRef)(!0);Object(a.useEffect)(function(){u.current?u.current=!1:console.error("Options passed to useAnimationFrame were toggled in the same lifecycle of the component. Don't do this! Options must be kept constant or React hooks won't work.")},[i,c,o]);var l=i?function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=Object(a.useRef)(e),n=Object(a.useCallback)(function(){return t.current++},[]);return[t.current,n]}():B(),s=Object(d.a)(l,2)[1];Object(a.useEffect)(function(){var t,n=16==c?function(e){return t=window.requestAnimationFrame(e)}:function(e){return t=window.setTimeout(e,c)},r=isFinite(o)?se.has(o)?(se.get(o).push(e),se.get(o)):se.set(o,[e]).get(o):se.set(se.size,[e]).get(se.size-1),a=function e(t){var a=t||performance.now();r.forEach(function(e){return e(a)}),s(),n(e)};return 16==c?(t=window.requestAnimationFrame(a),function(){return window.cancelAnimationFrame(t)}):(t=window.setTimeout(a,c),function(){return window.clearTimeout(t)})},n)}var de=fe.extend(D({})).wrap(function(e){var t=Object(N.c)(function(){return{clock:0,immediate:!0}}),n=Object(d.a)(t,2),r=n[0].clock,a=n[1];return me(function(){a({clock:r.value+e.interval})},e),r}),he=R(A()).wrap(function(e){var t=e.svgRef,n=e.channelNames,r=de(),c=Object(a.useRef)({width:0,height:0}),o=Object(a.useRef)(0);Object(a.useEffect)(function(){c.current=t.current.getBoundingClientRect(),o.current=c.current.width/.1});var u={y:{height:.1}},l=ae({buffer:ee({samplePeriod:400,maxSize:500,pusher:{channelName:n[0]}}),scaleX:T.scaleLinear(),scaleY:T.scaleLinear(),timespan:o,dims:c,padDomain:1600,padRange:u}),s=ae({buffer:ee({samplePeriod:400,maxSize:500,pusher:{channelName:n[1]}}),scaleX:l.scaleX,scaleY:T.scaleLinear(),timespan:o,dims:c,padDomain:1600,padRange:u}),f=le({scale:l.scaleX,svgRef:t,dims:c}),m=oe(Object(p.a)({},{clock:r,scale:l.currentScaleX,timespan:o,dims:c,count:25})),h=Object(d.a)(m,3),v=h[0],b=h[1],g=h[2],w=T.line().curve(T.curveCatmullRom.alpha(.5));performance.now();return i.a.createElement(i.a.Fragment,null,i.a.createElement(N.a.g,{visibility:"hidden"},r.interpolate(function(){Object.assign(window,{svgRef:t,view:l.view,currentScaleX:l.currentScaleX,timespan:o.current,amps:l,dims:c}),f(),l.update(),s.update()})),i.a.createElement("clipPath",{id:"inside"},i.a.createElement(N.a.rect,{x:r.interpolate(function(){return.2*c.current.height}),width:r.interpolate(function(){return c.current.width-2*c.current.height*.2}),height:"100%"})),i.a.createElement("clipPath",{id:"outside"},i.a.createElement(N.a.rect,{width:r.interpolate(function(){return.2*c.current.height}),height:"100%"}),i.a.createElement(N.a.rect,{x:r.interpolate(function(){return c.current.width-.2*c.current.height}),width:r.interpolate(function(){return.2*c.current.height}),height:"100%"})),i.a.createElement(v,null),i.a.createElement("g",{clipPath:"url(#inside)"},i.a.createElement(W,{data:l.view,clock:r,line:w}),i.a.createElement(F,{ticks:b,ticksScale:g,scaleY:l.scaleY,data:l.view,count:25,curve:w.curve()}),i.a.createElement(W,{stroke:"hsl(210, 100%, 67%)",data:s.view,clock:r,line:w}),i.a.createElement(F,{circleStyle:{fill:"hsl(210, 100%, 75%)",stroke:"hsl(210, 100%, 50%)"},textStyle:{fill:"hsl(210, 100%, 75%)"},ticks:b,ticksScale:g,scaleY:s.scaleY,data:s.view,count:25,curve:w.curve()})),i.a.createElement("g",{clipPath:"url(#outside)"},i.a.createElement(W,{data:l.view,clock:r,line:w,strokeDasharray:"4 6",strokeDashoffset:r.interpolate(function(e){return e/20})}),i.a.createElement(W,{strokeDasharray:"4 6",strokeDashoffset:r.interpolate(function(e){return e/20}),stroke:"hsl(210, 100%, 67%)",data:s.view,clock:r,line:w})))}),pe={_window:window},ve=function(e){var t=r.mergeIntersect(pe,e)._window,n=e.event,a=e.customEvent;if(!n)throw Error("`event` should not be blank");if(!a)throw Error("`customEvent` should not be blank");var i=!0,c=function(){t.dispatchEvent(new CustomEvent(a)),i=!0},o=function(){i&&(i=!1,requestAnimationFrame(c))};t.addEventListener(n,o,{passive:!0});return function(){t.removeEventListener(n,o)}};ve({event:"resize",customEvent:"optimized-resize"});var be=R(D({radius:5,timeout:250,enabled:!0,style:{filter:""}}),I),ge=(R(be.own),be.wrap(function(e,t){var n=e.children,r=e.style,c=e.radius,o=e.timeout,u=e.enabled,l=Object(N.c)(function(){return{filter:"".concat(r.filter," blur(0px)"),from:{filter:"".concat(r.filter," blur(").concat(c,"px)")},config:{duration:250}}}),s=Object(d.a)(l,2),f=s[0].filter,m=s[1];return P({event:"optimized-resize",first:function(){return m({filter:"".concat(r.filter," blur(").concat(u?c:0,"px)")})},last:function(){return m({filter:"".concat(r.filter," blur(0px)")})},timeout:o},[o]),Object(a.useEffect)(function(){var e=function(){m({filter:"".concat(r.filter," blur(").concat(u&&document.hidden?c:0,"px)")})};return document.addEventListener("visibilitychange",e),function(){return document.removeEventListener("visibilitychange",e)}},[r.filter,u,c]),i.a.createElement(N.a.div,{ref:t,style:Object(p.a)({},r,{filter:f})},n)})),we=i.a.forwardRef(ge),ye=be.extend(A(),D({style:{position:"relative",width:"100%",height:"100%",borderRadius:"5px",backgroundColor:"#040404"}})).wrap(function(e){var t=e.channelNames,n=Object(h.a)(e,["channelNames"]),r=Object(a.useRef)(null),c=B(),o=Object(d.a)(c,2)[1];return P({event:"optimized-resize",last:o},[]),i.a.createElement(we,n,i.a.createElement("svg",{ref:r,width:"100%",height:"100%"},i.a.createElement(he,{channelNames:t,svgRef:r})))}),je=function(e){var t=[null,i.a.createElement("path",{d:"M 12 18 C 11.5 18 10.992188 18.199219 10.59375 18.5 L 12 20 L 13.40625 18.5 C 13.007813 18.199219 12.5 18 12 18 Z"}),i.a.createElement("path",{d:"M 12 13 C 10.148438 13 8.484375 13.726563 7.21875 14.875 L 8.5625 16.34375 C 9.496094 15.492188 10.648438 15 12 15 C 13.351563 15 14.503906 15.492188 15.4375 16.34375 L 16.78125 14.875 C 15.515625 13.726563 13.851563 13 12 13 Z "}),i.a.createElement("path",{d:"M 12 8 C 8.847656 8 5.988281 9.214844 3.8125 11.28125 L 5.1875 12.71875 C 7.011719 10.984375 9.351563 10 12 10 C 14.625 10 17 11.089844 18.84375 12.75 L 20.15625 11.25 C 18 9.308594 15.175781 8 12 8 Z "}),i.a.createElement("path",{d:"M 12 3 C 7.546875 3 3.398438 4.707031 0.40625 7.59375 L 1.78125 9.03125 C 4.390625 6.515625 8.054688 5 12 5 C 15.945313 5 19.492188 6.492188 22.21875 9.03125 L 23.59375 7.5625 C 20.519531 4.699219 16.453125 3 12 3 Z "})];return i.a.createElement("div",{style:{display:"flex",alignItems:"center"}},i.a.createElement("svg",{viewBox:"0 0 24 24",style:{width:"1em",height:"1em",fill:"white"}},i.a.Children.map(t,function(t,n){if(i.a.isValidElement(t)){var r=n<=e.level?1:.3;return i.a.cloneElement(t,{style:{opacity:r}})}})),i.a.createElement("div",{style:{marginLeft:"1ex"}},"utexas"))};function Oe(){var e=Object(a.useState)(null),t=Object(d.a)(e,2)[1];return Object(a.useEffect)(function(){var e=requestAnimationFrame(function e(){t(function(){return null}),requestAnimationFrame(e)});return function(){return cancelAnimationFrame(e)}},[]),i.a.createElement("div",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"}},(new Date).toLocaleTimeString())}function Ee(){return(Ee=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var ke=i.a.createElement("path",{d:"M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z"}),xe=function(e){return i.a.createElement("svg",Ee({viewBox:"0 0 24 24"},e),ke)};n.p;function Se(e){return i.a.createElement("div",{style:{display:"flex",alignItems:"center"}},i.a.createElement(xe,{style:{width:"1em",height:"1em",fill:"white"}}),i.a.createElement("div",{style:{marginLeft:"1ex"}}," Welcome, ",e.username))}var Ce=function(e){var t=Object(a.useState)({level:4,username:"Dr. Santoso"}),n=Object(d.a)(t,2),r=n[0];n[1];return Object(a.useEffect)(function(){},[]),i.a.createElement("div",{style:{font:"1em monospace",lineHeight:"1.25em",backgroundColor:"#222",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",paddingLeft:"2ex",paddingRight:"2ex",position:"relative"}},i.a.createElement(je,{level:r.level}),i.a.createElement(Oe,null),i.a.createElement(Se,{username:r.username}))},Le=function(e){var t=.3*Math.random()+.7,n=2*Math.PI*49;return i.a.createElement("svg",Object.assign({viewBox:"0 0 100 100"},e),i.a.createElement("circle",{cx:"50",cy:"50",r:"49",fill:"none",stroke:"green",strokeWidth:"2",strokeDasharray:"".concat(n," ").concat(n),strokeDashoffset:(1-t)*n,transform:"rotate(-90 50 50)"}),i.a.createElement("text",{x:"50",y:"45",fill:"white",style:{fontFamily:"ubuntu mono, monospace"},fontSize:"40"},i.a.createElement("tspan",{textAnchor:"middle",alignmentBaseline:"middle"},(100*t).toFixed(0)),i.a.createElement("tspan",{alignmentBaseline:"baseline",fontSize:"15",dy:"-5"},"%"),i.a.createElement("tspan",{x:"50",y:"72.5",fontSize:"10",textAnchor:"middle",alignmentBaseline:"middle"},"MAX")))},ze=function(e){function t(){return Object(u.a)(this,t),Object(s.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(Ce,null),i.a.createElement("div",{className:"main"},i.a.createElement("div",{className:"row"},i.a.createElement(Le,{height:"100%"}),i.a.createElement(ye,{channelNames:["ch0","ch1"]})),i.a.createElement("div",{className:"row"},i.a.createElement(Le,{height:"100%"}),i.a.createElement(ye,{channelNames:["ch2","ch3"]})),i.a.createElement("div",{className:"row"},i.a.createElement(Le,{height:"100%"}),i.a.createElement(ye,{channelNames:["debug","debug"]}))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(ze,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[22,2,1]]]);
//# sourceMappingURL=main.9e0138bd.chunk.js.map