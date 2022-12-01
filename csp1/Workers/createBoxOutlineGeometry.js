define(["./GeometryOffsetAttribute-3e8c299c","./Transforms-a076dbe6","./Matrix2-fc7e9822","./RuntimeError-c581ca93","./ComponentDatatype-4a60b8d6","./defaultValue-94c3e563","./GeometryAttribute-2ecf73f6","./GeometryAttributes-7df9bef6","./_commonjsHelpers-3aae1032-f55dc0c4","./combine-761d9c3f","./WebGLConstants-7dccdc96"],(function(e,t,n,a,i,r,o,s,u,f,m){"use strict";const c=new n.Cartesian3;function d(t){t=r.defaultValue(t,r.defaultValue.EMPTY_OBJECT);const i=t.minimum,o=t.maximum;if(a.Check.typeOf.object("min",i),a.Check.typeOf.object("max",o),r.defined(t.offsetAttribute)&&t.offsetAttribute===e.GeometryOffsetAttribute.TOP)throw new a.DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._min=n.Cartesian3.clone(i),this._max=n.Cartesian3.clone(o),this._offsetAttribute=t.offsetAttribute,this._workerName="createBoxOutlineGeometry"}d.fromDimensions=function(e){e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT);const t=e.dimensions;a.Check.typeOf.object("dimensions",t),a.Check.typeOf.number.greaterThanOrEquals("dimensions.x",t.x,0),a.Check.typeOf.number.greaterThanOrEquals("dimensions.y",t.y,0),a.Check.typeOf.number.greaterThanOrEquals("dimensions.z",t.z,0);const i=n.Cartesian3.multiplyByScalar(t,.5,new n.Cartesian3);return new d({minimum:n.Cartesian3.negate(i,new n.Cartesian3),maximum:i,offsetAttribute:e.offsetAttribute})},d.fromAxisAlignedBoundingBox=function(e){return a.Check.typeOf.object("boundindBox",e),new d({minimum:e.minimum,maximum:e.maximum})},d.packedLength=2*n.Cartesian3.packedLength+1,d.pack=function(e,t,i){return a.Check.typeOf.object("value",e),a.Check.defined("array",t),i=r.defaultValue(i,0),n.Cartesian3.pack(e._min,t,i),n.Cartesian3.pack(e._max,t,i+n.Cartesian3.packedLength),t[i+2*n.Cartesian3.packedLength]=r.defaultValue(e._offsetAttribute,-1),t};const y=new n.Cartesian3,p=new n.Cartesian3,b={minimum:y,maximum:p,offsetAttribute:void 0};function C(e,t){return r.defined(t)&&(e=d.unpack(e,t)),d.createGeometry(e)}return d.unpack=function(e,t,i){a.Check.defined("array",e),t=r.defaultValue(t,0);const o=n.Cartesian3.unpack(e,t,y),s=n.Cartesian3.unpack(e,t+n.Cartesian3.packedLength,p),u=e[t+2*n.Cartesian3.packedLength];return r.defined(i)?(i._min=n.Cartesian3.clone(o,i._min),i._max=n.Cartesian3.clone(s,i._max),i._offsetAttribute=-1===u?void 0:u,i):(b.offsetAttribute=-1===u?void 0:u,new d(b))},d.createGeometry=function(a){const u=a._min,f=a._max;if(n.Cartesian3.equals(u,f))return;const m=new s.GeometryAttributes,d=new Uint16Array(24),y=new Float64Array(24);y[0]=u.x,y[1]=u.y,y[2]=u.z,y[3]=f.x,y[4]=u.y,y[5]=u.z,y[6]=f.x,y[7]=f.y,y[8]=u.z,y[9]=u.x,y[10]=f.y,y[11]=u.z,y[12]=u.x,y[13]=u.y,y[14]=f.z,y[15]=f.x,y[16]=u.y,y[17]=f.z,y[18]=f.x,y[19]=f.y,y[20]=f.z,y[21]=u.x,y[22]=f.y,y[23]=f.z,m.position=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:y}),d[0]=4,d[1]=5,d[2]=5,d[3]=6,d[4]=6,d[5]=7,d[6]=7,d[7]=4,d[8]=0,d[9]=1,d[10]=1,d[11]=2,d[12]=2,d[13]=3,d[14]=3,d[15]=0,d[16]=0,d[17]=4,d[18]=1,d[19]=5,d[20]=2,d[21]=6,d[22]=3,d[23]=7;const p=n.Cartesian3.subtract(f,u,c),b=.5*n.Cartesian3.magnitude(p);if(r.defined(a._offsetAttribute)){const t=y.length,n=new Uint8Array(t/3),r=a._offsetAttribute===e.GeometryOffsetAttribute.NONE?0:1;e.arrayFill(n,r),m.applyOffset=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:n})}return new o.Geometry({attributes:m,indices:d,primitiveType:o.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere(n.Cartesian3.ZERO,b),offsetAttribute:a._offsetAttribute})},C}));