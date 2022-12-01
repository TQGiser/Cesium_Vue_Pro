define(["exports","./Matrix2-fc7e9822","./defaultValue-94c3e563","./RuntimeError-c581ca93","./Transforms-a076dbe6","./ComponentDatatype-4a60b8d6"],(function(e,r,t,n,i,a){"use strict";const o={};function s(e,r,t){const n=e+r;return a.CesiumMath.sign(e)!==a.CesiumMath.sign(r)&&Math.abs(n/Math.max(Math.abs(e),Math.abs(r)))<t?0:n}o.computeDiscriminant=function(e,r,t){if("number"!==typeof e)throw new n.DeveloperError("a is a required number.");if("number"!==typeof r)throw new n.DeveloperError("b is a required number.");if("number"!==typeof t)throw new n.DeveloperError("c is a required number.");const i=r*r-4*e*t;return i},o.computeRealRoots=function(e,r,t){if("number"!==typeof e)throw new n.DeveloperError("a is a required number.");if("number"!==typeof r)throw new n.DeveloperError("b is a required number.");if("number"!==typeof t)throw new n.DeveloperError("c is a required number.");let i;if(0===e)return 0===r?[]:[-t/r];if(0===r){if(0===t)return[0,0];const r=Math.abs(t),n=Math.abs(e);if(r<n&&r/n<a.CesiumMath.EPSILON14)return[0,0];if(r>n&&n/r<a.CesiumMath.EPSILON14)return[];if(i=-t/e,i<0)return[];const o=Math.sqrt(i);return[-o,o]}if(0===t)return i=-r/e,i<0?[i,0]:[0,i];const o=r*r,u=4*e*t,c=s(o,-u,a.CesiumMath.EPSILON14);if(c<0)return[];const d=-.5*s(r,a.CesiumMath.sign(r)*Math.sqrt(c),a.CesiumMath.EPSILON14);return r>0?[d/e,t/d]:[t/d,d/e]};const u={};function c(e,r,t,n){const i=e,a=r/3,o=t/3,s=n,u=i*o,c=a*s,d=a*a,l=o*o,f=i*o-d,h=i*s-a*o,m=a*s-l,p=4*f*m-h*h;let C,w;if(p<0){let e,r,t;d*c>=u*l?(e=i,r=f,t=-2*a*f+i*h):(e=s,r=m,t=-s*h+2*o*m);const n=t<0?-1:1,M=-n*Math.abs(e)*Math.sqrt(-p);w=-t+M;const b=w/2,g=b<0?-Math.pow(-b,1/3):Math.pow(b,1/3),q=w===M?-g:-r/g;return C=r<=0?g+q:-t/(g*g+q*q+r),d*c>=u*l?[(C-a)/i]:[-s/(C+o)]}const M=f,b=-2*a*f+i*h,g=m,q=-s*h+2*o*m,E=Math.sqrt(p),y=Math.sqrt(3)/2;let v=Math.abs(Math.atan2(i*E,-b)/3);C=2*Math.sqrt(-M);let D=Math.cos(v);w=C*D;let R=C*(-D/2-y*Math.sin(v));const S=w+R>2*a?w-a:R-a,O=i,x=S/O;v=Math.abs(Math.atan2(s*E,-q)/3),C=2*Math.sqrt(-g),D=Math.cos(v),w=C*D,R=C*(-D/2-y*Math.sin(v));const P=-s,N=w+R<2*o?w+o:R+o,L=P/N,I=O*N,z=-S*N-O*P,T=S*P,U=(o*z-a*T)/(-a*z+o*I);return x<=U?x<=L?U<=L?[x,U,L]:[x,L,U]:[L,x,U]:x<=L?[U,x,L]:U<=L?[U,L,x]:[L,U,x]}u.computeDiscriminant=function(e,r,t,i){if("number"!==typeof e)throw new n.DeveloperError("a is a required number.");if("number"!==typeof r)throw new n.DeveloperError("b is a required number.");if("number"!==typeof t)throw new n.DeveloperError("c is a required number.");if("number"!==typeof i)throw new n.DeveloperError("d is a required number.");const a=e*e,o=r*r,s=t*t,u=i*i,c=18*e*r*t*i+o*s-27*a*u-4*(e*s*t+o*r*i);return c},u.computeRealRoots=function(e,r,t,i){if("number"!==typeof e)throw new n.DeveloperError("a is a required number.");if("number"!==typeof r)throw new n.DeveloperError("b is a required number.");if("number"!==typeof t)throw new n.DeveloperError("c is a required number.");if("number"!==typeof i)throw new n.DeveloperError("d is a required number.");let a,s;if(0===e)return o.computeRealRoots(r,t,i);if(0===r){if(0===t){if(0===i)return[0,0,0];s=-i/e;const r=s<0?-Math.pow(-s,1/3):Math.pow(s,1/3);return[r,r,r]}return 0===i?(a=o.computeRealRoots(e,0,t),0===a.Length?[0]:[a[0],0,a[1]]):c(e,0,t,i)}return 0===t?0===i?(s=-r/e,s<0?[s,0,0]:[0,0,s]):c(e,r,0,i):0===i?(a=o.computeRealRoots(e,r,t),0===a.length?[0]:a[1]<=0?[a[0],a[1],0]:a[0]>=0?[0,a[0],a[1]]:[a[0],0,a[1]]):c(e,r,t,i)};const d={};function l(e,r,t,n){const i=e*e,s=r-3*i/8,c=t-r*e/2+i*e/8,d=n-t*e/4+r*i/16-3*i*i/256,l=u.computeRealRoots(1,2*s,s*s-4*d,-c*c);if(l.length>0){const r=-e/4,t=l[l.length-1];if(Math.abs(t)<a.CesiumMath.EPSILON14){const e=o.computeRealRoots(1,s,d);if(2===e.length){const t=e[0],n=e[1];let i;if(t>=0&&n>=0){const e=Math.sqrt(t),i=Math.sqrt(n);return[r-i,r-e,r+e,r+i]}if(t>=0&&n<0)return i=Math.sqrt(t),[r-i,r+i];if(t<0&&n>=0)return i=Math.sqrt(n),[r-i,r+i]}return[]}if(t>0){const e=Math.sqrt(t),n=(s+t-c/e)/2,i=(s+t+c/e)/2,a=o.computeRealRoots(1,e,n),u=o.computeRealRoots(1,-e,i);return 0!==a.length?(a[0]+=r,a[1]+=r,0!==u.length?(u[0]+=r,u[1]+=r,a[1]<=u[0]?[a[0],a[1],u[0],u[1]]:u[1]<=a[0]?[u[0],u[1],a[0],a[1]]:a[0]>=u[0]&&a[1]<=u[1]?[u[0],a[0],a[1],u[1]]:u[0]>=a[0]&&u[1]<=a[1]?[a[0],u[0],u[1],a[1]]:a[0]>u[0]&&a[0]<u[1]?[u[0],a[0],u[1],a[1]]:[a[0],u[0],a[1],u[1]]):a):0!==u.length?(u[0]+=r,u[1]+=r,u):[]}}return[]}function f(e,r,t,n){const i=t*t,s=r*r,c=e*e,d=-2*r,l=t*e+s-4*n,f=c*n-t*r*e+i,h=u.computeRealRoots(1,d,l,f);if(h.length>0){const i=h[0],s=r-i,u=s*s,d=e/2,l=s/2,f=u-4*n,m=u+4*Math.abs(n),p=c-4*i,C=c+4*Math.abs(i);let w,M,b,g,q,E;if(i<0||f*C<p*m){const r=Math.sqrt(p);w=r/2,M=0===r?0:(e*l-t)/r}else{const r=Math.sqrt(f);w=0===r?0:(e*l-t)/r,M=r/2}0===d&&0===w?(b=0,g=0):a.CesiumMath.sign(d)===a.CesiumMath.sign(w)?(b=d+w,g=i/b):(g=d-w,b=i/g),0===l&&0===M?(q=0,E=0):a.CesiumMath.sign(l)===a.CesiumMath.sign(M)?(q=l+M,E=n/q):(E=l-M,q=n/E);const y=o.computeRealRoots(1,b,q),v=o.computeRealRoots(1,g,E);if(0!==y.length)return 0!==v.length?y[1]<=v[0]?[y[0],y[1],v[0],v[1]]:v[1]<=y[0]?[v[0],v[1],y[0],y[1]]:y[0]>=v[0]&&y[1]<=v[1]?[v[0],y[0],y[1],v[1]]:v[0]>=y[0]&&v[1]<=y[1]?[y[0],v[0],v[1],y[1]]:y[0]>v[0]&&y[0]<v[1]?[v[0],y[0],v[1],y[1]]:[y[0],v[0],y[1],v[1]]:y;if(0!==v.length)return v}return[]}function h(e,n){n=r.Cartesian3.clone(t.defaultValue(n,r.Cartesian3.ZERO)),r.Cartesian3.equals(n,r.Cartesian3.ZERO)||r.Cartesian3.normalize(n,n),this.origin=r.Cartesian3.clone(t.defaultValue(e,r.Cartesian3.ZERO)),this.direction=n}d.computeDiscriminant=function(e,r,t,i,a){if("number"!==typeof e)throw new n.DeveloperError("a is a required number.");if("number"!==typeof r)throw new n.DeveloperError("b is a required number.");if("number"!==typeof t)throw new n.DeveloperError("c is a required number.");if("number"!==typeof i)throw new n.DeveloperError("d is a required number.");if("number"!==typeof a)throw new n.DeveloperError("e is a required number.");const o=e*e,s=o*e,u=r*r,c=u*r,d=t*t,l=d*t,f=i*i,h=f*i,m=a*a,p=m*a,C=u*d*f-4*c*h-4*e*l*f+18*e*r*t*h-27*o*f*f+256*s*p+a*(18*c*t*i-4*u*l+16*e*d*d-80*e*r*d*i-6*e*u*f+144*o*t*f)+m*(144*e*u*t-27*u*u-128*o*d-192*o*r*i);return C},d.computeRealRoots=function(e,r,t,i,o){if("number"!==typeof e)throw new n.DeveloperError("a is a required number.");if("number"!==typeof r)throw new n.DeveloperError("b is a required number.");if("number"!==typeof t)throw new n.DeveloperError("c is a required number.");if("number"!==typeof i)throw new n.DeveloperError("d is a required number.");if("number"!==typeof o)throw new n.DeveloperError("e is a required number.");if(Math.abs(e)<a.CesiumMath.EPSILON15)return u.computeRealRoots(r,t,i,o);const s=r/e,c=t/e,d=i/e,h=o/e;let m=s<0?1:0;switch(m+=c<0?m+1:m,m+=d<0?m+1:m,m+=h<0?m+1:m,m){case 0:return l(s,c,d,h);case 1:return f(s,c,d,h);case 2:return f(s,c,d,h);case 3:return l(s,c,d,h);case 4:return l(s,c,d,h);case 5:return f(s,c,d,h);case 6:return l(s,c,d,h);case 7:return l(s,c,d,h);case 8:return f(s,c,d,h);case 9:return l(s,c,d,h);case 10:return l(s,c,d,h);case 11:return f(s,c,d,h);case 12:return l(s,c,d,h);case 13:return l(s,c,d,h);case 14:return l(s,c,d,h);case 15:return l(s,c,d,h);default:return}},h.clone=function(e,n){if(t.defined(e))return t.defined(n)?(n.origin=r.Cartesian3.clone(e.origin),n.direction=r.Cartesian3.clone(e.direction),n):new h(e.origin,e.direction)},h.getPoint=function(e,i,a){return n.Check.typeOf.object("ray",e),n.Check.typeOf.number("t",i),t.defined(a)||(a=new r.Cartesian3),a=r.Cartesian3.multiplyByScalar(e.direction,i,a),r.Cartesian3.add(e.origin,a,a)};const m={rayPlane:function(e,i,o){if(!t.defined(e))throw new n.DeveloperError("ray is required.");if(!t.defined(i))throw new n.DeveloperError("plane is required.");t.defined(o)||(o=new r.Cartesian3);const s=e.origin,u=e.direction,c=i.normal,d=r.Cartesian3.dot(c,u);if(Math.abs(d)<a.CesiumMath.EPSILON15)return;const l=(-i.distance-r.Cartesian3.dot(c,s))/d;return l<0?void 0:(o=r.Cartesian3.multiplyByScalar(u,l,o),r.Cartesian3.add(s,o,o))}},p=new r.Cartesian3,C=new r.Cartesian3,w=new r.Cartesian3,M=new r.Cartesian3,b=new r.Cartesian3;m.rayTriangleParametric=function(e,i,o,s,u){if(!t.defined(e))throw new n.DeveloperError("ray is required.");if(!t.defined(i))throw new n.DeveloperError("p0 is required.");if(!t.defined(o))throw new n.DeveloperError("p1 is required.");if(!t.defined(s))throw new n.DeveloperError("p2 is required.");u=t.defaultValue(u,!1);const c=e.origin,d=e.direction,l=r.Cartesian3.subtract(o,i,p),f=r.Cartesian3.subtract(s,i,C),h=r.Cartesian3.cross(d,f,w),m=r.Cartesian3.dot(l,h);let g,q,E,y,v;if(u){if(m<a.CesiumMath.EPSILON6)return;if(g=r.Cartesian3.subtract(c,i,M),E=r.Cartesian3.dot(g,h),E<0||E>m)return;if(q=r.Cartesian3.cross(g,l,b),y=r.Cartesian3.dot(d,q),y<0||E+y>m)return;v=r.Cartesian3.dot(f,q)/m}else{if(Math.abs(m)<a.CesiumMath.EPSILON6)return;const e=1/m;if(g=r.Cartesian3.subtract(c,i,M),E=r.Cartesian3.dot(g,h)*e,E<0||E>1)return;if(q=r.Cartesian3.cross(g,l,b),y=r.Cartesian3.dot(d,q)*e,y<0||E+y>1)return;v=r.Cartesian3.dot(f,q)*e}return v},m.rayTriangle=function(e,n,i,a,o,s){const u=m.rayTriangleParametric(e,n,i,a,o);if(t.defined(u)&&!(u<0))return t.defined(s)||(s=new r.Cartesian3),r.Cartesian3.multiplyByScalar(e.direction,u,s),r.Cartesian3.add(e.origin,s,s)};const g=new h;function q(e,r,t,n){const i=r*r-4*e*t;if(i<0)return;if(i>0){const t=1/(2*e),a=Math.sqrt(i),o=(-r+a)*t,s=(-r-a)*t;return o<s?(n.root0=o,n.root1=s):(n.root0=s,n.root1=o),n}const a=-r/(2*e);return 0!==a?(n.root0=n.root1=a,n):void 0}m.lineSegmentTriangle=function(e,i,a,o,s,u,c){if(!t.defined(e))throw new n.DeveloperError("v0 is required.");if(!t.defined(i))throw new n.DeveloperError("v1 is required.");if(!t.defined(a))throw new n.DeveloperError("p0 is required.");if(!t.defined(o))throw new n.DeveloperError("p1 is required.");if(!t.defined(s))throw new n.DeveloperError("p2 is required.");const d=g;r.Cartesian3.clone(e,d.origin),r.Cartesian3.subtract(i,e,d.direction),r.Cartesian3.normalize(d.direction,d.direction);const l=m.rayTriangleParametric(d,a,o,s,u);if(!(!t.defined(l)||l<0||l>r.Cartesian3.distance(e,i)))return t.defined(c)||(c=new r.Cartesian3),r.Cartesian3.multiplyByScalar(d.direction,l,c),r.Cartesian3.add(d.origin,c,c)};const E={root0:0,root1:0};function y(e,n,a){t.defined(a)||(a=new i.Interval);const o=e.origin,s=e.direction,u=n.center,c=n.radius*n.radius,d=r.Cartesian3.subtract(o,u,w),l=r.Cartesian3.dot(s,s),f=2*r.Cartesian3.dot(s,d),h=r.Cartesian3.magnitudeSquared(d)-c,m=q(l,f,h,E);if(t.defined(m))return a.start=m.root0,a.stop=m.root1,a}m.raySphere=function(e,r,i){if(!t.defined(e))throw new n.DeveloperError("ray is required.");if(!t.defined(r))throw new n.DeveloperError("sphere is required.");if(i=y(e,r,i),t.defined(i)&&!(i.stop<0))return i.start=Math.max(i.start,0),i};const v=new h;m.lineSegmentSphere=function(e,i,a,o){if(!t.defined(e))throw new n.DeveloperError("p0 is required.");if(!t.defined(i))throw new n.DeveloperError("p1 is required.");if(!t.defined(a))throw new n.DeveloperError("sphere is required.");const s=v;r.Cartesian3.clone(e,s.origin);const u=r.Cartesian3.subtract(i,e,s.direction),c=r.Cartesian3.magnitude(u);if(r.Cartesian3.normalize(u,u),o=y(s,a,o),!(!t.defined(o)||o.stop<0||o.start>c))return o.start=Math.max(o.start,0),o.stop=Math.min(o.stop,c),o};const D=new r.Cartesian3,R=new r.Cartesian3;function S(e,r,t){const n=e+r;return a.CesiumMath.sign(e)!==a.CesiumMath.sign(r)&&Math.abs(n/Math.max(Math.abs(e),Math.abs(r)))<t?0:n}function O(e,t,n,i,s){const u=i*i,c=s*s,l=(e[r.Matrix3.COLUMN1ROW1]-e[r.Matrix3.COLUMN2ROW2])*c,f=s*(i*S(e[r.Matrix3.COLUMN1ROW0],e[r.Matrix3.COLUMN0ROW1],a.CesiumMath.EPSILON15)+t.y),h=e[r.Matrix3.COLUMN0ROW0]*u+e[r.Matrix3.COLUMN2ROW2]*c+i*t.x+n,m=c*S(e[r.Matrix3.COLUMN2ROW1],e[r.Matrix3.COLUMN1ROW2],a.CesiumMath.EPSILON15),p=s*(i*S(e[r.Matrix3.COLUMN2ROW0],e[r.Matrix3.COLUMN0ROW2])+t.z);let C;const w=[];if(0===p&&0===m){if(C=o.computeRealRoots(l,f,h),0===C.length)return w;const e=C[0],t=Math.sqrt(Math.max(1-e*e,0));if(w.push(new r.Cartesian3(i,s*e,s*-t)),w.push(new r.Cartesian3(i,s*e,s*t)),2===C.length){const e=C[1],t=Math.sqrt(Math.max(1-e*e,0));w.push(new r.Cartesian3(i,s*e,s*-t)),w.push(new r.Cartesian3(i,s*e,s*t))}return w}const M=p*p,b=m*m,g=l*l,q=p*m,E=g+b,y=2*(f*l+q),v=2*h*l+f*f-b+M,D=2*(h*f-q),R=h*h-M;if(0===E&&0===y&&0===v&&0===D)return w;C=d.computeRealRoots(E,y,v,D,R);const O=C.length;if(0===O)return w;for(let o=0;o<O;++o){const e=C[o],t=e*e,n=Math.max(1-t,0),u=Math.sqrt(n);let c;c=a.CesiumMath.sign(l)===a.CesiumMath.sign(h)?S(l*t+h,f*e,a.CesiumMath.EPSILON12):a.CesiumMath.sign(h)===a.CesiumMath.sign(f*e)?S(l*t,f*e+h,a.CesiumMath.EPSILON12):S(l*t+f*e,h,a.CesiumMath.EPSILON12);const d=S(m*e,p,a.CesiumMath.EPSILON15),M=c*d;M<0?w.push(new r.Cartesian3(i,s*e,s*u)):M>0?w.push(new r.Cartesian3(i,s*e,s*-u)):0!==u?(w.push(new r.Cartesian3(i,s*e,s*-u)),w.push(new r.Cartesian3(i,s*e,s*u)),++o):w.push(new r.Cartesian3(i,s*e,s*u))}return w}m.rayEllipsoid=function(e,a){if(!t.defined(e))throw new n.DeveloperError("ray is required.");if(!t.defined(a))throw new n.DeveloperError("ellipsoid is required.");const o=a.oneOverRadii,s=r.Cartesian3.multiplyComponents(o,e.origin,D),u=r.Cartesian3.multiplyComponents(o,e.direction,R),c=r.Cartesian3.magnitudeSquared(s),d=r.Cartesian3.dot(s,u);let l,f,h,m,p;if(c>1){if(d>=0)return;const e=d*d;if(l=c-1,f=r.Cartesian3.magnitudeSquared(u),h=f*l,e<h)return;if(e>h){m=d*d-h,p=-d+Math.sqrt(m);const e=p/f,r=l/p;return e<r?new i.Interval(e,r):{start:r,stop:e}}const t=Math.sqrt(l/f);return new i.Interval(t,t)}return c<1?(l=c-1,f=r.Cartesian3.magnitudeSquared(u),h=f*l,m=d*d-h,p=-d+Math.sqrt(m),new i.Interval(0,p/f)):d<0?(f=r.Cartesian3.magnitudeSquared(u),new i.Interval(0,-d/f)):void 0};const x=new r.Cartesian3,P=new r.Cartesian3,N=new r.Cartesian3,L=new r.Cartesian3,I=new r.Cartesian3,z=new r.Matrix3,T=new r.Matrix3,U=new r.Matrix3,W=new r.Matrix3,B=new r.Matrix3,V=new r.Matrix3,Z=new r.Matrix3,A=new r.Cartesian3,k=new r.Cartesian3,j=new r.Cartographic;m.grazingAltitudeLocation=function(e,i){if(!t.defined(e))throw new n.DeveloperError("ray is required.");if(!t.defined(i))throw new n.DeveloperError("ellipsoid is required.");const o=e.origin,s=e.direction;if(!r.Cartesian3.equals(o,r.Cartesian3.ZERO)){const e=i.geodeticSurfaceNormal(o,x);if(r.Cartesian3.dot(s,e)>=0)return o}const u=t.defined(this.rayEllipsoid(e,i)),c=i.transformPositionToScaledSpace(s,x),d=r.Cartesian3.normalize(c,c),l=r.Cartesian3.mostOrthogonalAxis(c,L),f=r.Cartesian3.normalize(r.Cartesian3.cross(l,d,P),P),h=r.Cartesian3.normalize(r.Cartesian3.cross(d,f,N),N),m=z;m[0]=d.x,m[1]=d.y,m[2]=d.z,m[3]=f.x,m[4]=f.y,m[5]=f.z,m[6]=h.x,m[7]=h.y,m[8]=h.z;const p=r.Matrix3.transpose(m,T),C=r.Matrix3.fromScale(i.radii,U),w=r.Matrix3.fromScale(i.oneOverRadii,W),M=B;M[0]=0,M[1]=-s.z,M[2]=s.y,M[3]=s.z,M[4]=0,M[5]=-s.x,M[6]=-s.y,M[7]=s.x,M[8]=0;const b=r.Matrix3.multiply(r.Matrix3.multiply(p,w,V),M,V),g=r.Matrix3.multiply(r.Matrix3.multiply(b,C,Z),m,Z),q=r.Matrix3.multiplyByVector(b,o,I),E=O(g,r.Cartesian3.negate(q,x),0,0,1);let y,v;const D=E.length;if(D>0){let e=r.Cartesian3.clone(r.Cartesian3.ZERO,k),t=Number.NEGATIVE_INFINITY;for(let i=0;i<D;++i){y=r.Matrix3.multiplyByVector(C,r.Matrix3.multiplyByVector(m,E[i],A),A);const n=r.Cartesian3.normalize(r.Cartesian3.subtract(y,o,L),L),a=r.Cartesian3.dot(n,s);a>t&&(t=a,e=r.Cartesian3.clone(y,e))}const n=i.cartesianToCartographic(e,j);return t=a.CesiumMath.clamp(t,0,1),v=r.Cartesian3.magnitude(r.Cartesian3.subtract(e,o,L))*Math.sqrt(1-t*t),v=u?-v:v,n.height=v,i.cartographicToCartesian(n,new r.Cartesian3)}};const F=new r.Cartesian3;m.lineSegmentPlane=function(e,i,o,s){if(!t.defined(e))throw new n.DeveloperError("endPoint0 is required.");if(!t.defined(i))throw new n.DeveloperError("endPoint1 is required.");if(!t.defined(o))throw new n.DeveloperError("plane is required.");t.defined(s)||(s=new r.Cartesian3);const u=r.Cartesian3.subtract(i,e,F),c=o.normal,d=r.Cartesian3.dot(c,u);if(Math.abs(d)<a.CesiumMath.EPSILON6)return;const l=r.Cartesian3.dot(c,e),f=-(o.distance+l)/d;return f<0||f>1?void 0:(r.Cartesian3.multiplyByScalar(u,f,s),r.Cartesian3.add(e,s,s),s)},m.trianglePlaneIntersection=function(e,i,a,o){if(!t.defined(e)||!t.defined(i)||!t.defined(a)||!t.defined(o))throw new n.DeveloperError("p0, p1, p2, and plane are required.");const s=o.normal,u=o.distance,c=r.Cartesian3.dot(s,e)+u<0,d=r.Cartesian3.dot(s,i)+u<0,l=r.Cartesian3.dot(s,a)+u<0;let f,h,p=0;if(p+=c?1:0,p+=d?1:0,p+=l?1:0,1!==p&&2!==p||(f=new r.Cartesian3,h=new r.Cartesian3),1===p){if(c)return m.lineSegmentPlane(e,i,o,f),m.lineSegmentPlane(e,a,o,h),{positions:[e,i,a,f,h],indices:[0,3,4,1,2,4,1,4,3]};if(d)return m.lineSegmentPlane(i,a,o,f),m.lineSegmentPlane(i,e,o,h),{positions:[e,i,a,f,h],indices:[1,3,4,2,0,4,2,4,3]};if(l)return m.lineSegmentPlane(a,e,o,f),m.lineSegmentPlane(a,i,o,h),{positions:[e,i,a,f,h],indices:[2,3,4,0,1,4,0,4,3]}}else if(2===p){if(!c)return m.lineSegmentPlane(i,e,o,f),m.lineSegmentPlane(a,e,o,h),{positions:[e,i,a,f,h],indices:[1,2,4,1,4,3,0,3,4]};if(!d)return m.lineSegmentPlane(a,i,o,f),m.lineSegmentPlane(e,i,o,h),{positions:[e,i,a,f,h],indices:[2,0,4,2,4,3,1,3,4]};if(!l)return m.lineSegmentPlane(e,a,o,f),m.lineSegmentPlane(i,a,o,h),{positions:[e,i,a,f,h],indices:[0,1,4,0,4,3,2,3,4]}}},e.IntersectionTests=m,e.Ray=h}));