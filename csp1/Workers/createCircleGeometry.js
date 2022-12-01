define(["./Matrix2-fc7e9822","./RuntimeError-c581ca93","./defaultValue-94c3e563","./EllipseGeometry-f3165ab0","./VertexFormat-e46f29d6","./ComponentDatatype-4a60b8d6","./WebGLConstants-7dccdc96","./GeometryOffsetAttribute-3e8c299c","./Transforms-a076dbe6","./_commonjsHelpers-3aae1032-f55dc0c4","./combine-761d9c3f","./EllipseGeometryLibrary-4199bc89","./GeometryAttribute-2ecf73f6","./GeometryAttributes-7df9bef6","./GeometryInstance-97bd792f","./GeometryPipeline-b4816e69","./AttributeCompression-4d18cc04","./EncodedCartesian3-d3e254ea","./IndexDatatype-db156785","./IntersectionTests-5deed78b","./Plane-e20fba8c"],(function(e,t,i,r,o,n,s,l,a,d,c,m,u,p,y,_,G,h,x,f,g){"use strict";function b(e){e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT);const o=e.radius;t.Check.typeOf.number("radius",o);const n={center:e.center,semiMajorAxis:o,semiMinorAxis:o,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new r.EllipseGeometry(n),this._workerName="createCircleGeometry"}b.packedLength=r.EllipseGeometry.packedLength,b.pack=function(e,i,o){return t.Check.typeOf.object("value",e),r.EllipseGeometry.pack(e._ellipseGeometry,i,o)};const E=new r.EllipseGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),v={center:new e.Cartesian3,radius:void 0,ellipsoid:e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new o.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};function w(t,r){return i.defined(r)&&(t=b.unpack(t,r)),t._ellipseGeometry._center=e.Cartesian3.clone(t._ellipseGeometry._center),t._ellipseGeometry._ellipsoid=e.Ellipsoid.clone(t._ellipseGeometry._ellipsoid),b.createGeometry(t)}return b.unpack=function(t,n,s){const l=r.EllipseGeometry.unpack(t,n,E);return v.center=e.Cartesian3.clone(l._center,v.center),v.ellipsoid=e.Ellipsoid.clone(l._ellipsoid,v.ellipsoid),v.height=l._height,v.extrudedHeight=l._extrudedHeight,v.granularity=l._granularity,v.vertexFormat=o.VertexFormat.clone(l._vertexFormat,v.vertexFormat),v.stRotation=l._stRotation,v.shadowVolume=l._shadowVolume,i.defined(s)?(v.semiMajorAxis=l._semiMajorAxis,v.semiMinorAxis=l._semiMinorAxis,s._ellipseGeometry=new r.EllipseGeometry(v),s):(v.radius=l._semiMajorAxis,new b(v))},b.createGeometry=function(e){return r.EllipseGeometry.createGeometry(e._ellipseGeometry)},b.createShadowVolume=function(e,t,i){const r=e._ellipseGeometry._granularity,n=e._ellipseGeometry._ellipsoid,s=t(r,n),l=i(r,n);return new b({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:n,stRotation:e._ellipseGeometry._stRotation,granularity:r,extrudedHeight:s,height:l,vertexFormat:o.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(b.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),w}));