define(["./arrayRemoveDuplicates-06991c15","./Transforms-a076dbe6","./Matrix2-fc7e9822","./RuntimeError-c581ca93","./ComponentDatatype-4a60b8d6","./CoplanarPolygonGeometryLibrary-effcf1e1","./defaultValue-94c3e563","./GeometryAttribute-2ecf73f6","./GeometryAttributes-7df9bef6","./GeometryInstance-97bd792f","./GeometryPipeline-b4816e69","./IndexDatatype-db156785","./PolygonGeometryLibrary-6d3a5ed4","./_commonjsHelpers-3aae1032-f55dc0c4","./combine-761d9c3f","./WebGLConstants-7dccdc96","./OrientedBoundingBox-417528c0","./EllipsoidTangentPlane-d2c0c530","./AxisAlignedBoundingBox-8103739f","./IntersectionTests-5deed78b","./Plane-e20fba8c","./AttributeCompression-4d18cc04","./EncodedCartesian3-d3e254ea","./ArcType-0cf52f8c","./EllipsoidRhumbLine-daebc75b","./PolygonPipeline-cc031b9f"],(function(e,t,n,o,r,i,a,c,s,y,l,p,d,u,f,m,g,b,h,P,G,C,k,L,H,T){"use strict";function E(e){const t=e.length,n=new Float64Array(3*t),o=p.IndexDatatype.createTypedArray(t,2*t);let i=0,a=0;for(let r=0;r<t;r++){const c=e[r];n[i++]=c.x,n[i++]=c.y,n[i++]=c.z,o[a++]=r,o[a++]=(r+1)%t}const y=new s.GeometryAttributes({position:new c.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n})});return new c.Geometry({attributes:y,indices:o,primitiveType:c.PrimitiveType.LINES})}function A(e){e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT);const t=e.polygonHierarchy;o.Check.defined("options.polygonHierarchy",t),this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=d.PolygonGeometryLibrary.computeHierarchyPackedLength(t,n.Cartesian3)+1}A.fromPositions=function(e){e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT),o.Check.defined("options.positions",e.positions);const t={polygonHierarchy:{positions:e.positions}};return new A(t)},A.pack=function(e,t,r){return o.Check.typeOf.object("value",e),o.Check.defined("array",t),r=a.defaultValue(r,0),r=d.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,r,n.Cartesian3),t[r]=e.packedLength,t};const _={polygonHierarchy:{}};function v(e,t){return a.defined(t)&&(e=A.unpack(e,t)),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),A.createGeometry(e)}return A.unpack=function(e,t,r){o.Check.defined("array",e),t=a.defaultValue(t,0);const i=d.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t,n.Cartesian3);t=i.startingIndex,delete i.startingIndex;const c=e[t];return a.defined(r)||(r=new A(_)),r._polygonHierarchy=i,r.packedLength=c,r},A.createGeometry=function(o){const r=o._polygonHierarchy;let a=r.positions;if(a=e.arrayRemoveDuplicates(a,n.Cartesian3.equalsEpsilon,!0),a.length<3)return;const s=i.CoplanarPolygonGeometryLibrary.validOutline(a);if(!s)return;const p=d.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(r,!1);if(0===p.length)return;const u=[];for(let e=0;e<p.length;e++){const t=new y.GeometryInstance({geometry:E(p[e])});u.push(t)}const f=l.GeometryPipeline.combineInstances(u)[0],m=t.BoundingSphere.fromPoints(r.positions);return new c.Geometry({attributes:f.attributes,indices:f.indices,primitiveType:f.primitiveType,boundingSphere:m})},v}));