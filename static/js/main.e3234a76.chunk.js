(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e,t,n){e.exports=n(38)},27:function(e,t,n){},29:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"ignoreUndefined",function(){return w}),n.d(r,"defaultMerger",function(){return g}),n.d(r,"mergeIntersect",function(){return y}),n.d(r,"mergeIntersectWith",function(){return O}),n.d(r,"merge",function(){return j}),n.d(r,"mergeWith",function(){return E}),n.d(r,"_mergeDeepWith",function(){return S}),n.d(r,"_mergeDeep",function(){return R});var a=n(0),i=n.n(a),o=n(18),c=n.n(o),u=(n(27),n(3)),f=n(5),s=n(9),l=n(7),d=n(8),v=(n(29),n(4)),h=n(11),m=n(6),p=n(13),b=n(14);function w(e,t){return void 0===t?e:t}function g(e,t){return t}function y(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return O.apply(void 0,[w,e].concat(n))}function O(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var i=Object.keys(t);return r=r.filter(Boolean).map(function(e){return e instanceof Array?e:Object.keys(e).filter(function(e){return i.includes(e)}).reduce(function(t,n){return Object(h.a)({},t,Object(p.a)({},n,e[n]))},{})}),E.apply(void 0,[e,t].concat(Object(m.a)(r)))}function j(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return E.apply(void 0,[w].concat(t))}function E(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return S.apply(void 0,[e].concat(n)).toJS()}function x(e){return e&&"object"===typeof e&&"function"===typeof e.mergeWith&&!b.a.isList(e)}function S(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return n.slice(1).reduce(function(t,n){return function t(n,r,a){return x(n)&&null!==r?n.mergeWith(t,r):b.a.isList(n)&&b.a.isList(r)?r.reduce(function(n,r,a){var i=n.get(a);return x(i)?n.set(a,i.mergeWith(t,r)):n.set(a,e(i,r,a))},n):e(n,r,a)}(t,Object(b.b)(n))},Object(b.b)(null!=n[0]?n[0]:{}))}function R(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return S.apply(void 0,[g].concat(t))}var T={hello:3,canvasStyle:[1,2,3],canvasEffects:function(){}},k={hello:"world",canvasStyle:[3,,1],poop:"hiii"},C=(j(T,k),j.apply(void 0,Object(m.a)([T,k])),function(){});function M(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];var i=j.apply(r,Object(m.a)(n.map(function(e){return e.defaults})).concat([e.defaults]));Object.keys(i).forEach(function(e){"children"===e?C("Don't use a default children prop! Refs will be lost."):"object"===typeof i[e]&&"current"in i[e]&&C("Found an default property with a 'current' property. If this is a 'React.RefObject' beware that the ref may be lost! ".concat(e,":"),i[e])});var o=function(e){return Object(h.a)({},e,y(i,e))},c=![e].concat(n).some(function(e){return"required"in e}),s=function(){function e(){Object(u.a)(this,e)}return Object(f.a)(e,null,[{key:"default",value:function(e){return function(t,n){for(var r=arguments.length,a=new Array(r>2?r-2:0),i=2;i<r;i++)a[i-2]=arguments[i];return e.apply(void 0,[o(t),n].concat(a))}}},{key:"optional",value:function(t){return e.default(t)}}]),e}();s.decorator=c?s.optional:s.default;var l={defaults:i,required:{},injected:{},propsIn:{},propsOut:{},own:e,bases:n,wrap:s.decorator,extend:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return M(e,M.apply(void 0,[this].concat(n)))}};return Object.assign(o,l)}function z(){var e,t;return M((t=e=function e(){Object(u.a)(this,e)},e.required=void 0,t))}function L(){for(var e,t,n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return M((t=e=function e(){Object(u.a)(this,e)},e.defaults=j.apply(r,Object(m.a)(a.reverse())),t))}function N(){var e,t;return M((t=e=function e(){Object(u.a)(this,e)},e.injected=void 0,t))}var D=M(L({dims:{width:300,height:150},setNeedsUpdate:function(){throw new Error("Forgot to attach setNeedsUpdate...")}}),N()),A=N();function F(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(null==e){if(t.REF_NULL)throw Error(t.REF_NULL);return!1}if(!("current"in e)){if(t.NO_CURRENT)throw Error(t.NO_CURRENT);return!1}return!0}var I=new Map;function U(e){if(!function(e){if(!F(e,{REF_NULL:"`canvasRef` should not be `null`",NO_CURRENT:"Use a React.RefObject not a functional ref. (`current` member not found in `canvasRef`.)"}))throw Error();if(null==e.current)throw Error("`canvasRef.current` should not be `null`");return!0}(e))throw Error();var t=I.get(e.current);if(t)return t;var n=e.current,r=n.getContext("2d"),a={canvas:n,ctx:Y(r)};return I.set(e.current,a),a}function P(){return document.createElementNS("http://www.w3.org/2000/svg","g").getCTM()}function Y(e){var t=P(),n={currentTransform:t,savedTransforms:[t],_setMatrix:function(){var t=n.currentTransform;e.setTransform(t.a,t.b,t.c,t.d,t.e,t.f)},save:function(){n.savedTransforms.push(n.currentTransform),e.save()},restore:function(){0!=n.savedTransforms.length&&(e.restore(),n.currentTransform=n.savedTransforms.pop(),n._setMatrix())},scale:function(t,r){n.currentTransform=n.currentTransform.scaleNonUniform(t,r),e.scale(t,r)},rotate:function(t){n.currentTransform=n.currentTransform.rotate(180*t/Math.PI),e.rotate(t)},translate:function(t,r){n.currentTransform=n.currentTransform.translate(t,r),e.translate(t,r)},transform:function(t,r,a,i,o,c){var u=P();u.a=t,u.b=r,u.c=a,u.d=i,u.e=o,u.f=c,n.currentTransform=n.currentTransform.multiply(u),e.transform(t,r,a,i,o,c)},resetTransform:function(){n.currentTransform=P(),e.resetTransform()},isolate:function(e){n.save(),e(),n.restore()},get width(){return U({current:e.canvas}).canvas.dims.width},get height(){return U({current:e.canvas}).canvas.dims.height},call:function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),a=1;a<t;a++)r[a-1]=arguments[a];return e.call.apply(e,[n].concat(r))},deriveCoordinate:function(e){var t=e.width,r=void 0===t?0:t,a=e.height,i=void 0===a?0:a;return r*n.width+i*n.height},deriveCoordinates:function(e){var t=e.x,r=void 0===t?{}:t,a=e.y,i=void 0===a?{}:a;return{x:n.deriveCoordinate(r),y:n.deriveCoordinate(i)}}};return new Proxy(e,{get:function(e,t){var r=t in n?n[t]:t in e?e[t]:void 0;return void 0===r?r:"function"===typeof r?function(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return r.apply(e,n)}:r},set:function(e,t,n){return t in e&&(e[t]=n),!0}})}var _=function(){};function X(e){var t=Object(a.useMemo)(e,[]);return Object(a.useRef)(t)}var W={timeout:250,first:_,last:_};function V(e,t){Object(a.useEffect)(function(){var t=r.merge(W,e),n=t.event,a=t.first,i=t.last,o=t.timeout;if(n){var c,u=!1,f=function(){u||(a&&a(),u=!0),c&&clearTimeout(c),c=window.setTimeout(function(){u=!1,i&&i()},o)};return window.addEventListener(n,f),function(){return window.removeEventListener(n,f)}}},t)}var q=n(17),B=n.n(q);var G={maxSize:1/0};var J=L({initialValue:0,minDelta:10,maxDelta:1/0,halfLife:250}),H=z(),$=J.wrap(function(e){var t=e.initialValue,n=e.minDelta,r=e.maxDelta,i=e.halfLife,o=Object(a.useRef)(t);return H.wrap(function(e){var t=e.datum,a=e.delta,c=Math.pow(.5,a/i);return a<n||(o.current=a>r?1e3/a:c*o.current+(1-c)*t),isNaN(o.current)&&(C("Signal was NaN..."),o.current=0),o.current})});n(20);function K(e){return Object(a.useMemo)(function(){return function(e){return function(t,n){var r=X(function(){return Object(b.b)(n)});return r.current=R(r.current,n),e(t,[r.current])}}(e)},[])}var Q=L({style:{},injectEffect:_}),Z=Q.extend(L({inputs:void 0,injection:!1}));function ee(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=Z(t),r=n.style,i=n.injectEffect,o=n.inputs,c=n.injection;return null!=o?K(a.useMemo)(function(){return u},o):u;function u(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];var o=function(t){var a=function(){Object.assign(t,r),i(t),e(t),n.filter(Boolean).forEach(function(e){return e(t)})};c?a():t.isolate(a)};if(te.isEnhancedContext(n[0])){var u=n[0];return n.length>1&&C("This effect is ignoring the children it received because a canvas context was passed as its first argument. This is probably a programmer mistake. Ignored:",n.slice(1)),n=[],o(u)}return o}}var te=function(){function e(){Object(u.a)(this,e)}return Object(f.a)(e,null,[{key:"newEffect",value:function(){return{}}},{key:"isEnhancedContext",value:function(e){return e instanceof CanvasRenderingContext2D&&null!=e.currentTransform}}]),e}(),ne=ee(function(e){var t=e.width,n=e.height;e.clearRect(0,0,t,n)}),re={_window:window},ae=function(e){var t=r.mergeIntersect(re,e)._window,n=e.event,a=e.customEvent;if(!n)throw Error("`event` should not be blank");if(!a)throw Error("`customEvent` should not be blank");var i=!0,o=function(){t.dispatchEvent(new CustomEvent(a)),i=!0},c=function(){i&&(i=!1,requestAnimationFrame(o))};t.addEventListener(n,c,{passive:!0});return function(){t.removeEventListener(n,c)}};ae({event:"resize",customEvent:"optimized-resize"});var ie,oe,ce=L({style:{}}),ue=M(z(),ce),fe=n(15),se=M(L({radius:5,timeout:250,enabled:!0,style:{filter:""}}),ue),le=(M(se.own),se.wrap(function(e,t){var n=e.children,r=e.style,o=e.radius,c=e.timeout,u=e.enabled,f=Object(fe.c)(function(){return{filter:"".concat(r.filter," blur(0px)"),from:{filter:"".concat(r.filter," blur(").concat(o,"px)")},config:{duration:250}}}),s=Object(v.a)(f,2),l=s[0].filter,d=s[1];return V({event:"optimized-resize",first:function(){return d({filter:"".concat(r.filter," blur(").concat(u?o:0,"px)")})},last:function(){return d({filter:"".concat(r.filter," blur(0px)")})},timeout:c},[c]),Object(a.useEffect)(function(){var e=function(){d({filter:"".concat(r.filter," blur(").concat(u&&document.hidden?o:0,"px)")})};return document.addEventListener("visibilitychange",e),function(){return document.removeEventListener("visibilitychange",e)}},[r.filter,u,o]),i.a.createElement(fe.a.div,{ref:t,style:Object(h.a)({},r,{filter:l})},n)})),de=i.a.forwardRef(le),ve=M((oe=ie=function e(){Object(u.a)(this,e)},ie.required=void 0,ie.defaults={style:{position:"relative",overflow:"hidden",width:"300px",height:"150px",boxSizing:"content-box"},timeout:500,notify:_},oe),ue),he=i.a.forwardRef(ve.wrap(function(e,t){var n=Object(a.useState)(0),r=Object(v.a)(n,2),o=r[0],c=r[1],u=Object(a.useRef)(null),f=Object(a.useRef)(null),s=Object(a.useRef)(!0);if(t=t||f,!F(f))throw Error();var l=e.blur,d=e.children,h=e.style,m=e.timeout,p=e.notify;K(a.useLayoutEffect)(function(){var e=u.current,n=U(t),r=n.canvas,a=n.ctx,i=function(t){return parseFloat(window.getComputedStyle(e).getPropertyValue(t))},o=i("width"),c=i("height");if("border-box"==e.style.boxSizing){var f=function(e){return i("border-".concat(e,"-width"))+i("padding-".concat(e))};o-=f("left")+f("right"),c-=f("top")+f("bottom")}var l=performance.now();!function(e){var t=e.canvas,n=e.ctx,r=e.width,a=e.height,i=window.devicePixelRatio,o=r,c=a;r=Math.ceil(r*i),a=Math.ceil(a*i),t.width=r,t.height=a,t.style.width="".concat(r/i,"px"),t.style.height="".concat(a/i,"px");var u=n||t.getContext("2d");u.resetTransform(),u.scale(i,i),u.beginPath(),u.rect(0,0,o,c),u.clip(),t.dims=D({dims:{width:o,height:c}}).dims}({canvas:r,width:o,height:c,ctx:a}),C("GoodCanvas rescale complete. (".concat((performance.now()-l).toFixed(2)," ms)")),!s.current&&p&&p()},[o,h]),Object(a.useLayoutEffect)(function(){U(t).canvas.setNeedsUpdate=c},[]),V({event:"optimized-resize",first:function(){return C("GoodCanvas is rescaling because the window resized. If this is happening often, there could be a negative performance impact.")},last:function(){return c(function(e){return e+1})},timeout:m},[m]),K(a.useEffect)(function(){s.current||C("GoodCanvas is rescaling because the `style` prop changed. If this is happening often, there could be a negative performance impact.")},[h]),Object(a.useEffect)(function(){s.current=!1},[]),Object(a.useEffect)(function(){return function(){return C("GoodCanvas is unmounting. If this is happening often, there could be a negative performance impact.")}},[]),C("GoodCanvas RENDER");var b=K(a.useMemo)(function(){return function e(t,n){return t?i.a.createElement(i.a.Fragment,null,i.a.Children.map(t,function(t){return i.a.isValidElement(t)?(e(t.props.children,n),"function"==typeof n?i.a.cloneElement(t,n(t)):i.a.cloneElement(t,n)):t})):null}(d,function(e){return{canvasRef:t,canvasNeedsUpdate:o}})},[o,d,t]);return i.a.createElement("div",{style:h,ref:u},i.a.createElement(de,Object.assign({style:{width:"100%",height:"100%"}},l),i.a.createElement("canvas",{style:{position:"absolute",left:0,top:0,margin:0,padding:0,border:"none"},ref:t},b)))})),me=n(16),pe=Q.extend(z(),L({radius:3,style:{fillStyle:"hsl(330, 100%, 75%)",strokeStyle:"hsl(330, 100%, 50%)",lineWidth:.5}})).wrap(function(e){var t=e.data,n=e.radius;return ee(function(e){var r=!0,a=!1,i=void 0;try{for(var o,c=t.current[Symbol.iterator]();!(r=(o=c.next()).done);r=!0){var u=o.value,f=Object(v.a)(u,2),s=f[0],l=f[1];e.beginPath(),e.arc(s,l,n,0,2*Math.PI),e.fill(),e.stroke()}}catch(d){a=!0,i=d}finally{try{r||null==c.return||c.return()}finally{if(a)throw i}}},Object(me.a)(e,["data","radius"]))}),be=n(12),we=Q.extend(z(),L({line:"d3.line().curve(d3.curveCatmullRom.alpha(0.5))"})).wrap(function(e){var t=e.data,n=e.line,r=Object(me.a)(e,["data","line"]),i=Object(a.useMemo)(function(){return"string"===typeof n?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Function.apply(void 0,Object(m.a)(Object.keys(t)).concat(["'use strict';return ".concat(e)])).apply(void 0,Object(m.a)(Object.keys(t).map(function(e){return t[e]})))}(n,{d3:be}):n},[n]);return ee(function(e){i.context(e),e.beginPath(),i(t.current),e.stroke()},r)}),ge=[3.1,3.2,2.1,2,2.9,1.8,4.5,4.2],ye=[Math.min.apply(Math,ge),Math.max.apply(Math,ge)],Oe=ye[0],je=ye[1],Ee=Object(m.a)(Array(100)).map(function(e,t){return[Date.now()+(99-t)/100*-1e4,Math.random()*(je-Oe)+Oe]}),xe=M(z(),L({maxSize:1e3,initialValue:Ee})).wrap(function(e){var t=e.samplePeriod,n=function(e){var t=r.merge(G,e),n=t.initialValue,i=t.maxSize,o=Object(a.useMemo)(function(){return n?new B.a(n):new B.a},[]),c=Object(a.useCallback)(function(e){o.splice.apply(o,[o.length,0].concat(Object(m.a)(e))),o.length>i&&o.splice(0,o.length-i)},[]);return[o,c]}({maxSize:e.maxSize,initialValue:e.initialValue}),i=Object(v.a)(n,2),o=i[0],c=i[1];return Object(a.useEffect)(function(){var e;return function n(){c([[Date.now(),Math.random()*(je-Oe)+Oe]]),e=window.setTimeout(n,t+250*(Math.random()-.5))}(),function(){return clearTimeout(e)}},[]),o}),Se=function(e,t){var n=r.mergeIntersect([-1/0,1/0],t),a=Object(v.a)(n,2),i=a[0],o=a[1];return Math.min(o,Math.max(i,e))},Re=M(z(),L({extraHistory:0})).wrap(function(e){var t=e.scaleX,n=e.scaleY,r=e.buffer,i=e.extraHistory,o=e.padding,c=Object(fe.c)(function(){return{extent:[0,0],config:{tension:60,friction:10}}}),u=Object(v.a)(c,2),f=u[0].extent,s=u[1],l=t.copy(),d=Object(a.useMemo)(function(){return be.bisector(function(e){return e[0]})},[]),h=Object(a.useRef)([]),m=ee(function(){var e=Date.now();l.domain(t.domain().map(function(t){return t+e-o.by.value}));var a=l.domain(),c=Object(v.a)(a,2),u=c[0],m=c[1],p=m-u,b=i*p,w=d.left(r,u-b),g=d.right(r,m,w),y=Se(g+2,[,r.length]),O=Se(w-2,[0]),j=Se(y-2,[0]);if(r.length){var E=r[g-1][0]-r[j-1][0];o.immediate.current=Se(E,[o.immediate.current]),o.update({by:o.immediate.current})}var x=r.slice(O,y);x.length&&s({extent:be.extent(x,function(e){return e[1]})}),Object.assign(window,{extent:f.value,timespan:p,left:w,right:g,buffer:r,hist:b,start:u,end:m,now:e,length:h.current.length,transformed:h}),n.domain(f.value),h.current=x.map(function(e){var t=Object(v.a)(e,2),r=t[0],a=t[1];return[l(r),n(a)]})});return{view:h,update:m,scaleX:l}}),Te=M(L({period:300}),z()).wrap(function(e){var t=e.segments,n=e.period,r=t.reduce(function(e,t){return e+t},0),i=Object(a.useRef)(0);return ee(function(e){e.setLineDash(t),e.lineDashOffset=i.current=(i.current+r*(1e3/60/n))%r},{inputs:[t]})}),ke=Q.extend(L({position:{x:{width:1,height:0},y:{width:0,height:1}},offset:{x:{width:0,height:-.05},y:{width:0,height:-.025}},style:{font:"20px ubuntu mono, monospace",fillStyle:"#fff"}}),Q).wrap(function(e){var t=e.position,n=e.offset,r=Object(me.a)(e,["position","offset"]),a=$({halfLife:125}),i=Object(fe.c)(function(){return{delta:0,config:fe.b.slow}}),o=Object(v.a)(i,2),c=o[0].delta,u=o[1],f=X(function(){return performance.now()});return ee(function(e){var r=performance.now(),i=a({datum:r-f.current,delta:r-f.current});u({delta:i}),f.current=r;var o=c.value>10?1e3/c.value:60,s="".concat(o.toFixed(1)," FPS"),l=e.measureText(s).width,d=e.deriveCoordinates(t),v=d.x,h=d.y,m=e.deriveCoordinates(n),p=m.x,b=m.y;e.fillText(s,v+p-l,h+b)},Object(h.a)({inputs:[e]},r))}),Ce=M(z(),z(A.propsOut)).wrap(function(e){var t=e.canvasRef,n=e.canvasNeedsUpdate,r=e.padding,i=Object(a.useMemo)(function(){return[be.scaleLinear(),be.scaleLinear()]},[]),o=Object(v.a)(i,2),c=o[0],u=o[1];return Object(a.useEffect)(function(){var e=U(t),n=e.canvas,a=e.ctx,i=n.dims,o=i.width,f=i.height,s=a.deriveCoordinates(r),l=s.x,d=s.y;c.range([l,o-l]),u.range([d,f-d])},[n]),[c,u]}),Me=M(z(),z(A.propsOut)).wrap(function(e){var t=e.canvasRef,n=e.canvasNeedsUpdate,r=e.speed,i=Object(a.useState)(0),o=Object(v.a)(i,2),c=o[0],u=o[1];return Object(a.useEffect)(function(){var e=U(t).canvas;u(e.dims.width/(r/1e3))},[n]),c});function ze(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.silent,r=void 0===n||n,i=t.interval,o=void 0===i?16:i,c=arguments.length>2?arguments[2]:void 0,u=Object(a.useRef)(!0);Object(a.useEffect)(function(){u.current?u.current=!1:console.error("Options passed to useAnimationFrame were toggled in the same lifecycle of the component. Don't do this! Options must be kept constant or React hooks won't work.")},[r,o]);var f=r?function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=Object(a.useRef)(e),n=Object(a.useCallback)(function(){return t.current++},[]);return[t.current,n]}():function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=Object(a.useState)(e),n=Object(v.a)(t,2),r=n[0],i=n[1];return[r,Object(a.useCallback)(function(){return i(function(e){return e+1})},[])]}(),s=Object(v.a)(f,2)[1];16==o?Object(a.useEffect)(function(){var t=window.requestAnimationFrame(function n(){e(),s(),t=window.requestAnimationFrame(n)});return function(){return window.cancelAnimationFrame(t)}},c):Object(a.useEffect)(function(){var t=window.setInterval(function(){e(),s()},o);return function(){return window.clearInterval(t)}},c)}var Le=L({by:{width:0,height:.05},invert:!1}).wrap(function(e){var t=e.invert,n=e.by;return ee(function(e){var r=e.width,a=e.height,i=e.deriveCoordinate(n),o=new Path2D;e.beginPath(),o.rect(i,0,r-2*i,a),t&&o.rect(0,0,r,a),e.clip(o,"evenodd")})}),Ne=function(e){return e},De=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Ne;return+t(e[1])-+t(e[0])},Ae=M(z(),z(A.propsOut)),Fe=function(e){return De(e.range())/De(e.domain())},Ie=Ae.wrap(function(e){var t=e.baseScale,n=e.canvasRef,i=e.canvasNeedsUpdate,o=t.copy(),c=Object(a.useRef)(_),u=Object(a.useMemo)(function(){return be.zoom().scaleExtent([.2,1])},[]);Object(a.useEffect)(function(){var e=U(n).canvas.dims,t=e.width,r=e.height;u.extent([[0,0],[t,r]]),u.translateExtent([[-1/0,0],[t,r]])},[i]),K(a.useEffect)(function(){var e=U(n).canvas,a=be.select(e),i=function(e){var t=e.zoom,n=e.baseScale,a=e.selection,i=e.effect,o=Object(b.b)({clientX:0,clientY:0}),c=Date.now(),u=!0,f=Date.now(),s=function(){var e=Date.now()-f;f+=e;var r=e*Fe(n);isFinite(r)&&t.translateBy(a,r,0),Object.assign(window,{at:f,lastClicked:c,effect:i.current})};return{onStart:function(){var e=be.event;if(!(e.sourceEvent instanceof MouseEvent||e.sourceEvent instanceof TouchEvent))return;var t={clientX:e.sourceEvent.clientX,clientY:e.sourceEvent.clientY};o=r._mergeDeep(o,t)},onEnd:function(){var e=be.event;if(!(e.sourceEvent instanceof MouseEvent||e.sourceEvent instanceof TouchEvent))return;var t={clientX:e.sourceEvent.clientX,clientY:e.sourceEvent.clientY};if(r._mergeDeep(o,t)===o){var n=Date.now()-c;c+=n,n<250?(u=!0,i.current=_,a.dispatch("dblclick.zoom")):u?(u=!1,f=c,i.current=s):(u=!0,i.current=_)}}}}({zoom:u,baseScale:t,selection:a,effect:c}),f=i.onStart,s=i.onEnd;return u.on("zoom",function(){var e=be.event.transform;o.domain(e.rescaleX(t).domain()),Object.assign(window,{zoomedScale:o})}).on("start",f).on("end",s),a.call(u).on("dblclick.zoom",function(){a.transition().duration(500).call(u.transform,be.zoomIdentity)}),function(){return a.on(".zoom",null)}},[t]),Object.assign(window,{canvas:n.current,zoom:u,d3:be});var f=ee(function(){return c.current()});return[o,f]});z();var Ue=L({spread:0,blur:1,offsetX:0,offsetY:0,color:"inherit"}).wrap(function(e){var t=e.spread,n=e.blur,r=e.offsetX,a=e.offsetY,i=e.color;return ee(function(e){var o=e.lineWidth,c=void 0===o?0:o,u="none"===e.filter?"":e.filter+" ";e.filter=u+"blur(".concat(n,"px)"),e.translate(r,a),e.lineWidth+=c+2*t,"inherit"!==i&&(e.fillStyle=i,e.strokeStyle=i)},{injection:!0})}),Pe=A.wrap(function(e){var t=xe({samplePeriod:400,maxSize:1e3}),n=xe({samplePeriod:400,maxSize:1e3}),r=Ce(Object(h.a)({padding:{y:{height:.1}}},e)),i=Object(v.a)(r,2),o=i[0],c=i[1],u=Ce(Object(h.a)({padding:{y:{height:.1}}},e)),f=Object(v.a)(u,2)[1],s=Me(Object(h.a)({speed:100},e)),l=o.copy().domain([-s,0]),d=Ie(Object(h.a)({baseScale:l},e)),m=Object(v.a)(d,2),p=m[0],b=m[1],w=function(e){var t=Object(a.useRef)(0),n=Object(fe.c)(function(){return Object(h.a)({},e)}),r=Object(v.a)(n,2);return{by:r[0].by,update:r[1],immediate:t}}({by:800}),g=Re({scaleX:p,scaleY:c,buffer:t,padding:w}),y=g.view,O=g.update,j=Re({scaleX:p,scaleY:f,buffer:n,padding:w}),E=j.view,x=j.update,S=j.scaleX,R=M(z(),L({style:{fillStyle:"#888",strokeStyle:"#444",font:"14px ubuntu mono, monospace"}}),Q).wrap(function(e){var t=e.viewScale,n=Object(me.a)(e,["viewScale"]),r=be.scaleTime().range(l.range()),a=r.tickFormat();return ee(function(e){r.domain(t.domain());var n=De(r.domain(),function(e){return e.getTime()}),i=Se(n/s,[1]),o=r.ticks(be.timeSecond.every(i)),c=De(o.slice(0,2),r),u=Se(.05*c,[1]),f=!0,l=!1,d=void 0;try{for(var v,h=o[Symbol.iterator]();!(f=(v=h.next()).done);f=!0){var m=v.value,p=r(m);e.beginPath(),e.moveTo(p,0),e.lineTo(p,e.height),e.stroke(),e.fillText(a(m),p+u,e.height-u)}}catch(b){l=!0,d=b}finally{try{f||null==h.return||h.return()}finally{if(l)throw d}}},Object(h.a)({},n))}),T=M(z(),L({style:{font:"14px ubuntu mono, monospace"}})).wrap(function(e){var t=e.data,n=e.scaleY,r=Object(me.a)(e,["data","scaleY"]),a=function(e){return e.toFixed(1)};return ee(function(e){var r=Se(.01*e.height,[1]),i=!0,o=!1,c=void 0;try{for(var u,f=t.current[Symbol.iterator]();!(i=(u=f.next()).done);i=!0){var s=u.value,l=Object(v.a)(s,2),d=l[0],h=l[1];e.fillText(a(n.invert(h)),d+r,h-r)}}catch(m){o=!0,c=m}finally{try{i||null==f.return||f.return()}finally{if(o)throw c}}},Object(h.a)({},r))}),k=Te({segments:[4,6],period:1e3}),C=Le({by:{height:.1}}),N=Le({by:{height:.1},invert:!0}),D=(Ue({spread:.5,blur:10,color:"hsl(330, 100%, 50%)"}),Ue({spread:.5,blur:10,color:"hsl(210, 100%, 50%)"}),we({data:y,style:{strokeStyle:"hsl(330, 100%, 67%)"}})),A=pe({data:y}),F=we({data:E,style:{strokeStyle:"hsl(210, 100%, 67%)"}}),I=pe({data:E,style:{fillStyle:"hsl(210, 100%, 75%)",strokeStyle:"hsl(210, 100%, 50%)"}}),P=[b,O,x,ne,R({viewScale:S}),N(k(D),k(F)),C(D,A(T({data:y,scaleY:c})),F,I(T({data:E,scaleY:f}))),ke({offset:{x:{height:-.1},y:{height:-.9}},style:{fillStyle:"hsl(90, 75%, 50%)"}})];return ze(function(){var t=U(e.canvasRef).ctx;P.forEach(function(e){return e(t)})}),null}),Ye=M(L({style:{width:"100%",height:"150px",borderRadius:"5px",backgroundColor:"black"}}),ce).wrap(function(e){var t=e.style;return i.a.createElement(he,{style:t},i.a.createElement(Pe,null))}),_e=function(e){function t(){return Object(u.a)(this,t),Object(s.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{style:{padding:"1vw"}},i.a.createElement(Ye,null),i.a.createElement("br",null),i.a.createElement(Ye,null),i.a.createElement("br",null),i.a.createElement(Ye,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(_e,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[21,2,1]]]);
//# sourceMappingURL=main.e3234a76.chunk.js.map