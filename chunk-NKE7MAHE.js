import{D as P,c as w,g as ne,h as oe,k as se,l as L,n as c,o as re,s as ae,t as le}from"./chunk-L7VJNURF.js";import{c as ie,d as O,f as g,g as C,h as S}from"./chunk-XSSXK7EZ.js";import{Ba as A,Db as x,Ga as z,Ia as f,Ja as a,Oa as j,U as V,Ua as Z,Vb as U,Xa as h,Ya as T,Yb as _,Za as l,Zb as q,bb as M,cb as m,da as D,db as y,ea as E,eb as F,ec as G,hb as B,ib as I,jb as v,kb as s,lb as N,lc as X,ma as d,mb as Q,na as p,nb as W,nc as $,oc as J,pb as Y,pc as ee,qb as K,sc as te,ta as k,ua as R,uc as b,wa as H}from"./chunk-GTU4MDPC.js";var he=["*"],ue=(i,r)=>({showTransitionParams:i,hideTransitionParams:r}),fe=(i,r)=>({value:i,params:r});function me(i,r){i&1&&B(0)}function ye(i,r){i&1&&F(0,"TimesIcon",8),i&2&&l("styleClass","p-overlaypanel-close-icon")}function ve(i,r){}function _e(i,r){i&1&&h(0,ve,0,0,"ng-template")}function be(i,r){if(i&1&&(m(0,"span",9),h(1,_e,1,0,null,3),y()),i&2){let e=s(3);f(),l("ngTemplateOutlet",e.closeIconTemplate)}}function ge(i,r){if(i&1){let e=I();m(0,"button",5),v("click",function(n){d(e);let o=s(2);return p(o.onCloseClick(n))})("keydown.enter",function(){d(e);let n=s(2);return p(n.hide())}),h(1,ye,1,1,"TimesIcon",6)(2,be,2,1,"span",7),y()}if(i&2){let e=s(2);T("aria-label",e.ariaCloseLabel),f(),l("ngIf",!e.closeIconTemplate),f(),l("ngIf",e.closeIconTemplate)}}function Ce(i,r){if(i&1){let e=I();m(0,"div",1),v("click",function(n){d(e);let o=s();return p(o.onOverlayClick(n))})("@animation.start",function(n){d(e);let o=s();return p(o.onAnimationStart(n))})("@animation.done",function(n){d(e);let o=s();return p(o.onAnimationEnd(n))}),m(1,"div",2),v("click",function(n){d(e);let o=s();return p(o.onContentClick(n))})("mousedown",function(n){d(e);let o=s();return p(o.onContentClick(n))}),Q(2),h(3,me,1,0,"ng-container",3),y(),h(4,ge,3,3,"button",4),y()}if(i&2){let e=s();M(e.styleClass),l("ngClass","p-overlaypanel p-component")("ngStyle",e.style)("@animation",x(13,fe,e.overlayVisible?"open":"close",x(10,ue,e.showTransitionOptions,e.hideTransitionOptions))),T("aria-modal",e.overlayVisible)("aria-label",e.ariaLabel)("aria-labelledBy",e.ariaLabelledBy),f(3),l("ngTemplateOutlet",e.contentTemplate),f(),l("ngIf",e.showCloseIcon)}}var Ne=(()=>{class i{document;platformId;el;renderer;cd;zone;config;overlayService;ariaLabel;ariaLabelledBy;dismissable=!0;showCloseIcon;style;styleClass;appendTo="body";autoZIndex=!0;ariaCloseLabel;baseZIndex=0;focusOnShow=!0;showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)";hideTransitionOptions=".1s linear";onShow=new k;onHide=new k;templates;container;overlayVisible=!1;render=!1;isOverlayAnimationInProgress=!1;selfClick=!1;documentClickListener;target;willHide;scrollHandler;documentResizeListener;contentTemplate;closeIconTemplate;destroyCallback;overlayEventListener;overlaySubscription;constructor(e,t,n,o,u,ce,de,pe){this.document=e,this.platformId=t,this.el=n,this.renderer=o,this.cd=u,this.zone=ce,this.config=de,this.overlayService=pe}ngAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"content":this.contentTemplate=e.template;break;case"closeicon":this.closeIconTemplate=e.template;break;default:this.contentTemplate=e.template;break}this.cd.markForCheck()})}bindDocumentClickListener(){if(b(this.platformId)&&!this.documentClickListener&&this.dismissable){let e=c.isIOS()?"touchstart":"click",t=this.el?this.el.nativeElement.ownerDocument:this.document;this.documentClickListener=this.renderer.listen(t,e,n=>{!this.container?.contains(n.target)&&this.target!==n.target&&!this.target.contains(n.target)&&!this.selfClick&&this.hide(),this.selfClick=!1,this.cd.markForCheck()})}}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null,this.selfClick=!1)}toggle(e,t){this.isOverlayAnimationInProgress||(this.overlayVisible?(this.hasTargetChanged(e,t)&&(this.destroyCallback=()=>{this.show(null,t||e.currentTarget||e.target)}),this.hide()):this.show(e,t))}show(e,t){t&&e&&e.stopPropagation(),!this.isOverlayAnimationInProgress&&(this.target=t||e.currentTarget||e.target,this.overlayVisible=!0,this.render=!0,this.cd.markForCheck())}onOverlayClick(e){this.overlayService.add({originalEvent:e,target:this.el.nativeElement}),this.selfClick=!0}onContentClick(e){let t=e.target;this.selfClick=e.offsetX<t.clientWidth&&e.offsetY<t.clientHeight}hasTargetChanged(e,t){return this.target!=null&&this.target!==(t||e.currentTarget||e.target)}appendContainer(){this.appendTo&&(this.appendTo==="body"?this.renderer.appendChild(this.document.body,this.container):c.appendChild(this.container,this.appendTo))}restoreAppend(){this.container&&this.appendTo&&this.renderer.appendChild(this.el.nativeElement,this.container)}align(){this.autoZIndex&&w.set("overlay",this.container,this.baseZIndex+this.config.zIndex.overlay),c.absolutePosition(this.container,this.target,!1);let e=c.getOffset(this.container),t=c.getOffset(this.target),n=this.document.defaultView?.getComputedStyle(this.container).getPropertyValue("border-radius"),o=0;e.left<t.left&&(o=t.left-e.left-parseFloat(n)*2),this.container?.style.setProperty("--overlayArrowLeft",`${o}px`),e.top<t.top&&(c.addClass(this.container,"p-overlaypanel-flipped"),this.showCloseIcon&&this.renderer.setStyle(this.container,"margin-top","-30px"))}onAnimationStart(e){e.toState==="open"&&(this.container=e.element,this.appendContainer(),this.align(),this.bindDocumentClickListener(),this.bindDocumentResizeListener(),this.bindScrollListener(),this.focusOnShow&&this.focus(),this.overlayEventListener=t=>{this.container&&this.container.contains(t.target)&&(this.selfClick=!0)},this.overlaySubscription=this.overlayService.clickObservable.subscribe(this.overlayEventListener),this.onShow.emit(null)),this.isOverlayAnimationInProgress=!0}onAnimationEnd(e){switch(e.toState){case"void":this.destroyCallback&&(this.destroyCallback(),this.destroyCallback=null),this.overlaySubscription&&this.overlaySubscription.unsubscribe();break;case"close":this.autoZIndex&&w.clear(this.container),this.overlaySubscription&&this.overlaySubscription.unsubscribe(),this.onContainerDestroy(),this.onHide.emit({}),this.render=!1;break}this.isOverlayAnimationInProgress=!1}focus(){let e=c.findSingle(this.container,"[autofocus]");e&&this.zone.runOutsideAngular(()=>{setTimeout(()=>e.focus(),5)})}hide(){this.overlayVisible=!1,this.cd.markForCheck()}onCloseClick(e){this.hide(),e.preventDefault()}onEscapeKeydown(e){this.hide()}onWindowResize(){this.overlayVisible&&!c.isTouchDevice()&&this.hide()}bindDocumentResizeListener(){if(b(this.platformId)&&!this.documentResizeListener){let e=this.document.defaultView;this.documentResizeListener=this.renderer.listen(e,"resize",this.onWindowResize.bind(this))}}unbindDocumentResizeListener(){this.documentResizeListener&&(this.documentResizeListener(),this.documentResizeListener=null)}bindScrollListener(){b(this.platformId)&&(this.scrollHandler||(this.scrollHandler=new re(this.target,()=>{this.overlayVisible&&this.hide()})),this.scrollHandler.bindScrollListener())}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}onContainerDestroy(){this.cd.destroyed||(this.target=null),this.unbindDocumentClickListener(),this.unbindDocumentResizeListener(),this.unbindScrollListener()}ngOnDestroy(){this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.container&&this.autoZIndex&&w.clear(this.container),this.cd.destroyed||(this.target=null),this.destroyCallback=null,this.container&&(this.restoreAppend(),this.onContainerDestroy()),this.overlaySubscription&&this.overlaySubscription.unsubscribe()}static \u0275fac=function(t){return new(t||i)(a(G),a(A),a(H),a(j),a(U),a(R),a(oe),a(ne))};static \u0275cmp=D({type:i,selectors:[["p-overlayPanel"]],contentQueries:function(t,n,o){if(t&1&&W(o,se,4),t&2){let u;Y(u=K())&&(n.templates=u)}},hostAttrs:[1,"p-element"],hostBindings:function(t,n){t&1&&v("keydown.escape",function(u){return n.onEscapeKeydown(u)},!1,z)},inputs:{ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",dismissable:[2,"dismissable","dismissable",_],showCloseIcon:[2,"showCloseIcon","showCloseIcon",_],style:"style",styleClass:"styleClass",appendTo:"appendTo",autoZIndex:[2,"autoZIndex","autoZIndex",_],ariaCloseLabel:"ariaCloseLabel",baseZIndex:[2,"baseZIndex","baseZIndex",q],focusOnShow:[2,"focusOnShow","focusOnShow",_],showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions"},outputs:{onShow:"onShow",onHide:"onHide"},features:[Z],ngContentSelectors:he,decls:1,vars:1,consts:[["role","dialog",3,"ngClass","ngStyle","class","click",4,"ngIf"],["role","dialog",3,"click","ngClass","ngStyle"],[1,"p-overlaypanel-content",3,"click","mousedown"],[4,"ngTemplateOutlet"],["type","button","class","p-overlaypanel-close p-link","pRipple","",3,"click","keydown.enter",4,"ngIf"],["type","button","pRipple","",1,"p-overlaypanel-close","p-link",3,"click","keydown.enter"],[3,"styleClass",4,"ngIf"],["class","p-overlaypanel-close-icon",4,"ngIf"],[3,"styleClass"],[1,"p-overlaypanel-close-icon"]],template:function(t,n){t&1&&(N(),h(0,Ce,5,16,"div",0)),t&2&&l("ngIf",n.render)},dependencies:()=>[X,$,ee,J,ae,P],styles:[`@layer primeng{.p-overlaypanel{position:absolute;margin-top:10px;top:0;left:0}.p-overlaypanel-flipped{margin-top:0;margin-bottom:10px}.p-overlaypanel-close{display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-overlaypanel:after,.p-overlaypanel:before{bottom:100%;left:calc(var(--overlayArrowLeft, 0) + 1.25rem);content:" ";height:0;width:0;position:absolute;pointer-events:none}.p-overlaypanel:after{border-width:8px;margin-left:-8px}.p-overlaypanel:before{border-width:10px;margin-left:-10px}.p-overlaypanel-shifted:after,.p-overlaypanel-shifted:before{left:auto;right:1.25em;margin-left:auto}.p-overlaypanel-flipped:after,.p-overlaypanel-flipped:before{bottom:auto;top:100%}.p-overlaypanel.p-overlaypanel-flipped:after{border-bottom-color:transparent}.p-overlaypanel.p-overlaypanel-flipped:before{border-bottom-color:transparent}}
`],encapsulation:2,data:{animation:[ie("animation",[C("void",g({transform:"scaleY(0.8)",opacity:0})),C("close",g({opacity:0})),C("open",g({transform:"translateY(0)",opacity:1})),S("void => open",O("{{showTransitionParams}}")),S("open => close",O("{{hideTransitionParams}}"))])]},changeDetection:0})}return i})(),Qe=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=E({type:i});static \u0275inj=V({imports:[te,le,L,P,L]})}return i})();export{Ne as a,Qe as b};