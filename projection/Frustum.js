function Frustum(aspectRatio)
{
    if (aspectRatio == undefined || aspectRatio <= 0)
	    aspectRatio = 1;
		
	var top = .36;
    var right = .36 * aspectRatio;
	var left = -1 * right;
    this.identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    this.transform = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    this.inverse = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    this.frontUpperLeft = [ left, .36, -.999999, 1 ];
    this.frontLowerLeft = [ left, -.36, -.999999, 1];
    this.frontUpperRight = [ right, .36, -.999999, 1 ];
    this.backUpperLeft = [ left, .36, -40, 1 ];
    this.backLowerLeft = [ left, -.36, -40, 1 ];
    this.backUpperRight = [ right, .36, -40, 1 ];
    this.totalRotationY = 0;
}

Frustum.prototype.matrixMult = function(L, R)
{
    var result = new Array();
    result[0] = L[0] * R[0] + L[4] * R[1] + L[8] * R[2] + L[12] * R[3];
    result[1] = L[1] * R[0] + L[5] * R[1] + L[9] * R[2] + L[13] * R[3];
    result[2] = L[2] * R[0] + L[6] * R[1] + L[10] * R[2] + L[14] * R[3];
    result[3] = L[3] * R[0] + L[7] * R[1] + L[11] * R[2] + L[15] * R[3];

    result[4] = L[0] * R[4] + L[4] * R[5] + L[8] * R[6] + L[12] * R[7];
    result[5] = L[1] * R[4] + L[5] * R[5] + L[9] * R[6] + L[13] * R[7];
    result[6] = L[2] * R[4] + L[6] * R[5] + L[10] * R[6] + L[14] * R[7];
    result[7] = L[3] * R[4] + L[7] * R[5] + L[11] * R[6] + L[15] * R[7];

    result[8] = L[0] * R[8] + L[4] * R[9] + L[8] * R[10] + L[12] * R[11];
    result[9] = L[1] * R[8] + L[5] * R[9] + L[9] * R[10] + L[13] * R[11];
    result[10] = L[2] * R[8] + L[6] * R[9] + L[10] * R[10] + L[14] * R[11];
    result[11] = L[3] * R[8] + L[7] * R[9] + L[11] * R[10] + L[15] * R[11];

    result[12] = L[0] * R[12] + L[4] * R[13] + L[8] * R[14] + L[12] * R[15];
    result[13] = L[1] * R[12] + L[5] * R[13] + L[9] * R[14] + L[13] * R[15];
    result[14] = L[2] * R[12] + L[6] * R[13] + L[10] * R[14] + L[14] * R[15];
    result[15] = L[3] * R[12] + L[7] * R[13] + L[11] * R[14] + L[15] * R[15];
    return result;
}

Frustum.prototype.copyValues = function(from, to, count) 
{
    for (var i = 0; i < count; ++i) {
        to[i] = from[i];
    } 
}

Frustum.prototype.getTranslationMatrix = function(tx, ty, tz) 
{
    var result = new Array();
    this.copyValues(this.identity, result, 16);
    result[12] = tx;
    result[13] = ty;
    result[14] = tz;
    return result;
}

Frustum.prototype.getRotationYMatrix = function(angle) 
{
    var result = new Array();
    this.copyValues(this.identity, result, 16);
    result[0] = Math.cos(angle);
    result[2] = Math.sin(angle);
    result[8] = -result[2];
    result[10] = result[0];
    return result;
}

Frustum.prototype.transformVector = function(M, v) 
{
    var result = new Array();
    result[0] = M[0] * v[0] + M[4] * v[1] + M[8] * v[2] + M[12] * v[3];
    result[1] = M[1] * v[0] + M[5] * v[1] + M[9] * v[2] + M[13] * v[3];
    result[2] = M[2] * v[0] + M[6] * v[1] + M[10] * v[2] + M[14] * v[3];
    result[3] = M[3] * v[0] + M[7] * v[1] + M[11] * v[2] + M[15] * v[3];
    return result;
}

Frustum.prototype.scalarByVec4 = function(s, v) {
    var r = new Array();
    r[0] = s * v[0];
    r[1] = s * v[1];
    r[2] = s * v[2];
    r[3] = v[3];
    return r;
}

Frustum.prototype.addVec4 = function(a, b) 
{
    var c = new Array();
    c[0] = a[0] + b[0];
    c[1] = a[1] + b[1];
    c[2] = a[2] + b[2];
    c[3] = a[3];
    return c;
}

// returns 4-tuple
Frustum.prototype.convertScreenToWorld = function(x, y, width, height) {
    var horizontalPoint; 
    var verticalPoint;
    var uValue = x / width;
    var vValue = y / height;

    var horizontalVector = this.scalarByVec4(uValue, this.addVec4(this.frontUpperRight, this.scalarByVec4(-1.0, this.frontUpperLeft)));

    var verticalVector = this.scalarByVec4(vValue, this.addVec4(this.frontLowerLeft, this.scalarByVec4(-1.0, this.frontUpperLeft)));

    var finalPoint;
    finalPoint = this.addVec4(this.frontUpperLeft, this.addVec4(horizontalVector, verticalVector));

    finalPoint = this.transformVector(this.transform, finalPoint);

    return finalPoint;
}

// returns 4-tuple
Frustum.prototype.convertScreenToBackPlane = function(x, y, width, height) {
    var horizontalPoint; 
    var verticalPoint;
    var uValue = x / width;
    var vValue = y / height;

    var horizontalVector = this.scalarByVec4(uValue, this.addVec4(this.backUpperRight, this.scalarByVec4(-1.0, this.backUpperLeft)));

    var verticalVector = this.scalarByVec4(vValue, this.addVec4(this.backLowerLeft, this.scalarByVec4(-1.0, this.backUpperLeft)));

    var finalPoint;
    finalPoint = this.addVec4(this.backUpperLeft, this.addVec4(horizontalVector, verticalVector));

    finalPoint = this.transformVector(this.transform, finalPoint);

    return finalPoint;
}

Frustum.prototype.distanceFromSegmentToPoint = function(a, b, p)
{
	var n = this.normalize(this.subtract(b, a));
	var aMinusP = this.subtract(a, p);
	var aMinusPDotNTimesN = this.scalarTimesVector(this.dot(aMinusP, n), n);
	return this.length(this.subtract(aMinusP, aMinusPDotNTimesN));
}

Frustum.prototype.subtract = function(a, b)
{
    var result = [];
	result.push(a[0] - b[0]);
	result.push(a[1] - b[1]);
	result.push(a[2] - b[2]);
	result.push(a[3] - b[3]);
	return result;
}

Frustum.prototype.normalize = function(a)
{
    var result = [];
	var length = this.length(a);
	result.push(a[0] / length);
	result.push(a[1] / length);
	result.push(a[2] / length);
	result.push(a[3] / length);
	return result;
}

Frustum.prototype.length = function(a)
{
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}

Frustum.prototype.scalarTimesVector = function(c, a)
{
    var result = [];
	result.push(c * a[0]);
	result.push(c * a[1]);
	result.push(c * a[2]);
	result.push(c * a[3]);
	return result;
}

Frustum.prototype.dot = function(a, b)
{
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

Frustum.prototype.multiplyBack = function(transform, inverse) 
{
    this.transform = this.matrixMult(transform, this.transform);
    this.inverse = this.matrixMult(this.inverse, inverse);
}

Frustum.prototype.multiplyFront = function(transform, inverse) 
{
    this.transform = this.matrixMult(this.transform, transform);
    this.inverse = this.matrixMult(inverse, this.inverse);
}

Frustum.prototype.rotateY = function(angle) 
{
    this.totalRotationY += angle;
    this.multiplyFront(this.getRotationYMatrix(-angle), this.getRotationYMatrix(angle));
}

Frustum.prototype.moveForward = function(distance) 
{
    var tx = distance * Math.sin(this.totalRotationY);
    var ty = 0;
    var tz = distance * Math.cos(this.totalRotationY);
    this.multiplyBack(this.getTranslationMatrix(tx, ty, tz), 
                      this.getTranslationMatrix(-1 * tx, 0, -1 * tz));
}

Frustum.prototype.moveRight = function(distance) {
        this.multiplyBack(this.getTranslationMatrix(-1 * distance * Math.cos(this.totalRotationY), 0, -1 * distance * Math.sin(-1 * this.totalRotationY)), this.getTranslationMatrix(distance * Math.cos(this.totalRotationY), 0, distance * Math.sin(-this.totalRotationY)));
}

Frustum.prototype.getProjectionMatrix = function()
{
    var nearVal = -1 * this.frontUpperLeft[2] - .01;
    var farVal = -1 * this.backUpperLeft[2];
    var right = this.frontUpperRight[0];
    var left = this.frontUpperLeft[0];
    var topp = this.frontUpperLeft[1];
    var bottom = this.frontLowerLeft[1];

    var matrix = new Array();
    matrix[0] = 2 * nearVal / (right - left);
    matrix[1] = 0;
    matrix[2] = 0;
    matrix[3] = 0;
    matrix[4] = 0;
    matrix[5] = 2 * nearVal / (topp - bottom);
    matrix[6] = 0;
    matrix[7] = 0;
    matrix[8] = (right + left) / (right - left);
    matrix[9] = (topp + bottom) / (topp - bottom);
    matrix[10] = -1 * (farVal + nearVal) / (farVal - nearVal);
    matrix[11] = -1;
    matrix[12] = 0;
    matrix[13] = 0;
    matrix[14] = - 2 * farVal * nearVal / (farVal - nearVal);
    matrix[15] = 0;
    return matrix;
}

Frustum.prototype.getOrthoMatrix = function()
{
    var nearVal = -1 * this.frontUpperLeft[2] - .01;
    var farVal = -1 * this.backUpperLeft[2];
    var right = this.frontUpperRight[0];
    var left = this.frontUpperLeft[0];
    var topp = this.frontUpperLeft[1];
    var bottom = this.frontLowerLeft[1];

    var matrix = new Array();
    matrix[0] = 2 / (right - left);
    matrix[1] = 0;
    matrix[2] = 0;
    matrix[3] = 0;
    matrix[4] = 0;
    matrix[5] = 2 / (topp - bottom);
    matrix[6] = 0;
    matrix[7] = 0;
    matrix[8] = 0;
    matrix[9] = 0;
    matrix[10] = -2 / (farVal - nearVal);
    matrix[11] = 0;
    matrix[12] = -1 * (right + left) / (right - left);
    matrix[13] = -1 * (topp + bottom) / (topp - bottom);
    matrix[14] = -1 * (farVal + nearVal) / (farVal - nearVal);
    matrix[15] = 1;
    return matrix;
}

