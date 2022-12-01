define(["./Transforms-a076dbe6","./BoxGeometry-b7163cdb","./Matrix2-fc7e9822","./Color-ec9112c4","./CylinderGeometry-9e8f5a16","./defaultValue-94c3e563","./EllipsoidGeometry-00501f3d","./IndexDatatype-db156785","./createTaskProcessorWorker","./RuntimeError-c581ca93","./ComponentDatatype-4a60b8d6","./WebGLConstants-7dccdc96","./_commonjsHelpers-3aae1032-f55dc0c4","./combine-761d9c3f","./GeometryOffsetAttribute-3e8c299c","./GeometryAttribute-2ecf73f6","./GeometryAttributes-7df9bef6","./VertexFormat-e46f29d6","./CylinderGeometryLibrary-7b029c87"],(function(e,t,n,r,i,a,o,s,c,d,l,f,u,h,p,b,y,x,g){"use strict";function m(e){this.offset=e.offset,this.count=e.count,this.color=e.color,this.batchIds=e.batchIds}const C=new n.Cartesian3,I=n.Matrix4.packedLength+n.Cartesian3.packedLength,k=n.Matrix4.packedLength+2,M=n.Matrix4.packedLength+n.Cartesian3.packedLength,B=n.Cartesian3.packedLength+1,w={modelMatrix:new n.Matrix4,boundingVolume:new e.BoundingSphere};function A(e,t){let r=t*I;const i=n.Cartesian3.unpack(e,r,C);r+=n.Cartesian3.packedLength;const a=n.Matrix4.unpack(e,r,w.modelMatrix);n.Matrix4.multiplyByScale(a,i,a);const o=w.boundingVolume;return n.Cartesian3.clone(n.Cartesian3.ZERO,o.center),o.radius=Math.sqrt(3),w}function O(e,t){let r=t*k;const i=e[r++],a=e[r++],o=n.Cartesian3.fromElements(i,i,a,C),s=n.Matrix4.unpack(e,r,w.modelMatrix);n.Matrix4.multiplyByScale(s,o,s);const c=w.boundingVolume;return n.Cartesian3.clone(n.Cartesian3.ZERO,c.center),c.radius=Math.sqrt(2),w}function v(e,t){let r=t*M;const i=n.Cartesian3.unpack(e,r,C);r+=n.Cartesian3.packedLength;const a=n.Matrix4.unpack(e,r,w.modelMatrix);n.Matrix4.multiplyByScale(a,i,a);const o=w.boundingVolume;return n.Cartesian3.clone(n.Cartesian3.ZERO,o.center),o.radius=1,w}function L(e,t){let r=t*B;const i=e[r++],a=n.Cartesian3.unpack(e,r,C),o=n.Matrix4.fromTranslation(a,w.modelMatrix);n.Matrix4.multiplyByUniformScale(o,i,o);const s=w.boundingVolume;return n.Cartesian3.clone(n.Cartesian3.ZERO,s.center),s.radius=1,w}const E=new n.Cartesian3;function U(t,i,o,s,c){if(!a.defined(i))return;const d=o.length,l=s.attributes.position.values,f=s.indices,u=t.positions,h=t.vertexBatchIds,p=t.indices,b=t.batchIds,y=t.batchTableColors,x=t.batchedIndices,g=t.indexOffsets,C=t.indexCounts,I=t.boundingVolumes,k=t.modelMatrix,M=t.center;let B=t.positionOffset,w=t.batchIdIndex,A=t.indexOffset;const O=t.batchedIndicesOffset;for(let a=0;a<d;++a){const t=c(i,a),s=t.modelMatrix;n.Matrix4.multiply(k,s,s);const d=o[a],v=l.length;for(let e=0;e<v;e+=3){const t=n.Cartesian3.unpack(l,e,E);n.Matrix4.multiplyByPoint(s,t,t),n.Cartesian3.subtract(t,M,t),n.Cartesian3.pack(t,u,3*B+e),h[w++]=d}const L=f.length;for(let e=0;e<L;++e)p[A+e]=f[e]+B;const U=a+O;x[U]=new m({offset:A,count:L,color:r.Color.fromRgba(y[d]),batchIds:[d]}),b[U]=d,g[U]=A,C[U]=L,I[U]=e.BoundingSphere.transform(t.boundingVolume,s),B+=v/3,A+=L}t.positionOffset=B,t.batchIdIndex=w,t.indexOffset=A,t.batchedIndicesOffset+=d}const G=new n.Cartesian3,S=new n.Matrix4;function V(e){const t=new Float64Array(e);let r=0;n.Cartesian3.unpack(t,r,G),r+=n.Cartesian3.packedLength,n.Matrix4.unpack(t,r,S)}function T(e){const t=e.length;let n=0;for(let i=0;i<t;++i)n+=r.Color.packedLength+3+e[i].batchIds.length;return n}function F(t,n,i){const a=i.length,o=2+a*e.BoundingSphere.packedLength+1+T(n),s=new Float64Array(o);let c=0;s[c++]=t,s[c++]=a;for(let r=0;r<a;++r)e.BoundingSphere.pack(i[r],s,c),c+=e.BoundingSphere.packedLength;const d=n.length;s[c++]=d;for(let e=0;e<d;++e){const t=n[e];r.Color.pack(t.color,s,c),c+=r.Color.packedLength,s[c++]=t.offset,s[c++]=t.count;const i=t.batchIds,a=i.length;s[c++]=a;for(let e=0;e<a;++e)s[c++]=i[e]}return s}function R(e,n){const r=a.defined(e.boxes)?new Float32Array(e.boxes):void 0,c=a.defined(e.boxBatchIds)?new Uint16Array(e.boxBatchIds):void 0,d=a.defined(e.cylinders)?new Float32Array(e.cylinders):void 0,l=a.defined(e.cylinderBatchIds)?new Uint16Array(e.cylinderBatchIds):void 0,f=a.defined(e.ellipsoids)?new Float32Array(e.ellipsoids):void 0,u=a.defined(e.ellipsoidBatchIds)?new Uint16Array(e.ellipsoidBatchIds):void 0,h=a.defined(e.spheres)?new Float32Array(e.spheres):void 0,p=a.defined(e.sphereBatchIds)?new Uint16Array(e.sphereBatchIds):void 0,b=a.defined(r)?c.length:0,y=a.defined(d)?l.length:0,x=a.defined(f)?u.length:0,g=a.defined(h)?p.length:0,m=t.BoxGeometry.getUnitBox(),C=i.CylinderGeometry.getUnitCylinder(),I=o.EllipsoidGeometry.getUnitEllipsoid(),k=m.attributes.position.values,M=C.attributes.position.values,B=I.attributes.position.values;let w=k.length*b;w+=M.length*y,w+=B.length*(x+g);const E=m.indices,T=C.indices,R=I.indices;let Z=E.length*b;Z+=T.length*y,Z+=R.length*(x+g);const D=new Float32Array(w),P=new Uint16Array(w/3),_=s.IndexDatatype.createTypedArray(w/3,Z),q=b+y+x+g,W=new Uint16Array(q),j=new Array(q),H=new Uint32Array(q),N=new Uint32Array(q),Y=new Array(q);V(e.packedBuffer);const z={batchTableColors:new Uint32Array(e.batchTableColors),positions:D,vertexBatchIds:P,indices:_,batchIds:W,batchedIndices:j,indexOffsets:H,indexCounts:N,boundingVolumes:Y,positionOffset:0,batchIdIndex:0,indexOffset:0,batchedIndicesOffset:0,modelMatrix:S,center:G};U(z,r,c,m,A),U(z,d,l,C,O),U(z,f,u,I,v),U(z,h,p,I,L);const J=F(_.BYTES_PER_ELEMENT,j,Y);return n.push(D.buffer,P.buffer,_.buffer),n.push(W.buffer,H.buffer,N.buffer),n.push(J.buffer),{positions:D.buffer,vertexBatchIds:P.buffer,indices:_.buffer,indexOffsets:H.buffer,indexCounts:N.buffer,batchIds:W.buffer,packedBuffer:J.buffer}}var Z=c(R);return Z}));