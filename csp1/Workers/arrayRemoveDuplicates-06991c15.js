define(["exports","./RuntimeError-c581ca93","./defaultValue-94c3e563","./ComponentDatatype-4a60b8d6"],(function(e,n,t,i){"use strict";const d=i.CesiumMath.EPSILON10;function u(e,i,u,f){if(n.Check.defined("equalsEpsilon",i),!t.defined(e))return;u=t.defaultValue(u,!1);const s=t.defined(f),l=e.length;if(l<2)return e;let r,a,c,o=e[0],p=0,h=-1;for(r=1;r<l;++r)a=e[r],i(o,a,d)?(t.defined(c)||(c=e.slice(0,r),p=r-1,h=0),s&&f.push(r)):(t.defined(c)&&(c.push(a),p=r,s&&(h=f.length)),o=a);return u&&i(e[0],e[l-1],d)&&(s&&(t.defined(c)?f.splice(h,0,p):f.push(l-1)),t.defined(c)?c.length-=1:c=e.slice(0,-1)),t.defined(c)?c:e}e.arrayRemoveDuplicates=u}));