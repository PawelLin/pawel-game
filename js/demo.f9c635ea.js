(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["demo"],{"17b3":function(e,t,n){},"223d":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"page2"},[n("van-nav-bar",{attrs:{title:"Page2","left-arrow":"",fixed:""},on:{"click-left":function(t){return e.handleClick("demo",!1)}}}),n("van-button",{on:{click:function(t){return e.handleClick("demo",!0)}}},[e._v("返回Demo并重新create")]),n("p",{staticStyle:{"font-size":"14px"}},[e._v("点击手机物理键也返回Demo页面")])],1)},c=[],i=n("7e5f"),o={name:"page2",data:function(){return{back:!0}},created:function(){var e=this;console.log("created page2"),i["a"].listen((function(){e.back&&e.goBackListen({name:"demo",num:1,refresh:!0})}))},methods:{handleClick:function(e,t){this.back=!1,this.goBackListen({name:e,refresh:t})}}},l=o,s=(n("4fe8"),n("2877")),r=Object(s["a"])(l,a,c,!1,null,"023bae7c",null);t["default"]=r.exports},"2b0b":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"page1"},[n("van-nav-bar",{attrs:{title:"Page1","left-arrow":""},on:{"click-left":e.handleClick}}),n("div",{staticClass:"contain"},[n("div",{staticClass:"fixed"}),e._l(50,(function(t){return n("van-field",{key:t,attrs:{label:"文本"},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}})})),n("van-button",{on:{click:e.handleReplacePage2}},[e._v("跳转Page2(replace)")]),n("van-button",{on:{click:e.handleToPage3}},[e._v("跳转Page3")])],2)],1)},c=[],i={name:"page1",data:function(){return{text:""}},created:function(){console.log("created page1")},methods:{handleClick:function(){this.goBack({name:"demo"})},handleReplacePage2:function(){this.replaceRoute({name:"page2"})},handleToPage3:function(){this.$router.push({name:"page3"})}}},o=i,l=(n("4341"),n("2877")),s=Object(l["a"])(o,a,c,!1,null,"e2c7baf4",null);t["default"]=s.exports},4341:function(e,t,n){"use strict";var a=n("910b"),c=n.n(a);c.a},"480a":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"demo"},[n("van-nav-bar",{attrs:{title:"Demo","left-arrow":""},on:{"click-left":e.handleBack}}),n("div",{staticClass:"contain"},[n("van-form",{staticClass:"contain",on:{submit:e.onSubmit}},[n("van-field",{attrs:{label:"文本"},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}}),n("van-field",{attrs:{type:"tel",label:"手机号"},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}}),n("van-field",{attrs:{type:"digit",label:"整数"},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}}),n("van-field",{attrs:{type:"number",label:"数字"},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}}),n("van-button",{on:{click:e.handleClick}},[e._v("跳转page1")]),e._l(25,(function(t){return n("van-field",{key:t+"a",attrs:{type:"password",label:"密码"},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}})})),e._l(25,(function(t){return n("van-field",{key:t+"b",attrs:{type:"password",label:"密码"},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}})}))],2)],1)],1)},c=[],i={name:"demo",data:function(){return{text:""}},activated:function(){console.log("activated demo")},created:function(){console.log("created demo")},methods:{onSubmit:function(){},handleClick:function(){this.$router.push({name:"page1"})},handleBack:function(){this.goBack({name:"home"})}}},o=i,l=(n("aba3"),n("2877")),s=Object(l["a"])(o,a,c,!1,null,"07a6dcb4",null);t["default"]=s.exports},"4fe8":function(e,t,n){"use strict";var a=n("cf75"),c=n.n(a);c.a},"5e4c":function(e,t,n){"use strict";var a=n("17b3"),c=n.n(a);c.a},"7e5f":function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var c=n("85f2"),i=n.n(c);function o(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),i()(e,a.key,a)}}function l(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}var s=n("bd86"),r=function(){function e(){var t=this;a(this,e),Object(s["a"])(this,"onPopState",(function(e){e.state===t.STATE&&t.element.dispatchEvent(t.event),e.state!==t.STATE&&t.element1&&t.element1.dispatchEvent(t.event)})),this.STATE="x-back",this.event=document.createEvent("Events"),this.event.initEvent(this.STATE,!1,!1),window.addEventListener("popstate",this.onPopState,!1)}return l(e,[{key:"record",value:function(e){history.pushState(e,null,location.href),history.pushState(e,null,location.href)}},{key:"perRecord",value:function(){history.pushState(this.STATE,null,location.href)}},{key:"listen",value:function(e,t){this.record(this.STATE),this.element=document.createElement("span"),this.element.addEventListener(this.STATE,e,!1),t&&(this.element1=document.createElement("span"),this.element1.addEventListener(this.STATE,t,!1))}},{key:"removeListen",value:function(){window.removeEventListener("popstate",this.onPopState)}},{key:"recoverListen",value:function(){window.addEventListener("popstate",this.onPopState,!1)}}]),e}();t["a"]=new r},"910b":function(e,t,n){},aba3:function(e,t,n){"use strict";var a=n("f117"),c=n.n(a);c.a},cf75:function(e,t,n){},e0b6:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"page3"},[n("van-nav-bar",{attrs:{title:"Page3","left-arrow":"",fixed:""},on:{"click-left":function(t){return e.handleClick("page1")}}}),n("van-button",{on:{click:function(t){return e.handleClick("demo",!0)}}},[e._v("返回Demo并重新create")]),n("p",{staticStyle:{"font-size":"14px"}},[e._v("点击手机物理键也返回Demo页面不重新create")])],1)},c=[],i=n("7e5f"),o={name:"page3",data:function(){return{back:!0}},created:function(){var e=this;console.log("created page3"),i["a"].listen((function(){e.back&&e.goBackListen({name:"demo",num:1})}))},methods:{handleClick:function(e,t){this.back=!1,this.goBackListen({name:e,refresh:t})}}},l=o,s=(n("5e4c"),n("2877")),r=Object(s["a"])(l,a,c,!1,null,"a8deca3c",null);t["default"]=r.exports},f117:function(e,t,n){}}]);
//# sourceMappingURL=demo.f9c635ea.js.map