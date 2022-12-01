define(["./RuntimeError-c581ca93","./defaultValue-94c3e563","./_commonjsHelpers-3aae1032-f55dc0c4","./createTaskProcessorWorker"],(function(e,t,i,n){"use strict";const r=1953029805,a=2917034100;function o(t,i){if(o.passThroughDataForTesting)return i;e.Check.typeOf.object("key",t),e.Check.typeOf.object("data",i);const n=t.byteLength;if(0===n||n%4!==0)throw new e.RuntimeError("The length of key must be greater than 0 and a multiple of 4.");const s=new DataView(i),l=s.getUint32(0,!0);if(l===r||l===a)return i;const h=new DataView(t);let f=0;const c=i.byteLength,d=c-c%8,u=n;let w,b=8;while(f<d){b=(b+8)%24,w=b;while(f<d&&w<u)s.setUint32(f,s.getUint32(f,!0)^h.getUint32(w,!0),!0),s.setUint32(f+4,s.getUint32(f+4,!0)^h.getUint32(w+4,!0),!0),f+=8,w+=24}if(f<c){w>=u&&(b=(b+8)%24,w=b);while(f<c)s.setUint8(f,s.getUint8(f)^h.getUint8(w)),f++,w++}}function s(e,t){return 0!==(e&t)}o.passThroughDataForTesting=!1;const l=[1,2,4,8],h=15,f=16,c=64,d=128;function u(e,t,i,n,r,a){this._bits=e,this.cnodeVersion=t,this.imageryVersion=i,this.terrainVersion=n,this.imageryProvider=r,this.terrainProvider=a,this.ancestorHasTerrain=!1,this.terrainState=void 0}u.clone=function(e,i){return t.defined(i)?(i._bits=e._bits,i.cnodeVersion=e.cnodeVersion,i.imageryVersion=e.imageryVersion,i.terrainVersion=e.terrainVersion,i.imageryProvider=e.imageryProvider,i.terrainProvider=e.terrainProvider):i=new u(e._bits,e.cnodeVersion,e.imageryVersion,e.terrainVersion,e.imageryProvider,e.terrainProvider),i.ancestorHasTerrain=e.ancestorHasTerrain,i.terrainState=e.terrainState,i},u.prototype.setParent=function(e){this.ancestorHasTerrain=e.ancestorHasTerrain||this.hasTerrain()},u.prototype.hasSubtree=function(){return s(this._bits,f)},u.prototype.hasImagery=function(){return s(this._bits,c)},u.prototype.hasTerrain=function(){return s(this._bits,d)},u.prototype.hasChildren=function(){return s(this._bits,h)},u.prototype.hasChild=function(e){return s(this._bits,l[e])},u.prototype.getChildBitmask=function(){return this._bits&h};var w=i.createCommonjsModule((function(e,t){var i="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Int32Array;function n(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.assign=function(e){var t=Array.prototype.slice.call(arguments,1);while(t.length){var i=t.shift();if(i){if("object"!==typeof i)throw new TypeError(i+"must be non-object");for(var r in i)n(i,r)&&(e[r]=i[r])}}return e},t.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var r={arraySet:function(e,t,i,n,r){if(t.subarray&&e.subarray)e.set(t.subarray(i,i+n),r);else for(var a=0;a<n;a++)e[r+a]=t[i+a]},flattenChunks:function(e){var t,i,n,r,a,o;for(n=0,t=0,i=e.length;t<i;t++)n+=e[t].length;for(o=new Uint8Array(n),r=0,t=0,i=e.length;t<i;t++)a=e[t],o.set(a,r),r+=a.length;return o}},a={arraySet:function(e,t,i,n,r){for(var a=0;a<n;a++)e[r+a]=t[i+a]},flattenChunks:function(e){return[].concat.apply([],e)}};t.setTyped=function(e){e?(t.Buf8=Uint8Array,t.Buf16=Uint16Array,t.Buf32=Int32Array,t.assign(t,r)):(t.Buf8=Array,t.Buf16=Array,t.Buf32=Array,t.assign(t,a))},t.setTyped(i)}));function b(e,t,i,n){var r=65535&e|0,a=e>>>16&65535|0,o=0;while(0!==i){o=i>2e3?2e3:i,i-=o;do{r=r+t[n++]|0,a=a+r|0}while(--o);r%=65521,a%=65521}return r|a<<16|0}var m=b;function g(){for(var e,t=[],i=0;i<256;i++){e=i;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[i]=e}return t}var k=g();function _(e,t,i,n){var r=k,a=n+i;e^=-1;for(var o=n;o<a;o++)e=e>>>8^r[255&(e^t[o])];return-1^e}var v=_,p=30,y=12,E=function(e,t){var i,n,r,a,o,s,l,h,f,c,d,u,w,b,m,g,k,_,v,E,x,S,T,R,A;i=e.state,n=e.next_in,R=e.input,r=n+(e.avail_in-5),a=e.next_out,A=e.output,o=a-(t-e.avail_out),s=a+(e.avail_out-257),l=i.dmax,h=i.wsize,f=i.whave,c=i.wnext,d=i.window,u=i.hold,w=i.bits,b=i.lencode,m=i.distcode,g=(1<<i.lenbits)-1,k=(1<<i.distbits)-1;e:do{w<15&&(u+=R[n++]<<w,w+=8,u+=R[n++]<<w,w+=8),_=b[u&g];t:for(;;){if(v=_>>>24,u>>>=v,w-=v,v=_>>>16&255,0===v)A[a++]=65535&_;else{if(!(16&v)){if(0===(64&v)){_=b[(65535&_)+(u&(1<<v)-1)];continue t}if(32&v){i.mode=y;break e}e.msg="invalid literal/length code",i.mode=p;break e}E=65535&_,v&=15,v&&(w<v&&(u+=R[n++]<<w,w+=8),E+=u&(1<<v)-1,u>>>=v,w-=v),w<15&&(u+=R[n++]<<w,w+=8,u+=R[n++]<<w,w+=8),_=m[u&k];i:for(;;){if(v=_>>>24,u>>>=v,w-=v,v=_>>>16&255,!(16&v)){if(0===(64&v)){_=m[(65535&_)+(u&(1<<v)-1)];continue i}e.msg="invalid distance code",i.mode=p;break e}if(x=65535&_,v&=15,w<v&&(u+=R[n++]<<w,w+=8,w<v&&(u+=R[n++]<<w,w+=8)),x+=u&(1<<v)-1,x>l){e.msg="invalid distance too far back",i.mode=p;break e}if(u>>>=v,w-=v,v=a-o,x>v){if(v=x-v,v>f&&i.sane){e.msg="invalid distance too far back",i.mode=p;break e}if(S=0,T=d,0===c){if(S+=h-v,v<E){E-=v;do{A[a++]=d[S++]}while(--v);S=a-x,T=A}}else if(c<v){if(S+=h+c-v,v-=c,v<E){E-=v;do{A[a++]=d[S++]}while(--v);if(S=0,c<E){v=c,E-=v;do{A[a++]=d[S++]}while(--v);S=a-x,T=A}}}else if(S+=c-v,v<E){E-=v;do{A[a++]=d[S++]}while(--v);S=a-x,T=A}while(E>2)A[a++]=T[S++],A[a++]=T[S++],A[a++]=T[S++],E-=3;E&&(A[a++]=T[S++],E>1&&(A[a++]=T[S++]))}else{S=a-x;do{A[a++]=A[S++],A[a++]=A[S++],A[a++]=A[S++],E-=3}while(E>2);E&&(A[a++]=A[S++],E>1&&(A[a++]=A[S++]))}break}}break}}while(n<r&&a<s);E=w>>3,n-=E,w-=E<<3,u&=(1<<w)-1,e.next_in=n,e.next_out=a,e.avail_in=n<r?r-n+5:5-(n-r),e.avail_out=a<s?s-a+257:257-(a-s),i.hold=u,i.bits=w},x=15,S=852,T=592,R=0,A=1,B=2,U=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],Z=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],I=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],O=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64],D=function(e,t,i,n,r,a,o,s){var l,h,f,c,d,u,b,m,g,k=s.bits,_=0,v=0,p=0,y=0,E=0,D=0,C=0,N=0,F=0,L=0,H=null,z=0,P=new w.Buf16(x+1),M=new w.Buf16(x+1),V=null,j=0;for(_=0;_<=x;_++)P[_]=0;for(v=0;v<n;v++)P[t[i+v]]++;for(E=k,y=x;y>=1;y--)if(0!==P[y])break;if(E>y&&(E=y),0===y)return r[a++]=20971520,r[a++]=20971520,s.bits=1,0;for(p=1;p<y;p++)if(0!==P[p])break;for(E<p&&(E=p),N=1,_=1;_<=x;_++)if(N<<=1,N-=P[_],N<0)return-1;if(N>0&&(e===R||1!==y))return-1;for(M[1]=0,_=1;_<x;_++)M[_+1]=M[_]+P[_];for(v=0;v<n;v++)0!==t[i+v]&&(o[M[t[i+v]]++]=v);if(e===R?(H=V=o,u=19):e===A?(H=U,z-=257,V=Z,j-=257,u=256):(H=I,V=O,u=-1),L=0,v=0,_=p,d=a,D=E,C=0,f=-1,F=1<<E,c=F-1,e===A&&F>S||e===B&&F>T)return 1;for(;;){b=_-C,o[v]<u?(m=0,g=o[v]):o[v]>u?(m=V[j+o[v]],g=H[z+o[v]]):(m=96,g=0),l=1<<_-C,h=1<<D,p=h;do{h-=l,r[d+(L>>C)+h]=b<<24|m<<16|g|0}while(0!==h);l=1<<_-1;while(L&l)l>>=1;if(0!==l?(L&=l-1,L+=l):L=0,v++,0===--P[_]){if(_===y)break;_=t[i+o[v]]}if(_>E&&(L&c)!==f){0===C&&(C=E),d+=p,D=_-C,N=1<<D;while(D+C<y){if(N-=P[D+C],N<=0)break;D++,N<<=1}if(F+=1<<D,e===A&&F>S||e===B&&F>T)return 1;f=L&c,r[f]=E<<24|D<<16|d-a|0}}return 0!==L&&(r[d+L]=_-C<<24|64<<16|0),s.bits=E,0},C=0,N=1,F=2,L=4,H=5,z=6,P=0,M=1,V=2,j=-2,K=-3,Y=-4,G=-5,Q=8,W=1,X=2,q=3,J=4,$=5,ee=6,te=7,ie=8,ne=9,re=10,ae=11,oe=12,se=13,le=14,he=15,fe=16,ce=17,de=18,ue=19,we=20,be=21,me=22,ge=23,ke=24,_e=25,ve=26,pe=27,ye=28,Ee=29,xe=30,Se=31,Te=32,Re=852,Ae=592,Be=15,Ue=Be;function Ze(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function Ie(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new w.Buf16(320),this.work=new w.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function Oe(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=W,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new w.Buf32(Re),t.distcode=t.distdyn=new w.Buf32(Ae),t.sane=1,t.back=-1,P):j}function De(e){var t;return e&&e.state?(t=e.state,t.wsize=0,t.whave=0,t.wnext=0,Oe(e)):j}function Ce(e,t){var i,n;return e&&e.state?(n=e.state,t<0?(i=0,t=-t):(i=1+(t>>4),t<48&&(t&=15)),t&&(t<8||t>15)?j:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=i,n.wbits=t,De(e))):j}function Ne(e,t){var i,n;return e?(n=new Ie,e.state=n,n.window=null,i=Ce(e,t),i!==P&&(e.state=null),i):j}function Fe(e){return Ne(e,Ue)}var Le,He,ze=!0;function Pe(e){if(ze){var t;Le=new w.Buf32(512),He=new w.Buf32(32),t=0;while(t<144)e.lens[t++]=8;while(t<256)e.lens[t++]=9;while(t<280)e.lens[t++]=7;while(t<288)e.lens[t++]=8;D(N,e.lens,0,288,Le,0,e.work,{bits:9}),t=0;while(t<32)e.lens[t++]=5;D(F,e.lens,0,32,He,0,e.work,{bits:5}),ze=!1}e.lencode=Le,e.lenbits=9,e.distcode=He,e.distbits=5}function Me(e,t,i,n){var r,a=e.state;return null===a.window&&(a.wsize=1<<a.wbits,a.wnext=0,a.whave=0,a.window=new w.Buf8(a.wsize)),n>=a.wsize?(w.arraySet(a.window,t,i-a.wsize,a.wsize,0),a.wnext=0,a.whave=a.wsize):(r=a.wsize-a.wnext,r>n&&(r=n),w.arraySet(a.window,t,i-n,r,a.wnext),n-=r,n?(w.arraySet(a.window,t,i-n,n,0),a.wnext=n,a.whave=a.wsize):(a.wnext+=r,a.wnext===a.wsize&&(a.wnext=0),a.whave<a.wsize&&(a.whave+=r))),0}function Ve(e,t){var i,n,r,a,o,s,l,h,f,c,d,u,b,g,k,_,p,y,x,S,T,R,A,B,U=0,Z=new w.Buf8(4),I=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return j;i=e.state,i.mode===oe&&(i.mode=se),o=e.next_out,r=e.output,l=e.avail_out,a=e.next_in,n=e.input,s=e.avail_in,h=i.hold,f=i.bits,c=s,d=l,R=P;e:for(;;)switch(i.mode){case W:if(0===i.wrap){i.mode=se;break}while(f<16){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}if(2&i.wrap&&35615===h){i.check=0,Z[0]=255&h,Z[1]=h>>>8&255,i.check=v(i.check,Z,2,0),h=0,f=0,i.mode=X;break}if(i.flags=0,i.head&&(i.head.done=!1),!(1&i.wrap)||(((255&h)<<8)+(h>>8))%31){e.msg="incorrect header check",i.mode=xe;break}if((15&h)!==Q){e.msg="unknown compression method",i.mode=xe;break}if(h>>>=4,f-=4,T=8+(15&h),0===i.wbits)i.wbits=T;else if(T>i.wbits){e.msg="invalid window size",i.mode=xe;break}i.dmax=1<<T,e.adler=i.check=1,i.mode=512&h?re:oe,h=0,f=0;break;case X:while(f<16){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}if(i.flags=h,(255&i.flags)!==Q){e.msg="unknown compression method",i.mode=xe;break}if(57344&i.flags){e.msg="unknown header flags set",i.mode=xe;break}i.head&&(i.head.text=h>>8&1),512&i.flags&&(Z[0]=255&h,Z[1]=h>>>8&255,i.check=v(i.check,Z,2,0)),h=0,f=0,i.mode=q;case q:while(f<32){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}i.head&&(i.head.time=h),512&i.flags&&(Z[0]=255&h,Z[1]=h>>>8&255,Z[2]=h>>>16&255,Z[3]=h>>>24&255,i.check=v(i.check,Z,4,0)),h=0,f=0,i.mode=J;case J:while(f<16){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}i.head&&(i.head.xflags=255&h,i.head.os=h>>8),512&i.flags&&(Z[0]=255&h,Z[1]=h>>>8&255,i.check=v(i.check,Z,2,0)),h=0,f=0,i.mode=$;case $:if(1024&i.flags){while(f<16){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}i.length=h,i.head&&(i.head.extra_len=h),512&i.flags&&(Z[0]=255&h,Z[1]=h>>>8&255,i.check=v(i.check,Z,2,0)),h=0,f=0}else i.head&&(i.head.extra=null);i.mode=ee;case ee:if(1024&i.flags&&(u=i.length,u>s&&(u=s),u&&(i.head&&(T=i.head.extra_len-i.length,i.head.extra||(i.head.extra=new Array(i.head.extra_len)),w.arraySet(i.head.extra,n,a,u,T)),512&i.flags&&(i.check=v(i.check,n,u,a)),s-=u,a+=u,i.length-=u),i.length))break e;i.length=0,i.mode=te;case te:if(2048&i.flags){if(0===s)break e;u=0;do{T=n[a+u++],i.head&&T&&i.length<65536&&(i.head.name+=String.fromCharCode(T))}while(T&&u<s);if(512&i.flags&&(i.check=v(i.check,n,u,a)),s-=u,a+=u,T)break e}else i.head&&(i.head.name=null);i.length=0,i.mode=ie;case ie:if(4096&i.flags){if(0===s)break e;u=0;do{T=n[a+u++],i.head&&T&&i.length<65536&&(i.head.comment+=String.fromCharCode(T))}while(T&&u<s);if(512&i.flags&&(i.check=v(i.check,n,u,a)),s-=u,a+=u,T)break e}else i.head&&(i.head.comment=null);i.mode=ne;case ne:if(512&i.flags){while(f<16){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}if(h!==(65535&i.check)){e.msg="header crc mismatch",i.mode=xe;break}h=0,f=0}i.head&&(i.head.hcrc=i.flags>>9&1,i.head.done=!0),e.adler=i.check=0,i.mode=oe;break;case re:while(f<32){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}e.adler=i.check=Ze(h),h=0,f=0,i.mode=ae;case ae:if(0===i.havedict)return e.next_out=o,e.avail_out=l,e.next_in=a,e.avail_in=s,i.hold=h,i.bits=f,V;e.adler=i.check=1,i.mode=oe;case oe:if(t===H||t===z)break e;case se:if(i.last){h>>>=7&f,f-=7&f,i.mode=pe;break}while(f<3){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}switch(i.last=1&h,h>>>=1,f-=1,3&h){case 0:i.mode=le;break;case 1:if(Pe(i),i.mode=we,t===z){h>>>=2,f-=2;break e}break;case 2:i.mode=ce;break;case 3:e.msg="invalid block type",i.mode=xe}h>>>=2,f-=2;break;case le:h>>>=7&f,f-=7&f;while(f<32){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}if((65535&h)!==(h>>>16^65535)){e.msg="invalid stored block lengths",i.mode=xe;break}if(i.length=65535&h,h=0,f=0,i.mode=he,t===z)break e;case he:i.mode=fe;case fe:if(u=i.length,u){if(u>s&&(u=s),u>l&&(u=l),0===u)break e;w.arraySet(r,n,a,u,o),s-=u,a+=u,l-=u,o+=u,i.length-=u;break}i.mode=oe;break;case ce:while(f<14){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}if(i.nlen=257+(31&h),h>>>=5,f-=5,i.ndist=1+(31&h),h>>>=5,f-=5,i.ncode=4+(15&h),h>>>=4,f-=4,i.nlen>286||i.ndist>30){e.msg="too many length or distance symbols",i.mode=xe;break}i.have=0,i.mode=de;case de:while(i.have<i.ncode){while(f<3){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}i.lens[I[i.have++]]=7&h,h>>>=3,f-=3}while(i.have<19)i.lens[I[i.have++]]=0;if(i.lencode=i.lendyn,i.lenbits=7,A={bits:i.lenbits},R=D(C,i.lens,0,19,i.lencode,0,i.work,A),i.lenbits=A.bits,R){e.msg="invalid code lengths set",i.mode=xe;break}i.have=0,i.mode=ue;case ue:while(i.have<i.nlen+i.ndist){for(;;){if(U=i.lencode[h&(1<<i.lenbits)-1],k=U>>>24,_=U>>>16&255,p=65535&U,k<=f)break;if(0===s)break e;s--,h+=n[a++]<<f,f+=8}if(p<16)h>>>=k,f-=k,i.lens[i.have++]=p;else{if(16===p){B=k+2;while(f<B){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}if(h>>>=k,f-=k,0===i.have){e.msg="invalid bit length repeat",i.mode=xe;break}T=i.lens[i.have-1],u=3+(3&h),h>>>=2,f-=2}else if(17===p){B=k+3;while(f<B){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}h>>>=k,f-=k,T=0,u=3+(7&h),h>>>=3,f-=3}else{B=k+7;while(f<B){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}h>>>=k,f-=k,T=0,u=11+(127&h),h>>>=7,f-=7}if(i.have+u>i.nlen+i.ndist){e.msg="invalid bit length repeat",i.mode=xe;break}while(u--)i.lens[i.have++]=T}}if(i.mode===xe)break;if(0===i.lens[256]){e.msg="invalid code -- missing end-of-block",i.mode=xe;break}if(i.lenbits=9,A={bits:i.lenbits},R=D(N,i.lens,0,i.nlen,i.lencode,0,i.work,A),i.lenbits=A.bits,R){e.msg="invalid literal/lengths set",i.mode=xe;break}if(i.distbits=6,i.distcode=i.distdyn,A={bits:i.distbits},R=D(F,i.lens,i.nlen,i.ndist,i.distcode,0,i.work,A),i.distbits=A.bits,R){e.msg="invalid distances set",i.mode=xe;break}if(i.mode=we,t===z)break e;case we:i.mode=be;case be:if(s>=6&&l>=258){e.next_out=o,e.avail_out=l,e.next_in=a,e.avail_in=s,i.hold=h,i.bits=f,E(e,d),o=e.next_out,r=e.output,l=e.avail_out,a=e.next_in,n=e.input,s=e.avail_in,h=i.hold,f=i.bits,i.mode===oe&&(i.back=-1);break}for(i.back=0;;){if(U=i.lencode[h&(1<<i.lenbits)-1],k=U>>>24,_=U>>>16&255,p=65535&U,k<=f)break;if(0===s)break e;s--,h+=n[a++]<<f,f+=8}if(_&&0===(240&_)){for(y=k,x=_,S=p;;){if(U=i.lencode[S+((h&(1<<y+x)-1)>>y)],k=U>>>24,_=U>>>16&255,p=65535&U,y+k<=f)break;if(0===s)break e;s--,h+=n[a++]<<f,f+=8}h>>>=y,f-=y,i.back+=y}if(h>>>=k,f-=k,i.back+=k,i.length=p,0===_){i.mode=ve;break}if(32&_){i.back=-1,i.mode=oe;break}if(64&_){e.msg="invalid literal/length code",i.mode=xe;break}i.extra=15&_,i.mode=me;case me:if(i.extra){B=i.extra;while(f<B){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}i.length+=h&(1<<i.extra)-1,h>>>=i.extra,f-=i.extra,i.back+=i.extra}i.was=i.length,i.mode=ge;case ge:for(;;){if(U=i.distcode[h&(1<<i.distbits)-1],k=U>>>24,_=U>>>16&255,p=65535&U,k<=f)break;if(0===s)break e;s--,h+=n[a++]<<f,f+=8}if(0===(240&_)){for(y=k,x=_,S=p;;){if(U=i.distcode[S+((h&(1<<y+x)-1)>>y)],k=U>>>24,_=U>>>16&255,p=65535&U,y+k<=f)break;if(0===s)break e;s--,h+=n[a++]<<f,f+=8}h>>>=y,f-=y,i.back+=y}if(h>>>=k,f-=k,i.back+=k,64&_){e.msg="invalid distance code",i.mode=xe;break}i.offset=p,i.extra=15&_,i.mode=ke;case ke:if(i.extra){B=i.extra;while(f<B){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}i.offset+=h&(1<<i.extra)-1,h>>>=i.extra,f-=i.extra,i.back+=i.extra}if(i.offset>i.dmax){e.msg="invalid distance too far back",i.mode=xe;break}i.mode=_e;case _e:if(0===l)break e;if(u=d-l,i.offset>u){if(u=i.offset-u,u>i.whave&&i.sane){e.msg="invalid distance too far back",i.mode=xe;break}u>i.wnext?(u-=i.wnext,b=i.wsize-u):b=i.wnext-u,u>i.length&&(u=i.length),g=i.window}else g=r,b=o-i.offset,u=i.length;u>l&&(u=l),l-=u,i.length-=u;do{r[o++]=g[b++]}while(--u);0===i.length&&(i.mode=be);break;case ve:if(0===l)break e;r[o++]=i.length,l--,i.mode=be;break;case pe:if(i.wrap){while(f<32){if(0===s)break e;s--,h|=n[a++]<<f,f+=8}if(d-=l,e.total_out+=d,i.total+=d,d&&(e.adler=i.check=i.flags?v(i.check,r,d,o-d):m(i.check,r,d,o-d)),d=l,(i.flags?h:Ze(h))!==i.check){e.msg="incorrect data check",i.mode=xe;break}h=0,f=0}i.mode=ye;case ye:if(i.wrap&&i.flags){while(f<32){if(0===s)break e;s--,h+=n[a++]<<f,f+=8}if(h!==(4294967295&i.total)){e.msg="incorrect length check",i.mode=xe;break}h=0,f=0}i.mode=Ee;case Ee:R=M;break e;case xe:R=K;break e;case Se:return Y;case Te:default:return j}return e.next_out=o,e.avail_out=l,e.next_in=a,e.avail_in=s,i.hold=h,i.bits=f,(i.wsize||d!==e.avail_out&&i.mode<xe&&(i.mode<pe||t!==L))&&Me(e,e.output,e.next_out,d-e.avail_out),c-=e.avail_in,d-=e.avail_out,e.total_in+=c,e.total_out+=d,i.total+=d,i.wrap&&d&&(e.adler=i.check=i.flags?v(i.check,r,d,e.next_out-d):m(i.check,r,d,e.next_out-d)),e.data_type=i.bits+(i.last?64:0)+(i.mode===oe?128:0)+(i.mode===we||i.mode===he?256:0),(0===c&&0===d||t===L)&&R===P&&(R=G),R}function je(e){if(!e||!e.state)return j;var t=e.state;return t.window&&(t.window=null),e.state=null,P}function Ke(e,t){var i;return e&&e.state?(i=e.state,0===(2&i.wrap)?j:(i.head=t,t.done=!1,P)):j}function Ye(e,t){var i,n,r,a=t.length;return e&&e.state?(i=e.state,0!==i.wrap&&i.mode!==ae?j:i.mode===ae&&(n=1,n=m(n,t,a,0),n!==i.check)?K:(r=Me(e,t,a,a),r?(i.mode=Se,Y):(i.havedict=1,P))):j}var Ge=De,Qe=Ce,We=Oe,Xe=Fe,qe=Ne,Je=Ve,$e=je,et=Ke,tt=Ye,it="pako inflate (from Nodeca project)",nt={inflateReset:Ge,inflateReset2:Qe,inflateResetKeep:We,inflateInit:Xe,inflateInit2:qe,inflate:Je,inflateEnd:$e,inflateGetHeader:et,inflateSetDictionary:tt,inflateInfo:it},rt=!0,at=!0;try{String.fromCharCode.apply(null,[0])}catch(jt){rt=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(jt){at=!1}for(var ot=new w.Buf8(256),st=0;st<256;st++)ot[st]=st>=252?6:st>=248?5:st>=240?4:st>=224?3:st>=192?2:1;ot[254]=ot[254]=1;var lt=function(e){var t,i,n,r,a,o=e.length,s=0;for(r=0;r<o;r++)i=e.charCodeAt(r),55296===(64512&i)&&r+1<o&&(n=e.charCodeAt(r+1),56320===(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),r++)),s+=i<128?1:i<2048?2:i<65536?3:4;for(t=new w.Buf8(s),a=0,r=0;a<s;r++)i=e.charCodeAt(r),55296===(64512&i)&&r+1<o&&(n=e.charCodeAt(r+1),56320===(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),r++)),i<128?t[a++]=i:i<2048?(t[a++]=192|i>>>6,t[a++]=128|63&i):i<65536?(t[a++]=224|i>>>12,t[a++]=128|i>>>6&63,t[a++]=128|63&i):(t[a++]=240|i>>>18,t[a++]=128|i>>>12&63,t[a++]=128|i>>>6&63,t[a++]=128|63&i);return t};function ht(e,t){if(t<65534&&(e.subarray&&at||!e.subarray&&rt))return String.fromCharCode.apply(null,w.shrinkBuf(e,t));for(var i="",n=0;n<t;n++)i+=String.fromCharCode(e[n]);return i}var ft=function(e){return ht(e,e.length)},ct=function(e){for(var t=new w.Buf8(e.length),i=0,n=t.length;i<n;i++)t[i]=e.charCodeAt(i);return t},dt=function(e,t){var i,n,r,a,o=t||e.length,s=new Array(2*o);for(n=0,i=0;i<o;)if(r=e[i++],r<128)s[n++]=r;else if(a=ot[r],a>4)s[n++]=65533,i+=a-1;else{r&=2===a?31:3===a?15:7;while(a>1&&i<o)r=r<<6|63&e[i++],a--;a>1?s[n++]=65533:r<65536?s[n++]=r:(r-=65536,s[n++]=55296|r>>10&1023,s[n++]=56320|1023&r)}return ht(s,n)},ut=function(e,t){var i;t=t||e.length,t>e.length&&(t=e.length),i=t-1;while(i>=0&&128===(192&e[i]))i--;return i<0||0===i?t:i+ot[e[i]]>t?i:t},wt={string2buf:lt,buf2binstring:ft,binstring2buf:ct,buf2string:dt,utf8border:ut},bt={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8},mt={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};function gt(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}var kt=gt;function _t(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}var vt=_t,pt=Object.prototype.toString;function yt(e){if(!(this instanceof yt))return new yt(e);this.options=w.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&0===(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new kt,this.strm.avail_out=0;var i=nt.inflateInit2(this.strm,t.windowBits);if(i!==bt.Z_OK)throw new Error(mt[i]);if(this.header=new vt,nt.inflateGetHeader(this.strm,this.header),t.dictionary&&("string"===typeof t.dictionary?t.dictionary=wt.string2buf(t.dictionary):"[object ArrayBuffer]"===pt.call(t.dictionary)&&(t.dictionary=new Uint8Array(t.dictionary)),t.raw&&(i=nt.inflateSetDictionary(this.strm,t.dictionary),i!==bt.Z_OK)))throw new Error(mt[i])}function Et(e,t){var i=new yt(t);if(i.push(e,!0),i.err)throw i.msg||mt[i.err];return i.result}function xt(e,t){return t=t||{},t.raw=!0,Et(e,t)}yt.prototype.push=function(e,t){var i,n,r,a,o,s=this.strm,l=this.options.chunkSize,h=this.options.dictionary,f=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?bt.Z_FINISH:bt.Z_NO_FLUSH,"string"===typeof e?s.input=wt.binstring2buf(e):"[object ArrayBuffer]"===pt.call(e)?s.input=new Uint8Array(e):s.input=e,s.next_in=0,s.avail_in=s.input.length;do{if(0===s.avail_out&&(s.output=new w.Buf8(l),s.next_out=0,s.avail_out=l),i=nt.inflate(s,bt.Z_NO_FLUSH),i===bt.Z_NEED_DICT&&h&&(i=nt.inflateSetDictionary(this.strm,h)),i===bt.Z_BUF_ERROR&&!0===f&&(i=bt.Z_OK,f=!1),i!==bt.Z_STREAM_END&&i!==bt.Z_OK)return this.onEnd(i),this.ended=!0,!1;s.next_out&&(0!==s.avail_out&&i!==bt.Z_STREAM_END&&(0!==s.avail_in||n!==bt.Z_FINISH&&n!==bt.Z_SYNC_FLUSH)||("string"===this.options.to?(r=wt.utf8border(s.output,s.next_out),a=s.next_out-r,o=wt.buf2string(s.output,r),s.next_out=a,s.avail_out=l-a,a&&w.arraySet(s.output,s.output,r,a,0),this.onData(o)):this.onData(w.shrinkBuf(s.output,s.next_out)))),0===s.avail_in&&0===s.avail_out&&(f=!0)}while((s.avail_in>0||0===s.avail_out)&&i!==bt.Z_STREAM_END);return i===bt.Z_STREAM_END&&(n=bt.Z_FINISH),n===bt.Z_FINISH?(i=nt.inflateEnd(this.strm),this.onEnd(i),this.ended=!0,i===bt.Z_OK):n!==bt.Z_SYNC_FLUSH||(this.onEnd(bt.Z_OK),s.avail_out=0,!0)},yt.prototype.onData=function(e){this.chunks.push(e)},yt.prototype.onEnd=function(e){e===bt.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=w.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg};var St=yt,Tt=Et,Rt=xt,At=Et,Bt={Inflate:St,inflate:Tt,inflateRaw:Rt,ungzip:At};const Ut=Uint16Array.BYTES_PER_ELEMENT,Zt=Int32Array.BYTES_PER_ELEMENT,It=Uint32Array.BYTES_PER_ELEMENT,Ot={METADATA:0,TERRAIN:1,DBROOT:2};function Dt(e,t){const i=Ot.fromString(e.type);let n=e.buffer;o(e.key,n);const r=Mt(n);n=r.buffer;const a=r.length;switch(i){case Ot.METADATA:return Nt(n,a,e.quadKey);case Ot.TERRAIN:return Ht(n,a,t);case Ot.DBROOT:return t.push(n),{buffer:n}}}Ot.fromString=function(e){return"Metadata"===e?Ot.METADATA:"Terrain"===e?Ot.TERRAIN:"DbRoot"===e?Ot.DBROOT:void 0};const Ct=32301;function Nt(t,i,n){const r=new DataView(t);let a=0;const o=r.getUint32(a,!0);if(a+=It,o!==Ct)throw new e.RuntimeError("Invalid magic");const s=r.getUint32(a,!0);if(a+=It,1!==s)throw new e.RuntimeError("Invalid data type. Must be 1 for QuadTreePacket");const l=r.getUint32(a,!0);if(a+=It,2!==l)throw new e.RuntimeError("Invalid QuadTreePacket version. Only version 2 is supported.");const h=r.getInt32(a,!0);a+=Zt;const f=r.getInt32(a,!0);if(a+=Zt,32!==f)throw new e.RuntimeError("Invalid instance size.");const c=r.getInt32(a,!0);a+=Zt;const d=r.getInt32(a,!0);a+=Zt;const w=r.getInt32(a,!0);if(a+=Zt,c!==h*f+a)throw new e.RuntimeError("Invalid dataBufferOffset");if(c+d+w!==i)throw new e.RuntimeError("Invalid packet offsets");const b=[];for(let e=0;e<h;++e){const e=r.getUint8(a);++a,++a;const t=r.getUint16(a,!0);a+=Ut;const i=r.getUint16(a,!0);a+=Ut;const n=r.getUint16(a,!0);a+=Ut,a+=Ut,a+=Ut,a+=Zt,a+=Zt,a+=8;const o=r.getUint8(a++),s=r.getUint8(a++);a+=Ut,b.push(new u(e,t,i,n,o,s))}const m=[];let g=0;function k(e,t,i){let n=!1;if(4===i){if(t.hasSubtree())return;n=!0}for(let r=0;r<4;++r){const a=e+r.toString();if(n)m[a]=null;else if(i<4)if(t.hasChild(r)){if(g===h)return void console.log("Incorrect number of instances");const e=b[g++];m[a]=e,k(a,e,i+1)}else m[a]=null}}let _=0;const v=b[g++];return""===n?++_:m[n]=v,k(n,v,_),m}const Ft=5,Lt=4;function Ht(t,i,n){const r=new DataView(t),a=function(t){for(let n=0;n<Lt;++n){const n=r.getUint32(t,!0);if(t+=It,t+=n,t>i)throw new e.RuntimeError("Malformed terrain packet found.")}return t};let o=0;const s=[];while(s.length<Ft){const e=o;o=a(o);const i=t.slice(e,o);n.push(i),s.push(i)}return s}const zt=1953029805,Pt=2917034100;function Mt(t){const i=new DataView(t);let n=0;const r=i.getUint32(n,!0);if(n+=It,r!==zt&&r!==Pt)throw new e.RuntimeError("Invalid magic");const a=i.getUint32(n,r===zt);n+=It;const o=new Uint8Array(t,n),s=Bt.inflate(o);if(s.length!==a)throw new e.RuntimeError("Size of packet doesn't match header");return s}var Vt=n(Dt);return Vt}));