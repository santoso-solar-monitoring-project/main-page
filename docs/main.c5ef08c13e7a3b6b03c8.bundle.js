(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(module,__webpack_exports__,__webpack_require__){"use strict";var slicedToArray=__webpack_require__(18),Imm=__webpack_require__(3),utils_noop=(Imm.a.fromJS({dims:{width:300,height:150},setNeedsUpdate:function(){throw new Error("Forgot to attach setNeedsUpdate...")}}),function(){}),defaultProps=Imm.a.fromJS({canvasRef:null,canvasStyle:{},canvasEffects:utils_noop,canvasNeedsUpdate:0}),react=__webpack_require__(1),react_default=__webpack_require__.n(react),utils_canvas=__webpack_require__(21),defaultArgs=Imm.a.fromJS({_window:window}),throttle=function(args){var _defaultArgs$mergeDee=defaultArgs.mergeDeep(args).toJS(),event=_defaultArgs$mergeDee.event,customEvent=_defaultArgs$mergeDee.customEvent,_window=_defaultArgs$mergeDee._window;if(!event)throw Error("`event` should not be blank");if(!customEvent)throw Error("`customEvent` should not be blank");var ready=!0,dispatcher=function(){_window.dispatchEvent(new CustomEvent(customEvent)),ready=!0},throttler=function(){ready&&(ready=!1,requestAnimationFrame(dispatcher))};_window.addEventListener(event,throttler,{passive:!0});return function(){_window.removeEventListener(event,throttler)}};throttle.defaultArgs=defaultArgs.toJS();throttle({event:"resize",customEvent:"optimized-resize"});var CustomHooks=__webpack_require__(24);var utils_ignore=function(){},objectWithoutProperties=__webpack_require__(227),Blur_defaultProps=Imm.a.fromJS({radius:5,timeout:250,enabled:!0,style:{filter:""}}),Blur=react_default.a.forwardRef(function(props,forwardedRef){var _useState=Object(react.useState)(!1),_useState2=Object(slicedToArray.a)(_useState,2),blurry=_useState2[0],setBlurry=_useState2[1],_defaultProps$mergeDe=Blur_defaultProps.mergeDeep(props).toJS(),style=_defaultProps$mergeDe.style,radius=_defaultProps$mergeDe.radius,timeout=_defaultProps$mergeDe.timeout,enabled=_defaultProps$mergeDe.enabled,children=(Object(objectWithoutProperties.a)(_defaultProps$mergeDe,["style","radius","timeout","enabled"]),props.children);return Object(CustomHooks.f)({event:"optimized-resize",first:function(){return setBlurry(!0)},last:function(){return setBlurry(!1)},timeout:timeout},[timeout]),enabled&&blurry&&(style.filter+="blur(".concat(radius,"px)")),react_default.a.createElement("div",{ref:forwardedRef,style:style},children)});Blur.displayName="Blur",Blur.defaultProps=Blur_defaultProps.toJS();var components_Blur=Blur,GoodCanvas_defaultProps=Imm.a.fromJS({style:{position:"relative",overflow:"hidden",width:"300px",height:"150px",boxSizing:"content-box"},showWarnings:!1,timeout:250,notify:utils_noop}),GoodCanvas=react_default.a.forwardRef(function(props,forwardedRef){var _useState=Object(react.useState)(0),_useState2=Object(slicedToArray.a)(_useState,2),needsUpdate=_useState2[0],setNeedsUpdate=_useState2[1],containerRef=Object(react.useRef)(null),canvasRef=Object(react.useRef)(null),firstRender=Object(react.useRef)(!0);forwardedRef=forwardedRef||canvasRef;var mergedProps=GoodCanvas_defaultProps.mergeDeep(props),_mergedProps$toJS=mergedProps.toJS(),style=_mergedProps$toJS.style,showWarnings=_mergedProps$toJS.showWarnings,timeout=_mergedProps$toJS.timeout,blur=_mergedProps$toJS.blur,notify=_mergedProps$toJS.notify,children=props.children,warn=showWarnings?console.warn:utils_ignore;return Object(CustomHooks.d)(function(){var container=containerRef.current,_getContext=Object(utils_canvas.b)(forwardedRef),canvas=_getContext.canvas,ctx=_getContext.ctx,computeStyle=function(property){return parseFloat(window.getComputedStyle(container).getPropertyValue(property))},width=computeStyle("width"),height=computeStyle("height");if("border-box"==container.style.boxSizing){var getTotalOffset=function(container,direction){return computeStyle("border-".concat(direction,"-width"))+computeStyle("padding-".concat(direction))};width-=getTotalOffset(0,"left")+getTotalOffset(0,"right"),height-=getTotalOffset(0,"top")+getTotalOffset(0,"bottom")}var t=performance.now();Object(utils_canvas.c)({canvas:canvas,width:width,height:height,ctx:ctx}),warn("GoodCanvas rescale complete. (".concat((performance.now()-t).toFixed(2)," ms)")),!firstRender.current&&notify&&notify()},[needsUpdate,mergedProps.get("style")]),Object(react.useLayoutEffect)(function(){Object(utils_canvas.b)(forwardedRef).canvas.setNeedsUpdate=setNeedsUpdate},[]),Object(CustomHooks.f)({event:"optimized-resize",first:function(){return warn("GoodCanvas is rescaling because the window resized. If this is happening often, there could be a negative performance impact.")},last:function(){return setNeedsUpdate(function(i){return i+1})},timeout:timeout},[timeout]),Object(CustomHooks.c)(function(){firstRender.current||warn("GoodCanvas is rescaling because the `style` prop changed. If this is happening often, there could be a negative performance impact.")},[mergedProps.get("style")]),Object(react.useEffect)(function(){firstRender.current=!1},[]),Object(react.useEffect)(function(){return function(){return warn("GoodCanvas is unmounting. If this is happening often, there could be a negative performance impact.")}},[]),warn("GoodCanvas RENDER"),react_default.a.createElement(components_Blur,Object.assign({style:style,ref:containerRef},blur),react_default.a.createElement("canvas",{style:{position:"absolute",left:0,top:0,margin:0,padding:0,border:"none"},ref:forwardedRef},function propagateProps(children,props){return children?react_default.a.createElement(react_default.a.Fragment,null,react_default.a.Children.map(children,function(child){return react_default.a.isValidElement(child)?(propagateProps(child.props.children,props),"function"==typeof props?react_default.a.cloneElement(child,props(child)):react_default.a.cloneElement(child,props)):child})):null}(children,function(child){var _ChildPropsNS$default=defaultProps.mergeDeep(child.props).toJS(),canvasStyle=_ChildPropsNS$default.canvasStyle,canvasEffects=_ChildPropsNS$default.canvasEffects;return{canvasRef:forwardedRef,canvasNeedsUpdate:needsUpdate,canvasStyle:canvasStyle,canvasEffects:canvasEffects}})))});GoodCanvas.displayName="GoodCanvas",GoodCanvas.defaultProps=GoodCanvas_defaultProps.toJS();__webpack_exports__.a=GoodCanvas},21:function(module,__webpack_exports__,__webpack_require__){"use strict";function createMatrix(){return document.createElementNS("http://www.w3.org/2000/svg","g").getCTM()}function enhanceContext(context){var currentTransform=createMatrix(),enhanced={currentTransform:currentTransform,savedTransforms:[currentTransform],_setMatrix:function(){var m=enhanced.currentTransform;context.setTransform(m.a,m.b,m.c,m.d,m.e,m.f)},save:function(){enhanced.savedTransforms.push(enhanced.currentTransform),context.save()},restore:function(){0!=enhanced.savedTransforms.length&&(context.restore(),enhanced.currentTransform=enhanced.savedTransforms.pop(),enhanced._setMatrix())},scale:function(x,y){enhanced.currentTransform=enhanced.currentTransform.scaleNonUniform(x,y),context.scale(x,y)},rotate:function(theta){enhanced.currentTransform=enhanced.currentTransform.rotate(180*theta/Math.PI),context.rotate(theta)},translate:function(x,y){enhanced.currentTransform=enhanced.currentTransform.translate(x,y),context.translate(x,y)},transform:function(a,b,c,d,e,f){var rhs=createMatrix();rhs.a=a,rhs.b=b,rhs.c=c,rhs.d=d,rhs.e=e,rhs.f=f,enhanced.currentTransform=enhanced.currentTransform.multiply(rhs),context.transform(a,b,c,d,e,f)},resetTransform:function(){enhanced.currentTransform=createMatrix(),context.resetTransform()}};return new Proxy(context,{get:function(target,key){var value=key in enhanced?enhanced[key]:key in target?target[key]:void 0;return void 0===value?value:"function"==typeof value?function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];return value.apply(target,args)}:value},set:function(target,key,value){return key in target&&(target[key]=value),value}})}var isValidRefObject=__webpack_require__(41),cache=new Map;function getContext(canvasRef){if(!Object(isValidRefObject.a)(canvasRef,{REF_NULL:"`canvasRef` should not be `null`",NO_CURRENT:"Use a React.RefObject not a functional ref. (`current` member not found in `canvasRef`.)",CURRENT_NULL:"`canvasRef.current` should not be `null`"}))throw Error();var cached=cache.get(canvasRef.current);if(cached)return cached;var canvas=canvasRef.current,ctx=canvas.getContext("2d"),result={canvas:canvas,ctx:enhanceContext(ctx)};return cache.set(canvasRef.current,result),result}var scaleCanvas=function(args){var canvas=args.canvas,enhanced=args.ctx,width=args.width,height=args.height,dpr=window.devicePixelRatio,savedWidth=width,savedHeight=height;width=Math.ceil(width*dpr),height=Math.ceil(height*dpr),canvas.width=width,canvas.height=height,canvas.style.width="".concat(width/dpr,"px"),canvas.style.height="".concat(height/dpr,"px");var ctx=enhanced||canvas.getContext("2d");ctx.resetTransform(),ctx.scale(dpr,dpr),ctx.rect(0,0,savedWidth,savedHeight),ctx.clip(),canvas.dims={width:savedWidth,height:savedHeight}};__webpack_require__.d(__webpack_exports__,"a",function(){return enhanceContext}),__webpack_require__.d(__webpack_exports__,"b",function(){return getContext}),__webpack_require__.d(__webpack_exports__,"c",function(){return scaleCanvas})},225:function(module,__webpack_exports__,__webpack_require__){"use strict";var slicedToArray=__webpack_require__(18),react=__webpack_require__(1),react_default=__webpack_require__.n(react),d3_node=__webpack_require__(62),Imm=__webpack_require__(3),GoodCanvas=__webpack_require__(102),utils_canvas=__webpack_require__(21),isValidRefObject=__webpack_require__(41),defaultProps=Imm.a.fromJS({data:[],radius:3,canvasStyle:{fillStyle:"hsl(330, 100%, 75%)",strokeStyle:"hsl(330, 100%, 50%)",lineWidth:.5}}),Points_Points=function(props){var _mergedProps$toJS=defaultProps.mergeDeep(props).toJS(),data=_mergedProps$toJS.data,radius=_mergedProps$toJS.radius,canvasRef=_mergedProps$toJS.canvasRef,canvasStyle=_mergedProps$toJS.canvasStyle,canvasEffects=_mergedProps$toJS.canvasEffects;if(!Object(isValidRefObject.a)(canvasRef))return null;var ctx=Object(utils_canvas.b)(canvasRef).ctx;ctx.save(),Object.assign(ctx,canvasStyle),canvasEffects&&canvasEffects(ctx);var _iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_iterator=data[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var _ref3=_step.value,_ref2=Object(slicedToArray.a)(_ref3,2),x=_ref2[0],y=_ref2[1];ctx.beginPath(),ctx.arc(x,y,radius,0,2*Math.PI),ctx.fill(),ctx.stroke()}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{_iteratorNormalCompletion||null==_iterator.return||_iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}return ctx.restore(),null};Points_Points.defaultProps=defaultProps.toJS();var components_Points=Points_Points,toConsumableArray=__webpack_require__(54),utils_evaluate=function(expr){var context=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Function.apply(void 0,Object(toConsumableArray.a)(Object.keys(context)).concat(["'use strict';return ".concat(expr)])).apply(void 0,Object(toConsumableArray.a)(Object.keys(context).map(function(k){return context[k]})))},Line_defaultProps=Imm.a.fromJS({data:[],line:"d3.line().curve(d3.curveCatmullRom.alpha(0.5))",canvasStyle:{lineWidth:1,strokeStyle:"hsl(330, 100%, 67%)"}}),Line_Line=function(props){var mergedProps=Line_defaultProps.mergeDeep(props),theLine=mergedProps.get("line"),line=Object(react.useMemo)(function(){return"string"==typeof theLine?utils_evaluate(theLine,{d3:d3_node}):theLine},[theLine]),_mergedProps$toJS=mergedProps.toJS(),data=_mergedProps$toJS.data,canvasRef=_mergedProps$toJS.canvasRef,canvasStyle=_mergedProps$toJS.canvasStyle,canvasEffects=_mergedProps$toJS.canvasEffects;if(!Object(isValidRefObject.a)(canvasRef))return null;var ctx=Object(utils_canvas.b)(canvasRef).ctx;return line.context(ctx),ctx.save(),Object.assign(ctx,canvasStyle),canvasEffects&&canvasEffects(ctx),ctx.beginPath(),line(data),ctx.stroke(),ctx.restore(),null};Line_Line.defaultProps=Line_defaultProps.toJS();var components_Line=Line_Line,CustomHooks=__webpack_require__(24),CURRENT=[3.1,3.2,2.1,2,2.9,1.8,4.5,4.2],IVPlot_defaultProps=Imm.a.fromJS({style:{width:"100%",height:"300px",borderRadius:"5px",backgroundColor:"black"}}),_ref=[Math.min.apply(Math,CURRENT),Math.max.apply(Math,CURRENT)],lo=_ref[0],hi=_ref[1],IVPlot_IVPlot=(CURRENT.map(function(v,i){return[500*i,v]}),Date.now(),function(props){var _useCounter=Object(CustomHooks.a)(),_useCounter2=Object(slicedToArray.a)(_useCounter,2),frameNumber=_useCounter2[0],nextFrame=_useCounter2[1],_useDataBuffer=Object(CustomHooks.b)({maxSize:1e4}),_useDataBuffer2=Object(slicedToArray.a)(_useDataBuffer,2),buffer=_useDataBuffer2[0],concat=_useDataBuffer2[1],samplePeriod=Object(react.useRef)(500);Object(react.useEffect)(function(){var id=window.setInterval(function(){concat([[Date.now(),Math.random()*(hi-lo)+lo]])},250+500*Math.random());return function(){return window.clearInterval(id)}},[]);var canvasRef=Object(react.useRef)(null),_useCounter3=Object(CustomHooks.a)(),_useCounter4=Object(slicedToArray.a)(_useCounter3,2),needsResize=_useCounter4[0],notify=_useCounter4[1],scaleX=Object(react.useMemo)(function(){return d3_node.scaleLinear()},[]),scaleY=Object(react.useMemo)(function(){return d3_node.scaleLinear()},[]);Object(react.useLayoutEffect)(function(){var canvas=Object(utils_canvas.b)(canvasRef).canvas;scaleX.range([0,canvas.dims.width]),scaleY.range([0,canvas.dims.height]);var ctx=Object(utils_canvas.b)(canvasRef).ctx;window.ctx=ctx},[needsResize]);var output=Object(react.useRef)([]),timespan=Object(react.useRef)(7e3),seekEnd=Object(react.useRef)(function(now){return now}),bisector=Object(react.useMemo)(function(){return d3_node.bisector(function(d){return d[0]})},[]);if(Object(react.useEffect)(function(){var endTime=seekEnd.current(Date.now());scaleX.domain([endTime-timespan.current,endTime]);var searchFrom=Math.max(0,buffer.length-1.5*timespan.current/samplePeriod.current),startTime=endTime-timespan.current,start=bisector.left(buffer,startTime,searchFrom),view=buffer.slice(start);scaleY.domain([lo,hi]),output.current=view.map(function(_ref2){var _ref3=Object(slicedToArray.a)(_ref2,2),x=_ref3[0],y=_ref3[1];return[scaleX(x),scaleY(y)]}),requestAnimationFrame(nextFrame)},[frameNumber]),Object(isValidRefObject.a)(canvasRef)){var _getContext3=Object(utils_canvas.b)(canvasRef),_getContext3$canvas$d=_getContext3.canvas.dims,width=_getContext3$canvas$d.width,height=_getContext3$canvas$d.height;_getContext3.ctx.clearRect(0,0,width,height)}var style=IVPlot_defaultProps.mergeDeep(props).toJS().style;return react_default.a.createElement(GoodCanvas.a,{style:style,notify:notify,ref:canvasRef},react_default.a.createElement(components_Line,{data:output.current}),react_default.a.createElement(components_Points,{data:output.current}))});IVPlot_IVPlot.defaultProps=IVPlot_defaultProps.toJS();__webpack_exports__.a=IVPlot_IVPlot},226:function(module,__webpack_exports__,__webpack_require__){"use strict";var react=__webpack_require__(1),react_default=__webpack_require__.n(react),GoodCanvas=__webpack_require__(102),Imm=__webpack_require__(3),CustomHooks=__webpack_require__(24),utils_canvas=__webpack_require__(21),defaultProps=Imm.a.fromJS({}),Corners_Corners=function(props){var mergedProps=defaultProps.mergeDeep(props);return Object(CustomHooks.c)(function(){var _mergedProps$toJS=mergedProps.toJS(),canvasRef=_mergedProps$toJS.canvasRef,canvasStyle=_mergedProps$toJS.canvasStyle,canvasEffects=_mergedProps$toJS.canvasEffects,_getContext=Object(utils_canvas.b)(canvasRef),canvas=_getContext.canvas,ctx=_getContext.ctx;ctx.save(),Object.assign(ctx,canvasStyle),canvasEffects&&canvasEffects(ctx);var dims=canvas.dims;ctx.fillStyle="red",ctx.beginPath(),ctx.arc(5,5,5,0,2*Math.PI),ctx.fill(),ctx.fillStyle="blue",ctx.beginPath(),ctx.arc(dims.width-5,5,5,0,2*Math.PI),ctx.fill(),ctx.fillStyle="green",ctx.beginPath(),ctx.arc(dims.width-5,dims.height-5,5,0,2*Math.PI),ctx.fill(),ctx.fillStyle="magenta",ctx.beginPath(),ctx.arc(5,dims.height-5,5,0,2*Math.PI),ctx.fill(),ctx.restore()},[mergedProps]),null};Corners_Corners.defaultProps=defaultProps.toJS();var CornersTest_Corners=Corners_Corners;__webpack_exports__.a=function(props){return react_default.a.createElement(GoodCanvas.a,Object.assign({},props,{showWarnings:!0}),react_default.a.createElement(CornersTest_Corners,null))}},228:function(module,exports,__webpack_require__){__webpack_require__(229),__webpack_require__(308),module.exports=__webpack_require__(309)},24:function(module,__webpack_exports__,__webpack_require__){"use strict";var react=__webpack_require__(1),Imm=__webpack_require__(3);function makeImmHook(hook){return function(arg,inputs){var savedInputs=useMemoRef(function(){return Imm.a.fromJS(inputs).toMap()});return savedInputs.current=savedInputs.current.mergeDeep(Imm.a.fromJS(inputs).toMap()),hook(arg,[savedInputs.current])}}var defaultArgs=Imm.a.fromJS({first:function(){},last:function(){},timeout:250}),useThrottled_useThrottled=function(args,inputs){Object(react.useEffect)(function(){var _defaultArgs$mergeDee=defaultArgs.mergeDeep(args).toJS(),event=_defaultArgs$mergeDee.event,first=_defaultArgs$mergeDee.first,last=_defaultArgs$mergeDee.last,timeout=_defaultArgs$mergeDee.timeout;if(event){var id,ongoing=!1,handler=function(){ongoing||(first(),ongoing=!0),id&&clearTimeout(id),id=window.setTimeout(function(){ongoing=!1,last()},timeout)};return window.addEventListener(event,handler),function(){return window.removeEventListener(event,handler)}}},inputs)};useThrottled_useThrottled.defaultArgs=defaultArgs.toJS();var slicedToArray=__webpack_require__(18);function useCounter(){var initial=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,_useState=Object(react.useState)(initial),_useState2=Object(slicedToArray.a)(_useState,2),value=_useState2[0],setValue=_useState2[1];return[value,Object(react.useCallback)(function(){return setValue(function(i){return i+1})},[])]}function useMemoRef(factory){var initialValue=Object(react.useMemo)(factory,[]);return Object(react.useRef)(initialValue)}var toConsumableArray=__webpack_require__(54),denque=__webpack_require__(101),denque_default=__webpack_require__.n(denque);Imm.a.fromJS({maxSize:1/0});var useDataBuffer_defaultArgs=Imm.a.fromJS({maxSize:1/0});function useDataBuffer(){var args=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},_defaultArgs$mergeDee=useDataBuffer_defaultArgs.mergeDeep(args).toJS(),initialValue=_defaultArgs$mergeDee.initialValue,maxSize=_defaultArgs$mergeDee.maxSize,buffer=Object(react.useMemo)(function(){return new denque_default.a(initialValue)},[]),updateBuffer=Object(react.useCallback)(function(newData){buffer.splice.apply(buffer,[buffer.length,0].concat(Object(toConsumableArray.a)(newData))),buffer.length>maxSize&&buffer.splice(0,buffer.length-maxSize)},[maxSize]);return[buffer,updateBuffer]}__webpack_require__.d(__webpack_exports__,"c",function(){return useImmEffect}),__webpack_require__.d(__webpack_exports__,"d",function(){return useImmLayoutEffect}),__webpack_require__.d(__webpack_exports__,"a",function(){return useCounter}),__webpack_require__.d(__webpack_exports__,"e",function(){return useMemoRef}),__webpack_require__.d(__webpack_exports__,"f",function(){return useThrottled_useThrottled}),__webpack_require__.d(__webpack_exports__,"b",function(){return useDataBuffer});var useImmEffect=makeImmHook(react.useEffect),useImmLayoutEffect=makeImmHook(react.useLayoutEffect);makeImmHook(react.useMemo),makeImmHook(useThrottled_useThrottled)},3:function(module,__webpack_exports__,__webpack_require__){"use strict";var immutable__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(223),immutable__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);__webpack_require__.d(__webpack_exports__,"a",function(){return immutable__WEBPACK_IMPORTED_MODULE_0___default.a})},309:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(42);Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)(function(){__webpack_require__(407)},module)}.call(this,__webpack_require__(163)(module))},407:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_storybook_react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(42),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(144),_storybook_addon_links__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(224),_storybook_react_demo__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(103),_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(104),components_IVPlot__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(225),components_CornersTest__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(226);Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.storiesOf)("Welcome",module).add("to Storybook",function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_storybook_react_demo__WEBPACK_IMPORTED_MODULE_4__.Welcome,{showApp:Object(_storybook_addon_links__WEBPACK_IMPORTED_MODULE_3__.linkTo)("Button")})}),Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.storiesOf)("Button",module).add("with text",function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_storybook_react_demo__WEBPACK_IMPORTED_MODULE_4__.Button,{onClick:Object(_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_2__.action)("clicked")},"Hello Button")}).add("with some emoji",function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_storybook_react_demo__WEBPACK_IMPORTED_MODULE_4__.Button,{onClick:Object(_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_2__.action)("clicked")},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span",{role:"img","aria-label":"so cool"},"😀 😎 👍 💯"))}),Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.storiesOf)("GoodCanvas",module).addDecorator(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_5__.withKnobs).add("Corners Test",function(){var boxSizing=Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_5__.select)("box-sizing",{"border-box":"border-box","content-box":"content-box"},"content-box"),borderWidth=Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_5__.number)("borderWidth",20,{range:!0,min:0,max:100,step:1});return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_CornersTest__WEBPACK_IMPORTED_MODULE_7__.a,{style:{border:"".concat(borderWidth,"px solid red"),boxSizing:boxSizing}})}),Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.storiesOf)("IV Plot",module).add("default",function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_IVPlot__WEBPACK_IMPORTED_MODULE_6__.a,null)}),Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.storiesOf)("Legend of Potato Hero",module).add("🥔",function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p",{style:{color:"magenta"}},"Once upon a time, I saw a potato laying outside my door. I wondered what it was doing out there. Instead of asking i brought it inside mY room. It was shivering because of the cold. I felt extremely guilty leaving it outside, so my instinct was to imediately bring it inside. I brought inside and gave it a blanket I felt better imediately. Ahhhh, look at me im the superhero of this situation now everyone in town considers me a hero. When you walk past me remember to thank me for saving the life of a fellow potato. ('-')")})}.call(this,__webpack_require__(163)(module))},41:function(module,__webpack_exports__,__webpack_require__){"use strict";function isValidRefObject(ref){var errors=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(null==ref){if(errors.REF_NULL)throw Error(errors.REF_NULL);return!1}if(!("current"in ref)){if(errors.NO_CURRENT)throw Error(errors.NO_CURRENT);return!1}if(null==ref.current){if(errors.CURRENT_NULL)throw Error(errors.CURRENT_NULL);return!1}return!0}__webpack_require__.d(__webpack_exports__,"a",function(){return isValidRefObject})}},[[228,1,2]]]);
//# sourceMappingURL=main.c5ef08c13e7a3b6b03c8.bundle.js.map