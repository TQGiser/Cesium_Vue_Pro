define(["exports","./AxisAlignedBoundingBox-8103739f","./Matrix2-fc7e9822","./RuntimeError-c581ca93","./defaultValue-94c3e563","./IntersectionTests-5deed78b","./Plane-e20fba8c","./Transforms-a076dbe6"],(function(e,t,n,i,o,r,s,a){"use strict";const c=new n.Cartesian4;function l(e,t){if(i.Check.defined("origin",e),t=o.defaultValue(t,n.Ellipsoid.WGS84),e=t.scaleToGeodeticSurface(e),!o.defined(e))throw new i.DeveloperError("origin must not be at the center of the ellipsoid.");const r=a.Transforms.eastNorthUpToFixedFrame(e,t);this._ellipsoid=t,this._origin=e,this._xAxis=n.Cartesian3.fromCartesian4(n.Matrix4.getColumn(r,0,c)),this._yAxis=n.Cartesian3.fromCartesian4(n.Matrix4.getColumn(r,1,c));const l=n.Cartesian3.fromCartesian4(n.Matrix4.getColumn(r,2,c));this._plane=s.Plane.fromPointNormal(e,l)}Object.defineProperties(l.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},origin:{get:function(){return this._origin}},plane:{get:function(){return this._plane}},xAxis:{get:function(){return this._xAxis}},yAxis:{get:function(){return this._yAxis}},zAxis:{get:function(){return this._plane.normal}}});const d=new t.AxisAlignedBoundingBox;l.fromPoints=function(e,n){i.Check.defined("cartesians",e);const o=t.AxisAlignedBoundingBox.fromPoints(e,d);return new l(o.center,n)};const f=new r.Ray,p=new n.Cartesian3;l.prototype.projectPointOntoPlane=function(e,t){i.Check.defined("cartesian",e);const s=f;s.origin=e,n.Cartesian3.normalize(e,s.direction);let a=r.IntersectionTests.rayPlane(s,this._plane,p);if(o.defined(a)||(n.Cartesian3.negate(s.direction,s.direction),a=r.IntersectionTests.rayPlane(s,this._plane,p)),o.defined(a)){const e=n.Cartesian3.subtract(a,this._origin,a),i=n.Cartesian3.dot(this._xAxis,e),r=n.Cartesian3.dot(this._yAxis,e);return o.defined(t)?(t.x=i,t.y=r,t):new n.Cartesian2(i,r)}},l.prototype.projectPointsOntoPlane=function(e,t){i.Check.defined("cartesians",e),o.defined(t)||(t=[]);let n=0;const r=e.length;for(let i=0;i<r;i++){const r=this.projectPointOntoPlane(e[i],t[n]);o.defined(r)&&(t[n]=r,n++)}return t.length=n,t},l.prototype.projectPointToNearestOnPlane=function(e,t){i.Check.defined("cartesian",e),o.defined(t)||(t=new n.Cartesian2);const s=f;s.origin=e,n.Cartesian3.clone(this._plane.normal,s.direction);let a=r.IntersectionTests.rayPlane(s,this._plane,p);o.defined(a)||(n.Cartesian3.negate(s.direction,s.direction),a=r.IntersectionTests.rayPlane(s,this._plane,p));const c=n.Cartesian3.subtract(a,this._origin,a),l=n.Cartesian3.dot(this._xAxis,c),d=n.Cartesian3.dot(this._yAxis,c);return t.x=l,t.y=d,t},l.prototype.projectPointsToNearestOnPlane=function(e,t){i.Check.defined("cartesians",e),o.defined(t)||(t=[]);const n=e.length;t.length=n;for(let i=0;i<n;i++)t[i]=this.projectPointToNearestOnPlane(e[i],t[i]);return t};const h=new n.Cartesian3;l.prototype.projectPointOntoEllipsoid=function(e,t){i.Check.defined("cartesian",e),o.defined(t)||(t=new n.Cartesian3);const r=this._ellipsoid,s=this._origin,a=this._xAxis,c=this._yAxis,l=h;return n.Cartesian3.multiplyByScalar(a,e.x,l),t=n.Cartesian3.add(s,l,t),n.Cartesian3.multiplyByScalar(c,e.y,l),n.Cartesian3.add(t,l,t),r.scaleToGeocentricSurface(t,t),t},l.prototype.projectPointsOntoEllipsoid=function(e,t){i.Check.defined("cartesians",e);const n=e.length;o.defined(t)?t.length=n:t=new Array(n);for(let i=0;i<n;++i)t[i]=this.projectPointOntoEllipsoid(e[i],t[i]);return t},e.EllipsoidTangentPlane=l}));