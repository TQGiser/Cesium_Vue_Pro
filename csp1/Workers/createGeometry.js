define(["./defaultValue-94c3e563","./PrimitivePipeline-30e87c99","./createTaskProcessorWorker","./Transforms-a076dbe6","./Matrix2-fc7e9822","./RuntimeError-c581ca93","./ComponentDatatype-4a60b8d6","./WebGLConstants-7dccdc96","./_commonjsHelpers-3aae1032-f55dc0c4","./combine-761d9c3f","./GeometryAttribute-2ecf73f6","./GeometryAttributes-7df9bef6","./GeometryPipeline-b4816e69","./AttributeCompression-4d18cc04","./EncodedCartesian3-d3e254ea","./IndexDatatype-db156785","./IntersectionTests-5deed78b","./Plane-e20fba8c","./WebMercatorProjection-843df830"],(function(e,t,r,n,o,c,i,s,a,f,d,u,m,b,l,p,y,P,k){"use strict";const C={};function G(t){let r=C[t];return e.defined(r)||("object"===typeof exports?C[r]=r=require(`Workers/${t}`):require([`Workers/${t}`],(function(e){r=e,C[r]=e}))),r}function W(r,n){const o=r.subTasks,c=o.length,i=new Array(c);for(let t=0;t<c;t++){const r=o[t],n=r.geometry,c=r.moduleName;if(e.defined(c)){const e=G(c);i[t]=e(n,r.offset)}else i[t]=n}return Promise.all(i).then((function(e){return t.PrimitivePipeline.packCreateGeometryResults(e,n)}))}var A=r(W);return A}));