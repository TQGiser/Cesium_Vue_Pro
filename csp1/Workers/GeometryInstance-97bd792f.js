define(["exports","./defaultValue-94c3e563","./RuntimeError-c581ca93","./Matrix2-fc7e9822"],(function(e,t,i,r){"use strict";function o(e){if(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT),!t.defined(e.geometry))throw new i.DeveloperError("options.geometry is required.");this.geometry=e.geometry,this.modelMatrix=r.Matrix4.clone(t.defaultValue(e.modelMatrix,r.Matrix4.IDENTITY)),this.id=e.id,this.pickPrimitive=e.pickPrimitive,this.attributes=t.defaultValue(e.attributes,{}),this.westHemisphereGeometry=void 0,this.eastHemisphereGeometry=void 0}e.GeometryInstance=o}));