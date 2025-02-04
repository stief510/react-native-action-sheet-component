Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactNativeAnimatedOverlay=require('react-native-animated-overlay');var _reactNativeAnimatedOverlay2=_interopRequireDefault(_reactNativeAnimatedOverlay);
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);

var _Separator=require('./Separator');var _Separator2=_interopRequireDefault(_Separator);
var _Animation=require('./Animation');var _Animation2=_interopRequireDefault(_Animation);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}


var ACTION_SHEET_OPENING='opening';
var ACTION_SHEET_OPENED='opened';
var ACTION_SHEET_CLOSING='closing';
var ACTION_SHEET_CLOSED='closed';

var DEFAULT_ANIMATION_DURATION=180;
var INITIAL_POSITION=-180;


var HARDWARE_BACK_PRESS_EVENT='hardwareBackPress';

var styles=_reactNative.StyleSheet.create({
container:{
position:'absolute',
top:0,
bottom:0,
left:0,
backgroundColor:'white'},

contentContainer:{
position:'absolute',
backgroundColor:'white'},

scrollView:{}});





















var defaultProps={
onShow:function onShow(){},
onHide:function onHide(){},
show:false,
animationDuration:DEFAULT_ANIMATION_DURATION,
overlayOpacity:0.3,
position:'bottom',
style:null,
onChange:function onChange(){},
multiple:false,
showSparator:true,
value:null,
defaultValue:null,
hideOnSelceted:true,
hideOnHardwareBackPress:true,
children:null};var


ActionSheet=function(_Component){_inherits(ActionSheet,_Component);




function ActionSheet(props){_classCallCheck(this,ActionSheet);var _this=_possibleConstructorReturn(this,(ActionSheet.__proto__||Object.getPrototypeOf(ActionSheet)).call(this,
props));_this.

















































onOverlayPress=function(){
if(_this.state.actionSheetState===ACTION_SHEET_OPENED){
_this.hide();
}
};_this.


















hardwareBackPressHandler=function(){var
hideOnHardwareBackPress=_this.props.hideOnHardwareBackPress;

if(hideOnHardwareBackPress&&_this.state.show){
_this.hide();
return true;
}

return false;
};_this.

getActionSheetHeight=function(e){
var height=e.nativeEvent.layout.height;
if(height&&height!==_this.state.actionSheetHeight){
_this.setState({actionSheetHeight:height});
}
};_this.

show=function(){var callback=arguments.length>0&&arguments[0]!==undefined?arguments[0]:function(){};
if([ACTION_SHEET_OPENING,ACTION_SHEET_OPENED].includes(_this.state.actionSheetState)){
return;
}var

onShow=_this.props.onShow;

_this.setState({show:true});
_this.setActionSheetState(0,function(){
onShow();
callback();
});
};_this.

hide=function(){var callback=arguments.length>0&&arguments[0]!==undefined?arguments[0]:function(){};
if([ACTION_SHEET_CLOSING,ACTION_SHEET_CLOSED].includes(_this.state.actionSheetState)){
return;
}var

onHide=_this.props.onHide;

_this.setState({show:false});
_this.setActionSheetState(0-_this.state.actionSheetHeight,function(){
onHide();
callback();
});
};_this.

onItemPress=function(value,index){var
hideOnSelceted=_this.props.hideOnSelceted;
if(hideOnSelceted){
_this.hide();
}

if(Object.values(_this.state.selectedData).includes(value)){
_this.unselectItem(value,index);
return;
}

_this.selectItem(value,index);
};var initValue=props.value||props.defaultValue;initValue=Array.isArray(initValue)?initValue:initValue===null&&[]||[initValue];_this.state={show:props.show,selectedData:initValue,actionSheetState:ACTION_SHEET_CLOSED,actionSheetAnimation:new _Animation2.default(INITIAL_POSITION),actionSheetHeight:0};return _this;}_createClass(ActionSheet,[{key:'componentDidMount',value:function componentDidMount(){if(this.props.show){this.show();}_reactNative.BackAndroid.addEventListener(HARDWARE_BACK_PRESS_EVENT,this.hardwareBackPressHandler);}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){var _this2=this;if(this.props.show!==nextProps.show){if(nextProps.show){this.show();}else{this.hide();}}if(nextProps.value&&!_lodash2.default.isEqual(this.props.value,nextProps.value)){var selectedData=[];nextProps.value.forEach(function(value){if(!_this2.props.multiple&&selectedData.length!==0){return;}selectedData.push(value);});this.setState({selectedData:selectedData});}}},{key:'componentWillUnmount',value:function componentWillUnmount(){_reactNative.BackAndroid.removeEventListener(HARDWARE_BACK_PRESS_EVENT);this.hide();}},{key:'setActionSheetState',value:function setActionSheetState(toValue){var _this3=this;var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){};var animationDuration=this.props.animationDuration;var isClosed=this.state.actionSheetState===ACTION_SHEET_CLOSED;var actionSheetState=isClosed?ACTION_SHEET_OPENING:ACTION_SHEET_CLOSING;this.setState({actionSheetState:actionSheetState});this.state.actionSheetAnimation.toValue(toValue,animationDuration,function(){var isClosing=_this3.state.actionSheetState===ACTION_SHEET_CLOSING;actionSheetState=isClosing?ACTION_SHEET_CLOSED:ACTION_SHEET_OPENED;_this3.setState({actionSheetState:actionSheetState});callback();});}},{key:'selectItem',value:function selectItem(

value,index){var _props=
this.props,isMultiSelect=_props.multiple,onChange=_props.onChange;
var selectedData=[];

if(isMultiSelect){
selectedData=[].concat(_toConsumableArray(this.state.selectedData));
}

selectedData.push(value);
this.setState({selectedData:selectedData});
onChange(value,index,selectedData);
}},{key:'unselectItem',value:function unselectItem(

value,index){var _props2=
this.props,isMultiSelect=_props2.multiple,onChange=_props2.onChange;
var selectedData=[];

if(isMultiSelect){
selectedData=[].concat(_toConsumableArray(this.state.selectedData));
selectedData.splice(index,1);
}

this.setState({selectedData:selectedData});
onChange(value,index,selectedData);
}},{key:'renderItems',value:function renderItems()

{var _this4=this;var _props3=
this.props,children=_props3.children,showSparator=_props3.showSparator;

return _react.Children.map(children,function(child){
var separator=void 0;
var selectedIndex=_this4.state.selectedData.indexOf(child.props.value);

if(showSparator){
separator=_react2.default.createElement(_Separator2.default,null);
}

var item=(0,_react.cloneElement)(child,{
index:selectedIndex,
selected:_this4.state.selectedData.includes(child.props.value),
onPress:function onPress(_selectedValue,_selectedIndex){
child.props.onPress(_selectedValue,_selectedIndex);
_this4.onItemPress(_selectedValue,_selectedIndex);
}});


return(
_react2.default.createElement(_reactNative.View,{style:{flex:1}},
item,
separator));


});
}},{key:'render',value:function render()

{var _props4=
this.props,animationDuration=_props4.animationDuration,overlayOpacity=_props4.overlayOpacity,position=_props4.position,style=_props4.style;var _state=
this.state,actionSheetState=_state.actionSheetState,animations=_state.actionSheetAnimation.animations;

var overlayShow=false;
var pointerEvents='none';

if([ACTION_SHEET_OPENED,ACTION_SHEET_OPENING].includes(actionSheetState)){
overlayShow=true;
pointerEvents='auto';
}

var width={width:_reactNative.Dimensions.get('window').width};
var actionSheetPosition=position==='top'?
{top:animations.position}:
{bottom:animations.position};

var scrollView=position==='top'?
{paddingTop:30}:
null;

return(
_react2.default.createElement(_reactNative.View,{style:[styles.container]},
_react2.default.createElement(_reactNativeAnimatedOverlay2.default,{
onPress:this.onOverlayPress,
overlayShow:overlayShow,
duration:animationDuration,
opacity:overlayOpacity,
pointerEvents:pointerEvents}),

_react2.default.createElement(_reactNative.Animated.View,{
style:[styles.contentContainer,style,width,actionSheetPosition],
onLayout:this.getActionSheetHeight},

_react2.default.createElement(_reactNative.ScrollView,{style:[styles.scrollView,scrollView]},
this.renderItems()))));




}}]);return ActionSheet;}(_react.Component);ActionSheet.defaultProps=defaultProps;ActionSheet.propTypes={onShow:require('prop-types').func,onHide:require('prop-types').func,show:require('prop-types').bool,animationDuration:require('prop-types').number,overlayOpacity:require('prop-types').number,position:require('prop-types').oneOf(['top','bottom']),style:require('prop-types').any,onChange:require('prop-types').func,multiple:require('prop-types').bool,showSparator:require('prop-types').bool,value:require('prop-types').any,defaultValue:require('prop-types').any,hideOnSelceted:require('prop-types').bool,hideOnHardwareBackPress:require('prop-types').bool,children:require('prop-types').any};exports.default=


ActionSheet;