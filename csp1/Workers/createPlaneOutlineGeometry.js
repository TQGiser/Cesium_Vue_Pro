define(["./defaultValue-94c3e563","./Transforms-a076dbe6","./Matrix2-fc7e9822","./RuntimeError-c581ca93","./ComponentDatatype-4a60b8d6","./GeometryAttribute-2ecf73f6","./GeometryAttributes-7df9bef6","./_commonjsHelpers-3aae1032-f55dc0c4","./combine-761d9c3f","./WebGLConstants-7dccdc96"],(function(e,t,n,r,a,i,o,c,u,d){"use strict";function s(){this._workerName="createPlaneOutlineGeometry"}s.packedLength=0,s.pack=function(e,t){return r.Check.defined("value",e),r.Check.defined("array",t),t},s.unpack=function(t,n,a){return r.Check.defined("array",t),e.defined(a)?a:new s};const f=new n.Cartesian3(-.5,-.5,0),y=new n.Cartesian3(.5,.5,0);function m(t,n){return e.defined(n)&&(t=s.unpack(t,n)),s.createGeometry(t)}return s.createGeometry=function(){const e=new o.GeometryAttributes,r=new Uint16Array(8),c=new Float64Array(12);return c[0]=f.x,c[1]=f.y,c[2]=f.z,c[3]=y.x,c[4]=f.y,c[5]=f.z,c[6]=y.x,c[7]=y.y,c[8]=f.z,c[9]=f.x,c[10]=y.y,c[11]=f.z,e.position=new i.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c}),r[0]=0,r[1]=1,r[2]=1,r[3]=2,r[4]=2,r[5]=3,r[6]=3,r[7]=0,new i.Geometry({attributes:e,indices:r,primitiveType:i.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere(n.Cartesian3.ZERO,Math.sqrt(2))})},m}));