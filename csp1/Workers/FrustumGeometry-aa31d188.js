define(["exports","./Transforms-a076dbe6","./Matrix2-fc7e9822","./RuntimeError-c581ca93","./ComponentDatatype-4a60b8d6","./defaultValue-94c3e563","./GeometryAttribute-2ecf73f6","./GeometryAttributes-7df9bef6","./Plane-e20fba8c","./VertexFormat-e46f29d6"],(function(e,t,r,i,n,a,o,s,f,u){"use strict";function d(e){this.planes=a.defaultValue(e,[])}const l=[new r.Cartesian3,new r.Cartesian3,new r.Cartesian3];r.Cartesian3.clone(r.Cartesian3.UNIT_X,l[0]),r.Cartesian3.clone(r.Cartesian3.UNIT_Y,l[1]),r.Cartesian3.clone(r.Cartesian3.UNIT_Z,l[2]);const h=new r.Cartesian3,p=new r.Cartesian3,c=new f.Plane(new r.Cartesian3(1,0,0),0);function m(e){e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT),this.left=e.left,this._left=void 0,this.right=e.right,this._right=void 0,this.top=e.top,this._top=void 0,this.bottom=e.bottom,this._bottom=void 0,this.near=a.defaultValue(e.near,1),this._near=this.near,this.far=a.defaultValue(e.far,5e8),this._far=this.far,this._cullingVolume=new d,this._orthographicMatrix=new r.Matrix4}function C(e){if(!a.defined(e.right)||!a.defined(e.left)||!a.defined(e.top)||!a.defined(e.bottom)||!a.defined(e.near)||!a.defined(e.far))throw new i.DeveloperError("right, left, top, bottom, near, or far parameters are not set.");if(e.top!==e._top||e.bottom!==e._bottom||e.left!==e._left||e.right!==e._right||e.near!==e._near||e.far!==e._far){if(e.left>e.right)throw new i.DeveloperError("right must be greater than left.");if(e.bottom>e.top)throw new i.DeveloperError("top must be greater than bottom.");if(e.near<=0||e.near>e.far)throw new i.DeveloperError("near must be greater than zero and less than far.");e._left=e.left,e._right=e.right,e._top=e.top,e._bottom=e.bottom,e._near=e.near,e._far=e.far,e._orthographicMatrix=r.Matrix4.computeOrthographicOffCenter(e.left,e.right,e.bottom,e.top,e.near,e.far,e._orthographicMatrix)}}d.fromBoundingSphere=function(e,t){if(!a.defined(e))throw new i.DeveloperError("boundingSphere is required.");a.defined(t)||(t=new d);const n=l.length,o=t.planes;o.length=2*n;const s=e.center,f=e.radius;let u=0;for(let i=0;i<n;++i){const e=l[i];let t=o[u],n=o[u+1];a.defined(t)||(t=o[u]=new r.Cartesian4),a.defined(n)||(n=o[u+1]=new r.Cartesian4),r.Cartesian3.multiplyByScalar(e,-f,h),r.Cartesian3.add(s,h,h),t.x=e.x,t.y=e.y,t.z=e.z,t.w=-r.Cartesian3.dot(e,h),r.Cartesian3.multiplyByScalar(e,f,h),r.Cartesian3.add(s,h,h),n.x=-e.x,n.y=-e.y,n.z=-e.z,n.w=-r.Cartesian3.dot(r.Cartesian3.negate(e,p),h),u+=2}return t},d.prototype.computeVisibility=function(e){if(!a.defined(e))throw new i.DeveloperError("boundingVolume is required.");const r=this.planes;let n=!1;for(let i=0,a=r.length;i<a;++i){const a=e.intersectPlane(f.Plane.fromCartesian4(r[i],c));if(a===t.Intersect.OUTSIDE)return t.Intersect.OUTSIDE;a===t.Intersect.INTERSECTING&&(n=!0)}return n?t.Intersect.INTERSECTING:t.Intersect.INSIDE},d.prototype.computeVisibilityWithPlaneMask=function(e,r){if(!a.defined(e))throw new i.DeveloperError("boundingVolume is required.");if(!a.defined(r))throw new i.DeveloperError("parentPlaneMask is required.");if(r===d.MASK_OUTSIDE||r===d.MASK_INSIDE)return r;let n=d.MASK_INSIDE;const o=this.planes;for(let i=0,a=o.length;i<a;++i){const a=i<31?1<<i:0;if(i<31&&0===(r&a))continue;const s=e.intersectPlane(f.Plane.fromCartesian4(o[i],c));if(s===t.Intersect.OUTSIDE)return d.MASK_OUTSIDE;s===t.Intersect.INTERSECTING&&(n|=a)}return n},d.MASK_OUTSIDE=4294967295,d.MASK_INSIDE=0,d.MASK_INDETERMINATE=2147483647,Object.defineProperties(m.prototype,{projectionMatrix:{get:function(){return C(this),this._orthographicMatrix}}});const w=new r.Cartesian3,_=new r.Cartesian3,y=new r.Cartesian3,g=new r.Cartesian3;function v(e){e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT),this._offCenterFrustum=new m,this.width=e.width,this._width=void 0,this.aspectRatio=e.aspectRatio,this._aspectRatio=void 0,this.near=a.defaultValue(e.near,1),this._near=this.near,this.far=a.defaultValue(e.far,5e8),this._far=this.far}function x(e){if(!a.defined(e.width)||!a.defined(e.aspectRatio)||!a.defined(e.near)||!a.defined(e.far))throw new i.DeveloperError("width, aspectRatio, near, or far parameters are not set.");const t=e._offCenterFrustum;if(e.width!==e._width||e.aspectRatio!==e._aspectRatio||e.near!==e._near||e.far!==e._far){if(e.aspectRatio<0)throw new i.DeveloperError("aspectRatio must be positive.");if(e.near<0||e.near>e.far)throw new i.DeveloperError("near must be greater than zero and less than far.");e._aspectRatio=e.aspectRatio,e._width=e.width,e._near=e.near,e._far=e.far;const r=1/e.aspectRatio;t.right=.5*e.width,t.left=-t.right,t.top=r*t.right,t.bottom=-t.top,t.near=e.near,t.far=e.far}}function b(e){e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT),this.left=e.left,this._left=void 0,this.right=e.right,this._right=void 0,this.top=e.top,this._top=void 0,this.bottom=e.bottom,this._bottom=void 0,this.near=a.defaultValue(e.near,1),this._near=this.near,this.far=a.defaultValue(e.far,5e8),this._far=this.far,this._cullingVolume=new d,this._perspectiveMatrix=new r.Matrix4,this._infinitePerspective=new r.Matrix4}function E(e){if(!a.defined(e.right)||!a.defined(e.left)||!a.defined(e.top)||!a.defined(e.bottom)||!a.defined(e.near)||!a.defined(e.far))throw new i.DeveloperError("right, left, top, bottom, near, or far parameters are not set.");const t=e.top,n=e.bottom,o=e.right,s=e.left,f=e.near,u=e.far;if(t!==e._top||n!==e._bottom||s!==e._left||o!==e._right||f!==e._near||u!==e._far){if(e.near<=0||e.near>e.far)throw new i.DeveloperError("near must be greater than zero and less than far.");e._left=s,e._right=o,e._top=t,e._bottom=n,e._near=f,e._far=u,e._perspectiveMatrix=r.Matrix4.computePerspectiveOffCenter(s,o,n,t,f,u,e._perspectiveMatrix),e._infinitePerspective=r.Matrix4.computeInfinitePerspectiveOffCenter(s,o,n,t,f,e._infinitePerspective)}}m.prototype.computeCullingVolume=function(e,t,n){if(!a.defined(e))throw new i.DeveloperError("position is required.");if(!a.defined(t))throw new i.DeveloperError("direction is required.");if(!a.defined(n))throw new i.DeveloperError("up is required.");const o=this._cullingVolume.planes,s=this.top,f=this.bottom,u=this.right,d=this.left,l=this.near,h=this.far,p=r.Cartesian3.cross(t,n,w);r.Cartesian3.normalize(p,p);const c=_;r.Cartesian3.multiplyByScalar(t,l,c),r.Cartesian3.add(e,c,c);const m=y;r.Cartesian3.multiplyByScalar(p,d,m),r.Cartesian3.add(c,m,m);let C=o[0];return a.defined(C)||(C=o[0]=new r.Cartesian4),C.x=p.x,C.y=p.y,C.z=p.z,C.w=-r.Cartesian3.dot(p,m),r.Cartesian3.multiplyByScalar(p,u,m),r.Cartesian3.add(c,m,m),C=o[1],a.defined(C)||(C=o[1]=new r.Cartesian4),C.x=-p.x,C.y=-p.y,C.z=-p.z,C.w=-r.Cartesian3.dot(r.Cartesian3.negate(p,g),m),r.Cartesian3.multiplyByScalar(n,f,m),r.Cartesian3.add(c,m,m),C=o[2],a.defined(C)||(C=o[2]=new r.Cartesian4),C.x=n.x,C.y=n.y,C.z=n.z,C.w=-r.Cartesian3.dot(n,m),r.Cartesian3.multiplyByScalar(n,s,m),r.Cartesian3.add(c,m,m),C=o[3],a.defined(C)||(C=o[3]=new r.Cartesian4),C.x=-n.x,C.y=-n.y,C.z=-n.z,C.w=-r.Cartesian3.dot(r.Cartesian3.negate(n,g),m),C=o[4],a.defined(C)||(C=o[4]=new r.Cartesian4),C.x=t.x,C.y=t.y,C.z=t.z,C.w=-r.Cartesian3.dot(t,c),r.Cartesian3.multiplyByScalar(t,h,m),r.Cartesian3.add(e,m,m),C=o[5],a.defined(C)||(C=o[5]=new r.Cartesian4),C.x=-t.x,C.y=-t.y,C.z=-t.z,C.w=-r.Cartesian3.dot(r.Cartesian3.negate(t,g),m),this._cullingVolume},m.prototype.getPixelDimensions=function(e,t,r,n,o){if(C(this),!a.defined(e)||!a.defined(t))throw new i.DeveloperError("Both drawingBufferWidth and drawingBufferHeight are required.");if(e<=0)throw new i.DeveloperError("drawingBufferWidth must be greater than zero.");if(t<=0)throw new i.DeveloperError("drawingBufferHeight must be greater than zero.");if(!a.defined(r))throw new i.DeveloperError("distance is required.");if(!a.defined(n))throw new i.DeveloperError("pixelRatio is required.");if(n<=0)throw new i.DeveloperError("pixelRatio must be greater than zero.");if(!a.defined(o))throw new i.DeveloperError("A result object is required.");const s=this.right-this.left,f=this.top-this.bottom,u=n*s/e,d=n*f/t;return o.x=u,o.y=d,o},m.prototype.clone=function(e){return a.defined(e)||(e=new m),e.left=this.left,e.right=this.right,e.top=this.top,e.bottom=this.bottom,e.near=this.near,e.far=this.far,e._left=void 0,e._right=void 0,e._top=void 0,e._bottom=void 0,e._near=void 0,e._far=void 0,e},m.prototype.equals=function(e){return a.defined(e)&&e instanceof m&&this.right===e.right&&this.left===e.left&&this.top===e.top&&this.bottom===e.bottom&&this.near===e.near&&this.far===e.far},m.prototype.equalsEpsilon=function(e,t,r){return e===this||a.defined(e)&&e instanceof m&&n.CesiumMath.equalsEpsilon(this.right,e.right,t,r)&&n.CesiumMath.equalsEpsilon(this.left,e.left,t,r)&&n.CesiumMath.equalsEpsilon(this.top,e.top,t,r)&&n.CesiumMath.equalsEpsilon(this.bottom,e.bottom,t,r)&&n.CesiumMath.equalsEpsilon(this.near,e.near,t,r)&&n.CesiumMath.equalsEpsilon(this.far,e.far,t,r)},v.packedLength=4,v.pack=function(e,t,r){return i.Check.typeOf.object("value",e),i.Check.defined("array",t),r=a.defaultValue(r,0),t[r++]=e.width,t[r++]=e.aspectRatio,t[r++]=e.near,t[r]=e.far,t},v.unpack=function(e,t,r){return i.Check.defined("array",e),t=a.defaultValue(t,0),a.defined(r)||(r=new v),r.width=e[t++],r.aspectRatio=e[t++],r.near=e[t++],r.far=e[t],r},Object.defineProperties(v.prototype,{projectionMatrix:{get:function(){return x(this),this._offCenterFrustum.projectionMatrix}}}),v.prototype.computeCullingVolume=function(e,t,r){return x(this),this._offCenterFrustum.computeCullingVolume(e,t,r)},v.prototype.getPixelDimensions=function(e,t,r,i,n){return x(this),this._offCenterFrustum.getPixelDimensions(e,t,r,i,n)},v.prototype.clone=function(e){return a.defined(e)||(e=new v),e.aspectRatio=this.aspectRatio,e.width=this.width,e.near=this.near,e.far=this.far,e._aspectRatio=void 0,e._width=void 0,e._near=void 0,e._far=void 0,this._offCenterFrustum.clone(e._offCenterFrustum),e},v.prototype.equals=function(e){return!!(a.defined(e)&&e instanceof v)&&(x(this),x(e),this.width===e.width&&this.aspectRatio===e.aspectRatio&&this._offCenterFrustum.equals(e._offCenterFrustum))},v.prototype.equalsEpsilon=function(e,t,r){return!!(a.defined(e)&&e instanceof v)&&(x(this),x(e),n.CesiumMath.equalsEpsilon(this.width,e.width,t,r)&&n.CesiumMath.equalsEpsilon(this.aspectRatio,e.aspectRatio,t,r)&&this._offCenterFrustum.equalsEpsilon(e._offCenterFrustum,t,r))},Object.defineProperties(b.prototype,{projectionMatrix:{get:function(){return E(this),this._perspectiveMatrix}},infiniteProjectionMatrix:{get:function(){return E(this),this._infinitePerspective}}});const M=new r.Cartesian3,D=new r.Cartesian3,V=new r.Cartesian3,F=new r.Cartesian3;function O(e){e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT),this._offCenterFrustum=new b,this.fov=e.fov,this._fov=void 0,this._fovy=void 0,this._sseDenominator=void 0,this.aspectRatio=e.aspectRatio,this._aspectRatio=void 0,this.near=a.defaultValue(e.near,1),this._near=this.near,this.far=a.defaultValue(e.far,5e8),this._far=this.far,this.xOffset=a.defaultValue(e.xOffset,0),this._xOffset=this.xOffset,this.yOffset=a.defaultValue(e.yOffset,0),this._yOffset=this.yOffset}function z(e){if(!a.defined(e.fov)||!a.defined(e.aspectRatio)||!a.defined(e.near)||!a.defined(e.far))throw new i.DeveloperError("fov, aspectRatio, near, or far parameters are not set.");const t=e._offCenterFrustum;if(e.fov!==e._fov||e.aspectRatio!==e._aspectRatio||e.near!==e._near||e.far!==e._far||e.xOffset!==e._xOffset||e.yOffset!==e._yOffset){if(e.fov<0||e.fov>=Math.PI)throw new i.DeveloperError("fov must be in the range [0, PI).");if(e.aspectRatio<0)throw new i.DeveloperError("aspectRatio must be positive.");if(e.near<0||e.near>e.far)throw new i.DeveloperError("near must be greater than zero and less than far.");e._aspectRatio=e.aspectRatio,e._fov=e.fov,e._fovy=e.aspectRatio<=1?e.fov:2*Math.atan(Math.tan(.5*e.fov)/e.aspectRatio),e._near=e.near,e._far=e.far,e._sseDenominator=2*Math.tan(.5*e._fovy),e._xOffset=e.xOffset,e._yOffset=e.yOffset,t.top=e.near*Math.tan(.5*e._fovy),t.bottom=-t.top,t.right=e.aspectRatio*t.top,t.left=-t.right,t.near=e.near,t.far=e.far,t.right+=e.xOffset,t.left+=e.xOffset,t.top+=e.yOffset,t.bottom+=e.yOffset}}b.prototype.computeCullingVolume=function(e,t,n){if(!a.defined(e))throw new i.DeveloperError("position is required.");if(!a.defined(t))throw new i.DeveloperError("direction is required.");if(!a.defined(n))throw new i.DeveloperError("up is required.");const o=this._cullingVolume.planes,s=this.top,f=this.bottom,u=this.right,d=this.left,l=this.near,h=this.far,p=r.Cartesian3.cross(t,n,M),c=D;r.Cartesian3.multiplyByScalar(t,l,c),r.Cartesian3.add(e,c,c);const m=V;r.Cartesian3.multiplyByScalar(t,h,m),r.Cartesian3.add(e,m,m);const C=F;r.Cartesian3.multiplyByScalar(p,d,C),r.Cartesian3.add(c,C,C),r.Cartesian3.subtract(C,e,C),r.Cartesian3.normalize(C,C),r.Cartesian3.cross(C,n,C),r.Cartesian3.normalize(C,C);let w=o[0];return a.defined(w)||(w=o[0]=new r.Cartesian4),w.x=C.x,w.y=C.y,w.z=C.z,w.w=-r.Cartesian3.dot(C,e),r.Cartesian3.multiplyByScalar(p,u,C),r.Cartesian3.add(c,C,C),r.Cartesian3.subtract(C,e,C),r.Cartesian3.cross(n,C,C),r.Cartesian3.normalize(C,C),w=o[1],a.defined(w)||(w=o[1]=new r.Cartesian4),w.x=C.x,w.y=C.y,w.z=C.z,w.w=-r.Cartesian3.dot(C,e),r.Cartesian3.multiplyByScalar(n,f,C),r.Cartesian3.add(c,C,C),r.Cartesian3.subtract(C,e,C),r.Cartesian3.cross(p,C,C),r.Cartesian3.normalize(C,C),w=o[2],a.defined(w)||(w=o[2]=new r.Cartesian4),w.x=C.x,w.y=C.y,w.z=C.z,w.w=-r.Cartesian3.dot(C,e),r.Cartesian3.multiplyByScalar(n,s,C),r.Cartesian3.add(c,C,C),r.Cartesian3.subtract(C,e,C),r.Cartesian3.cross(C,p,C),r.Cartesian3.normalize(C,C),w=o[3],a.defined(w)||(w=o[3]=new r.Cartesian4),w.x=C.x,w.y=C.y,w.z=C.z,w.w=-r.Cartesian3.dot(C,e),w=o[4],a.defined(w)||(w=o[4]=new r.Cartesian4),w.x=t.x,w.y=t.y,w.z=t.z,w.w=-r.Cartesian3.dot(t,c),r.Cartesian3.negate(t,C),w=o[5],a.defined(w)||(w=o[5]=new r.Cartesian4),w.x=C.x,w.y=C.y,w.z=C.z,w.w=-r.Cartesian3.dot(C,m),this._cullingVolume},b.prototype.getPixelDimensions=function(e,t,r,n,o){if(E(this),!a.defined(e)||!a.defined(t))throw new i.DeveloperError("Both drawingBufferWidth and drawingBufferHeight are required.");if(e<=0)throw new i.DeveloperError("drawingBufferWidth must be greater than zero.");if(t<=0)throw new i.DeveloperError("drawingBufferHeight must be greater than zero.");if(!a.defined(r))throw new i.DeveloperError("distance is required.");if(!a.defined(n))throw new i.DeveloperError("pixelRatio is required");if(n<=0)throw new i.DeveloperError("pixelRatio must be greater than zero.");if(!a.defined(o))throw new i.DeveloperError("A result object is required.");const s=1/this.near;let f=this.top*s;const u=2*n*r*f/t;f=this.right*s;const d=2*n*r*f/e;return o.x=d,o.y=u,o},b.prototype.clone=function(e){return a.defined(e)||(e=new b),e.right=this.right,e.left=this.left,e.top=this.top,e.bottom=this.bottom,e.near=this.near,e.far=this.far,e._left=void 0,e._right=void 0,e._top=void 0,e._bottom=void 0,e._near=void 0,e._far=void 0,e},b.prototype.equals=function(e){return a.defined(e)&&e instanceof b&&this.right===e.right&&this.left===e.left&&this.top===e.top&&this.bottom===e.bottom&&this.near===e.near&&this.far===e.far},b.prototype.equalsEpsilon=function(e,t,r){return e===this||a.defined(e)&&e instanceof b&&n.CesiumMath.equalsEpsilon(this.right,e.right,t,r)&&n.CesiumMath.equalsEpsilon(this.left,e.left,t,r)&&n.CesiumMath.equalsEpsilon(this.top,e.top,t,r)&&n.CesiumMath.equalsEpsilon(this.bottom,e.bottom,t,r)&&n.CesiumMath.equalsEpsilon(this.near,e.near,t,r)&&n.CesiumMath.equalsEpsilon(this.far,e.far,t,r)},O.packedLength=6,O.pack=function(e,t,r){return i.Check.typeOf.object("value",e),i.Check.defined("array",t),r=a.defaultValue(r,0),t[r++]=e.fov,t[r++]=e.aspectRatio,t[r++]=e.near,t[r++]=e.far,t[r++]=e.xOffset,t[r]=e.yOffset,t},O.unpack=function(e,t,r){return i.Check.defined("array",e),t=a.defaultValue(t,0),a.defined(r)||(r=new O),r.fov=e[t++],r.aspectRatio=e[t++],r.near=e[t++],r.far=e[t++],r.xOffset=e[t++],r.yOffset=e[t],r},Object.defineProperties(O.prototype,{projectionMatrix:{get:function(){return z(this),this._offCenterFrustum.projectionMatrix}},infiniteProjectionMatrix:{get:function(){return z(this),this._offCenterFrustum.infiniteProjectionMatrix}},fovy:{get:function(){return z(this),this._fovy}},sseDenominator:{get:function(){return z(this),this._sseDenominator}}}),O.prototype.computeCullingVolume=function(e,t,r){return z(this),this._offCenterFrustum.computeCullingVolume(e,t,r)},O.prototype.getPixelDimensions=function(e,t,r,i,n){return z(this),this._offCenterFrustum.getPixelDimensions(e,t,r,i,n)},O.prototype.clone=function(e){return a.defined(e)||(e=new O),e.aspectRatio=this.aspectRatio,e.fov=this.fov,e.near=this.near,e.far=this.far,e._aspectRatio=void 0,e._fov=void 0,e._near=void 0,e._far=void 0,this._offCenterFrustum.clone(e._offCenterFrustum),e},O.prototype.equals=function(e){return!!(a.defined(e)&&e instanceof O)&&(z(this),z(e),this.fov===e.fov&&this.aspectRatio===e.aspectRatio&&this._offCenterFrustum.equals(e._offCenterFrustum))},O.prototype.equalsEpsilon=function(e,t,r){return!!(a.defined(e)&&e instanceof O)&&(z(this),z(e),n.CesiumMath.equalsEpsilon(this.fov,e.fov,t,r)&&n.CesiumMath.equalsEpsilon(this.aspectRatio,e.aspectRatio,t,r)&&this._offCenterFrustum.equalsEpsilon(e._offCenterFrustum,t,r))};const R=0,k=1;function P(e){i.Check.typeOf.object("options",e),i.Check.typeOf.object("options.frustum",e.frustum),i.Check.typeOf.object("options.origin",e.origin),i.Check.typeOf.object("options.orientation",e.orientation);const n=e.frustum,o=e.orientation,s=e.origin,f=a.defaultValue(e.vertexFormat,u.VertexFormat.DEFAULT),d=a.defaultValue(e._drawNearPlane,!0);let l,h;n instanceof O?(l=R,h=O.packedLength):n instanceof v&&(l=k,h=v.packedLength),this._frustumType=l,this._frustum=n.clone(),this._origin=r.Cartesian3.clone(s),this._orientation=t.Quaternion.clone(o),this._drawNearPlane=d,this._vertexFormat=f,this._workerName="createFrustumGeometry",this.packedLength=2+h+r.Cartesian3.packedLength+t.Quaternion.packedLength+u.VertexFormat.packedLength}P.pack=function(e,n,o){i.Check.typeOf.object("value",e),i.Check.defined("array",n),o=a.defaultValue(o,0);const s=e._frustumType,f=e._frustum;return n[o++]=s,s===R?(O.pack(f,n,o),o+=O.packedLength):(v.pack(f,n,o),o+=v.packedLength),r.Cartesian3.pack(e._origin,n,o),o+=r.Cartesian3.packedLength,t.Quaternion.pack(e._orientation,n,o),o+=t.Quaternion.packedLength,u.VertexFormat.pack(e._vertexFormat,n,o),o+=u.VertexFormat.packedLength,n[o]=e._drawNearPlane?1:0,n};const q=new O,S=new v,T=new t.Quaternion,A=new r.Cartesian3,I=new u.VertexFormat;function B(e,t,r,i,n,o,s,f){const u=e/3*2;for(let d=0;d<4;++d)a.defined(t)&&(t[e]=o.x,t[e+1]=o.y,t[e+2]=o.z),a.defined(r)&&(r[e]=s.x,r[e+1]=s.y,r[e+2]=s.z),a.defined(i)&&(i[e]=f.x,i[e+1]=f.y,i[e+2]=f.z),e+=3;n[u]=0,n[u+1]=0,n[u+2]=1,n[u+3]=0,n[u+4]=1,n[u+5]=1,n[u+6]=0,n[u+7]=1}P.unpack=function(e,n,o){i.Check.defined("array",e),n=a.defaultValue(n,0);const s=e[n++];let f;s===R?(f=O.unpack(e,n,q),n+=O.packedLength):(f=v.unpack(e,n,S),n+=v.packedLength);const d=r.Cartesian3.unpack(e,n,A);n+=r.Cartesian3.packedLength;const l=t.Quaternion.unpack(e,n,T);n+=t.Quaternion.packedLength;const h=u.VertexFormat.unpack(e,n,I);n+=u.VertexFormat.packedLength;const p=1===e[n];if(!a.defined(o))return new P({frustum:f,origin:d,orientation:l,vertexFormat:h,_drawNearPlane:p});const c=s===o._frustumType?o._frustum:void 0;return o._frustum=f.clone(c),o._frustumType=s,o._origin=r.Cartesian3.clone(d,o._origin),o._orientation=t.Quaternion.clone(l,o._orientation),o._vertexFormat=u.VertexFormat.clone(h,o._vertexFormat),o._drawNearPlane=p,o};const L=new r.Matrix3,N=new r.Matrix4,j=new r.Matrix4,G=new r.Cartesian3,U=new r.Cartesian3,Q=new r.Cartesian3,K=new r.Cartesian3,W=new r.Cartesian3,Y=new r.Cartesian3,H=new Array(3),J=new Array(4);J[0]=new r.Cartesian4(-1,-1,1,1),J[1]=new r.Cartesian4(1,-1,1,1),J[2]=new r.Cartesian4(1,1,1,1),J[3]=new r.Cartesian4(-1,1,1,1);const X=new Array(4);for(let Z=0;Z<4;++Z)X[Z]=new r.Cartesian4;P._computeNearFarPlanes=function(e,t,i,n,o,s,f,u){const d=r.Matrix3.fromQuaternion(t,L);let l=a.defaultValue(s,G),h=a.defaultValue(f,U),p=a.defaultValue(u,Q);l=r.Matrix3.getColumn(d,0,l),h=r.Matrix3.getColumn(d,1,h),p=r.Matrix3.getColumn(d,2,p),r.Cartesian3.normalize(l,l),r.Cartesian3.normalize(h,h),r.Cartesian3.normalize(p,p),r.Cartesian3.negate(l,l);const c=r.Matrix4.computeView(e,p,h,l,N);let m,C;if(i===R){const e=n.projectionMatrix,t=r.Matrix4.multiply(e,c,j);C=r.Matrix4.inverse(t,j)}else m=r.Matrix4.inverseTransformation(c,j);a.defined(C)?(H[0]=n.near,H[1]=n.far):(H[0]=0,H[1]=n.near,H[2]=n.far);for(let w=0;w<2;++w)for(let t=0;t<4;++t){let i=r.Cartesian4.clone(J[t],X[t]);if(a.defined(C)){i=r.Matrix4.multiplyByVector(C,i,i);const t=1/i.w;r.Cartesian3.multiplyByScalar(i,t,i),r.Cartesian3.subtract(i,e,i),r.Cartesian3.normalize(i,i);const n=r.Cartesian3.dot(p,i);r.Cartesian3.multiplyByScalar(i,H[w]/n,i),r.Cartesian3.add(i,e,i)}else{a.defined(n._offCenterFrustum)&&(n=n._offCenterFrustum);const e=H[w],t=H[w+1];i.x=.5*(i.x*(n.right-n.left)+n.left+n.right),i.y=.5*(i.y*(n.top-n.bottom)+n.bottom+n.top),i.z=.5*(i.z*(e-t)-e-t),i.w=1,r.Matrix4.multiplyByVector(m,i,i)}o[12*w+3*t]=i.x,o[12*w+3*t+1]=i.y,o[12*w+3*t+2]=i.z}},P.createGeometry=function(e){const i=e._frustumType,f=e._frustum,u=e._origin,d=e._orientation,l=e._drawNearPlane,h=e._vertexFormat,p=l?6:5;let c=new Float64Array(72);P._computeNearFarPlanes(u,d,i,f,c);let m=24;c[m]=c[12],c[m+1]=c[13],c[m+2]=c[14],c[m+3]=c[0],c[m+4]=c[1],c[m+5]=c[2],c[m+6]=c[9],c[m+7]=c[10],c[m+8]=c[11],c[m+9]=c[21],c[m+10]=c[22],c[m+11]=c[23],m+=12,c[m]=c[15],c[m+1]=c[16],c[m+2]=c[17],c[m+3]=c[3],c[m+4]=c[4],c[m+5]=c[5],c[m+6]=c[0],c[m+7]=c[1],c[m+8]=c[2],c[m+9]=c[12],c[m+10]=c[13],c[m+11]=c[14],m+=12,c[m]=c[3],c[m+1]=c[4],c[m+2]=c[5],c[m+3]=c[15],c[m+4]=c[16],c[m+5]=c[17],c[m+6]=c[18],c[m+7]=c[19],c[m+8]=c[20],c[m+9]=c[6],c[m+10]=c[7],c[m+11]=c[8],m+=12,c[m]=c[6],c[m+1]=c[7],c[m+2]=c[8],c[m+3]=c[18],c[m+4]=c[19],c[m+5]=c[20],c[m+6]=c[21],c[m+7]=c[22],c[m+8]=c[23],c[m+9]=c[9],c[m+10]=c[10],c[m+11]=c[11],l||(c=c.subarray(12));const C=new s.GeometryAttributes({position:new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c})});if(a.defined(h.normal)||a.defined(h.tangent)||a.defined(h.bitangent)||a.defined(h.st)){const e=a.defined(h.normal)?new Float32Array(12*p):void 0,t=a.defined(h.tangent)?new Float32Array(12*p):void 0,i=a.defined(h.bitangent)?new Float32Array(12*p):void 0,s=a.defined(h.st)?new Float32Array(8*p):void 0,f=G,u=U,d=Q,c=r.Cartesian3.negate(f,K),w=r.Cartesian3.negate(u,W),_=r.Cartesian3.negate(d,Y);m=0,l&&(B(m,e,t,i,s,_,f,u),m+=12),B(m,e,t,i,s,d,c,u),m+=12,B(m,e,t,i,s,c,_,u),m+=12,B(m,e,t,i,s,w,_,c),m+=12,B(m,e,t,i,s,f,d,u),m+=12,B(m,e,t,i,s,u,d,c),a.defined(e)&&(C.normal=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})),a.defined(t)&&(C.tangent=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:t})),a.defined(i)&&(C.bitangent=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:i})),a.defined(s)&&(C.st=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:s}))}const w=new Uint16Array(6*p);for(let t=0;t<p;++t){const e=6*t,r=4*t;w[e]=r,w[e+1]=r+1,w[e+2]=r+2,w[e+3]=r,w[e+4]=r+2,w[e+5]=r+3}return new o.Geometry({attributes:C,indices:w,primitiveType:o.PrimitiveType.TRIANGLES,boundingSphere:t.BoundingSphere.fromVertices(c)})},e.FrustumGeometry=P,e.OrthographicFrustum=v,e.PerspectiveFrustum=O}));