(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
  };

  // node_modules/lodash.get/index.js
  var require_lodash = __commonJS({
    "node_modules/lodash.get/index.js"(exports, module) {
      var FUNC_ERROR_TEXT = "Expected a function";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var INFINITY = 1 / 0;
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var symbolTag = "[object Symbol]";
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
      var reIsPlainProp = /^\w*$/;
      var reLeadingDot = /^\./;
      var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reEscapeChar = /\\(\\)?/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      function isHostObject(value) {
        var result = false;
        if (value != null && typeof value.toString != "function") {
          try {
            result = !!(value + "");
          } catch (e) {
          }
        }
        return result;
      }
      var arrayProto = Array.prototype;
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var coreJsData = root["__core-js_shared__"];
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var objectToString = objectProto.toString;
      var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      var Symbol2 = root.Symbol;
      var splice = arrayProto.splice;
      var Map2 = getNative(root, "Map");
      var nativeCreate = getNative(Object, "create");
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function Hash(entries) {
        var index2 = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index2 < length) {
          var entry = entries[index2];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
      }
      function hashDelete(key) {
        return this.has(key) && delete this.__data__[key];
      }
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? void 0 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : void 0;
      }
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
      }
      function hashSet(key, value) {
        var data = this.__data__;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
        return this;
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function ListCache(entries) {
        var index2 = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index2 < length) {
          var entry = entries[index2];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear() {
        this.__data__ = [];
      }
      function listCacheDelete(key) {
        var data = this.__data__, index2 = assocIndexOf(data, key);
        if (index2 < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index2 == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index2, 1);
        }
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index2 = assocIndexOf(data, key);
        return index2 < 0 ? void 0 : data[index2][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index2 = assocIndexOf(data, key);
        if (index2 < 0) {
          data.push([key, value]);
        } else {
          data[index2][1] = value;
        }
        return this;
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      function MapCache(entries) {
        var index2 = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index2 < length) {
          var entry = entries[index2];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear() {
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map2 || ListCache)(),
          "string": new Hash()
        };
      }
      function mapCacheDelete(key) {
        return getMapData(this, key)["delete"](key);
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        getMapData(this, key).set(key, value);
        return this;
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      function baseGet(object, path) {
        path = isKey(path, object) ? [path] : castPath(path);
        var index2 = 0, length = path.length;
        while (object != null && index2 < length) {
          object = object[toKey(path[index2++])];
        }
        return index2 && index2 == length ? object : void 0;
      }
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function castPath(value) {
        return isArray(value) ? value : stringToPath(value);
      }
      function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var stringToPath = memoize(function(string) {
        string = toString(string);
        var result = [];
        if (reLeadingDot.test(string)) {
          result.push("");
        }
        string.replace(rePropName, function(match, number, quote, string2) {
          result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
        });
        return result;
      });
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver && typeof resolver != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
          if (cache.has(key)) {
            return cache.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache.set(key, result);
          return result;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var isArray = Array.isArray;
      function isFunction(value) {
        var tag = isObject(value) ? objectToString.call(value) : "";
        return tag == funcTag || tag == genTag;
      }
      function isObject(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      function get(object, path, defaultValue) {
        var result = object == null ? void 0 : baseGet(object, path);
        return result === void 0 ? defaultValue : result;
      }
      module.exports = get;
    }
  });

  // node_modules/lodash.set/index.js
  var require_lodash2 = __commonJS({
    "node_modules/lodash.set/index.js"(exports, module) {
      var FUNC_ERROR_TEXT = "Expected a function";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var INFINITY = 1 / 0;
      var MAX_SAFE_INTEGER = 9007199254740991;
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var symbolTag = "[object Symbol]";
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
      var reIsPlainProp = /^\w*$/;
      var reLeadingDot = /^\./;
      var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reEscapeChar = /\\(\\)?/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      function isHostObject(value) {
        var result = false;
        if (value != null && typeof value.toString != "function") {
          try {
            result = !!(value + "");
          } catch (e) {
          }
        }
        return result;
      }
      var arrayProto = Array.prototype;
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var coreJsData = root["__core-js_shared__"];
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var objectToString = objectProto.toString;
      var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      var Symbol2 = root.Symbol;
      var splice = arrayProto.splice;
      var Map2 = getNative(root, "Map");
      var nativeCreate = getNative(Object, "create");
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function Hash(entries) {
        var index2 = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index2 < length) {
          var entry = entries[index2];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
      }
      function hashDelete(key) {
        return this.has(key) && delete this.__data__[key];
      }
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? void 0 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : void 0;
      }
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
      }
      function hashSet(key, value) {
        var data = this.__data__;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
        return this;
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function ListCache(entries) {
        var index2 = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index2 < length) {
          var entry = entries[index2];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear() {
        this.__data__ = [];
      }
      function listCacheDelete(key) {
        var data = this.__data__, index2 = assocIndexOf(data, key);
        if (index2 < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index2 == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index2, 1);
        }
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index2 = assocIndexOf(data, key);
        return index2 < 0 ? void 0 : data[index2][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index2 = assocIndexOf(data, key);
        if (index2 < 0) {
          data.push([key, value]);
        } else {
          data[index2][1] = value;
        }
        return this;
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      function MapCache(entries) {
        var index2 = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index2 < length) {
          var entry = entries[index2];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear() {
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map2 || ListCache)(),
          "string": new Hash()
        };
      }
      function mapCacheDelete(key) {
        return getMapData(this, key)["delete"](key);
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        getMapData(this, key).set(key, value);
        return this;
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
          object[key] = value;
        }
      }
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseSet(object, path, value, customizer) {
        if (!isObject(object)) {
          return object;
        }
        path = isKey(path, object) ? [path] : castPath(path);
        var index2 = -1, length = path.length, lastIndex = length - 1, nested = object;
        while (nested != null && ++index2 < length) {
          var key = toKey(path[index2]), newValue = value;
          if (index2 != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : void 0;
            if (newValue === void 0) {
              newValue = isObject(objValue) ? objValue : isIndex(path[index2 + 1]) ? [] : {};
            }
          }
          assignValue(nested, key, newValue);
          nested = nested[key];
        }
        return object;
      }
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function castPath(value) {
        return isArray(value) ? value : stringToPath(value);
      }
      function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      function isIndex(value, length) {
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var stringToPath = memoize(function(string) {
        string = toString(string);
        var result = [];
        if (reLeadingDot.test(string)) {
          result.push("");
        }
        string.replace(rePropName, function(match, number, quote, string2) {
          result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
        });
        return result;
      });
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver && typeof resolver != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
          if (cache.has(key)) {
            return cache.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache.set(key, result);
          return result;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var isArray = Array.isArray;
      function isFunction(value) {
        var tag = isObject(value) ? objectToString.call(value) : "";
        return tag == funcTag || tag == genTag;
      }
      function isObject(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      function set(object, path, value) {
        return object == null ? object : baseSet(object, path, value);
      }
      module.exports = set;
    }
  });

  // node_modules/lodash._reinterpolate/index.js
  var require_lodash3 = __commonJS({
    "node_modules/lodash._reinterpolate/index.js"(exports, module) {
      var reInterpolate = /<%=([\s\S]+?)%>/g;
      module.exports = reInterpolate;
    }
  });

  // node_modules/lodash.templatesettings/index.js
  var require_lodash4 = __commonJS({
    "node_modules/lodash.templatesettings/index.js"(exports, module) {
      var reInterpolate = require_lodash3();
      var INFINITY = 1 / 0;
      var nullTag = "[object Null]";
      var symbolTag = "[object Symbol]";
      var undefinedTag = "[object Undefined]";
      var reUnescapedHtml = /[&<>"']/g;
      var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g;
      var reEvaluate = /<%([\s\S]+?)%>/g;
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      function arrayMap(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index2 < length) {
          result[index2] = iteratee(array[index2], index2, array);
        }
        return result;
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? void 0 : object[key];
        };
      }
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var Symbol2 = root.Symbol;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      var templateSettings = {
        "escape": reEscape,
        "evaluate": reEvaluate,
        "interpolate": reInterpolate,
        "variable": "",
        "imports": {
          "_": {"escape": escape}
        }
      };
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      var isArray = Array.isArray;
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      function escape(string) {
        string = toString(string);
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
      }
      module.exports = templateSettings;
    }
  });

  // node_modules/lodash.template/index.js
  var require_lodash5 = __commonJS({
    "node_modules/lodash.template/index.js"(exports, module) {
      var reInterpolate = require_lodash3();
      var templateSettings = require_lodash4();
      var HOT_COUNT = 800;
      var HOT_SPAN = 16;
      var INFINITY = 1 / 0;
      var MAX_SAFE_INTEGER = 9007199254740991;
      var argsTag = "[object Arguments]";
      var arrayTag = "[object Array]";
      var asyncTag = "[object AsyncFunction]";
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var domExcTag = "[object DOMException]";
      var errorTag = "[object Error]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var nullTag = "[object Null]";
      var objectTag = "[object Object]";
      var proxyTag = "[object Proxy]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var symbolTag = "[object Symbol]";
      var undefinedTag = "[object Undefined]";
      var weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g;
      var reEmptyStringMiddle = /\b(__p \+=) '' \+/g;
      var reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayMap(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index2 < length) {
          result[index2] = iteratee(array[index2], index2, array);
        }
        return result;
      }
      function baseTimes(n, iteratee) {
        var index2 = -1, result = Array(n);
        while (++index2 < n) {
          result[index2] = iteratee(index2);
        }
        return result;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var coreJsData = root["__core-js_shared__"];
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var nativeObjectToString = objectProto.toString;
      var objectCtorString = funcToString.call(Object);
      var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var Symbol2 = root.Symbol;
      var getPrototype = overArg(Object.getPrototypeOf, Object);
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      var defineProperty = function() {
        try {
          var func = getNative(Object, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {
        }
      }();
      var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
      var nativeKeys = overArg(Object.keys, Object);
      var nativeMax = Math.max;
      var nativeNow = Date.now;
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object[key] = value;
        }
      }
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
            result.push(key);
          }
        }
        return result;
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + "");
      }
      var baseSetToString = !defineProperty ? identity : function(func, string) {
        return defineProperty(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string),
          "writable": true
        });
      };
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index2 = -1, length = props.length;
        while (++index2 < length) {
          var key = props[index2];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
          if (newValue === void 0) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? void 0 : customizer;
            length = 1;
          }
          object = Object(object);
          while (++index2 < length) {
            var source = sources[index2];
            if (source) {
              assigner(object, source, index2, customizer);
            }
          }
          return object;
        });
      }
      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        if (objValue === void 0 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
          return srcValue;
        }
        return objValue;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function isIterateeCall(value, index2, object) {
        if (!isObject(object)) {
          return false;
        }
        var type = typeof index2;
        if (type == "number" ? isArrayLike(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
          return eq(object[index2], value);
        }
        return false;
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      function nativeKeysIn(object) {
        var result = [];
        if (object != null) {
          for (var key in Object(object)) {
            result.push(key);
          }
        }
        return result;
      }
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      function overRest(func, start, transform) {
        start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array(length);
          while (++index2 < length) {
            array[index2] = args[start + index2];
          }
          index2 = -1;
          var otherArgs = Array(start + 1);
          while (++index2 < start) {
            otherArgs[index2] = args[index2];
          }
          otherArgs[start] = transform(array);
          return apply(func, this, otherArgs);
        };
      }
      var setToString = shortOut(baseSetToString);
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(void 0, arguments);
        };
      }
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var isArguments = baseIsArguments(function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      var isArray = Array.isArray;
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      var isBuffer = nativeIsBuffer || stubFalse;
      function isError(value) {
        if (!isObjectLike(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
      }
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      });
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      function template5(string, options, guard) {
        var settings = templateSettings.imports._.templateSettings || templateSettings;
        if (guard && isIterateeCall(string, options, guard)) {
          options = void 0;
        }
        string = toString(string);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
        var isEscaping, isEvaluating, index2 = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
        var reDelimiters = RegExp((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
        var sourceURL = hasOwnProperty.call(options, "sourceURL") ? "//# sourceURL=" + (options.sourceURL + "").replace(/[\r\n]/g, " ") + "\n" : "";
        string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source += string.slice(index2, offset).replace(reUnescapedString, escapeStringChar);
          if (escapeValue) {
            isEscaping = true;
            source += "' +\n__e(" + escapeValue + ") +\n'";
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += "';\n" + evaluateValue + ";\n__p += '";
          }
          if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
          }
          index2 = offset + match.length;
          return match;
        });
        source += "';\n";
        var variable = hasOwnProperty.call(options, "variable") && options.variable;
        if (!variable) {
          source = "with (obj) {\n" + source + "\n}\n";
        }
        source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
        source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
        var result = attempt(function() {
          return Function(importsKeys, sourceURL + "return " + source).apply(void 0, importsValues);
        });
        result.source = source;
        if (isError(result)) {
          throw result;
        }
        return result;
      }
      var attempt = baseRest(function(func, args) {
        try {
          return apply(func, void 0, args);
        } catch (e) {
          return isError(e) ? e : new Error(e);
        }
      });
      function constant(value) {
        return function() {
          return value;
        };
      }
      function identity(value) {
        return value;
      }
      function stubFalse() {
        return false;
      }
      module.exports = template5;
    }
  });

  // client/django-formset/DjangoFormset.ts
  var import_lodash2 = __toModule(require_lodash());
  var import_lodash3 = __toModule(require_lodash2());
  var import_lodash4 = __toModule(require_lodash5());

  // node_modules/sortablejs/modular/sortable.esm.js
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) {
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var version = "1.15.0";
  function userAgent(pattern) {
    if (typeof window !== "undefined" && window.navigator) {
      return !!/* @__PURE__ */ navigator.userAgent.match(pattern);
    }
  }
  var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
  var Edge = userAgent(/Edge/i);
  var FireFox = userAgent(/firefox/i);
  var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
  var IOS = userAgent(/iP(ad|od|hone)/i);
  var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
  var captureMode = {
    capture: false,
    passive: false
  };
  function on(el, event, fn) {
    el.addEventListener(event, fn, !IE11OrLess && captureMode);
  }
  function off(el, event, fn) {
    el.removeEventListener(event, fn, !IE11OrLess && captureMode);
  }
  function matches(el, selector) {
    if (!selector)
      return;
    selector[0] === ">" && (selector = selector.substring(1));
    if (el) {
      try {
        if (el.matches) {
          return el.matches(selector);
        } else if (el.msMatchesSelector) {
          return el.msMatchesSelector(selector);
        } else if (el.webkitMatchesSelector) {
          return el.webkitMatchesSelector(selector);
        }
      } catch (_) {
        return false;
      }
    }
    return false;
  }
  function getParentOrHost(el) {
    return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
  }
  function closest(el, selector, ctx, includeCTX) {
    if (el) {
      ctx = ctx || document;
      do {
        if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
          return el;
        }
        if (el === ctx)
          break;
      } while (el = getParentOrHost(el));
    }
    return null;
  }
  var R_SPACE = /\s+/g;
  function toggleClass(el, name, state) {
    if (el && name) {
      if (el.classList) {
        el.classList[state ? "add" : "remove"](name);
      } else {
        var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
        el.className = (className + (state ? " " + name : "")).replace(R_SPACE, " ");
      }
    }
  }
  function css(el, prop, val) {
    var style2 = el && el.style;
    if (style2) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, "");
        } else if (el.currentStyle) {
          val = el.currentStyle;
        }
        return prop === void 0 ? val : val[prop];
      } else {
        if (!(prop in style2) && prop.indexOf("webkit") === -1) {
          prop = "-webkit-" + prop;
        }
        style2[prop] = val + (typeof val === "string" ? "" : "px");
      }
    }
  }
  function matrix(el, selfOnly) {
    var appliedTransforms = "";
    if (typeof el === "string") {
      appliedTransforms = el;
    } else {
      do {
        var transform = css(el, "transform");
        if (transform && transform !== "none") {
          appliedTransforms = transform + " " + appliedTransforms;
        }
      } while (!selfOnly && (el = el.parentNode));
    }
    var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
    return matrixFn && new matrixFn(appliedTransforms);
  }
  function find(ctx, tagName, iterator) {
    if (ctx) {
      var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;
      if (iterator) {
        for (; i < n; i++) {
          iterator(list[i], i);
        }
      }
      return list;
    }
    return [];
  }
  function getWindowScrollingElement() {
    var scrollingElement = document.scrollingElement;
    if (scrollingElement) {
      return scrollingElement;
    } else {
      return document.documentElement;
    }
  }
  function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
    if (!el.getBoundingClientRect && el !== window)
      return;
    var elRect, top, left, bottom, right, height, width;
    if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
      elRect = el.getBoundingClientRect();
      top = elRect.top;
      left = elRect.left;
      bottom = elRect.bottom;
      right = elRect.right;
      height = elRect.height;
      width = elRect.width;
    } else {
      top = 0;
      left = 0;
      bottom = window.innerHeight;
      right = window.innerWidth;
      height = window.innerHeight;
      width = window.innerWidth;
    }
    if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
      container = container || el.parentNode;
      if (!IE11OrLess) {
        do {
          if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
            var containerRect = container.getBoundingClientRect();
            top -= containerRect.top + parseInt(css(container, "border-top-width"));
            left -= containerRect.left + parseInt(css(container, "border-left-width"));
            bottom = top + elRect.height;
            right = left + elRect.width;
            break;
          }
        } while (container = container.parentNode);
      }
    }
    if (undoScale && el !== window) {
      var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
      if (elMatrix) {
        top /= scaleY;
        left /= scaleX;
        width /= scaleX;
        height /= scaleY;
        bottom = top + height;
        right = left + width;
      }
    }
    return {
      top,
      left,
      bottom,
      right,
      width,
      height
    };
  }
  function isScrolledPast(el, elSide, parentSide) {
    var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
    while (parent) {
      var parentSideVal = getRect(parent)[parentSide], visible = void 0;
      if (parentSide === "top" || parentSide === "left") {
        visible = elSideVal >= parentSideVal;
      } else {
        visible = elSideVal <= parentSideVal;
      }
      if (!visible)
        return parent;
      if (parent === getWindowScrollingElement())
        break;
      parent = getParentAutoScrollElement(parent, false);
    }
    return false;
  }
  function getChild(el, childNum, options, includeDragEl) {
    var currentChild = 0, i = 0, children = el.children;
    while (i < children.length) {
      if (children[i].style.display !== "none" && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
        if (currentChild === childNum) {
          return children[i];
        }
        currentChild++;
      }
      i++;
    }
    return null;
  }
  function lastChild(el, selector) {
    var last = el.lastElementChild;
    while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
      last = last.previousElementSibling;
    }
    return last || null;
  }
  function index(el, selector) {
    var index2 = 0;
    if (!el || !el.parentNode) {
      return -1;
    }
    while (el = el.previousElementSibling) {
      if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
        index2++;
      }
    }
    return index2;
  }
  function getRelativeScrollOffset(el) {
    var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
    if (el) {
      do {
        var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
        offsetLeft += el.scrollLeft * scaleX;
        offsetTop += el.scrollTop * scaleY;
      } while (el !== winScroller && (el = el.parentNode));
    }
    return [offsetLeft, offsetTop];
  }
  function indexOfObject(arr, obj) {
    for (var i in arr) {
      if (!arr.hasOwnProperty(i))
        continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === arr[i][key])
          return Number(i);
      }
    }
    return -1;
  }
  function getParentAutoScrollElement(el, includeSelf) {
    if (!el || !el.getBoundingClientRect)
      return getWindowScrollingElement();
    var elem = el;
    var gotSelf = false;
    do {
      if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
        var elemCSS = css(elem);
        if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
          if (!elem.getBoundingClientRect || elem === document.body)
            return getWindowScrollingElement();
          if (gotSelf || includeSelf)
            return elem;
          gotSelf = true;
        }
      }
    } while (elem = elem.parentNode);
    return getWindowScrollingElement();
  }
  function extend(dst, src) {
    if (dst && src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          dst[key] = src[key];
        }
      }
    }
    return dst;
  }
  function isRectEqual(rect1, rect2) {
    return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
  }
  var _throttleTimeout;
  function throttle(callback, ms) {
    return function() {
      if (!_throttleTimeout) {
        var args = arguments, _this = this;
        if (args.length === 1) {
          callback.call(_this, args[0]);
        } else {
          callback.apply(_this, args);
        }
        _throttleTimeout = setTimeout(function() {
          _throttleTimeout = void 0;
        }, ms);
      }
    };
  }
  function cancelThrottle() {
    clearTimeout(_throttleTimeout);
    _throttleTimeout = void 0;
  }
  function scrollBy(el, x, y) {
    el.scrollLeft += x;
    el.scrollTop += y;
  }
  function clone(el) {
    var Polymer = window.Polymer;
    var $ = window.jQuery || window.Zepto;
    if (Polymer && Polymer.dom) {
      return Polymer.dom(el).cloneNode(true);
    } else if ($) {
      return $(el).clone(true)[0];
    } else {
      return el.cloneNode(true);
    }
  }
  function setRect(el, rect) {
    css(el, "position", "absolute");
    css(el, "top", rect.top);
    css(el, "left", rect.left);
    css(el, "width", rect.width);
    css(el, "height", rect.height);
  }
  function unsetRect(el) {
    css(el, "position", "");
    css(el, "top", "");
    css(el, "left", "");
    css(el, "width", "");
    css(el, "height", "");
  }
  var expando = "Sortable" + new Date().getTime();
  function AnimationStateManager() {
    var animationStates = [], animationCallbackId;
    return {
      captureAnimationState: function captureAnimationState() {
        animationStates = [];
        if (!this.options.animation)
          return;
        var children = [].slice.call(this.el.children);
        children.forEach(function(child) {
          if (css(child, "display") === "none" || child === Sortable.ghost)
            return;
          animationStates.push({
            target: child,
            rect: getRect(child)
          });
          var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);
          if (child.thisAnimationDuration) {
            var childMatrix = matrix(child, true);
            if (childMatrix) {
              fromRect.top -= childMatrix.f;
              fromRect.left -= childMatrix.e;
            }
          }
          child.fromRect = fromRect;
        });
      },
      addAnimationState: function addAnimationState(state) {
        animationStates.push(state);
      },
      removeAnimationState: function removeAnimationState(target) {
        animationStates.splice(indexOfObject(animationStates, {
          target
        }), 1);
      },
      animateAll: function animateAll(callback) {
        var _this = this;
        if (!this.options.animation) {
          clearTimeout(animationCallbackId);
          if (typeof callback === "function")
            callback();
          return;
        }
        var animating = false, animationTime = 0;
        animationStates.forEach(function(state) {
          var time = 0, target = state.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state.rect, targetMatrix = matrix(target, true);
          if (targetMatrix) {
            toRect.top -= targetMatrix.f;
            toRect.left -= targetMatrix.e;
          }
          target.toRect = toRect;
          if (target.thisAnimationDuration) {
            if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
              time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
            }
          }
          if (!isRectEqual(toRect, fromRect)) {
            target.prevFromRect = fromRect;
            target.prevToRect = toRect;
            if (!time) {
              time = _this.options.animation;
            }
            _this.animate(target, animatingRect, toRect, time);
          }
          if (time) {
            animating = true;
            animationTime = Math.max(animationTime, time);
            clearTimeout(target.animationResetTimer);
            target.animationResetTimer = setTimeout(function() {
              target.animationTime = 0;
              target.prevFromRect = null;
              target.fromRect = null;
              target.prevToRect = null;
              target.thisAnimationDuration = null;
            }, time);
            target.thisAnimationDuration = time;
          }
        });
        clearTimeout(animationCallbackId);
        if (!animating) {
          if (typeof callback === "function")
            callback();
        } else {
          animationCallbackId = setTimeout(function() {
            if (typeof callback === "function")
              callback();
          }, animationTime);
        }
        animationStates = [];
      },
      animate: function animate(target, currentRect, toRect, duration) {
        if (duration) {
          css(target, "transition", "");
          css(target, "transform", "");
          var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
          target.animatingX = !!translateX;
          target.animatingY = !!translateY;
          css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
          this.forRepaintDummy = repaint(target);
          css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
          css(target, "transform", "translate3d(0,0,0)");
          typeof target.animated === "number" && clearTimeout(target.animated);
          target.animated = setTimeout(function() {
            css(target, "transition", "");
            css(target, "transform", "");
            target.animated = false;
            target.animatingX = false;
            target.animatingY = false;
          }, duration);
        }
      }
    };
  }
  function repaint(target) {
    return target.offsetWidth;
  }
  function calculateRealTime(animatingRect, fromRect, toRect, options) {
    return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
  }
  var plugins = [];
  var defaults = {
    initializeByDefault: true
  };
  var PluginManager = {
    mount: function mount(plugin) {
      for (var option2 in defaults) {
        if (defaults.hasOwnProperty(option2) && !(option2 in plugin)) {
          plugin[option2] = defaults[option2];
        }
      }
      plugins.forEach(function(p) {
        if (p.pluginName === plugin.pluginName) {
          throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
        }
      });
      plugins.push(plugin);
    },
    pluginEvent: function pluginEvent(eventName, sortable, evt) {
      var _this = this;
      this.eventCanceled = false;
      evt.cancel = function() {
        _this.eventCanceled = true;
      };
      var eventNameGlobal = eventName + "Global";
      plugins.forEach(function(plugin) {
        if (!sortable[plugin.pluginName])
          return;
        if (sortable[plugin.pluginName][eventNameGlobal]) {
          sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
            sortable
          }, evt));
        }
        if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
          sortable[plugin.pluginName][eventName](_objectSpread2({
            sortable
          }, evt));
        }
      });
    },
    initializePlugins: function initializePlugins(sortable, el, defaults2, options) {
      plugins.forEach(function(plugin) {
        var pluginName = plugin.pluginName;
        if (!sortable.options[pluginName] && !plugin.initializeByDefault)
          return;
        var initialized = new plugin(sortable, el, sortable.options);
        initialized.sortable = sortable;
        initialized.options = sortable.options;
        sortable[pluginName] = initialized;
        _extends(defaults2, initialized.defaults);
      });
      for (var option2 in sortable.options) {
        if (!sortable.options.hasOwnProperty(option2))
          continue;
        var modified = this.modifyOption(sortable, option2, sortable.options[option2]);
        if (typeof modified !== "undefined") {
          sortable.options[option2] = modified;
        }
      }
    },
    getEventProperties: function getEventProperties(name, sortable) {
      var eventProperties = {};
      plugins.forEach(function(plugin) {
        if (typeof plugin.eventProperties !== "function")
          return;
        _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
      });
      return eventProperties;
    },
    modifyOption: function modifyOption(sortable, name, value) {
      var modifiedValue;
      plugins.forEach(function(plugin) {
        if (!sortable[plugin.pluginName])
          return;
        if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
          modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
        }
      });
      return modifiedValue;
    }
  };
  function dispatchEvent(_ref) {
    var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
    sortable = sortable || rootEl2 && rootEl2[expando];
    if (!sortable)
      return;
    var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent(name, {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent("Event");
      evt.initEvent(name, true, true);
    }
    evt.to = toEl || rootEl2;
    evt.from = fromEl || rootEl2;
    evt.item = targetEl || rootEl2;
    evt.clone = cloneEl2;
    evt.oldIndex = oldIndex2;
    evt.newIndex = newIndex2;
    evt.oldDraggableIndex = oldDraggableIndex2;
    evt.newDraggableIndex = newDraggableIndex2;
    evt.originalEvent = originalEvent;
    evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
    var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
    for (var option2 in allEventProperties) {
      evt[option2] = allEventProperties[option2];
    }
    if (rootEl2) {
      rootEl2.dispatchEvent(evt);
    }
    if (options[onName]) {
      options[onName].call(sortable, evt);
    }
  }
  var _excluded = ["evt"];
  var pluginEvent2 = function pluginEvent3(eventName, sortable) {
    var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data = _objectWithoutProperties(_ref, _excluded);
    PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
      dragEl,
      parentEl,
      ghostEl,
      rootEl,
      nextEl,
      lastDownEl,
      cloneEl,
      cloneHidden,
      dragStarted: moved,
      putSortable,
      activeSortable: Sortable.active,
      originalEvent,
      oldIndex,
      oldDraggableIndex,
      newIndex,
      newDraggableIndex,
      hideGhostForTarget: _hideGhostForTarget,
      unhideGhostForTarget: _unhideGhostForTarget,
      cloneNowHidden: function cloneNowHidden() {
        cloneHidden = true;
      },
      cloneNowShown: function cloneNowShown() {
        cloneHidden = false;
      },
      dispatchSortableEvent: function dispatchSortableEvent(name) {
        _dispatchEvent({
          sortable,
          name,
          originalEvent
        });
      }
    }, data));
  };
  function _dispatchEvent(info) {
    dispatchEvent(_objectSpread2({
      putSortable,
      cloneEl,
      targetEl: dragEl,
      rootEl,
      oldIndex,
      oldDraggableIndex,
      newIndex,
      newDraggableIndex
    }, info));
  }
  var dragEl;
  var parentEl;
  var ghostEl;
  var rootEl;
  var nextEl;
  var lastDownEl;
  var cloneEl;
  var cloneHidden;
  var oldIndex;
  var newIndex;
  var oldDraggableIndex;
  var newDraggableIndex;
  var activeGroup;
  var putSortable;
  var awaitingDragStarted = false;
  var ignoreNextClick = false;
  var sortables = [];
  var tapEvt;
  var touchEvt;
  var lastDx;
  var lastDy;
  var tapDistanceLeft;
  var tapDistanceTop;
  var moved;
  var lastTarget;
  var lastDirection;
  var pastFirstInvertThresh = false;
  var isCircumstantialInvert = false;
  var targetMoveDistance;
  var ghostRelativeParent;
  var ghostRelativeParentInitialScroll = [];
  var _silent = false;
  var savedInputChecked = [];
  var documentExists = typeof document !== "undefined";
  var PositionGhostAbsolutely = IOS;
  var CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float";
  var supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div");
  var supportCssPointerEvents = function() {
    if (!documentExists)
      return;
    if (IE11OrLess) {
      return false;
    }
    var el = document.createElement("x");
    el.style.cssText = "pointer-events:auto";
    return el.style.pointerEvents === "auto";
  }();
  var _detectDirection = function _detectDirection2(el, options) {
    var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options), child2 = getChild(el, 1, options), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
    if (elCSS.display === "flex") {
      return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
    }
    if (elCSS.display === "grid") {
      return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
    }
    if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
      var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
      return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
    }
    return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
  };
  var _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
    var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
    return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
  };
  var _detectNearestEmptySortable = function _detectNearestEmptySortable2(x, y) {
    var ret;
    sortables.some(function(sortable) {
      var threshold = sortable[expando].options.emptyInsertThreshold;
      if (!threshold || lastChild(sortable))
        return;
      var rect = getRect(sortable), insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold, insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
      if (insideHorizontally && insideVertically) {
        return ret = sortable;
      }
    });
    return ret;
  };
  var _prepareGroup = function _prepareGroup2(options) {
    function toFn(value, pull) {
      return function(to, from, dragEl2, evt) {
        var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
        if (value == null && (pull || sameGroup)) {
          return true;
        } else if (value == null || value === false) {
          return false;
        } else if (pull && value === "clone") {
          return value;
        } else if (typeof value === "function") {
          return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
        } else {
          var otherGroup = (pull ? to : from).options.group.name;
          return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
        }
      };
    }
    var group = {};
    var originalGroup = options.group;
    if (!originalGroup || _typeof(originalGroup) != "object") {
      originalGroup = {
        name: originalGroup
      };
    }
    group.name = originalGroup.name;
    group.checkPull = toFn(originalGroup.pull, true);
    group.checkPut = toFn(originalGroup.put);
    group.revertClone = originalGroup.revertClone;
    options.group = group;
  };
  var _hideGhostForTarget = function _hideGhostForTarget2() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, "display", "none");
    }
  };
  var _unhideGhostForTarget = function _unhideGhostForTarget2() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, "display", "");
    }
  };
  if (documentExists && !ChromeForAndroid) {
    document.addEventListener("click", function(evt) {
      if (ignoreNextClick) {
        evt.preventDefault();
        evt.stopPropagation && evt.stopPropagation();
        evt.stopImmediatePropagation && evt.stopImmediatePropagation();
        ignoreNextClick = false;
        return false;
      }
    }, true);
  }
  var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
    if (dragEl) {
      evt = evt.touches ? evt.touches[0] : evt;
      var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
      if (nearest) {
        var event = {};
        for (var i in evt) {
          if (evt.hasOwnProperty(i)) {
            event[i] = evt[i];
          }
        }
        event.target = event.rootEl = nearest;
        event.preventDefault = void 0;
        event.stopPropagation = void 0;
        nearest[expando]._onDragOver(event);
      }
    }
  };
  var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
    if (dragEl) {
      dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
    }
  };
  function Sortable(el, options) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
      throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
    }
    this.el = el;
    this.options = options = _extends({}, options);
    el[expando] = this;
    var defaults2 = {
      group: null,
      sort: true,
      disabled: false,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
      swapThreshold: 1,
      invertSwap: false,
      invertedSwapThreshold: null,
      removeCloneOnHide: true,
      direction: function direction() {
        return _detectDirection(el, this.options);
      },
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      ignore: "a, img",
      filter: null,
      preventOnFilter: true,
      animation: 0,
      easing: null,
      setData: function setData(dataTransfer, dragEl2) {
        dataTransfer.setData("Text", dragEl2.textContent);
      },
      dropBubble: false,
      dragoverBubble: false,
      dataIdAttr: "data-id",
      delay: 0,
      delayOnTouchOnly: false,
      touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
      forceFallback: false,
      fallbackClass: "sortable-fallback",
      fallbackOnBody: false,
      fallbackTolerance: 0,
      fallbackOffset: {
        x: 0,
        y: 0
      },
      supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window && !Safari,
      emptyInsertThreshold: 5
    };
    PluginManager.initializePlugins(this, el, defaults2);
    for (var name in defaults2) {
      !(name in options) && (options[name] = defaults2[name]);
    }
    _prepareGroup(options);
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
    this.nativeDraggable = options.forceFallback ? false : supportDraggable;
    if (this.nativeDraggable) {
      this.options.touchStartThreshold = 1;
    }
    if (options.supportPointer) {
      on(el, "pointerdown", this._onTapStart);
    } else {
      on(el, "mousedown", this._onTapStart);
      on(el, "touchstart", this._onTapStart);
    }
    if (this.nativeDraggable) {
      on(el, "dragover", this);
      on(el, "dragenter", this);
    }
    sortables.push(this.el);
    options.store && options.store.get && this.sort(options.store.get(this) || []);
    _extends(this, AnimationStateManager());
  }
  Sortable.prototype = {
    constructor: Sortable,
    _isOutsideThisEl: function _isOutsideThisEl(target) {
      if (!this.el.contains(target) && target !== this.el) {
        lastTarget = null;
      }
    },
    _getDirection: function _getDirection(evt, target) {
      return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
    },
    _onTapStart: function _onTapStart(evt) {
      if (!evt.cancelable)
        return;
      var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter;
      _saveInputCheckedState(el);
      if (dragEl) {
        return;
      }
      if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
        return;
      }
      if (originalTarget.isContentEditable) {
        return;
      }
      if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === "SELECT") {
        return;
      }
      target = closest(target, options.draggable, el, false);
      if (target && target.animated) {
        return;
      }
      if (lastDownEl === target) {
        return;
      }
      oldIndex = index(target);
      oldDraggableIndex = index(target, options.draggable);
      if (typeof filter === "function") {
        if (filter.call(this, evt, target, this)) {
          _dispatchEvent({
            sortable: _this,
            rootEl: originalTarget,
            name: "filter",
            targetEl: target,
            toEl: el,
            fromEl: el
          });
          pluginEvent2("filter", _this, {
            evt
          });
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return;
        }
      } else if (filter) {
        filter = filter.split(",").some(function(criteria) {
          criteria = closest(originalTarget, criteria.trim(), el, false);
          if (criteria) {
            _dispatchEvent({
              sortable: _this,
              rootEl: criteria,
              name: "filter",
              targetEl: target,
              fromEl: el,
              toEl: el
            });
            pluginEvent2("filter", _this, {
              evt
            });
            return true;
          }
        });
        if (filter) {
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return;
        }
      }
      if (options.handle && !closest(originalTarget, options.handle, el, false)) {
        return;
      }
      this._prepareDragStart(evt, touch, target);
    },
    _prepareDragStart: function _prepareDragStart(evt, touch, target) {
      var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
      if (target && !dragEl && target.parentNode === el) {
        var dragRect = getRect(target);
        rootEl = el;
        dragEl = target;
        parentEl = dragEl.parentNode;
        nextEl = dragEl.nextSibling;
        lastDownEl = target;
        activeGroup = options.group;
        Sortable.dragged = dragEl;
        tapEvt = {
          target: dragEl,
          clientX: (touch || evt).clientX,
          clientY: (touch || evt).clientY
        };
        tapDistanceLeft = tapEvt.clientX - dragRect.left;
        tapDistanceTop = tapEvt.clientY - dragRect.top;
        this._lastX = (touch || evt).clientX;
        this._lastY = (touch || evt).clientY;
        dragEl.style["will-change"] = "all";
        dragStartFn = function dragStartFn2() {
          pluginEvent2("delayEnded", _this, {
            evt
          });
          if (Sortable.eventCanceled) {
            _this._onDrop();
            return;
          }
          _this._disableDelayedDragEvents();
          if (!FireFox && _this.nativeDraggable) {
            dragEl.draggable = true;
          }
          _this._triggerDragStart(evt, touch);
          _dispatchEvent({
            sortable: _this,
            name: "choose",
            originalEvent: evt
          });
          toggleClass(dragEl, options.chosenClass, true);
        };
        options.ignore.split(",").forEach(function(criteria) {
          find(dragEl, criteria.trim(), _disableDraggable);
        });
        on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "mouseup", _this._onDrop);
        on(ownerDocument, "touchend", _this._onDrop);
        on(ownerDocument, "touchcancel", _this._onDrop);
        if (FireFox && this.nativeDraggable) {
          this.options.touchStartThreshold = 4;
          dragEl.draggable = true;
        }
        pluginEvent2("delayStart", this, {
          evt
        });
        if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
          if (Sortable.eventCanceled) {
            this._onDrop();
            return;
          }
          on(ownerDocument, "mouseup", _this._disableDelayedDrag);
          on(ownerDocument, "touchend", _this._disableDelayedDrag);
          on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
          on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
          on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
          options.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
          _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
        } else {
          dragStartFn();
        }
      }
    },
    _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e) {
      var touch = e.touches ? e.touches[0] : e;
      if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
        this._disableDelayedDrag();
      }
    },
    _disableDelayedDrag: function _disableDelayedDrag() {
      dragEl && _disableDraggable(dragEl);
      clearTimeout(this._dragStartTimer);
      this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function _disableDelayedDragEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, "mouseup", this._disableDelayedDrag);
      off(ownerDocument, "touchend", this._disableDelayedDrag);
      off(ownerDocument, "touchcancel", this._disableDelayedDrag);
      off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
      off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
      off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function _triggerDragStart(evt, touch) {
      touch = touch || evt.pointerType == "touch" && evt;
      if (!this.nativeDraggable || touch) {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._onTouchMove);
        } else if (touch) {
          on(document, "touchmove", this._onTouchMove);
        } else {
          on(document, "mousemove", this._onTouchMove);
        }
      } else {
        on(dragEl, "dragend", this);
        on(rootEl, "dragstart", this._onDragStart);
      }
      try {
        if (document.selection) {
          _nextTick(function() {
            document.selection.empty();
          });
        } else {
          window.getSelection().removeAllRanges();
        }
      } catch (err) {
      }
    },
    _dragStarted: function _dragStarted(fallback, evt) {
      awaitingDragStarted = false;
      if (rootEl && dragEl) {
        pluginEvent2("dragStarted", this, {
          evt
        });
        if (this.nativeDraggable) {
          on(document, "dragover", _checkOutsideTargetEl);
        }
        var options = this.options;
        !fallback && toggleClass(dragEl, options.dragClass, false);
        toggleClass(dragEl, options.ghostClass, true);
        Sortable.active = this;
        fallback && this._appendGhost();
        _dispatchEvent({
          sortable: this,
          name: "start",
          originalEvent: evt
        });
      } else {
        this._nulling();
      }
    },
    _emulateDragOver: function _emulateDragOver() {
      if (touchEvt) {
        this._lastX = touchEvt.clientX;
        this._lastY = touchEvt.clientY;
        _hideGhostForTarget();
        var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        var parent = target;
        while (target && target.shadowRoot) {
          target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
          if (target === parent)
            break;
          parent = target;
        }
        dragEl.parentNode[expando]._isOutsideThisEl(target);
        if (parent) {
          do {
            if (parent[expando]) {
              var inserted = void 0;
              inserted = parent[expando]._onDragOver({
                clientX: touchEvt.clientX,
                clientY: touchEvt.clientY,
                target,
                rootEl: parent
              });
              if (inserted && !this.options.dragoverBubble) {
                break;
              }
            }
            target = parent;
          } while (parent = parent.parentNode);
        }
        _unhideGhostForTarget();
      }
    },
    _onTouchMove: function _onTouchMove(evt) {
      if (tapEvt) {
        var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
        if (!Sortable.active && !awaitingDragStarted) {
          if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
            return;
          }
          this._onDragStart(evt, true);
        }
        if (ghostEl) {
          if (ghostMatrix) {
            ghostMatrix.e += dx - (lastDx || 0);
            ghostMatrix.f += dy - (lastDy || 0);
          } else {
            ghostMatrix = {
              a: 1,
              b: 0,
              c: 0,
              d: 1,
              e: dx,
              f: dy
            };
          }
          var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
          css(ghostEl, "webkitTransform", cssMatrix);
          css(ghostEl, "mozTransform", cssMatrix);
          css(ghostEl, "msTransform", cssMatrix);
          css(ghostEl, "transform", cssMatrix);
          lastDx = dx;
          lastDy = dy;
          touchEvt = touch;
        }
        evt.cancelable && evt.preventDefault();
      }
    },
    _appendGhost: function _appendGhost() {
      if (!ghostEl) {
        var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options = this.options;
        if (PositionGhostAbsolutely) {
          ghostRelativeParent = container;
          while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
            ghostRelativeParent = ghostRelativeParent.parentNode;
          }
          if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
            if (ghostRelativeParent === document)
              ghostRelativeParent = getWindowScrollingElement();
            rect.top += ghostRelativeParent.scrollTop;
            rect.left += ghostRelativeParent.scrollLeft;
          } else {
            ghostRelativeParent = getWindowScrollingElement();
          }
          ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
        }
        ghostEl = dragEl.cloneNode(true);
        toggleClass(ghostEl, options.ghostClass, false);
        toggleClass(ghostEl, options.fallbackClass, true);
        toggleClass(ghostEl, options.dragClass, true);
        css(ghostEl, "transition", "");
        css(ghostEl, "transform", "");
        css(ghostEl, "box-sizing", "border-box");
        css(ghostEl, "margin", 0);
        css(ghostEl, "top", rect.top);
        css(ghostEl, "left", rect.left);
        css(ghostEl, "width", rect.width);
        css(ghostEl, "height", rect.height);
        css(ghostEl, "opacity", "0.8");
        css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
        css(ghostEl, "zIndex", "100000");
        css(ghostEl, "pointerEvents", "none");
        Sortable.ghost = ghostEl;
        container.appendChild(ghostEl);
        css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
      }
    },
    _onDragStart: function _onDragStart(evt, fallback) {
      var _this = this;
      var dataTransfer = evt.dataTransfer;
      var options = _this.options;
      pluginEvent2("dragStart", this, {
        evt
      });
      if (Sortable.eventCanceled) {
        this._onDrop();
        return;
      }
      pluginEvent2("setupClone", this);
      if (!Sortable.eventCanceled) {
        cloneEl = clone(dragEl);
        cloneEl.removeAttribute("id");
        cloneEl.draggable = false;
        cloneEl.style["will-change"] = "";
        this._hideClone();
        toggleClass(cloneEl, this.options.chosenClass, false);
        Sortable.clone = cloneEl;
      }
      _this.cloneId = _nextTick(function() {
        pluginEvent2("clone", _this);
        if (Sortable.eventCanceled)
          return;
        if (!_this.options.removeCloneOnHide) {
          rootEl.insertBefore(cloneEl, dragEl);
        }
        _this._hideClone();
        _dispatchEvent({
          sortable: _this,
          name: "clone"
        });
      });
      !fallback && toggleClass(dragEl, options.dragClass, true);
      if (fallback) {
        ignoreNextClick = true;
        _this._loopId = setInterval(_this._emulateDragOver, 50);
      } else {
        off(document, "mouseup", _this._onDrop);
        off(document, "touchend", _this._onDrop);
        off(document, "touchcancel", _this._onDrop);
        if (dataTransfer) {
          dataTransfer.effectAllowed = "move";
          options.setData && options.setData.call(_this, dataTransfer, dragEl);
        }
        on(document, "drop", _this);
        css(dragEl, "transform", "translateZ(0)");
      }
      awaitingDragStarted = true;
      _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
      on(document, "selectstart", _this);
      moved = true;
      if (Safari) {
        css(document.body, "user-select", "none");
      }
    },
    _onDragOver: function _onDragOver(evt) {
      var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
      if (_silent)
        return;
      function dragOverEvent(name, extra) {
        pluginEvent2(name, _this, _objectSpread2({
          evt,
          isOwner,
          axis: vertical ? "vertical" : "horizontal",
          revert,
          dragRect,
          targetRect,
          canSort,
          fromSortable,
          target,
          completed,
          onMove: function onMove(target2, after2) {
            return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
          },
          changed
        }, extra));
      }
      function capture() {
        dragOverEvent("dragOverAnimationCapture");
        _this.captureAnimationState();
        if (_this !== fromSortable) {
          fromSortable.captureAnimationState();
        }
      }
      function completed(insertion) {
        dragOverEvent("dragOverCompleted", {
          insertion
        });
        if (insertion) {
          if (isOwner) {
            activeSortable._hideClone();
          } else {
            activeSortable._showClone(_this);
          }
          if (_this !== fromSortable) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
            toggleClass(dragEl, options.ghostClass, true);
          }
          if (putSortable !== _this && _this !== Sortable.active) {
            putSortable = _this;
          } else if (_this === Sortable.active && putSortable) {
            putSortable = null;
          }
          if (fromSortable === _this) {
            _this._ignoreWhileAnimating = target;
          }
          _this.animateAll(function() {
            dragOverEvent("dragOverAnimationComplete");
            _this._ignoreWhileAnimating = null;
          });
          if (_this !== fromSortable) {
            fromSortable.animateAll();
            fromSortable._ignoreWhileAnimating = null;
          }
        }
        if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
          lastTarget = null;
        }
        if (!options.dragoverBubble && !evt.rootEl && target !== document) {
          dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
          !insertion && nearestEmptyInsertDetectEvent(evt);
        }
        !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
        return completedFired = true;
      }
      function changed() {
        newIndex = index(dragEl);
        newDraggableIndex = index(dragEl, options.draggable);
        _dispatchEvent({
          sortable: _this,
          name: "change",
          toEl: el,
          newIndex,
          newDraggableIndex,
          originalEvent: evt
        });
      }
      if (evt.preventDefault !== void 0) {
        evt.cancelable && evt.preventDefault();
      }
      target = closest(target, options.draggable, el, true);
      dragOverEvent("dragOver");
      if (Sortable.eventCanceled)
        return completedFired;
      if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
        return completed(false);
      }
      ignoreNextClick = false;
      if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
        vertical = this._getDirection(evt, target) === "vertical";
        dragRect = getRect(dragEl);
        dragOverEvent("dragOverValid");
        if (Sortable.eventCanceled)
          return completedFired;
        if (revert) {
          parentEl = rootEl;
          capture();
          this._hideClone();
          dragOverEvent("revert");
          if (!Sortable.eventCanceled) {
            if (nextEl) {
              rootEl.insertBefore(dragEl, nextEl);
            } else {
              rootEl.appendChild(dragEl);
            }
          }
          return completed(true);
        }
        var elLastChild = lastChild(el, options.draggable);
        if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
          if (elLastChild === dragEl) {
            return completed(false);
          }
          if (elLastChild && el === evt.target) {
            target = elLastChild;
          }
          if (target) {
            targetRect = getRect(target);
          }
          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
            capture();
            if (elLastChild && elLastChild.nextSibling) {
              el.insertBefore(dragEl, elLastChild.nextSibling);
            } else {
              el.appendChild(dragEl);
            }
            parentEl = el;
            changed();
            return completed(true);
          }
        } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
          var firstChild = getChild(el, 0, options, true);
          if (firstChild === dragEl) {
            return completed(false);
          }
          target = firstChild;
          targetRect = getRect(target);
          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
            capture();
            el.insertBefore(dragEl, firstChild);
            parentEl = el;
            changed();
            return completed(true);
          }
        } else if (target.parentNode === el) {
          targetRect = getRect(target);
          var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
          if (lastTarget !== target) {
            targetBeforeFirstSwap = targetRect[side1];
            pastFirstInvertThresh = false;
            isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
          }
          direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
          var sibling;
          if (direction !== 0) {
            var dragIndex = index(dragEl);
            do {
              dragIndex -= direction;
              sibling = parentEl.children[dragIndex];
            } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
          }
          if (direction === 0 || sibling === target) {
            return completed(false);
          }
          lastTarget = target;
          lastDirection = direction;
          var nextSibling = target.nextElementSibling, after = false;
          after = direction === 1;
          var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
          if (moveVector !== false) {
            if (moveVector === 1 || moveVector === -1) {
              after = moveVector === 1;
            }
            _silent = true;
            setTimeout(_unsilent, 30);
            capture();
            if (after && !nextSibling) {
              el.appendChild(dragEl);
            } else {
              target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
            }
            if (scrolledPastTop) {
              scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
            }
            parentEl = dragEl.parentNode;
            if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
              targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
            }
            changed();
            return completed(true);
          }
        }
        if (el.contains(dragEl)) {
          return completed(false);
        }
      }
      return false;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function _offMoveEvents() {
      off(document, "mousemove", this._onTouchMove);
      off(document, "touchmove", this._onTouchMove);
      off(document, "pointermove", this._onTouchMove);
      off(document, "dragover", nearestEmptyInsertDetectEvent);
      off(document, "mousemove", nearestEmptyInsertDetectEvent);
      off(document, "touchmove", nearestEmptyInsertDetectEvent);
    },
    _offUpEvents: function _offUpEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, "mouseup", this._onDrop);
      off(ownerDocument, "touchend", this._onDrop);
      off(ownerDocument, "pointerup", this._onDrop);
      off(ownerDocument, "touchcancel", this._onDrop);
      off(document, "selectstart", this);
    },
    _onDrop: function _onDrop(evt) {
      var el = this.el, options = this.options;
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      pluginEvent2("drop", this, {
        evt
      });
      parentEl = dragEl && dragEl.parentNode;
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      if (Sortable.eventCanceled) {
        this._nulling();
        return;
      }
      awaitingDragStarted = false;
      isCircumstantialInvert = false;
      pastFirstInvertThresh = false;
      clearInterval(this._loopId);
      clearTimeout(this._dragStartTimer);
      _cancelNextTick(this.cloneId);
      _cancelNextTick(this._dragStartId);
      if (this.nativeDraggable) {
        off(document, "drop", this);
        off(el, "dragstart", this._onDragStart);
      }
      this._offMoveEvents();
      this._offUpEvents();
      if (Safari) {
        css(document.body, "user-select", "");
      }
      css(dragEl, "transform", "");
      if (evt) {
        if (moved) {
          evt.cancelable && evt.preventDefault();
          !options.dropBubble && evt.stopPropagation();
        }
        ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
        if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
          cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
        }
        if (dragEl) {
          if (this.nativeDraggable) {
            off(dragEl, "dragend", this);
          }
          _disableDraggable(dragEl);
          dragEl.style["will-change"] = "";
          if (moved && !awaitingDragStarted) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
          }
          toggleClass(dragEl, this.options.chosenClass, false);
          _dispatchEvent({
            sortable: this,
            name: "unchoose",
            toEl: parentEl,
            newIndex: null,
            newDraggableIndex: null,
            originalEvent: evt
          });
          if (rootEl !== parentEl) {
            if (newIndex >= 0) {
              _dispatchEvent({
                rootEl: parentEl,
                name: "add",
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "remove",
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                rootEl: parentEl,
                name: "sort",
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt
              });
            }
            putSortable && putSortable.save();
          } else {
            if (newIndex !== oldIndex) {
              if (newIndex >= 0) {
                _dispatchEvent({
                  sortable: this,
                  name: "update",
                  toEl: parentEl,
                  originalEvent: evt
                });
                _dispatchEvent({
                  sortable: this,
                  name: "sort",
                  toEl: parentEl,
                  originalEvent: evt
                });
              }
            }
          }
          if (Sortable.active) {
            if (newIndex == null || newIndex === -1) {
              newIndex = oldIndex;
              newDraggableIndex = oldDraggableIndex;
            }
            _dispatchEvent({
              sortable: this,
              name: "end",
              toEl: parentEl,
              originalEvent: evt
            });
            this.save();
          }
        }
      }
      this._nulling();
    },
    _nulling: function _nulling() {
      pluginEvent2("nulling", this);
      rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
      savedInputChecked.forEach(function(el) {
        el.checked = true;
      });
      savedInputChecked.length = lastDx = lastDy = 0;
    },
    handleEvent: function handleEvent(evt) {
      switch (evt.type) {
        case "drop":
        case "dragend":
          this._onDrop(evt);
          break;
        case "dragenter":
        case "dragover":
          if (dragEl) {
            this._onDragOver(evt);
            _globalDragOver(evt);
          }
          break;
        case "selectstart":
          evt.preventDefault();
          break;
      }
    },
    toArray: function toArray() {
      var order = [], el, children = this.el.children, i = 0, n = children.length, options = this.options;
      for (; i < n; i++) {
        el = children[i];
        if (closest(el, options.draggable, this.el, false)) {
          order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
        }
      }
      return order;
    },
    sort: function sort(order, useAnimation) {
      var items = {}, rootEl2 = this.el;
      this.toArray().forEach(function(id, i) {
        var el = rootEl2.children[i];
        if (closest(el, this.options.draggable, rootEl2, false)) {
          items[id] = el;
        }
      }, this);
      useAnimation && this.captureAnimationState();
      order.forEach(function(id) {
        if (items[id]) {
          rootEl2.removeChild(items[id]);
          rootEl2.appendChild(items[id]);
        }
      });
      useAnimation && this.animateAll();
    },
    save: function save() {
      var store = this.options.store;
      store && store.set && store.set(this);
    },
    closest: function closest$1(el, selector) {
      return closest(el, selector || this.options.draggable, this.el, false);
    },
    option: function option(name, value) {
      var options = this.options;
      if (value === void 0) {
        return options[name];
      } else {
        var modifiedValue = PluginManager.modifyOption(this, name, value);
        if (typeof modifiedValue !== "undefined") {
          options[name] = modifiedValue;
        } else {
          options[name] = value;
        }
        if (name === "group") {
          _prepareGroup(options);
        }
      }
    },
    destroy: function destroy() {
      pluginEvent2("destroy", this);
      var el = this.el;
      el[expando] = null;
      off(el, "mousedown", this._onTapStart);
      off(el, "touchstart", this._onTapStart);
      off(el, "pointerdown", this._onTapStart);
      if (this.nativeDraggable) {
        off(el, "dragover", this);
        off(el, "dragenter", this);
      }
      Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
        el2.removeAttribute("draggable");
      });
      this._onDrop();
      this._disableDelayedDragEvents();
      sortables.splice(sortables.indexOf(this.el), 1);
      this.el = el = null;
    },
    _hideClone: function _hideClone() {
      if (!cloneHidden) {
        pluginEvent2("hideClone", this);
        if (Sortable.eventCanceled)
          return;
        css(cloneEl, "display", "none");
        if (this.options.removeCloneOnHide && cloneEl.parentNode) {
          cloneEl.parentNode.removeChild(cloneEl);
        }
        cloneHidden = true;
      }
    },
    _showClone: function _showClone(putSortable2) {
      if (putSortable2.lastPutMode !== "clone") {
        this._hideClone();
        return;
      }
      if (cloneHidden) {
        pluginEvent2("showClone", this);
        if (Sortable.eventCanceled)
          return;
        if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
          rootEl.insertBefore(cloneEl, dragEl);
        } else if (nextEl) {
          rootEl.insertBefore(cloneEl, nextEl);
        } else {
          rootEl.appendChild(cloneEl);
        }
        if (this.options.group.revertClone) {
          this.animate(dragEl, cloneEl);
        }
        css(cloneEl, "display", "");
        cloneHidden = false;
      }
    }
  };
  function _globalDragOver(evt) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = "move";
    }
    evt.cancelable && evt.preventDefault();
  }
  function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
    var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent("move", {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent("Event");
      evt.initEvent("move", true, true);
    }
    evt.to = toEl;
    evt.from = fromEl;
    evt.dragged = dragEl2;
    evt.draggedRect = dragRect;
    evt.related = targetEl || toEl;
    evt.relatedRect = targetRect || getRect(toEl);
    evt.willInsertAfter = willInsertAfter;
    evt.originalEvent = originalEvent;
    fromEl.dispatchEvent(evt);
    if (onMoveFn) {
      retVal = onMoveFn.call(sortable, evt, originalEvent);
    }
    return retVal;
  }
  function _disableDraggable(el) {
    el.draggable = false;
  }
  function _unsilent() {
    _silent = false;
  }
  function _ghostIsFirst(evt, vertical, sortable) {
    var rect = getRect(getChild(sortable.el, 0, sortable.options, true));
    var spacer = 10;
    return vertical ? evt.clientX < rect.left - spacer || evt.clientY < rect.top && evt.clientX < rect.right : evt.clientY < rect.top - spacer || evt.clientY < rect.bottom && evt.clientX < rect.left;
  }
  function _ghostIsLast(evt, vertical, sortable) {
    var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
    var spacer = 10;
    return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
  }
  function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
    var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
    if (!invertSwap) {
      if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
        if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
          pastFirstInvertThresh = true;
        }
        if (!pastFirstInvertThresh) {
          if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
            return -lastDirection;
          }
        } else {
          invert = true;
        }
      } else {
        if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
          return _getInsertDirection(target);
        }
      }
    }
    invert = invert || invertSwap;
    if (invert) {
      if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
        return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
      }
    }
    return 0;
  }
  function _getInsertDirection(target) {
    if (index(dragEl) < index(target)) {
      return 1;
    } else {
      return -1;
    }
  }
  function _generateId(el) {
    var str = el.tagName + el.className + el.src + el.href + el.textContent, i = str.length, sum = 0;
    while (i--) {
      sum += str.charCodeAt(i);
    }
    return sum.toString(36);
  }
  function _saveInputCheckedState(root) {
    savedInputChecked.length = 0;
    var inputs = root.getElementsByTagName("input");
    var idx = inputs.length;
    while (idx--) {
      var el = inputs[idx];
      el.checked && savedInputChecked.push(el);
    }
  }
  function _nextTick(fn) {
    return setTimeout(fn, 0);
  }
  function _cancelNextTick(id) {
    return clearTimeout(id);
  }
  if (documentExists) {
    on(document, "touchmove", function(evt) {
      if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
        evt.preventDefault();
      }
    });
  }
  Sortable.utils = {
    on,
    off,
    css,
    find,
    is: function is(el, selector) {
      return !!closest(el, selector, el, false);
    },
    extend,
    throttle,
    closest,
    toggleClass,
    clone,
    index,
    nextTick: _nextTick,
    cancelNextTick: _cancelNextTick,
    detectDirection: _detectDirection,
    getChild
  };
  Sortable.get = function(element) {
    return element[expando];
  };
  Sortable.mount = function() {
    for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins2[_key] = arguments[_key];
    }
    if (plugins2[0].constructor === Array)
      plugins2 = plugins2[0];
    plugins2.forEach(function(plugin) {
      if (!plugin.prototype || !plugin.prototype.constructor) {
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
      }
      if (plugin.utils)
        Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
      PluginManager.mount(plugin);
    });
  };
  Sortable.create = function(el, options) {
    return new Sortable(el, options);
  };
  Sortable.version = version;
  var autoScrolls = [];
  var scrollEl;
  var scrollRootEl;
  var scrolling = false;
  var lastAutoScrollX;
  var lastAutoScrollY;
  var touchEvt$1;
  var pointerElemChangedInterval;
  function AutoScrollPlugin() {
    function AutoScroll() {
      this.defaults = {
        scroll: true,
        forceAutoScrollFallback: false,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: true
      };
      for (var fn in this) {
        if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
          this[fn] = this[fn].bind(this);
        }
      }
    }
    AutoScroll.prototype = {
      dragStarted: function dragStarted2(_ref) {
        var originalEvent = _ref.originalEvent;
        if (this.sortable.nativeDraggable) {
          on(document, "dragover", this._handleAutoScroll);
        } else {
          if (this.options.supportPointer) {
            on(document, "pointermove", this._handleFallbackAutoScroll);
          } else if (originalEvent.touches) {
            on(document, "touchmove", this._handleFallbackAutoScroll);
          } else {
            on(document, "mousemove", this._handleFallbackAutoScroll);
          }
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref2) {
        var originalEvent = _ref2.originalEvent;
        if (!this.options.dragOverBubble && !originalEvent.rootEl) {
          this._handleAutoScroll(originalEvent);
        }
      },
      drop: function drop3() {
        if (this.sortable.nativeDraggable) {
          off(document, "dragover", this._handleAutoScroll);
        } else {
          off(document, "pointermove", this._handleFallbackAutoScroll);
          off(document, "touchmove", this._handleFallbackAutoScroll);
          off(document, "mousemove", this._handleFallbackAutoScroll);
        }
        clearPointerElemChangedInterval();
        clearAutoScrolls();
        cancelThrottle();
      },
      nulling: function nulling() {
        touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
        autoScrolls.length = 0;
      },
      _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
        this._handleAutoScroll(evt, true);
      },
      _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
        var _this = this;
        var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, elem = document.elementFromPoint(x, y);
        touchEvt$1 = evt;
        if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
          autoScroll(evt, this.options, elem, fallback);
          var ogElemScroller = getParentAutoScrollElement(elem, true);
          if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
            pointerElemChangedInterval && clearPointerElemChangedInterval();
            pointerElemChangedInterval = setInterval(function() {
              var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
              if (newElem !== ogElemScroller) {
                ogElemScroller = newElem;
                clearAutoScrolls();
              }
              autoScroll(evt, _this.options, newElem, fallback);
            }, 10);
            lastAutoScrollX = x;
            lastAutoScrollY = y;
          }
        } else {
          if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
            clearAutoScrolls();
            return;
          }
          autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
        }
      }
    };
    return _extends(AutoScroll, {
      pluginName: "scroll",
      initializeByDefault: true
    });
  }
  function clearAutoScrolls() {
    autoScrolls.forEach(function(autoScroll2) {
      clearInterval(autoScroll2.pid);
    });
    autoScrolls = [];
  }
  function clearPointerElemChangedInterval() {
    clearInterval(pointerElemChangedInterval);
  }
  var autoScroll = throttle(function(evt, options, rootEl2, isFallback) {
    if (!options.scroll)
      return;
    var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, sens = options.scrollSensitivity, speed = options.scrollSpeed, winScroller = getWindowScrollingElement();
    var scrollThisInstance = false, scrollCustomFn;
    if (scrollRootEl !== rootEl2) {
      scrollRootEl = rootEl2;
      clearAutoScrolls();
      scrollEl = options.scroll;
      scrollCustomFn = options.scrollFn;
      if (scrollEl === true) {
        scrollEl = getParentAutoScrollElement(rootEl2, true);
      }
    }
    var layersOut = 0;
    var currentParent = scrollEl;
    do {
      var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
      if (el === winScroller) {
        canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
        canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
      } else {
        canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
        canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
      }
      var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
      var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
      if (!autoScrolls[layersOut]) {
        for (var i = 0; i <= layersOut; i++) {
          if (!autoScrolls[i]) {
            autoScrolls[i] = {};
          }
        }
      }
      if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
        autoScrolls[layersOut].el = el;
        autoScrolls[layersOut].vx = vx;
        autoScrolls[layersOut].vy = vy;
        clearInterval(autoScrolls[layersOut].pid);
        if (vx != 0 || vy != 0) {
          scrollThisInstance = true;
          autoScrolls[layersOut].pid = setInterval(function() {
            if (isFallback && this.layer === 0) {
              Sortable.active._onTouchMove(touchEvt$1);
            }
            var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
            var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
            if (typeof scrollCustomFn === "function") {
              if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
                return;
              }
            }
            scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
          }.bind({
            layer: layersOut
          }), 24);
        }
      }
      layersOut++;
    } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
    scrolling = scrollThisInstance;
  }, 30);
  var drop = function drop2(_ref) {
    var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
    if (!originalEvent)
      return;
    var toSortable = putSortable2 || activeSortable;
    hideGhostForTarget();
    var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
    var target = document.elementFromPoint(touch.clientX, touch.clientY);
    unhideGhostForTarget();
    if (toSortable && !toSortable.el.contains(target)) {
      dispatchSortableEvent("spill");
      this.onSpill({
        dragEl: dragEl2,
        putSortable: putSortable2
      });
    }
  };
  function Revert() {
  }
  Revert.prototype = {
    startIndex: null,
    dragStart: function dragStart(_ref2) {
      var oldDraggableIndex2 = _ref2.oldDraggableIndex;
      this.startIndex = oldDraggableIndex2;
    },
    onSpill: function onSpill(_ref3) {
      var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
      this.sortable.captureAnimationState();
      if (putSortable2) {
        putSortable2.captureAnimationState();
      }
      var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
      if (nextSibling) {
        this.sortable.el.insertBefore(dragEl2, nextSibling);
      } else {
        this.sortable.el.appendChild(dragEl2);
      }
      this.sortable.animateAll();
      if (putSortable2) {
        putSortable2.animateAll();
      }
    },
    drop
  };
  _extends(Revert, {
    pluginName: "revertOnSpill"
  });
  function Remove() {
  }
  Remove.prototype = {
    onSpill: function onSpill2(_ref4) {
      var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
      var parentSortable = putSortable2 || this.sortable;
      parentSortable.captureAnimationState();
      dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
      parentSortable.animateAll();
    },
    drop
  };
  _extends(Remove, {
    pluginName: "removeOnSpill"
  });
  var multiDragElements = [];
  var multiDragClones = [];
  var lastMultiDragSelect;
  var multiDragSortable;
  var initialFolding = false;
  var folding = false;
  var dragStarted = false;
  var dragEl$1;
  var clonesFromRect;
  var clonesHidden;
  function MultiDragPlugin() {
    function MultiDrag(sortable) {
      for (var fn in this) {
        if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
          this[fn] = this[fn].bind(this);
        }
      }
      if (!sortable.options.avoidImplicitDeselect) {
        if (sortable.options.supportPointer) {
          on(document, "pointerup", this._deselectMultiDrag);
        } else {
          on(document, "mouseup", this._deselectMultiDrag);
          on(document, "touchend", this._deselectMultiDrag);
        }
      }
      on(document, "keydown", this._checkKeyDown);
      on(document, "keyup", this._checkKeyUp);
      this.defaults = {
        selectedClass: "sortable-selected",
        multiDragKey: null,
        avoidImplicitDeselect: false,
        setData: function setData(dataTransfer, dragEl2) {
          var data = "";
          if (multiDragElements.length && multiDragSortable === sortable) {
            multiDragElements.forEach(function(multiDragElement, i) {
              data += (!i ? "" : ", ") + multiDragElement.textContent;
            });
          } else {
            data = dragEl2.textContent;
          }
          dataTransfer.setData("Text", data);
        }
      };
    }
    MultiDrag.prototype = {
      multiDragKeyDown: false,
      isMultiDrag: false,
      delayStartGlobal: function delayStartGlobal(_ref) {
        var dragged = _ref.dragEl;
        dragEl$1 = dragged;
      },
      delayEnded: function delayEnded() {
        this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
      },
      setupClone: function setupClone(_ref2) {
        var sortable = _ref2.sortable, cancel = _ref2.cancel;
        if (!this.isMultiDrag)
          return;
        for (var i = 0; i < multiDragElements.length; i++) {
          multiDragClones.push(clone(multiDragElements[i]));
          multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
          multiDragClones[i].draggable = false;
          multiDragClones[i].style["will-change"] = "";
          toggleClass(multiDragClones[i], this.options.selectedClass, false);
          multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
        }
        sortable._hideClone();
        cancel();
      },
      clone: function clone2(_ref3) {
        var sortable = _ref3.sortable, rootEl2 = _ref3.rootEl, dispatchSortableEvent = _ref3.dispatchSortableEvent, cancel = _ref3.cancel;
        if (!this.isMultiDrag)
          return;
        if (!this.options.removeCloneOnHide) {
          if (multiDragElements.length && multiDragSortable === sortable) {
            insertMultiDragClones(true, rootEl2);
            dispatchSortableEvent("clone");
            cancel();
          }
        }
      },
      showClone: function showClone(_ref4) {
        var cloneNowShown = _ref4.cloneNowShown, rootEl2 = _ref4.rootEl, cancel = _ref4.cancel;
        if (!this.isMultiDrag)
          return;
        insertMultiDragClones(false, rootEl2);
        multiDragClones.forEach(function(clone2) {
          css(clone2, "display", "");
        });
        cloneNowShown();
        clonesHidden = false;
        cancel();
      },
      hideClone: function hideClone(_ref5) {
        var _this = this;
        var sortable = _ref5.sortable, cloneNowHidden = _ref5.cloneNowHidden, cancel = _ref5.cancel;
        if (!this.isMultiDrag)
          return;
        multiDragClones.forEach(function(clone2) {
          css(clone2, "display", "none");
          if (_this.options.removeCloneOnHide && clone2.parentNode) {
            clone2.parentNode.removeChild(clone2);
          }
        });
        cloneNowHidden();
        clonesHidden = true;
        cancel();
      },
      dragStartGlobal: function dragStartGlobal(_ref6) {
        var sortable = _ref6.sortable;
        if (!this.isMultiDrag && multiDragSortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();
        }
        multiDragElements.forEach(function(multiDragElement) {
          multiDragElement.sortableIndex = index(multiDragElement);
        });
        multiDragElements = multiDragElements.sort(function(a, b) {
          return a.sortableIndex - b.sortableIndex;
        });
        dragStarted = true;
      },
      dragStarted: function dragStarted2(_ref7) {
        var _this2 = this;
        var sortable = _ref7.sortable;
        if (!this.isMultiDrag)
          return;
        if (this.options.sort) {
          sortable.captureAnimationState();
          if (this.options.animation) {
            multiDragElements.forEach(function(multiDragElement) {
              if (multiDragElement === dragEl$1)
                return;
              css(multiDragElement, "position", "absolute");
            });
            var dragRect = getRect(dragEl$1, false, true, true);
            multiDragElements.forEach(function(multiDragElement) {
              if (multiDragElement === dragEl$1)
                return;
              setRect(multiDragElement, dragRect);
            });
            folding = true;
            initialFolding = true;
          }
        }
        sortable.animateAll(function() {
          folding = false;
          initialFolding = false;
          if (_this2.options.animation) {
            multiDragElements.forEach(function(multiDragElement) {
              unsetRect(multiDragElement);
            });
          }
          if (_this2.options.sort) {
            removeMultiDragElements();
          }
        });
      },
      dragOver: function dragOver(_ref8) {
        var target = _ref8.target, completed = _ref8.completed, cancel = _ref8.cancel;
        if (folding && ~multiDragElements.indexOf(target)) {
          completed(false);
          cancel();
        }
      },
      revert: function revert(_ref9) {
        var fromSortable = _ref9.fromSortable, rootEl2 = _ref9.rootEl, sortable = _ref9.sortable, dragRect = _ref9.dragRect;
        if (multiDragElements.length > 1) {
          multiDragElements.forEach(function(multiDragElement) {
            sortable.addAnimationState({
              target: multiDragElement,
              rect: folding ? getRect(multiDragElement) : dragRect
            });
            unsetRect(multiDragElement);
            multiDragElement.fromRect = dragRect;
            fromSortable.removeAnimationState(multiDragElement);
          });
          folding = false;
          insertMultiDragElements(!this.options.removeCloneOnHide, rootEl2);
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref10) {
        var sortable = _ref10.sortable, isOwner = _ref10.isOwner, insertion = _ref10.insertion, activeSortable = _ref10.activeSortable, parentEl2 = _ref10.parentEl, putSortable2 = _ref10.putSortable;
        var options = this.options;
        if (insertion) {
          if (isOwner) {
            activeSortable._hideClone();
          }
          initialFolding = false;
          if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable2)) {
            var dragRectAbsolute = getRect(dragEl$1, false, true, true);
            multiDragElements.forEach(function(multiDragElement) {
              if (multiDragElement === dragEl$1)
                return;
              setRect(multiDragElement, dragRectAbsolute);
              parentEl2.appendChild(multiDragElement);
            });
            folding = true;
          }
          if (!isOwner) {
            if (!folding) {
              removeMultiDragElements();
            }
            if (multiDragElements.length > 1) {
              var clonesHiddenBefore = clonesHidden;
              activeSortable._showClone(sortable);
              if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
                multiDragClones.forEach(function(clone2) {
                  activeSortable.addAnimationState({
                    target: clone2,
                    rect: clonesFromRect
                  });
                  clone2.fromRect = clonesFromRect;
                  clone2.thisAnimationDuration = null;
                });
              }
            } else {
              activeSortable._showClone(sortable);
            }
          }
        }
      },
      dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
        var dragRect = _ref11.dragRect, isOwner = _ref11.isOwner, activeSortable = _ref11.activeSortable;
        multiDragElements.forEach(function(multiDragElement) {
          multiDragElement.thisAnimationDuration = null;
        });
        if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
          clonesFromRect = _extends({}, dragRect);
          var dragMatrix = matrix(dragEl$1, true);
          clonesFromRect.top -= dragMatrix.f;
          clonesFromRect.left -= dragMatrix.e;
        }
      },
      dragOverAnimationComplete: function dragOverAnimationComplete() {
        if (folding) {
          folding = false;
          removeMultiDragElements();
        }
      },
      drop: function drop3(_ref12) {
        var evt = _ref12.originalEvent, rootEl2 = _ref12.rootEl, parentEl2 = _ref12.parentEl, sortable = _ref12.sortable, dispatchSortableEvent = _ref12.dispatchSortableEvent, oldIndex2 = _ref12.oldIndex, putSortable2 = _ref12.putSortable;
        var toSortable = putSortable2 || this.sortable;
        if (!evt)
          return;
        var options = this.options, children = parentEl2.children;
        if (!dragStarted) {
          if (options.multiDragKey && !this.multiDragKeyDown) {
            this._deselectMultiDrag();
          }
          toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));
          if (!~multiDragElements.indexOf(dragEl$1)) {
            multiDragElements.push(dragEl$1);
            dispatchEvent({
              sortable,
              rootEl: rootEl2,
              name: "select",
              targetEl: dragEl$1,
              originalEvent: evt
            });
            if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
              var lastIndex = index(lastMultiDragSelect), currentIndex = index(dragEl$1);
              if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
                var n, i;
                if (currentIndex > lastIndex) {
                  i = lastIndex;
                  n = currentIndex;
                } else {
                  i = currentIndex;
                  n = lastIndex + 1;
                }
                for (; i < n; i++) {
                  if (~multiDragElements.indexOf(children[i]))
                    continue;
                  toggleClass(children[i], options.selectedClass, true);
                  multiDragElements.push(children[i]);
                  dispatchEvent({
                    sortable,
                    rootEl: rootEl2,
                    name: "select",
                    targetEl: children[i],
                    originalEvent: evt
                  });
                }
              }
            } else {
              lastMultiDragSelect = dragEl$1;
            }
            multiDragSortable = toSortable;
          } else {
            multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
            lastMultiDragSelect = null;
            dispatchEvent({
              sortable,
              rootEl: rootEl2,
              name: "deselect",
              targetEl: dragEl$1,
              originalEvent: evt
            });
          }
        }
        if (dragStarted && this.isMultiDrag) {
          folding = false;
          if ((parentEl2[expando].options.sort || parentEl2 !== rootEl2) && multiDragElements.length > 1) {
            var dragRect = getRect(dragEl$1), multiDragIndex = index(dragEl$1, ":not(." + this.options.selectedClass + ")");
            if (!initialFolding && options.animation)
              dragEl$1.thisAnimationDuration = null;
            toSortable.captureAnimationState();
            if (!initialFolding) {
              if (options.animation) {
                dragEl$1.fromRect = dragRect;
                multiDragElements.forEach(function(multiDragElement) {
                  multiDragElement.thisAnimationDuration = null;
                  if (multiDragElement !== dragEl$1) {
                    var rect = folding ? getRect(multiDragElement) : dragRect;
                    multiDragElement.fromRect = rect;
                    toSortable.addAnimationState({
                      target: multiDragElement,
                      rect
                    });
                  }
                });
              }
              removeMultiDragElements();
              multiDragElements.forEach(function(multiDragElement) {
                if (children[multiDragIndex]) {
                  parentEl2.insertBefore(multiDragElement, children[multiDragIndex]);
                } else {
                  parentEl2.appendChild(multiDragElement);
                }
                multiDragIndex++;
              });
              if (oldIndex2 === index(dragEl$1)) {
                var update = false;
                multiDragElements.forEach(function(multiDragElement) {
                  if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                    update = true;
                    return;
                  }
                });
                if (update) {
                  dispatchSortableEvent("update");
                }
              }
            }
            multiDragElements.forEach(function(multiDragElement) {
              unsetRect(multiDragElement);
            });
            toSortable.animateAll();
          }
          multiDragSortable = toSortable;
        }
        if (rootEl2 === parentEl2 || putSortable2 && putSortable2.lastPutMode !== "clone") {
          multiDragClones.forEach(function(clone2) {
            clone2.parentNode && clone2.parentNode.removeChild(clone2);
          });
        }
      },
      nullingGlobal: function nullingGlobal() {
        this.isMultiDrag = dragStarted = false;
        multiDragClones.length = 0;
      },
      destroyGlobal: function destroyGlobal() {
        this._deselectMultiDrag();
        off(document, "pointerup", this._deselectMultiDrag);
        off(document, "mouseup", this._deselectMultiDrag);
        off(document, "touchend", this._deselectMultiDrag);
        off(document, "keydown", this._checkKeyDown);
        off(document, "keyup", this._checkKeyUp);
      },
      _deselectMultiDrag: function _deselectMultiDrag(evt) {
        if (typeof dragStarted !== "undefined" && dragStarted)
          return;
        if (multiDragSortable !== this.sortable)
          return;
        if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false))
          return;
        if (evt && evt.button !== 0)
          return;
        while (multiDragElements.length) {
          var el = multiDragElements[0];
          toggleClass(el, this.options.selectedClass, false);
          multiDragElements.shift();
          dispatchEvent({
            sortable: this.sortable,
            rootEl: this.sortable.el,
            name: "deselect",
            targetEl: el,
            originalEvent: evt
          });
        }
      },
      _checkKeyDown: function _checkKeyDown(evt) {
        if (evt.key === this.options.multiDragKey) {
          this.multiDragKeyDown = true;
        }
      },
      _checkKeyUp: function _checkKeyUp(evt) {
        if (evt.key === this.options.multiDragKey) {
          this.multiDragKeyDown = false;
        }
      }
    };
    return _extends(MultiDrag, {
      pluginName: "multiDrag",
      utils: {
        select: function select(el) {
          var sortable = el.parentNode[expando];
          if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el))
            return;
          if (multiDragSortable && multiDragSortable !== sortable) {
            multiDragSortable.multiDrag._deselectMultiDrag();
            multiDragSortable = sortable;
          }
          toggleClass(el, sortable.options.selectedClass, true);
          multiDragElements.push(el);
        },
        deselect: function deselect(el) {
          var sortable = el.parentNode[expando], index2 = multiDragElements.indexOf(el);
          if (!sortable || !sortable.options.multiDrag || !~index2)
            return;
          toggleClass(el, sortable.options.selectedClass, false);
          multiDragElements.splice(index2, 1);
        }
      },
      eventProperties: function eventProperties() {
        var _this3 = this;
        var oldIndicies = [], newIndicies = [];
        multiDragElements.forEach(function(multiDragElement) {
          oldIndicies.push({
            multiDragElement,
            index: multiDragElement.sortableIndex
          });
          var newIndex2;
          if (folding && multiDragElement !== dragEl$1) {
            newIndex2 = -1;
          } else if (folding) {
            newIndex2 = index(multiDragElement, ":not(." + _this3.options.selectedClass + ")");
          } else {
            newIndex2 = index(multiDragElement);
          }
          newIndicies.push({
            multiDragElement,
            index: newIndex2
          });
        });
        return {
          items: _toConsumableArray(multiDragElements),
          clones: [].concat(multiDragClones),
          oldIndicies,
          newIndicies
        };
      },
      optionListeners: {
        multiDragKey: function multiDragKey(key) {
          key = key.toLowerCase();
          if (key === "ctrl") {
            key = "Control";
          } else if (key.length > 1) {
            key = key.charAt(0).toUpperCase() + key.substr(1);
          }
          return key;
        }
      }
    });
  }
  function insertMultiDragElements(clonesInserted, rootEl2) {
    multiDragElements.forEach(function(multiDragElement, i) {
      var target = rootEl2.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];
      if (target) {
        rootEl2.insertBefore(multiDragElement, target);
      } else {
        rootEl2.appendChild(multiDragElement);
      }
    });
  }
  function insertMultiDragClones(elementsInserted, rootEl2) {
    multiDragClones.forEach(function(clone2, i) {
      var target = rootEl2.children[clone2.sortableIndex + (elementsInserted ? Number(i) : 0)];
      if (target) {
        rootEl2.insertBefore(clone2, target);
      } else {
        rootEl2.appendChild(clone2);
      }
    });
  }
  function removeMultiDragElements() {
    multiDragElements.forEach(function(multiDragElement) {
      if (multiDragElement === dragEl$1)
        return;
      multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
    });
  }
  Sortable.mount(new AutoScrollPlugin());
  Sortable.mount(Remove, Revert);
  var sortable_esm_default = Sortable;

  // client/django-formset/FileUploadWidget.ts
  var import_lodash = __toModule(require_lodash5());
  var FileUploadWidget = class {
    constructor(fieldGroup, inputElement) {
      this.progressBar = null;
      this.fileDrop = (event) => {
        this.swallowEvent(event);
        if (event.dataTransfer) {
          this.field.touch();
          this.inputElement.files = event.dataTransfer.files;
          this.uploadFiles(this.inputElement.files).then(() => {
            this.field.inputted();
            this.field.validate();
          });
        }
      };
      this.fileRemove = () => {
        this.inputElement.value = "";
        this.uploadedFiles = this.initialData.length > 0 ? [{}] : [];
        while (this.dropbox.firstChild) {
          this.dropbox.removeChild(this.dropbox.firstChild);
        }
        this.dropbox.appendChild(this.emptyDropboxItem);
        this.field.touch();
        this.field.inputted();
        this.field.validate();
      };
      this.swallowEvent = (event) => {
        event.stopPropagation();
        event.preventDefault();
      };
      this.field = fieldGroup;
      this.inputElement = inputElement;
      this.dropbox = this.field.element.querySelector("figure.dj-dropbox");
      if (!this.dropbox)
        throw new Error('Element <input type="file"> requires sibling element <figure class="dj-dropbox"></figure>');
      this.chooseFileButton = this.field.element.querySelector("button.dj-choose-file");
      if (!this.chooseFileButton)
        throw new Error('Element <input type="file"> requires sibling element <button class="dj-choose-file"></button>');
      this.progressBar = this.field.element.querySelector("progress");
      if (this.progressBar) {
        this.progressBar.style.visibility = "hidden";
      }
      this.emptyDropboxItem = this.dropbox.querySelector("div.dj-empty-item");
      if (!this.emptyDropboxItem)
        throw new Error('Element <input type="file"> requires sibling element <figure><div class="dj-empty-item"></div></figure>');
      const dropboxItemTemplate = this.field.element.querySelector(".dj-dropbox-items");
      if (!dropboxItemTemplate)
        throw new Error('Element <input type="file"> requires sibling element <template class="dj-dropbox-items"></template>');
      this.dropboxItemTemplate = (0, import_lodash.default)(dropboxItemTemplate.innerHTML);
      this.observer = new MutationObserver((mutationsList) => this.attributesChanged(mutationsList));
      this.observer.observe(this.inputElement, {attributes: true});
      this.chooseFileButton.disabled = inputElement.disabled;
      const initialData = document.getElementById(`initial_${inputElement.id}`);
      if (initialData?.textContent) {
        this.uploadedFiles = this.initialData = [JSON.parse(initialData.textContent)];
        this.renderDropbox();
      } else {
        this.uploadedFiles = this.initialData = [];
      }
      this.dropbox.addEventListener("dragenter", this.swallowEvent);
      this.dropbox.addEventListener("dragover", this.swallowEvent);
      this.dropbox.addEventListener("drop", this.fileDrop);
      this.chooseFileButton.addEventListener("click", () => inputElement.click());
      inputElement.addEventListener("change", () => this.uploadFiles(this.inputElement.files).then(() => {
        this.field.inputted();
        this.field.validate();
      }).catch(() => {
        this.field.reportFailedUpload();
      }).finally(() => this.field.touch()));
    }
    async uploadFiles(files) {
      if (!files || files.length === 0)
        return Promise.reject();
      return new Promise((resolve, reject) => {
        const file = files.item(0);
        if (file) {
          this.uploadFile(file, this.dropbox.clientHeight).then((response) => {
            this.uploadedFiles = [response];
            this.renderDropbox();
            this.field.inputted();
            resolve();
          }).catch(() => {
            reject();
          });
        } else {
          reject();
        }
      });
    }
    async uploadFile(file, imageHeight) {
      let self2 = this;
      function updateProgress(event) {
        const complete = event.lengthComputable ? event.loaded / event.total : 0;
        if (self2.progressBar) {
          self2.progressBar.style.visibility = "visible";
          self2.progressBar.value = 0.95 * complete;
        }
      }
      const body = new FormData();
      body.append("temp_file", file);
      body.append("image_height", imageHeight.toString());
      return new Promise((resolve, reject) => {
        function transferComplete() {
          if (self2.progressBar) {
            self2.progressBar.value = 1;
            window.setTimeout(() => self2.progressBar.style.visibility = "hidden", 333);
          }
          if (request.status === 200) {
            resolve(request.response);
          } else {
            reject(request.response);
          }
        }
        const request = new XMLHttpRequest();
        if (self2.progressBar) {
          request.addEventListener("loadstart", updateProgress);
          request.upload.addEventListener("progress", updateProgress, false);
        }
        request.addEventListener("loadend", transferComplete);
        request.open("POST", this.field.form.formset.endpoint, true);
        const csrfToken = this.field.form.formset.CSRFToken;
        if (csrfToken) {
          request.setRequestHeader("X-CSRFToken", csrfToken);
        }
        request.responseType = "json";
        request.send(body);
      });
    }
    renderDropbox() {
      let list = [];
      for (const fileHandle of this.uploadedFiles) {
        list.push(this.dropboxItemTemplate(fileHandle));
      }
      if (list.length > 0) {
        this.dropbox.innerHTML = list.join("");
      } else {
        this.dropbox.replaceChildren(this.emptyDropboxItem);
      }
      const button = this.dropbox.querySelector(".dj-delete-file");
      if (button) {
        button.addEventListener("click", this.fileRemove, {once: true});
      }
    }
    attributesChanged(mutationsList) {
      for (const mutation of mutationsList) {
        if (mutation.type === "attributes" && mutation.attributeName === "disabled" && this.chooseFileButton.disabled != this.inputElement.disabled) {
          this.chooseFileButton.disabled = this.inputElement.disabled;
        }
      }
    }
    inProgress() {
      return !!this.inputElement.files && this.inputElement.files.length > this.uploadedFiles.length;
    }
    resetToInitial() {
      this.uploadedFiles = this.initialData;
      this.renderDropbox();
    }
  };

  // client/django-formset/tag-attributes.ts
  "use strict";
  function peg$padEnd(str, targetLength, padString) {
    padString = padString || " ";
    if (str.length > targetLength) {
      return str;
    }
    targetLength -= str.length;
    padString += padString.repeat(targetLength);
    return str + padString.slice(0, targetLength);
  }
  var SyntaxError = class extends Error {
    static buildMessage(expected, found) {
      function hex(ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
      }
      function literalEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex(ch)).replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex(ch));
      }
      function classEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex(ch)).replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex(ch));
      }
      function describeExpectation(expectation) {
        switch (expectation.type) {
          case "literal":
            return '"' + literalEscape(expectation.text) + '"';
          case "class":
            const escapedParts = expectation.parts.map((part) => {
              return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
            });
            return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
          case "any":
            return "any character";
          case "end":
            return "end of input";
          case "other":
            return expectation.description;
        }
      }
      function describeExpected(expected1) {
        const descriptions = expected1.map(describeExpectation);
        let i;
        let j;
        descriptions.sort();
        if (descriptions.length > 0) {
          for (i = 1, j = 1; i < descriptions.length; i++) {
            if (descriptions[i - 1] !== descriptions[i]) {
              descriptions[j] = descriptions[i];
              j++;
            }
          }
          descriptions.length = j;
        }
        switch (descriptions.length) {
          case 1:
            return descriptions[0];
          case 2:
            return descriptions[0] + " or " + descriptions[1];
          default:
            return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
        }
      }
      function describeFound(found1) {
        return found1 ? '"' + literalEscape(found1) + '"' : "end of input";
      }
      return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    }
    constructor(message, expected, found, location2) {
      super();
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location2;
      this.name = "SyntaxError";
      if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(this, SyntaxError.prototype);
      } else {
        this.__proto__ = SyntaxError.prototype;
      }
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, SyntaxError);
      }
    }
    format(sources) {
      let str = "Error: " + this.message;
      if (this.location) {
        let src = null;
        let k;
        for (k = 0; k < sources.length; k++) {
          if (sources[k].source === this.location.source) {
            src = sources[k].text.split(/\r\n|\n|\r/g);
            break;
          }
        }
        let s = this.location.start;
        let loc = this.location.source + ":" + s.line + ":" + s.column;
        if (src) {
          let e = this.location.end;
          let filler = peg$padEnd("", s.line.toString().length, " ");
          let line = src[s.line - 1];
          let last = s.line === e.line ? e.column : line.length + 1;
          str += "\n --> " + loc + "\n" + filler + " |\n" + s.line + " | " + line + "\n" + filler + " | " + peg$padEnd("", s.column - 1, " ") + peg$padEnd("", last - s.column, "^");
        } else {
          str += "\n at " + loc;
        }
      }
      return str;
    }
  };
  function peg$parse(input, options) {
    options = options !== void 0 ? options : {};
    const peg$FAILED = {};
    const peg$source = options.grammarSource;
    const peg$startRuleIndices = {Actions: 5, Expression: 0};
    let peg$startRuleIndex = 5;
    const peg$consts = [
      function(head, tail) {
        return tail.reduce(function(result, element) {
          return result + element[1] + element[3];
        }, head);
      },
      function() {
        return "false";
      },
      "===",
      peg$literalExpectation("===", false),
      "==",
      peg$literalExpectation("==", false),
      "!==",
      peg$literalExpectation("!==", false),
      "!=",
      peg$literalExpectation("!=", false),
      "<=",
      peg$literalExpectation("<=", false),
      ">=",
      peg$literalExpectation(">=", false),
      "<",
      peg$literalExpectation("<", false),
      ">",
      peg$literalExpectation(">", false),
      "+",
      peg$literalExpectation("+", false),
      "-",
      peg$literalExpectation("-", false),
      "*",
      peg$literalExpectation("*", false),
      "/",
      peg$literalExpectation("/", false),
      "&&",
      peg$literalExpectation("&&", false),
      "&",
      peg$literalExpectation("&", false),
      "||",
      peg$literalExpectation("||", false),
      "|",
      peg$literalExpectation("|", false),
      "!",
      peg$literalExpectation("!", false),
      "(",
      peg$literalExpectation("(", false),
      ")",
      peg$literalExpectation(")", false),
      function(expr) {
        return "(" + expr + ")";
      },
      function(s) {
        return "'" + s + "'";
      },
      function(path) {
        const parts = path.split(".").map((part) => "'" + part + "'");
        return "this.getDataValue([" + parts.join(",") + "])";
      },
      "!~",
      peg$literalExpectation("!~", false),
      function(successChain, rejectChain) {
        return {successChain, rejectChain};
      },
      function(successChain) {
        return {successChain, rejectChain: []};
      },
      "->",
      peg$literalExpectation("->", false),
      function(lhs, rhs) {
        return [lhs].concat(rhs);
      },
      function(func) {
        return [func];
      },
      function(funcname, args) {
        return {funcname, args};
      },
      "()",
      peg$literalExpectation("()", false),
      function(funcname) {
        return {funcname, args: []};
      },
      ",",
      peg$literalExpectation(",", false),
      function(arg) {
        return [arg];
      },
      /^[ \t\n\r]/,
      peg$classExpectation([" ", "	", "\n", "\r"], false, false),
      "[",
      peg$literalExpectation("[", false),
      "{",
      peg$literalExpectation("{", false),
      "]",
      peg$literalExpectation("]", false),
      "}",
      peg$literalExpectation("}", false),
      ":",
      peg$literalExpectation(":", false),
      function(head, m) {
        return m;
      },
      function(head, tail) {
        var result = {};
        [head].concat(tail).forEach(function(element) {
          result[element.name] = element.value;
        });
        return result;
      },
      function(members) {
        return members !== null ? members : {};
      },
      function(name, value) {
        return {name, value};
      },
      /^[$A-Za-z_]/,
      peg$classExpectation(["$", ["A", "Z"], ["a", "z"], "_"], false, false),
      /^[$0-9A-Za-z_]/,
      peg$classExpectation(["$", ["0", "9"], ["A", "Z"], ["a", "z"], "_"], false, false),
      function(head, v) {
        return v;
      },
      function(head, tail) {
        return [head].concat(tail);
      },
      function(values) {
        return values !== null ? values : [];
      },
      peg$otherExpectation("number"),
      function() {
        return parseFloat(text());
      },
      ".",
      peg$literalExpectation(".", false),
      /^[1-9]/,
      peg$classExpectation([["1", "9"]], false, false),
      /^[eE]/,
      peg$classExpectation(["e", "E"], false, false),
      "0",
      peg$literalExpectation("0", false),
      peg$otherExpectation("string"),
      '"',
      peg$literalExpectation('"', false),
      function(chars) {
        return chars;
      },
      "'",
      peg$literalExpectation("'", false),
      /^[^\0-\x1F"\\]/,
      peg$classExpectation([["\0", ""], '"', "\\"], true, false),
      '\\"',
      peg$literalExpectation('\\"', false),
      function() {
        return '"';
      },
      /^[^\0-\x1F'\\]/,
      peg$classExpectation([["\0", ""], "'", "\\"], true, false),
      "\\'",
      peg$literalExpectation("\\'", false),
      function() {
        return "'";
      },
      "\\\\",
      peg$literalExpectation("\\\\", false),
      "\\b",
      peg$literalExpectation("\\b", false),
      "\\f",
      peg$literalExpectation("\\f", false),
      "\\n",
      peg$literalExpectation("\\n", false),
      "\\r",
      peg$literalExpectation("\\r", false),
      "\\t",
      peg$literalExpectation("\\t", false),
      "\\u",
      peg$literalExpectation("\\u", false),
      function(digits) {
        return String.fromCharCode(parseInt(digits, 16));
      },
      peg$otherExpectation("boolean"),
      function() {
        return true;
      },
      function() {
        return false;
      },
      function() {
        return null;
      },
      "false",
      peg$literalExpectation("false", false),
      "true",
      peg$literalExpectation("true", false),
      "null",
      peg$literalExpectation("null", false),
      function(head, tail) {
        return tail.reduce(function(result, element) {
          return result + "." + element[1];
        }, head);
      },
      "...",
      peg$literalExpectation("...", false),
      "..",
      peg$literalExpectation("..", false),
      function(prefix, variable) {
        return prefix + variable;
      },
      function(var_starter, var_remainder) {
        return var_starter + var_remainder;
      },
      /^[$a-zA-Z_]/,
      peg$classExpectation(["$", ["a", "z"], ["A", "Z"], "_"], false, false),
      /^[$a-zA-Z0-9_]/,
      peg$classExpectation(["$", ["a", "z"], ["A", "Z"], ["0", "9"], "_"], false, false),
      function(identifier) {
        return identifier instanceof Array ? identifier.join("") : identifier;
      },
      /^[0-9]/,
      peg$classExpectation([["0", "9"]], false, false),
      /^[0-9a-f]/i,
      peg$classExpectation([["0", "9"], ["a", "f"]], false, true)
    ];
    const peg$bytecode = [
      peg$decode(`%;*/\x9E#;#/\x95$;*/\x8C$$%;*/>#;!/5$;*/,$; /#$+$)($'#(#'#("'#&'#0H*%;*/>#;!/5$;*/,$; /#$+$)($'#(#'#("'#&'#&/2$;*/)$8%: %"#!)(%'#($'#(#'#("'#&'#.. &%;*/& 8!:!! )`),
      peg$decode(`2"""6"7#.\xD1 &2$""6$7%.\xC5 &2&""6&7'.\xB9 &2(""6(7).\xAD &2*""6*7+.\xA1 &2,""6,7-.\x95 &2.""6.7/.\x89 &20""6071.} &22""6273.q &24""6475.e &26""6677.Y &28""6879.M &2:""6:7;.A &2<""6<7=.5 &2>""6>7?.) &2@""6@7A`),
      peg$decode('2B""6B7C'),
      peg$decode(`%2D""6D7E/R#;*/I$; /@$;*/7$2F""6F7G/($8%:H%!")(%'#($'#(#'#("'#&'#.A &;6.; &;D.5 &;$./ &%;@/' 8!:I!! )`),
      peg$decode("%;H/' 8!:J!! )"),
      peg$decode(`%;&/\\#;*/S$2K""6K7L/D$;*/;$;&/2$;*/)$8&:M&"%!)(&'#(%'#($'#(#'#("'#&'#./ &%;&/' 8!:N!! )`),
      peg$decode(`%;'/\\#;*/S$2O""6O7P/D$;*/;$;&/2$;*/)$8&:Q&"%!)(&'#(%'#($'#(#'#("'#&'#./ &%;'/' 8!:R!! )`),
      peg$decode(`%;*/i#%;4/"!&,)/Y$2D""6D7E/J$;(/A$2F""6F7G/2$;*/)$8&:S&"$")(&'#(%'#($'#(#'#("'#&'#.a &%%;4/"!&,)/7#2T""6T7U/($8":V"!!)("'#&'#.6 &%%;4/"!&,)/' 8!:V!! )`),
      peg$decode(`%;)/S#;*/J$2W""6W7X/;$;*/2$;(/)$8%:Q%"$ )(%'#($'#(#'#("'#&'#./ &%;)/' 8!:Y!! )`),
      peg$decode(";6./ &;@.) &;2.# &;5"),
      peg$decode('$4Z""5!7[0)*4Z""5!7[&'),
      peg$decode(`%;*/;#2\\""6\\7]/,$;*/#$+#)(#'#("'#&'#`),
      peg$decode(`%;*/;#2^""6^7_/,$;*/#$+#)(#'#("'#&'#`),
      peg$decode(`%;*/;#2\`""6\`7a/,$;*/#$+#)(#'#("'#&'#`),
      peg$decode(`%;*/;#2b""6b7c/,$;*/#$+#)(#'#("'#&'#`),
      peg$decode(`%;*/;#2d""6d7e/,$;*/#$+#)(#'#("'#&'#`),
      peg$decode(`%;*/;#2W""6W7X/,$;*/#$+#)(#'#("'#&'#`),
      peg$decode(";D.5 &;2./ &;5.) &;6.# &;@"),
      peg$decode(`%;,/\x91#%;3/k#$%;0/2#;3/)$8":f""$ )("'#&'#0<*%;0/2#;3/)$8":f""$ )("'#&'#&/)$8":g""! )("'#&'#." &"/1$;./($8#:h#!!)(#'#("'#&'#`),
      peg$decode(`%;@/;#;//2$;1/)$8#:i#"" )(#'#("'#&'#.L &%%;4/"!&,)/;#;//2$;1/)$8#:i#"" )(#'#("'#&'#`),
      peg$decode(`%4j""5!7k/?#$4l""5!7m0)*4l""5!7m&/#$+")("'#&'#`),
      peg$decode(`%;+/\x91#%;1/k#$%;0/2#;1/)$8":n""$ )("'#&'#0<*%;0/2#;1/)$8":n""$ )("'#&'#&/)$8":o""! )("'#&'#." &"/1$;-/($8#:p#!!)(#'#("'#&'#`),
      peg$decode(`<%;=." &"/L#;</C$;;." &"/5$;:." &"/'$8$:r$ )($'#(#'#("'#&'#=." 7q`),
      peg$decode('2s""6s7t'),
      peg$decode('4u""5!7v'),
      peg$decode('4w""5!7x'),
      peg$decode(`%;9/M#;=.# &;>." &"/9$$;M/&#0#*;M&&&#/#$+#)(#'#("'#&'#`),
      peg$decode(`%;7/9#$;M/&#0#*;M&&&#/#$+")("'#&'#`),
      peg$decode(`;?.= &%;8/3#$;M0#*;M&/#$+")("'#&'#`),
      peg$decode('24""6475'),
      peg$decode('22""6273'),
      peg$decode('2y""6y7z'),
      peg$decode(`<%2|""6|7}/N#%$;A0#*;A&/"!&,)/7$2|""6|7}/($8#:~#!!)(#'#("'#&'#.^ &%2\x7F""6\x7F7\x80/N#%$;B0#*;B&/"!&,)/7$2\x7F""6\x7F7\x80/($8#:~#!!)(#'#("'#&'#=." 7{`),
      peg$decode('4\x81""5!7\x82.: &%2\x83""6\x837\x84/& 8!:\x85! ).# &;C'),
      peg$decode('4\x86""5!7\x87.: &%2\x88""6\x887\x89/& 8!:\x8A! ).# &;C'),
      peg$decode(`2\x8B""6\x8B7\x8C.\xA9 &2\x8D""6\x8D7\x8E.\x9D &2\x8F""6\x8F7\x90.\x91 &2\x91""6\x917\x92.\x85 &2\x93""6\x937\x94.y &2\x95""6\x957\x96.m &%2\x97""6\x977\x98/]#%%;N/>#;N/5$;N/,$;N/#$+$)($'#(#'#("'#&'#/"!&,)/($8":\x99"! )("'#&'#`),
      peg$decode('<%;F/& 8!:\x9B! ).? &%;E/& 8!:\x9C! ).. &%;G/& 8!:\x9D! )=." 7\x9A'),
      peg$decode('2\x9E""6\x9E7\x9F'),
      peg$decode('2\xA0""6\xA07\xA1'),
      peg$decode('2\xA2""6\xA27\xA3'),
      peg$decode(`%;I/\x91#$%2s""6s7t/?#;J.0 &$;M/&#0#*;M&&&#/#$+")("'#&'#0O*%2s""6s7t/?#;J.0 &$;M/&#0#*;M&&&#/#$+")("'#&'#&/)$8":\xA4""! )("'#&'#`),
      peg$decode(`%2\xA5""6\xA57\xA6.5 &2\xA7""6\xA77\xA8.) &2s""6s7t/2#;J/)$8":\xA9""! )("'#&'#.# &;J`),
      peg$decode(`%;K/2#;L/)$8":\xAA""! )("'#&'#`),
      peg$decode('4\xAB""5!7\xAC'),
      peg$decode(`%$4\xAD""5!7\xAE0)*4\xAD""5!7\xAE&/' 8!:\xAF!! )`),
      peg$decode('4\xB0""5!7\xB1'),
      peg$decode('4\xB2""5!7\xB3')
    ];
    let peg$currPos = 0;
    let peg$savedPos = 0;
    const peg$posDetailsCache = [{line: 1, column: 1}];
    let peg$maxFailPos = 0;
    let peg$maxFailExpected = [];
    let peg$silentFails = 0;
    let peg$result;
    if (options.startRule !== void 0) {
      if (!(options.startRule in peg$startRuleIndices)) {
        throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
      }
      peg$startRuleIndex = peg$startRuleIndices[options.startRule];
    }
    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }
    function location2() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location1) {
      location1 = location1 !== void 0 ? location1 : peg$computeLocation(peg$savedPos, peg$currPos);
      throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location1);
    }
    function error(message, location1) {
      location1 = location1 !== void 0 ? location1 : peg$computeLocation(peg$savedPos, peg$currPos);
      throw peg$buildSimpleError(message, location1);
    }
    function peg$literalExpectation(text1, ignoreCase) {
      return {type: "literal", text: text1, ignoreCase};
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
      return {type: "class", parts, inverted, ignoreCase};
    }
    function peg$anyExpectation() {
      return {type: "any"};
    }
    function peg$endExpectation() {
      return {type: "end"};
    }
    function peg$otherExpectation(description) {
      return {type: "other", description};
    }
    function peg$computePosDetails(pos) {
      let details = peg$posDetailsCache[pos];
      let p;
      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }
        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column
        };
        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }
          p++;
        }
        peg$posDetailsCache[pos] = details;
        return details;
      }
    }
    function peg$computeLocation(startPos, endPos) {
      const startPosDetails = peg$computePosDetails(startPos);
      const endPosDetails = peg$computePosDetails(endPos);
      return {
        source: peg$source,
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }
    function peg$fail(expected1) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }
      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }
      peg$maxFailExpected.push(expected1);
    }
    function peg$buildSimpleError(message, location1) {
      return new SyntaxError(message, [], "", location1);
    }
    function peg$buildStructuredError(expected1, found, location1) {
      return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
    }
    function peg$decode(s) {
      return s.split("").map((ch) => ch.charCodeAt(0) - 32);
    }
    function peg$parseRule(index2) {
      const bc = peg$bytecode[index2];
      let ip = 0;
      const ips = [];
      let end = bc.length;
      const ends = [];
      const stack = [];
      let params;
      while (true) {
        while (ip < end) {
          switch (bc[ip]) {
            case 0:
              stack.push(peg$consts[bc[ip + 1]]);
              ip += 2;
              break;
            case 1:
              stack.push(void 0);
              ip++;
              break;
            case 2:
              stack.push(null);
              ip++;
              break;
            case 3:
              stack.push(peg$FAILED);
              ip++;
              break;
            case 4:
              stack.push([]);
              ip++;
              break;
            case 5:
              stack.push(peg$currPos);
              ip++;
              break;
            case 6:
              stack.pop();
              ip++;
              break;
            case 7:
              peg$currPos = stack.pop();
              ip++;
              break;
            case 8:
              stack.length -= bc[ip + 1];
              ip += 2;
              break;
            case 9:
              stack.splice(-2, 1);
              ip++;
              break;
            case 10:
              stack[stack.length - 2].push(stack.pop());
              ip++;
              break;
            case 11:
              stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
              ip += 2;
              break;
            case 12:
              stack.push(input.substring(stack.pop(), peg$currPos));
              ip++;
              break;
            case 13:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
              if (stack[stack.length - 1]) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }
              break;
            case 14:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
              if (stack[stack.length - 1] === peg$FAILED) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }
              break;
            case 15:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
              if (stack[stack.length - 1] !== peg$FAILED) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }
              break;
            case 16:
              if (stack[stack.length - 1] !== peg$FAILED) {
                ends.push(end);
                ips.push(ip);
                end = ip + 2 + bc[ip + 1];
                ip += 2;
              } else {
                ip += 2 + bc[ip + 1];
              }
              break;
            case 17:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
              if (input.length > peg$currPos) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }
              break;
            case 18:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);
              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }
              break;
            case 19:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);
              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }
              break;
            case 20:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);
              if (peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }
              break;
            case 21:
              stack.push(input.substr(peg$currPos, bc[ip + 1]));
              peg$currPos += bc[ip + 1];
              ip += 2;
              break;
            case 22:
              stack.push(peg$consts[bc[ip + 1]]);
              peg$currPos += peg$consts[bc[ip + 1]].length;
              ip += 2;
              break;
            case 23:
              stack.push(peg$FAILED);
              if (peg$silentFails === 0) {
                peg$fail(peg$consts[bc[ip + 1]]);
              }
              ip += 2;
              break;
            case 24:
              peg$savedPos = stack[stack.length - 1 - bc[ip + 1]];
              ip += 2;
              break;
            case 25:
              peg$savedPos = peg$currPos;
              ip++;
              break;
            case 26:
              params = bc.slice(ip + 4, ip + 4 + bc[ip + 3]).map(function(p) {
                return stack[stack.length - 1 - p];
              });
              stack.splice(stack.length - bc[ip + 2], bc[ip + 2], peg$consts[bc[ip + 1]].apply(null, params));
              ip += 4 + bc[ip + 3];
              break;
            case 27:
              stack.push(peg$parseRule(bc[ip + 1]));
              ip += 2;
              break;
            case 28:
              peg$silentFails++;
              ip++;
              break;
            case 29:
              peg$silentFails--;
              ip++;
              break;
            default:
              throw new Error("Invalid opcode: " + bc[ip] + ".");
          }
        }
        if (ends.length > 0) {
          end = ends.pop();
          ip = ips.pop();
        } else {
          break;
        }
      }
      return stack[0];
    }
    peg$result = peg$parseRule(peg$startRuleIndex);
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }
      throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
  }
  var parse = peg$parse;

  // _soeytdaom:/home/runner/work/django-formset/django-formset/client/django-formset/DjangoFormset.scss
  var DjangoFormset_default = `:root{--django-formset-color-invalid: rgb(255, 3, 0);--django-formset-shadow-invalid: rgb(255, 3, 0, 0.25);--django-formset-color-valid: rgb(0, 122, 0)}:root{--django-formset-color-invalid: rgb(255, 3, 0);--django-formset-shadow-invalid: rgb(255, 3, 0, 0.25);--django-formset-color-valid: rgb(0, 122, 0)}select::placeholder{color:gray}select.ts-hidden-accessible{display:none}django-formset .dj-errorlist{list-style:none;margin-top:0;margin-bottom:0;margin-left:0;padding-left:0;color:var(--django-formset-color-invalid)}django-formset.dj-feedback-errors django-field-group.dj-touched:not(.dj-submitted) input[type=email]:not(.dj-exempt-feedback):invalid:not(:focus),django-formset.dj-feedback-errors django-field-group.dj-touched:not(.dj-submitted) input[type=text]:not(.dj-exempt-feedback):invalid:not(:focus),django-formset.dj-feedback-errors django-field-group.dj-touched:not(.dj-submitted) input[type=number]:not(.dj-exempt-feedback):invalid:not(:focus),django-formset.dj-feedback-errors django-field-group.dj-touched:not(.dj-submitted) input[type=date]:not(.dj-exempt-feedback):invalid:not(:focus),django-formset.dj-feedback-errors django-field-group.dj-touched:not(.dj-submitted) select:not(.dj-exempt-feedback):invalid:not(:focus),django-formset.dj-feedback-errors django-field-group.dj-touched:not(.dj-submitted) textarea:not(.dj-exempt-feedback):invalid:not(:focus){border-color:var(--django-formset-color-invalid);background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 16" fill="rgb(255, 3, 0)"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/></svg>')}django-formset.dj-feedback-warnings django-field-group.dj-dirty:not(.dj-submitted) input[type=email]:not(.dj-exempt-feedback):invalid:focus,django-formset.dj-feedback-warnings django-field-group.dj-dirty:not(.dj-submitted) input[type=text]:not(.dj-exempt-feedback):invalid:focus,django-formset.dj-feedback-warnings django-field-group.dj-dirty:not(.dj-submitted) input[type=number]:not(.dj-exempt-feedback):invalid:focus,django-formset.dj-feedback-warnings django-field-group.dj-dirty:not(.dj-submitted) input[type=date]:not(.dj-exempt-feedback):invalid:focus,django-formset.dj-feedback-warnings django-field-group.dj-dirty:not(.dj-submitted) select:not(.dj-exempt-feedback):invalid:focus,django-formset.dj-feedback-warnings django-field-group.dj-dirty:not(.dj-submitted) textarea:not(.dj-exempt-feedback):invalid:focus{background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 16" fill="rgb(255, 165, 0)"><path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/><path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/></svg>')}django-formset.dj-feedback-warnings:not(.dj-feedback-errors) django-field-group.dj-dirty:not(.dj-submitted) input[type=email]:not(.dj-exempt-feedback):invalid,django-formset.dj-feedback-warnings:not(.dj-feedback-errors) django-field-group.dj-dirty:not(.dj-submitted) input[type=text]:not(.dj-exempt-feedback):invalid,django-formset.dj-feedback-warnings:not(.dj-feedback-errors) django-field-group.dj-dirty:not(.dj-submitted) input[type=number]:not(.dj-exempt-feedback):invalid,django-formset.dj-feedback-warnings:not(.dj-feedback-errors) django-field-group.dj-dirty:not(.dj-submitted) input[type=date]:not(.dj-exempt-feedback):invalid,django-formset.dj-feedback-warnings:not(.dj-feedback-errors) django-field-group.dj-dirty:not(.dj-submitted) select:not(.dj-exempt-feedback):invalid,django-formset.dj-feedback-warnings:not(.dj-feedback-errors) django-field-group.dj-dirty:not(.dj-submitted) textarea:not(.dj-exempt-feedback):invalid{background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 16" fill="rgb(255, 165, 0)"><path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/><path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/></svg>')}django-formset.dj-feedback-success django-field-group.dj-dirty input[type=email]:not(.dj-exempt-feedback):valid:not(:focus),django-formset.dj-feedback-success django-field-group.dj-dirty input[type=text]:not(.dj-exempt-feedback):valid:not(:focus),django-formset.dj-feedback-success django-field-group.dj-dirty input[type=number]:not(.dj-exempt-feedback):valid:not(:focus),django-formset.dj-feedback-success django-field-group.dj-dirty input[type=date]:not(.dj-exempt-feedback):valid:not(:focus),django-formset.dj-feedback-success django-field-group.dj-dirty select:not(.dj-exempt-feedback):valid:not(:focus),django-formset.dj-feedback-success django-field-group.dj-dirty textarea:not(.dj-exempt-feedback):valid:not(:focus){border-color:var(--django-formset-color-valid)}django-formset.dj-feedback-success django-field-group.dj-dirty input[type=email]:not(.dj-exempt-feedback):valid,django-formset.dj-feedback-success django-field-group.dj-dirty input[type=text]:not(.dj-exempt-feedback):valid,django-formset.dj-feedback-success django-field-group.dj-dirty input[type=number]:not(.dj-exempt-feedback):valid,django-formset.dj-feedback-success django-field-group.dj-dirty input[type=date]:not(.dj-exempt-feedback):valid{background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 16" fill="rgb(0, 122, 0)"><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>') !important}django-formset django-field-group{display:block}django-formset django-field-group[hidden]{display:none}django-formset django-field-group.dj-required>label,django-formset django-field-group.dj-required-any>label{font-weight:bolder}django-formset django-field-group input{background-repeat:no-repeat !important;background-position:center right !important;background-origin:content-box !important}django-formset django-field-group select,django-formset django-field-group textarea{background-image:none !important}django-formset django-field-group select.dj-concealed,django-formset django-field-group textarea.dj-concealed{display:block !important;height:1px !important;min-height:initial !important;max-height:initial !important;padding:0 !important;margin:-1px 0 0 0 !important;border:none !important;opacity:0 !important}django-formset django-field-group.dj-submitted input[type=email]:not(.dj-exempt-feedback):invalid,django-formset django-field-group.dj-submitted input[type=text]:not(.dj-exempt-feedback):invalid,django-formset django-field-group.dj-submitted input[type=number]:not(.dj-exempt-feedback):invalid,django-formset django-field-group.dj-submitted input[type=date]:not(.dj-exempt-feedback):invalid,django-formset django-field-group.dj-submitted select:not(.dj-exempt-feedback):invalid,django-formset django-field-group.dj-submitted textarea:not(.dj-exempt-feedback):invalid{border-color:var(--django-formset-color-invalid);background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 16" fill="rgb(255, 3, 0)"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/></svg>')}django-formset django-field-group.dj-submitted input[type=email]:not(.dj-exempt-feedback):invalid:focus,django-formset django-field-group.dj-submitted input[type=text]:not(.dj-exempt-feedback):invalid:focus,django-formset django-field-group.dj-submitted input[type=number]:not(.dj-exempt-feedback):invalid:focus,django-formset django-field-group.dj-submitted input[type=date]:not(.dj-exempt-feedback):invalid:focus,django-formset django-field-group.dj-submitted select:not(.dj-exempt-feedback):invalid:focus,django-formset django-field-group.dj-submitted textarea:not(.dj-exempt-feedback):invalid:focus{box-shadow:0 0 0 .2rem var(--django-formset-shadow-invalid)}django-formset django-field-group .dj-help-text{font-style:oblique}django-formset django-field-group .dj-form-optgroup{margin-bottom:.5rem}django-formset django-field-group .dj-form-optgroup>em{margin-left:.75rem}django-formset django-field-group .dj-form-inlined{display:inline-block}django-formset django-field-group input[type=file]{width:0 !important;height:0 !important}django-formset django-field-group.dj-touched input[type=date]::-webkit-calendar-picker-indicator{opacity:0}django-formset django-field-group .dj-control-panel{display:flex}django-formset django-field-group .dj-control-panel>div{height:fit-content;margin-left:.5rem}django-formset django-field-group .dj-control-panel>div progress{width:100%;margin-top:.25rem}django-formset django-field-group figure.dj-dropbox{all:unset;display:inline-flex;align-items:center;justify-content:space-between;background-color:#f5f5f5;margin:0 0 .25rem .25rem;padding:0;list-style:none;height:8rem;min-width:8rem;outline:gray thin dotted}django-formset django-field-group figure.dj-dropbox>div.dj-empty-item{flex-grow:1;text-align:center;height:auto}django-formset django-field-group figure.dj-dropbox>div.dj-empty-item p{padding-left:.5rem;padding-right:.5rem}django-formset django-field-group figure.dj-dropbox>img{all:unset;flex-grow:1;display:block;height:inherit}django-formset django-field-group figure.dj-dropbox>figcaption{all:unset;padding:.25rem .5rem;background-color:#fff;overflow-x:hidden}django-formset django-field-group figure.dj-dropbox>figcaption dl{font-size:small;margin:0 0 .25rem 0}django-formset django-field-group figure.dj-dropbox>figcaption dl dd{margin:0}django-formset django-field-group figure.dj-dropbox>figcaption .dj-delete-file,django-formset django-field-group figure.dj-dropbox>figcaption .dj-download-file{font-weight:bold;display:inline-block;cursor:pointer;text-decoration:none}django-formset django-field-group figure.dj-dropbox>figcaption .dj-delete-file:hover,django-formset django-field-group figure.dj-dropbox>figcaption .dj-download-file:hover{text-decoration:underline}django-formset django-field-group figure.dj-dropbox>figcaption .dj-download-file{margin-left:1rem;float:right}django-formset django-field-group .dj-dual-selector{display:flex}django-formset django-field-group .dj-dual-selector .left-column,django-formset django-field-group .dj-dual-selector .right-column,django-formset django-field-group .dj-dual-selector .control-column,django-formset django-field-group .dj-dual-selector .control-panel{display:flex;flex-direction:column}django-formset django-field-group .dj-dual-selector .control-column{justify-content:center;align-items:center}django-formset django-field-group .dj-dual-selector .control-panel{padding:1rem .5rem}django-formset django-field-group .dj-dual-selector select,django-formset django-field-group .dj-dual-selector django-sortable-select{width:10rem}django-formset django-field-group .dj-dual-selector button svg{vertical-align:middle}django-formset django-field-group .dj-dual-selector.invalid .right-column input{border-color:var(--django-formset-color-invalid)}django-formset django-field-group .dj-dual-selector.invalid .right-column select,django-formset django-field-group .dj-dual-selector.invalid .right-column django-sortable-select{border-left-color:var(--django-formset-color-invalid);border-right-color:var(--django-formset-color-invalid);border-bottom-color:var(--django-formset-color-invalid)}django-formset django-field-group .dj-dual-selector.invalid .right-column select:focus,django-formset django-field-group .dj-dual-selector.invalid .right-column django-sortable-select.focus{border-top-color:var(--django-formset-color-invalid);box-shadow:0 0 0 .2rem var(--django-formset-shadow-invalid)}.dj-button-decorator{vertical-align:inherit;line-height:initial}.dj-button-decorator svg{vertical-align:initial}.dj-button-decorator svg .path{stroke-dasharray:1000;stroke-dashoffset:0}.dj-button-decorator svg .path.circle{-webkit-animation:dash .9s ease-in-out;animation:dash .9s ease-in-out}.dj-button-decorator svg .path.line{stroke-dashoffset:1000;-webkit-animation:dash .9s .35s ease-in-out forwards;animation:dash .9s .35s ease-in-out forwards}.dj-button-decorator svg .path.check{stroke-dashoffset:-100;-webkit-animation:dash-check .9s .35s ease-in-out forwards;animation:dash-check .9s .35s ease-in-out forwards}@-webkit-keyframes dash{0%{stroke-dashoffset:1000}100%{stroke-dashoffset:0}}@keyframes dash{0%{stroke-dashoffset:1000}100%{stroke-dashoffset:0}}@-webkit-keyframes dash-check{0%{stroke-dashoffset:-100}100%{stroke-dashoffset:900}}@keyframes dash-check{0%{stroke-dashoffset:-100}100%{stroke-dashoffset:900}}@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.dj-button-decorator .dj-icon{display:inline-block;width:1em;height:1em}.dj-button-decorator .dj-spinner{animation:rotate 1.5s infinite linear}`;

  // client/django-formset/spinner.svg
  var spinner_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.997 11.999" version="1.1">\n  <path d="m 9.0361772,8.0640108 2.5274408,3.0120872 a 0.25,0.25 0 0 1 -0.190663,0.410623 l -3.0715852,0.01093 A 0.25,0.25 0 0 1 8.0545393,11.203495 L 8.5986838,8.1804732 A 0.25,0.25 0 0 1 9.0361772,8.0640108 Z M 0.43342482,0.92309736 2.9608657,3.9351841 A 0.25,0.25 0 0 0 3.3983591,3.8187217 L 3.9425036,0.79569959 A 0.25,0.25 0 0 0 3.6956732,0.50153852 L 0.62408782,0.5124739 a 0.25,0.25 0 0 0 -0.190663,0.41062346 z" fill="currentColor" />\n  <path fill-rule="evenodd" d="M 9.8287438,2.7856595 C 8.8311374,1.5967585 7.3973548,0.98793969 5.9568432,0.99961397 A 0.5,0.5 0 1 1 5.9484582,1.8078279e-4 6.002,6.002 0 0 1 10.56794,9.8894947 L 9.9142251,9.1104275 a 5.002,5.002 45 0 0 -0.085481,-6.324768 z m -7.745926,0.1031079 a 5.002,5.002 45 0 0 3.9573819,8.1108136 0.5,0.5 0 1 1 0.00839,0.999433 6.002,6.002 0 0 1 -4.6194819,-9.8893138 z" fill="currentColor" />\n</svg>\n';

  // client/django-formset/okay.svg
  var okay_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 0 136.2 136.2" version="1.1">\n  <circle class="path circle" fill="none" stroke="currentColor" stroke-width="12" stroke-miterlimit="10" cx="64.1" cy="68.1" r="62.1"/>\n  <polyline class="path check" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>\n</svg>\n';

  // client/django-formset/bummer.svg
  var bummer_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136.2 136.2" version="1.1">\n<circle class="path circle" fill="none" stroke="currentColor" stroke-width="12" stroke-miterlimit="10" cx="68.1" cy="68.1" r="62.1"/>\n  <line class="path line" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-miterlimit="10" x1="37.4" y1="40.9" x2="98.8" y2="95.3"/>\n  <line class="path line" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-miterlimit="10" x1="98.8" y1="41" x2="37.4" y2="95.2"/>\n</svg>\n';

  // client/django-formset/DjangoFormset.ts
  var NON_FIELD_ERRORS = "__all__";
  var COLLECTION_ERRORS = "_collection_errors_";
  var MARKED_FOR_REMOVAL = "_marked_for_removal_";
  var style = document.createElement("style");
  style.innerText = DjangoFormset_default;
  document.head.appendChild(style);
  var BoundValue = class {
    constructor(value) {
      this.value = value;
    }
    equals(other) {
      if (typeof this.value === "string") {
        return this.value === other;
      } else {
        return this.value.length === other.length && this.value.every((val, index2) => val === other[index2]);
      }
    }
  };
  var FieldErrorMessages = class extends Map {
    constructor(fieldGroup) {
      super();
      const element = fieldGroup.element.querySelector("django-error-messages");
      if (!element)
        throw new Error(`<django-field-group> for '${fieldGroup.name}' requires one <django-error-messages> tag.`);
      for (const attr of element.getAttributeNames()) {
        const clientKey = attr.replace(/([_][a-z])/g, (group) => group.toUpperCase().replace("_", ""));
        const clientValue = element.getAttribute(attr);
        if (clientValue) {
          this.set(clientKey, clientValue);
        }
      }
    }
  };
  var FieldGroup = class {
    constructor(form, element) {
      this.form = form;
      this.element = element;
      this.errorPlaceholder = element.querySelector(".dj-errorlist > .dj-placeholder");
      this.errorMessages = new FieldErrorMessages(this);
      const requiredAny = element.classList.contains("dj-required-any");
      const inputElements = Array.from(element.getElementsByTagName("INPUT")).filter((e) => e.name && e.type !== "hidden");
      for (const element2 of inputElements) {
        switch (element2.type) {
          case "checkbox":
          case "radio":
            element2.addEventListener("input", () => {
              this.touch();
              this.inputted();
            });
            element2.addEventListener("change", () => {
              requiredAny ? this.validateCheckboxSelectMultiple() : this.validate();
            });
            break;
          case "file":
            this.fileUploader = new FileUploadWidget(this, element2);
            break;
          default:
            element2.addEventListener("focus", () => this.touch());
            element2.addEventListener("input", () => this.inputted());
            element2.addEventListener("blur", () => this.validate());
            break;
        }
      }
      this.fieldElements = Array(0).concat(inputElements);
      const selectElement = Array.from(element.getElementsByTagName("SELECT")).filter((e) => e.name).at(0);
      if (selectElement) {
        selectElement.addEventListener("focus", () => this.touch());
        selectElement.addEventListener("change", () => {
          this.setDirty();
          this.clearCustomError();
          this.validate();
        });
        this.fieldElements.push(selectElement);
      }
      const textAreaElement = element.getElementsByTagName("TEXTAREA").item(0);
      if (textAreaElement instanceof HTMLTextAreaElement) {
        textAreaElement.addEventListener("focus", () => this.touch());
        textAreaElement.addEventListener("input", () => this.inputted());
        textAreaElement.addEventListener("blur", () => this.validate());
        this.fieldElements.push(textAreaElement);
      }
      this.name = this.assertUniqueName();
      this.initialDisabled = this.fieldElements.map((element2) => element2.disabled);
      if (requiredAny) {
        this.validateCheckboxSelectMultiple();
      } else {
        this.validateBoundField();
      }
      this.pristineValue = new BoundValue(this.aggregateValue());
      this.updateVisibility = this.evalVisibility("show-if", true) ?? this.evalVisibility("hide-if", false) ?? function() {
      };
      this.updateDisabled = this.evalDisable();
      this.untouch();
      this.setPristine();
    }
    aggregateValue() {
      if (this.fieldElements.length === 1) {
        const element = this.fieldElements[0];
        if (element.type === "checkbox") {
          return element.checked ? element.value : "";
        }
        if (element.type === "select-multiple") {
          const value = [];
          const select = element;
          for (const key in select.options) {
            if (select.options[key].selected) {
              value.push(select.options[key].value);
            }
          }
          return value;
        }
        if (element.type === "file") {
          if (!this.fileUploader)
            throw new Error("fileUploader expected");
          return this.fileUploader.uploadedFiles;
        }
        return element.value;
      } else {
        const value = [];
        for (let element of this.fieldElements) {
          if (element.type === "checkbox") {
            if (element.checked) {
              value.push(element.value);
            }
          } else if (element.type === "radio") {
            if (element.checked)
              return element.value;
          }
        }
        return value;
      }
    }
    updateOperability() {
      this.updateVisibility();
      this.updateDisabled();
    }
    assertUniqueName() {
      let name = "__undefined__";
      for (const element of this.fieldElements) {
        if (name === "__undefined__") {
          name = element.name;
        } else {
          if (name !== element.name)
            throw new Error(`Name '${name}' mismatch on multiple input fields on '${element.name}'`);
        }
      }
      return name;
    }
    evalVisibility(attribute, visible) {
      const attrValue = this.fieldElements[0]?.getAttribute(attribute);
      if (typeof attrValue !== "string")
        return null;
      try {
        const evalExpression = new Function("return " + parse(attrValue, {startRule: "Expression"}));
        return () => {
          const isHidden = visible != Boolean(evalExpression.call(this));
          if (this.element.hasAttribute("hidden") !== isHidden) {
            this.fieldElements.forEach((elem, index2) => elem.disabled = isHidden || this.initialDisabled[index2]);
            this.element.toggleAttribute("hidden", isHidden);
          }
        };
      } catch (error) {
        throw new Error(`Error while parsing <... show-if/hide-if="${attrValue}">: ${error}.`);
      }
    }
    evalDisable() {
      const attrValue = this.fieldElements[0]?.getAttribute("disable-if");
      if (typeof attrValue !== "string")
        return () => {
        };
      try {
        const evalExpression = new Function("return " + parse(attrValue, {startRule: "Expression"}));
        return () => {
          const disable = evalExpression.call(this);
          this.fieldElements.forEach((elem, index2) => elem.disabled = disable || this.initialDisabled[index2]);
        };
      } catch (error) {
        throw new Error(`Error while parsing <... disable-if="${attrValue}">: ${error}.`);
      }
    }
    getDataValue(path) {
      return this.form.getDataValue(path);
    }
    inputted() {
      if (this.pristineValue.equals(this.aggregateValue())) {
        this.setPristine();
      } else {
        this.setDirty();
      }
      this.clearCustomError();
    }
    clearCustomError() {
      this.form.clearCustomErrors();
      if (this.errorPlaceholder) {
        this.errorPlaceholder.innerHTML = "";
      }
      for (const element of this.fieldElements) {
        if (element.validity.customError)
          element.setCustomValidity("");
      }
    }
    resetToInitial() {
      if (this.fileUploader) {
        this.fileUploader.resetToInitial();
      }
      this.untouch();
      this.setPristine();
      this.clearCustomError();
    }
    disableAllFields() {
      this.fieldElements.forEach((elem) => elem.disabled = true);
    }
    reenableAllFields() {
      this.fieldElements.forEach((elem, index2) => elem.disabled = this.initialDisabled[index2]);
    }
    touch() {
      this.element.classList.remove("dj-untouched");
      this.element.classList.remove("dj-validated");
      this.element.classList.add("dj-touched");
    }
    untouch() {
      this.element.classList.remove("dj-touched");
      this.element.classList.add("dj-untouched");
    }
    setDirty() {
      this.element.classList.remove("dj-submitted");
      this.element.classList.remove("dj-pristine");
      this.element.classList.add("dj-dirty");
    }
    setPristine() {
      this.element.classList.remove("dj-dirty");
      this.element.classList.add("dj-pristine");
    }
    setSubmitted() {
      this.element.classList.add("dj-submitted");
    }
    validate() {
      let element = null;
      for (element of this.fieldElements) {
        if (!element.validity.valid)
          break;
      }
      if (element && !element.validity.valid) {
        for (const [key, message] of this.errorMessages) {
          if (element.validity[key]) {
            if (this.form.formset.showFeedbackMessages && this.errorPlaceholder) {
              this.errorPlaceholder.innerHTML = message;
            }
            element = null;
            break;
          }
        }
        if (this.form.formset.showFeedbackMessages && element instanceof HTMLInputElement) {
          this.validateInput(element);
        }
      }
      this.form.validate();
    }
    validateCheckboxSelectMultiple() {
      let validity = false;
      for (const inputElement of this.fieldElements) {
        if (inputElement.type !== "checkbox")
          throw new Error("Expected input element of type 'checkbox'.");
        if (inputElement.checked) {
          validity = true;
        } else {
          inputElement.setCustomValidity(this.errorMessages.get("customError") ?? "");
        }
      }
      if (validity) {
        for (const inputElement of this.fieldElements) {
          inputElement.setCustomValidity("");
        }
      } else if (this.pristineValue !== void 0 && this.errorPlaceholder && this.form.formset.showFeedbackMessages) {
        this.errorPlaceholder.innerHTML = this.errorMessages.get("customError") ?? "";
      }
      this.form.validate();
      return validity;
    }
    validateInput(inputElement) {
      if (inputElement.type === "text" && inputElement.value) {
        if (inputElement.minLength > 0 && inputElement.value.length < inputElement.minLength) {
          if (this.errorPlaceholder) {
            this.errorPlaceholder.innerHTML = this.errorMessages.get("tooShort") ?? "";
          }
          return false;
        }
        if (inputElement.maxLength > 0 && inputElement.value.length > inputElement.maxLength) {
          if (this.errorPlaceholder) {
            this.errorPlaceholder.innerHTML = this.errorMessages.get("tooLong") ?? "";
          }
          return false;
        }
      }
      if (inputElement.type === "file" && this.fileUploader) {
        if (this.fileUploader.inProgress()) {
          if (this.errorPlaceholder) {
            this.errorPlaceholder.innerHTML = this.errorMessages.get("typeMismatch") ?? "";
          }
          return false;
        }
      }
      return true;
    }
    validateBoundField() {
      if (this.fieldElements.length !== 1 || !(this.fieldElements[0] instanceof HTMLInputElement))
        return;
      const inputElement = this.fieldElements[0];
      if (!inputElement.value)
        return;
      if (inputElement.type === "text") {
        if (inputElement.minLength > 0 && inputElement.value.length < inputElement.minLength)
          return inputElement.setCustomValidity(this.errorMessages.get("tooShort") ?? "");
        if (inputElement.maxLength > 0 && inputElement.value.length > inputElement.maxLength)
          return inputElement.setCustomValidity(this.errorMessages.get("tooLong") ?? "");
      }
    }
    setValidationError() {
      let element;
      for (element of this.fieldElements) {
        if (!element.validity.valid)
          break;
      }
      for (const [key, message] of this.errorMessages) {
        if (element && element.validity[key]) {
          if (this.errorPlaceholder) {
            this.errorPlaceholder.innerHTML = message;
            element.setCustomValidity(message);
          }
          return false;
        }
      }
      if (element instanceof HTMLInputElement)
        return this.validateInput(element);
      return true;
    }
    reportCustomError(message) {
      if (this.errorPlaceholder) {
        this.errorPlaceholder.innerHTML = message;
      }
      this.fieldElements[0].setCustomValidity(message);
    }
    reportFailedUpload() {
      if (this.errorPlaceholder) {
        this.errorPlaceholder.innerHTML = this.errorMessages.get("badInput") ?? "File upload failed";
      }
    }
  };
  var ButtonAction = class {
    constructor(func, args) {
      this.func = func;
      this.args = args;
    }
  };
  var DjangoButton = class {
    constructor(formset, element) {
      this.successActions = Array(0);
      this.rejectActions = Array(0);
      this.formset = formset;
      this.element = element;
      this.initialClass = element.getAttribute("class") ?? "";
      this.isAutoDisabled = !!JSON.parse((element.getAttribute("auto-disable") ?? "false").toLowerCase());
      this.decoratorElement = element.querySelector(".dj-button-decorator");
      this.originalDecorator = this.decoratorElement?.cloneNode(true);
      this.spinnerElement = document.createElement("i");
      this.spinnerElement.classList.add("dj-icon", "dj-spinner");
      this.spinnerElement.innerHTML = spinner_default;
      this.okayElement = document.createElement("i");
      this.okayElement.classList.add("dj-icon", "dj-okay");
      this.okayElement.innerHTML = okay_default;
      this.bummerElement = document.createElement("i");
      this.bummerElement.classList.add("dj-icon", "dj-bummer");
      this.bummerElement.innerHTML = bummer_default;
      this.parseActionsQueue(element.getAttribute("click"));
      element.addEventListener("click", () => this.clicked());
    }
    clicked() {
      let promise;
      for (const [index2, action] of this.successActions.entries()) {
        if (!promise) {
          promise = action.func.apply(this, action.args)();
        } else {
          promise = promise.then(action.func.apply(this, action.args));
        }
      }
      if (promise) {
        for (const [index2, action] of this.rejectActions.entries()) {
          if (index2 === 0) {
            promise = promise.catch(action.func.apply(this, action.args));
          } else {
            promise = promise.then(action.func.apply(this, action.args));
          }
        }
        promise.finally(this.restore.apply(this));
      }
    }
    autoDisable(formValidity) {
      if (this.isAutoDisabled) {
        this.element.disabled = !formValidity;
      }
    }
    disable() {
      return (response) => {
        this.element.disabled = true;
        return Promise.resolve(response);
      };
    }
    enable() {
      return (response) => {
        this.element.disabled = false;
        return Promise.resolve(response);
      };
    }
    submit(data) {
      return () => {
        return new Promise((resolve, reject) => {
          this.formset.submit(data).then((response) => response instanceof Response && response.status === 200 ? resolve(response) : reject(response));
        });
      };
    }
    reset() {
      return (response) => {
        this.formset.resetToInitial();
        return Promise.resolve(response);
      };
    }
    reload() {
      return (response) => {
        location.reload();
        return Promise.resolve(response);
      };
    }
    proceed(proceedUrl) {
      return (response) => {
        if (typeof proceedUrl === "string" && proceedUrl.length > 0) {
          location.href = proceedUrl;
        } else if (response instanceof Response && response.status === 200) {
          response.json().then((body) => {
            if (body.success_url) {
              location.href = body.success_url;
            } else {
              console.warn("Neither a success-, nor a proceed-URL are given.");
            }
          });
        }
        return Promise.resolve(response);
      };
    }
    delay(ms) {
      return (response) => new Promise((resolve) => this.timeoutHandler = window.setTimeout(() => {
        this.timeoutHandler = void 0;
        resolve(response);
      }, ms));
    }
    spinner() {
      return (response) => {
        this.decoratorElement?.replaceChildren(this.spinnerElement);
        return Promise.resolve(response);
      };
    }
    okay(ms) {
      return this.decorate(this.okayElement, ms);
    }
    bummer(ms) {
      return this.decorate(this.bummerElement, ms);
    }
    addClass(cssClass) {
      return (response) => {
        this.element.classList.add(cssClass);
        return Promise.resolve(response);
      };
    }
    removeClass(cssClass) {
      return (response) => {
        this.element.classList.remove(cssClass);
        return Promise.resolve(response);
      };
    }
    toggleClass(cssClass) {
      return (response) => {
        this.element.classList.toggle(cssClass);
        return Promise.resolve(response);
      };
    }
    emit(namedEvent, detail) {
      return (response) => {
        const options = {bubbles: true, cancelable: true};
        if (detail !== void 0) {
          Object.assign(options, {detail});
          this.element.dispatchEvent(new CustomEvent(namedEvent, options));
        } else {
          this.element.dispatchEvent(new Event(namedEvent, options));
        }
        return Promise.resolve(response);
      };
    }
    intercept() {
      return (response) => {
        console.info(response);
        return Promise.resolve(response);
      };
    }
    clearErrors() {
      return (response) => {
        this.formset.clearErrors();
        return Promise.resolve(response);
      };
    }
    scrollToError() {
      return (response) => {
        const errorReportElement = this.formset.findFirstErrorReport();
        if (errorReportElement) {
          errorReportElement.scrollIntoView({behavior: "smooth"});
        }
        return Promise.resolve(response);
      };
    }
    noop() {
      return (response) => {
        return Promise.resolve(response);
      };
    }
    restore() {
      return () => {
        this.element.disabled = false;
        this.element.setAttribute("class", this.initialClass);
        if (this.originalDecorator) {
          this.decoratorElement?.replaceChildren(...this.originalDecorator.cloneNode(true).childNodes);
        }
      };
    }
    decorate(decorator, ms) {
      return (response) => {
        this.decoratorElement?.replaceChildren(decorator);
        if (typeof ms !== "number")
          return Promise.resolve(response);
        return new Promise((resolve) => this.timeoutHandler = window.setTimeout(() => {
          this.timeoutHandler = void 0;
          resolve(response);
        }, ms));
      };
    }
    parseActionsQueue(actionsQueue) {
      if (!actionsQueue)
        return;
      let self2 = this;
      function createActions(actions, chain) {
        for (let action of chain) {
          const func = self2[action.funcname];
          if (typeof func !== "function")
            throw new Error(`Unknown function '${action.funcname}'.`);
          actions.push(new ButtonAction(func, action.args));
        }
        if (actions.length === 0) {
          actions.push(new ButtonAction(self2.noop, []));
        }
      }
      try {
        const ast = parse(actionsQueue, {startRule: "Actions"});
        createActions(this.successActions, ast.successChain);
        createActions(this.rejectActions, ast.rejectChain);
      } catch (error) {
        throw new Error(`Error while parsing <button click="${actionsQueue}">: ${error}.`);
      }
    }
    abortAction() {
      if (this.timeoutHandler) {
        clearTimeout(this.timeoutHandler);
        this.timeoutHandler = void 0;
      }
    }
  };
  var DjangoFieldset = class {
    constructor(form, element) {
      this.form = form;
      this.element = element;
      this.updateVisibility = this.evalVisibility("show-if", true) ?? this.evalVisibility("hide-if", false) ?? function() {
      };
      this.updateDisabled = this.evalDisable();
    }
    evalVisibility(attribute, visible) {
      const attrValue = this.element.getAttribute(attribute);
      if (typeof attrValue !== "string")
        return null;
      try {
        const evalExpression = new Function("return " + parse(attrValue, {startRule: "Expression"}));
        return () => {
          const isHidden = visible != Boolean(evalExpression.call(this));
          if (this.element.hasAttribute("hidden") !== isHidden) {
            this.element.toggleAttribute("hidden", isHidden);
          }
        };
      } catch (error) {
        throw new Error(`Error while parsing <fieldset show-if/hide-if="${attrValue}">: ${error}.`);
      }
    }
    evalDisable() {
      const attrValue = this.element.getAttribute("disable-if");
      if (typeof attrValue !== "string")
        return () => {
        };
      try {
        const evalExpression = new Function("return " + parse(attrValue, {startRule: "Expression"}));
        return () => this.element.disabled = evalExpression.call(this);
      } catch (error) {
        throw new Error(`Error while parsing <fieldset disable-if="${attrValue}">: ${error}.`);
      }
    }
    getDataValue(path) {
      return this.form.getDataValue(path);
    }
    updateOperability() {
      this.updateVisibility();
      this.updateDisabled();
    }
  };
  var DjangoForm = class {
    constructor(formset, element) {
      this.errorList = null;
      this.errorPlaceholder = null;
      this.fieldGroups = Array(0);
      this.hiddenInputFields = Array(0);
      this.markedForRemoval = false;
      this.formset = formset;
      this.element = element;
      this.path = this.name?.split(".") ?? [];
      const fieldsetElement = element.querySelector("fieldset");
      this.fieldset = fieldsetElement ? new DjangoFieldset(this, fieldsetElement) : null;
      const placeholder = element.querySelector(".dj-form-errors > .dj-errorlist > .dj-placeholder");
      if (placeholder) {
        this.errorList = placeholder.parentElement;
        this.errorPlaceholder = this.errorList.removeChild(placeholder);
      }
    }
    aggregateValues() {
      const data = new Map();
      for (const fieldGroup of this.fieldGroups) {
        data.set(fieldGroup.name, fieldGroup.aggregateValue());
      }
      for (const element of this.hiddenInputFields.filter((e) => e.type === "hidden")) {
        data.set(element.name, element.value);
      }
      return data;
    }
    get name() {
      return this.element.getAttribute("name");
    }
    get formId() {
      return this.element.getAttribute("id");
    }
    getAbsPath() {
      return ["formset_data", ...this.path];
    }
    getDataValue(path) {
      if (path[0] !== "")
        return this.formset.getDataValue(path);
      const absPath = [...this.path];
      const relPath = path.filter((part) => part !== "");
      const delta = path.length - relPath.length;
      absPath.splice(absPath.length - delta + 1);
      absPath.push(...relPath);
      return this.formset.getDataValue(absPath);
    }
    updateOperability() {
      this.fieldset?.updateOperability();
      for (const fieldGroup of this.fieldGroups) {
        fieldGroup.updateOperability();
      }
    }
    setSubmitted() {
      for (const fieldGroup of this.fieldGroups) {
        fieldGroup.setSubmitted();
      }
    }
    validate() {
      this.formset.validate();
    }
    isValid() {
      let isValid = true;
      for (const fieldGroup of this.fieldGroups) {
        isValid = fieldGroup.setValidationError() && isValid;
      }
      return isValid;
    }
    checkValidity() {
      return this.element.checkValidity();
    }
    reportValidity() {
      this.element.reportValidity();
    }
    clearCustomErrors() {
      while (this.errorList && this.errorList.lastChild) {
        this.errorList.removeChild(this.errorList.lastChild);
      }
    }
    resetToInitial() {
      this.element.reset();
      for (const fieldGroup of this.fieldGroups) {
        fieldGroup.resetToInitial();
      }
    }
    toggleForRemoval(remove) {
      this.markedForRemoval = remove;
      for (const fieldGroup of this.fieldGroups) {
        if (remove) {
          fieldGroup.resetToInitial();
          fieldGroup.disableAllFields();
        } else {
          fieldGroup.reenableAllFields();
        }
      }
    }
    reportCustomErrors(errors) {
      this.clearCustomErrors();
      const nonFieldErrors = errors.get(NON_FIELD_ERRORS);
      if (this.errorList && nonFieldErrors instanceof Array && this.errorPlaceholder) {
        for (const message of nonFieldErrors) {
          const item = this.errorPlaceholder.cloneNode();
          item.innerHTML = message;
          this.errorList.appendChild(item);
        }
      }
      for (const fieldGroup of this.fieldGroups) {
        const fieldErrors = errors.get(fieldGroup.name);
        if (fieldErrors instanceof Array && fieldErrors.length > 0) {
          fieldGroup.reportCustomError(fieldErrors[0]);
        }
      }
    }
    findFirstErrorReport() {
      if (this.errorList?.textContent)
        return this.element;
      for (const fieldGroup of this.fieldGroups) {
        if (fieldGroup.errorPlaceholder?.textContent)
          return fieldGroup.element;
      }
      return null;
    }
  };
  var DjangoFormCollection = class {
    constructor(formset, element, parent, justAdded) {
      this.forms = Array(0);
      this.children = Array(0);
      this.markedForRemoval = false;
      this.formset = formset;
      this.element = element;
      this.parent = parent;
      this.findFormCollections();
    }
    findFormCollections() {
      for (const childElement of DjangoFormCollection.getChildCollections(this.element)) {
        this.children.push(childElement.hasAttribute("sibling-position") ? new DjangoFormCollectionSibling(this.formset, childElement, this) : new DjangoFormCollection(this.formset, childElement, this));
      }
      for (const sibling of this.children) {
        sibling.updateRemoveButtonAttrs();
      }
      this.formCollectionTemplate = DjangoFormCollectionTemplate.findFormCollectionTemplate(this.formset, this.element, this);
    }
    assignForms(forms) {
      this.forms = forms.filter((form) => form.element.parentElement?.isEqualNode(this.element));
      for (const formCollection of this.children) {
        formCollection.assignForms(forms);
      }
    }
    updateRemoveButtonAttrs() {
    }
    disconnect() {
      this.forms.forEach((form) => this.formset.removeForm(form));
      this.children.forEach((child) => child.disconnect());
      this.formCollectionTemplate?.disconnect();
      this.element.remove();
    }
    toggleForRemoval(remove) {
      this.markedForRemoval = remove;
      for (const form of this.forms) {
        form.toggleForRemoval(remove);
      }
      for (const formCollection of this.children) {
        formCollection.toggleForRemoval(remove);
      }
      if (this.formCollectionTemplate) {
        this.formCollectionTemplate.markedForRemoval = remove;
        this.formCollectionTemplate.updateAddButtonAttrs();
      }
      this.element.classList.toggle("dj-marked-for-removal", this.markedForRemoval);
    }
    resetToInitial() {
      this.toggleForRemoval(false);
      DjangoFormCollection.resetCollectionsToInitial(this.children);
      if (this.formCollectionTemplate) {
        const prefix = this.formCollectionTemplate.prefix;
        const pathIndex = prefix === "0" ? 0 : prefix.split(".").length;
        this.children.forEach((sibling, position) => sibling.repositionForms(pathIndex, position));
        this.formCollectionTemplate.updateAddButtonAttrs();
      }
      return false;
    }
    repositionSiblings() {
    }
    repositionForms(pathIndex, pathPart) {
      this.forms.forEach((form) => {
        form.path[pathIndex] = String(pathPart);
        form.element.setAttribute("name", form.path.join("."));
      });
      this.children.forEach((child) => child.repositionForms(pathIndex, pathPart));
    }
    static getChildCollections(element) {
      const wrapper = element.querySelector("django-form-collection")?.parentElement;
      return wrapper ? wrapper.querySelectorAll(":scope > django-form-collection") : [];
    }
    static resetCollectionsToInitial(formCollections) {
      const removeCollections = Array(0);
      for (const collection of formCollections) {
        if (collection.resetToInitial()) {
          removeCollections.push(collection);
        }
      }
      removeCollections.forEach((collection) => formCollections.splice(formCollections.indexOf(collection), 1));
      formCollections.sort((l, r) => {
        return l instanceof DjangoFormCollectionSibling && r instanceof DjangoFormCollectionSibling ? l.initialPosition - r.initialPosition : 0;
      });
      let prevElement = null;
      for (const collection of formCollections) {
        if (collection instanceof DjangoFormCollectionSibling) {
          if (collection.initialPosition === 0) {
            collection.element.parentElement?.insertAdjacentElement("afterbegin", collection.element);
          } else {
            prevElement?.insertAdjacentElement("afterend", collection.element);
          }
          prevElement = collection.element;
        }
      }
      formCollections.forEach((collection) => collection.repositionSiblings());
    }
  };
  var DjangoFormCollectionSibling = class extends DjangoFormCollection {
    constructor(formset, element, parent, justAdded) {
      super(formset, element, parent);
      this.minSiblings = 0;
      this.maxSiblings = null;
      this.justAdded = false;
      this.removeCollection = () => {
        const siblings = this.parent?.children ?? this.formset.formCollections;
        if (this.justAdded) {
          this.disconnect();
          siblings.splice(siblings.indexOf(this), 1);
          this.repositionSiblings();
        } else {
          this.toggleForRemoval(!this.markedForRemoval);
          this.removeButton.disabled = !this.markedForRemoval;
        }
        siblings.forEach((sibling) => sibling.updateRemoveButtonAttrs());
        const formCollectionTemplate = this.parent?.formCollectionTemplate ?? this.formset.formCollectionTemplate;
        formCollectionTemplate.updateAddButtonAttrs();
      };
      this.justAdded = justAdded ?? false;
      const position = element.getAttribute("sibling-position");
      if (!position)
        throw new Error("Missing argument 'sibling-position' in <django-form-collection>");
      this.position = this.initialPosition = parseInt(position);
      const minSiblings = element.getAttribute("min-siblings");
      if (!minSiblings)
        throw new Error("Missing argument 'min-siblings' in <django-form-collection>");
      this.minSiblings = parseInt(minSiblings);
      const maxSiblings = element.getAttribute("max-siblings");
      if (maxSiblings) {
        this.maxSiblings = parseInt(maxSiblings);
      }
      const removeButton = element.querySelector(":scope > button.remove-collection");
      if (!removeButton)
        throw new Error('<django-form-collection> with siblings requires child element <button class="remove-collection">');
      this.removeButton = removeButton;
      this.removeButton.addEventListener("click", this.removeCollection);
    }
    disconnect() {
      this.removeButton.removeEventListener("click", this.removeCollection);
      super.disconnect();
    }
    repositionSiblings() {
      const siblings = this.parent?.children ?? this.formset.formCollections;
      siblings.forEach((sibling, position) => {
        if (sibling instanceof DjangoFormCollectionSibling) {
          sibling.position = position;
          sibling.element.setAttribute("sibling-position", String(position));
        }
      });
    }
    updateRemoveButtonAttrs() {
      if (!this.removeButton)
        return;
      const siblings = this.parent?.children ?? this.formset.formCollections;
      const numActiveSiblings = siblings.filter((s) => !s.markedForRemoval).length;
      if (this.markedForRemoval) {
        if (this.maxSiblings) {
          this.removeButton.disabled = numActiveSiblings >= this.maxSiblings;
        } else {
          this.removeButton.disabled = false;
        }
      } else {
        this.removeButton.disabled = numActiveSiblings <= this.minSiblings;
      }
    }
    resetToInitial() {
      if (this.justAdded) {
        this.disconnect();
        return true;
      } else {
        super.resetToInitial();
        return false;
      }
    }
  };
  var DjangoFormCollectionTemplate = class {
    constructor(formset, element, parent) {
      this.maxSiblings = null;
      this.baseContext = new Map();
      this.markedForRemoval = false;
      this.resortSiblings = (event) => {
        const oldIndex2 = event.oldDraggableIndex ?? NaN;
        const newIndex2 = event.newDraggableIndex ?? NaN;
        if (!isFinite(oldIndex2) || !isFinite(newIndex2) || oldIndex2 === newIndex2)
          return;
        const siblings = this.parent?.children ?? this.formset.formCollections;
        if (siblings.at(oldIndex2) instanceof DjangoFormCollectionSibling) {
          const extracted = siblings.splice(oldIndex2, 1);
          siblings.splice(newIndex2, 0, ...extracted);
          extracted.at(0).repositionSiblings();
          const pathIndex = this.prefix === "0" ? 0 : this.prefix.split(".").length;
          siblings.forEach((sibling, position) => sibling.repositionForms(pathIndex, position));
          this.formset.validate();
        }
      };
      this.appendFormCollectionSibling = () => {
        const context = Object.fromEntries(this.baseContext);
        context["position"] = (this.getHighestPosition() + 1).toString();
        context["position_1"] = "${position}";
        for (let k = 1; k < 10; ++k) {
          context[`position_${k + 1}`] = `\${position_${k}}`;
        }
        const renderedHTML = this.renderEmptyCollection(context);
        this.element.insertAdjacentHTML("beforebegin", renderedHTML);
        const newCollectionElement = this.element.previousElementSibling;
        if (!(newCollectionElement instanceof HTMLElement))
          throw new Error("Unable to insert empty <django-form-collection> element.");
        const siblings = this.parent?.children ?? this.formset.formCollections;
        siblings.push(new DjangoFormCollectionSibling(this.formset, newCollectionElement, this.parent, true));
        this.formset.findForms(newCollectionElement);
        this.formset.assignFieldsToForms(newCollectionElement);
        this.formset.assignFormsToCollections();
        this.formset.validate();
        siblings.forEach((sibling) => sibling.updateRemoveButtonAttrs());
        this.updateAddButtonAttrs();
      };
      this.formset = formset;
      this.element = element;
      this.parent = parent;
      const matches2 = element.innerHTML.matchAll(/\$\{([^} ]+)\}/g);
      for (const match of matches2) {
        this.baseContext.set(match[1], match[0]);
      }
      const prefix = element.getAttribute("prefix");
      if (!prefix)
        throw new Error('<template class="empty-collection" ...> requires attribute "prefix"');
      this.prefix = prefix;
      formset.pushTemplatePrefix(this.prefix);
      this.renderEmptyCollection = (0, import_lodash4.default)(element.innerHTML);
      if (element.nextElementSibling?.matches("button.add-collection")) {
        this.addButton = element.nextElementSibling;
        this.addButton.addEventListener("click", this.appendFormCollectionSibling);
      }
      const innerCollection = this.element.content.querySelector("django-form-collection");
      const maxSiblings = innerCollection?.getAttribute("max-siblings");
      if (maxSiblings) {
        this.maxSiblings = parseInt(maxSiblings);
      }
      if (element.hasAttribute("sortable")) {
        new sortable_esm_default(element.parentElement, {
          animation: 150,
          handle: "django-form-collection[sibling-position]:not(.dj-marked-for-removal) > .collection-drag-handle",
          draggable: "django-form-collection[sibling-position]",
          selectedClass: "selected",
          ghostClass: "dj-ghost-collection",
          onEnd: this.resortSiblings
        });
      }
    }
    getHighestPosition() {
      let position = -1;
      const children = this.parent ? this.parent.children : this.formset.formCollections;
      for (const sibling of children.filter((s) => s instanceof DjangoFormCollectionSibling)) {
        position = Math.max(position, sibling.position);
      }
      return position;
    }
    disconnect() {
      this.formset.popTemplatePrefix(this.prefix);
      this.addButton?.removeEventListener("click", this.appendFormCollectionSibling);
    }
    updateAddButtonAttrs() {
      if (!this.addButton)
        return;
      if (this.markedForRemoval) {
        this.addButton.disabled = true;
        return;
      }
      const siblings = this.parent?.children ?? this.formset.formCollections;
      const numActiveSiblings = siblings.filter((s) => !s.markedForRemoval).length;
      this.addButton.disabled = this.maxSiblings === null ? false : numActiveSiblings >= this.maxSiblings;
    }
    static findFormCollectionTemplate(formset, element, formCollection) {
      const templateElement = element.querySelector(":scope > .collection-siblings > template.empty-collection");
      if (templateElement) {
        const formCollectionTemplate = new DjangoFormCollectionTemplate(formset, templateElement, formCollection);
        formCollectionTemplate.updateAddButtonAttrs();
        return formCollectionTemplate;
      }
    }
  };
  var DjangoFormset = class {
    constructor(formset) {
      this.buttons = Array(0);
      this.forms = Array(0);
      this.formCollections = Array(0);
      this.collectionErrorsList = new Map();
      this.abortController = new AbortController();
      this.emptyCollectionPrefixes = Array(0);
      this.data = {};
      this.element = formset;
      this.showFeedbackMessages = this.parseWithholdFeedback();
      this.CSRFToken = this.element.getAttribute("csrf-token");
    }
    connectedCallback() {
      this.findButtons();
      this.findForms();
      this.findFormCollections();
      this.findCollectionErrorsList();
      this.assignFieldsToForms();
      this.assignFormsToCollections();
      window.setTimeout(() => this.validate(), 0);
    }
    get endpoint() {
      return this.element.getAttribute("endpoint") ?? "";
    }
    get forceSubmission() {
      return this.element.hasAttribute("force-submission");
    }
    parseWithholdFeedback() {
      let showFeedbackMessages = true;
      const withholdFeedback = this.element.getAttribute("withhold-feedback")?.split(" ") ?? [];
      const feedbackClasses = new Set(["dj-feedback-errors", "dj-feedback-warnings", "dj-feedback-success"]);
      for (const wf of withholdFeedback) {
        switch (wf.toLowerCase()) {
          case "messages":
            showFeedbackMessages = false;
            break;
          case "errors":
            feedbackClasses.delete("dj-feedback-errors");
            break;
          case "warnings":
            feedbackClasses.delete("dj-feedback-warnings");
            break;
          case "success":
            feedbackClasses.delete("dj-feedback-success");
            break;
          default:
            throw new Error(`Unknown value in <django-formset withhold-feedback="${wf}">.`);
        }
      }
      feedbackClasses.forEach((feedbackClass) => this.element.classList.add(feedbackClass));
      return showFeedbackMessages;
    }
    pushTemplatePrefix(prefix) {
      this.emptyCollectionPrefixes.push(prefix);
    }
    popTemplatePrefix(prefix) {
      const index2 = this.emptyCollectionPrefixes.indexOf(prefix);
      if (index2 >= 0) {
        this.emptyCollectionPrefixes.splice(index2, 1);
      }
    }
    assignFieldsToForms(parentElement) {
      parentElement = parentElement ?? this.element;
      for (const element of parentElement.querySelectorAll("INPUT, SELECT, TEXTAREA")) {
        const formId = element.getAttribute("form");
        let djangoForm;
        if (formId) {
          const djangoForms = this.forms.filter((form) => form.formId && form.formId === formId);
          if (djangoForms.length > 1)
            throw new Error(`More than one form has id="${formId}"`);
          if (djangoForms.length !== 1)
            continue;
          djangoForm = djangoForms[0];
        } else {
          const formElement = element.closest("form");
          if (!formElement)
            continue;
          const djangoForms = this.forms.filter((form) => form.element === formElement);
          if (djangoForms.length !== 1)
            continue;
          djangoForm = djangoForms[0];
        }
        const fieldGroupElement = element.closest("django-field-group");
        if (fieldGroupElement) {
          if (djangoForm.fieldGroups.filter((fg) => fg.element === fieldGroupElement).length === 0) {
            djangoForm.fieldGroups.push(new FieldGroup(djangoForm, fieldGroupElement));
          }
        } else if (element.nodeName === "INPUT" && element.type === "hidden") {
          const hiddenInputElement = element;
          if (!djangoForm.hiddenInputFields.includes(hiddenInputElement)) {
            djangoForm.hiddenInputFields.push(hiddenInputElement);
          }
        }
      }
    }
    findForms(parentElement) {
      parentElement = parentElement ?? this.element;
      for (const element of parentElement.getElementsByTagName("FORM")) {
        const form = new DjangoForm(this, element);
        this.forms.push(form);
      }
      this.checkForUniqueness();
    }
    checkForUniqueness() {
      const formNames = Array(0);
      if (this.forms.length > 1) {
        for (const form of this.forms) {
          if (!form.name)
            throw new Error("Multiple <form>-elements in a <django-formset> require a unique name each.");
          if (form.name in formNames)
            throw new Error(`Detected more than one <form name="${form.name}"> in <django-formset>.`);
          formNames.push(form.name);
        }
      }
    }
    findFormCollections() {
      for (const element of DjangoFormCollection.getChildCollections(this.element)) {
        this.formCollections.push(element.hasAttribute("sibling-position") ? new DjangoFormCollectionSibling(this, element) : new DjangoFormCollection(this, element));
      }
      this.formCollections.forEach((collection) => collection.updateRemoveButtonAttrs());
      this.formCollectionTemplate = DjangoFormCollectionTemplate.findFormCollectionTemplate(this, this.element);
    }
    findCollectionErrorsList() {
      for (const element of this.element.getElementsByClassName("dj-collection-errors")) {
        const prefix = element.getAttribute("prefix") ?? "";
        const ulElement = element.querySelector("ul.dj-errorlist");
        this.collectionErrorsList.set(prefix, ulElement);
      }
    }
    findButtons() {
      this.buttons.length = 0;
      for (const element of this.element.getElementsByTagName("BUTTON")) {
        if (element.hasAttribute("click")) {
          this.buttons.push(new DjangoButton(this, element));
        }
      }
    }
    assignFormsToCollections() {
      for (const collection of this.formCollections) {
        collection.assignForms(this.forms);
      }
    }
    removeForm(form) {
      this.forms.splice(this.forms.indexOf(form), 1);
    }
    aggregateValues() {
      this.data = {};
      for (const form of this.forms) {
        (0, import_lodash3.default)(this.data, form.getAbsPath(), Object.fromEntries(form.aggregateValues()));
      }
      for (const form of this.forms) {
        if (!form.markedForRemoval) {
          form.updateOperability();
        }
      }
    }
    validate() {
      let isValid = true;
      for (const form of this.forms) {
        isValid = (form.markedForRemoval || form.checkValidity()) && isValid;
      }
      for (const button of this.buttons) {
        button.autoDisable(isValid);
      }
      this.aggregateValues();
      return isValid;
    }
    buildBody(extraData) {
      let dataValue;
      function extendBody(entry, relPath) {
        if (relPath.length === 1) {
          if (Array.isArray(entry)) {
            if (entry.indexOf(dataValue) < 0) {
              entry.push(dataValue);
            }
          } else {
            entry[relPath[0]] = dataValue;
          }
          return;
        }
        if (isNaN(parseInt(relPath[1]))) {
          const innerObject = entry[relPath[0]] ?? {};
          extendBody(innerObject, relPath.slice(1));
          const index2 = parseInt(relPath[0]);
          if (isNaN(index2)) {
            entry[relPath[0]] = innerObject;
          } else {
            entry[index2] = __spreadValues(__spreadValues({}, entry[index2]), innerObject);
          }
        } else {
          if (Array.isArray(entry))
            throw new Error("Invalid form structure: Contains nested arrays.");
          const innerArray = entry[relPath[0]] ?? [];
          if (!Array.isArray(innerArray))
            throw new Error("Invalid form structure: Inner array is missing.");
          extendBody(innerArray, relPath.slice(1));
          entry[relPath[0]] = innerArray;
        }
      }
      const body = {};
      for (const prefix of this.emptyCollectionPrefixes) {
        const absPath = ["formset_data", ...prefix.split(".")];
        dataValue = (0, import_lodash2.default)(body, absPath) ?? [];
        extendBody(body, absPath);
      }
      for (const form of this.forms) {
        if (!form.name)
          return Object.assign({}, this.data, {_extra: extraData});
        const absPath = form.getAbsPath();
        dataValue = (0, import_lodash2.default)(this.data, absPath);
        if (form.markedForRemoval) {
          dataValue[MARKED_FOR_REMOVAL] = MARKED_FOR_REMOVAL;
        }
        extendBody(body, absPath);
      }
      return Object.assign({}, body, {_extra: extraData});
    }
    async submit(extraData) {
      let formsAreValid = true;
      this.setSubmitted();
      if (!this.forceSubmission) {
        for (const form of this.forms) {
          formsAreValid = (form.markedForRemoval || form.isValid()) && formsAreValid;
        }
      }
      if (formsAreValid) {
        if (!this.endpoint)
          throw new Error(`<django-formset> requires attribute 'endpoint="server endpoint"' for submission`);
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        if (this.CSRFToken) {
          headers.append("X-CSRFToken", this.CSRFToken);
        }
        const response = await fetch(this.endpoint, {
          method: "POST",
          headers,
          body: JSON.stringify(this.buildBody(extraData)),
          signal: this.abortController.signal
        });
        switch (response.status) {
          case 200:
            this.clearErrors();
            for (const form of this.forms) {
              form.element.dispatchEvent(new Event("submitted"));
            }
            return response;
          case 422:
            this.clearErrors();
            const body = await response.json();
            this.reportErrors(body);
            return response;
          default:
            console.warn(`Unknown response status: ${response.status}`);
            break;
        }
      } else {
        this.clearErrors();
        for (const form of this.forms) {
          form.reportValidity();
        }
      }
    }
    reportErrors(body) {
      for (const form of this.forms) {
        const errors = form.name ? (0, import_lodash2.default)(body, form.name.split("."), null) : body;
        if (errors) {
          form.reportCustomErrors(new Map(Object.entries(errors)));
          form.reportValidity();
        } else {
          form.clearCustomErrors();
        }
      }
      for (const [prefix, ulElement] of this.collectionErrorsList) {
        let path = prefix ? prefix.split(".") : [];
        path = [...path, "0", COLLECTION_ERRORS];
        for (const errorText of (0, import_lodash2.default)(body, path, [])) {
          const placeholder = document.createElement("li");
          placeholder.classList.add("dj-placeholder");
          placeholder.innerText = errorText;
          ulElement.appendChild(placeholder);
        }
      }
    }
    resetToInitial() {
      DjangoFormCollection.resetCollectionsToInitial(this.formCollections);
      this.formCollectionTemplate?.updateAddButtonAttrs();
      this.forms.forEach((form) => form.resetToInitial());
    }
    abort() {
      for (const button of this.buttons) {
        button.abortAction();
      }
      this.abortController.abort();
    }
    setSubmitted() {
      for (const form of this.forms) {
        form.setSubmitted();
      }
    }
    getDataValue(path) {
      const absPath = ["formset_data", ...path];
      return (0, import_lodash2.default)(this.data, absPath, null);
    }
    findFirstErrorReport() {
      for (const form of this.forms) {
        const errorReportElement = form.findFirstErrorReport();
        if (errorReportElement)
          return errorReportElement;
      }
      return null;
    }
    clearErrors() {
      for (const form of this.forms) {
        form.clearCustomErrors();
      }
      for (const ulElement of this.collectionErrorsList.values()) {
        while (ulElement.firstElementChild) {
          ulElement.removeChild(ulElement.firstElementChild);
        }
      }
    }
  };
  var FS = Symbol("DjangoFormset");
  var DjangoFormsetElement = class extends HTMLElement {
    constructor() {
      super();
      this[FS] = new DjangoFormset(this);
    }
    static get observedAttributes() {
      return ["endpoint", "withhold-messages", "force-submission"];
    }
    connectedCallback() {
      this[FS].connectedCallback();
    }
    async submit(data) {
      return this[FS].submit(data);
    }
    async abort() {
      return this[FS].abort();
    }
    async reset() {
      return this[FS].resetToInitial();
    }
  };
  FS;

  // node_modules/tom-select/src/contrib/microevent.ts
  function forEvents(events, callback) {
    events.split(/\s+/).forEach((event) => {
      callback(event);
    });
  }
  var MicroEvent = class {
    constructor() {
      this._events = {};
    }
    on(events, fct) {
      forEvents(events, (event) => {
        this._events[event] = this._events[event] || [];
        this._events[event].push(fct);
      });
    }
    off(events, fct) {
      var n = arguments.length;
      if (n === 0) {
        this._events = {};
        return;
      }
      forEvents(events, (event) => {
        if (n === 1)
          return delete this._events[event];
        if (event in this._events === false)
          return;
        this._events[event].splice(this._events[event].indexOf(fct), 1);
      });
    }
    trigger(events, ...args) {
      var self2 = this;
      forEvents(events, (event) => {
        if (event in self2._events === false)
          return;
        for (let fct of self2._events[event]) {
          fct.apply(self2, args);
        }
      });
    }
  };
  var microevent_default = MicroEvent;

  // node_modules/tom-select/src/contrib/microplugin.ts
  function MicroPlugin(Interface) {
    Interface.plugins = {};
    return class extends Interface {
      constructor() {
        super(...arguments);
        this.plugins = {
          names: [],
          settings: {},
          requested: {},
          loaded: {}
        };
      }
      static define(name, fn) {
        Interface.plugins[name] = {
          "name": name,
          "fn": fn
        };
      }
      initializePlugins(plugins2) {
        var key, name;
        const self2 = this;
        const queue = [];
        if (Array.isArray(plugins2)) {
          plugins2.forEach((plugin) => {
            if (typeof plugin === "string") {
              queue.push(plugin);
            } else {
              self2.plugins.settings[plugin.name] = plugin.options;
              queue.push(plugin.name);
            }
          });
        } else if (plugins2) {
          for (key in plugins2) {
            if (plugins2.hasOwnProperty(key)) {
              self2.plugins.settings[key] = plugins2[key];
              queue.push(key);
            }
          }
        }
        while (name = queue.shift()) {
          self2.require(name);
        }
      }
      loadPlugin(name) {
        var self2 = this;
        var plugins2 = self2.plugins;
        var plugin = Interface.plugins[name];
        if (!Interface.plugins.hasOwnProperty(name)) {
          throw new Error('Unable to find "' + name + '" plugin');
        }
        plugins2.requested[name] = true;
        plugins2.loaded[name] = plugin.fn.apply(self2, [self2.plugins.settings[name] || {}]);
        plugins2.names.push(name);
      }
      require(name) {
        var self2 = this;
        var plugins2 = self2.plugins;
        if (!self2.plugins.loaded.hasOwnProperty(name)) {
          if (plugins2.requested[name]) {
            throw new Error('Plugin has circular dependency ("' + name + '")');
          }
          self2.loadPlugin(name);
        }
        return plugins2.loaded[name];
      }
    };
  }

  // node_modules/@orchidjs/sifter/lib/diacritics.ts
  var latin_pat;
  var accent_pat = "[\u0300-\u036F\xB7\u02BE]";
  var accent_reg = new RegExp(accent_pat, "gu");
  var diacritic_patterns;
  var latin_convert = {
    "\xE6": "ae",
    "\u2C65": "a",
    "\xF8": "o"
  };
  var convert_pat = new RegExp(Object.keys(latin_convert).join("|"), "gu");
  var code_points = [[0, 65535]];
  var asciifold = (str) => {
    return str.normalize("NFKD").replace(accent_reg, "").toLowerCase().replace(convert_pat, function(foreignletter) {
      return latin_convert[foreignletter] || foreignletter;
    });
  };
  var arrayToPattern = (chars, glue = "|") => {
    if (chars.length === 1 && chars[0] != void 0) {
      return chars[0];
    }
    var longest = 1;
    chars.forEach((a) => {
      longest = Math.max(longest, a.length);
    });
    if (longest == 1) {
      return "[" + chars.join("") + "]";
    }
    return "(?:" + chars.join(glue) + ")";
  };
  var escapeToPattern = (chars) => {
    const escaped = chars.map((diacritic) => escape_regex(diacritic));
    return arrayToPattern(escaped);
  };
  var allSubstrings = (input) => {
    if (input.length === 1)
      return [[input]];
    var result = [];
    allSubstrings(input.substring(1)).forEach(function(subresult) {
      var tmp = subresult.slice(0);
      tmp[0] = input.charAt(0) + tmp[0];
      result.push(tmp);
      tmp = subresult.slice(0);
      tmp.unshift(input.charAt(0));
      result.push(tmp);
    });
    return result;
  };
  var generateDiacritics = (code_points2) => {
    var diacritics = {};
    code_points2.forEach((code_range) => {
      for (let i = code_range[0]; i <= code_range[1]; i++) {
        let diacritic = String.fromCharCode(i);
        let latin = asciifold(diacritic);
        if (latin == diacritic.toLowerCase()) {
          continue;
        }
        if (latin.length > 3) {
          continue;
        }
        const latin_diacritics = diacritics[latin] || [latin];
        const patt = new RegExp(escapeToPattern(latin_diacritics), "iu");
        if (diacritic.match(patt)) {
          continue;
        }
        latin_diacritics.push(diacritic);
        diacritics[latin] = latin_diacritics;
      }
    });
    Object.keys(diacritics).forEach((latin) => {
      const latin_diacritics = diacritics[latin] || [];
      if (latin_diacritics.length < 2) {
        delete diacritics[latin];
      }
    });
    let latin_chars = Object.keys(diacritics).sort((a, b) => b.length - a.length);
    latin_pat = new RegExp("(" + escapeToPattern(latin_chars) + accent_pat + "*)", "gu");
    var diacritic_patterns2 = {};
    latin_chars.sort((a, b) => a.length - b.length).forEach((latin) => {
      var substrings = allSubstrings(latin);
      var pattern = substrings.map((sub_pat) => {
        sub_pat = sub_pat.map((l) => {
          if (diacritics.hasOwnProperty(l)) {
            return escapeToPattern(diacritics[l]);
          }
          return l;
        });
        return arrayToPattern(sub_pat, "");
      });
      diacritic_patterns2[latin] = arrayToPattern(pattern);
    });
    return diacritic_patterns2;
  };
  var diacriticRegexPoints = (regex) => {
    if (diacritic_patterns === void 0) {
      diacritic_patterns = generateDiacritics(code_points);
    }
    const decomposed = regex.normalize("NFKD").toLowerCase();
    return decomposed.split(latin_pat).map((part) => {
      const no_accent = asciifold(part);
      if (no_accent == "") {
        return "";
      }
      if (diacritic_patterns.hasOwnProperty(no_accent)) {
        return diacritic_patterns[no_accent];
      }
      return part;
    }).join("");
  };

  // node_modules/@orchidjs/sifter/lib/utils.ts
  var getAttr = (obj, name) => {
    if (!obj)
      return;
    return obj[name];
  };
  var getAttrNesting = (obj, name) => {
    if (!obj)
      return;
    var part, names = name.split(".");
    while ((part = names.shift()) && (obj = obj[part]))
      ;
    return obj;
  };
  var scoreValue = (value, token, weight) => {
    var score, pos;
    if (!value)
      return 0;
    value = value + "";
    pos = value.search(token.regex);
    if (pos === -1)
      return 0;
    score = token.string.length / value.length;
    if (pos === 0)
      score += 0.5;
    return score * weight;
  };
  var escape_regex = (str) => {
    return (str + "").replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu, "\\$1");
  };
  var propToArray = (obj, key) => {
    var value = obj[key];
    if (typeof value == "function")
      return value;
    if (value && !Array.isArray(value)) {
      obj[key] = [value];
    }
  };
  var iterate = (object, callback) => {
    if (Array.isArray(object)) {
      object.forEach(callback);
    } else {
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
          callback(object[key], key);
        }
      }
    }
  };
  var cmp = (a, b) => {
    if (typeof a === "number" && typeof b === "number") {
      return a > b ? 1 : a < b ? -1 : 0;
    }
    a = asciifold(a + "").toLowerCase();
    b = asciifold(b + "").toLowerCase();
    if (a > b)
      return 1;
    if (b > a)
      return -1;
    return 0;
  };

  // node_modules/@orchidjs/sifter/lib/sifter.ts
  var Sifter = class {
    constructor(items, settings) {
      this.items = items;
      this.settings = settings || {diacritics: true};
    }
    tokenize(query, respect_word_boundaries, weights) {
      if (!query || !query.length)
        return [];
      const tokens = [];
      const words = query.split(/\s+/);
      var field_regex;
      if (weights) {
        field_regex = new RegExp("^(" + Object.keys(weights).map(escape_regex).join("|") + "):(.*)$");
      }
      words.forEach((word) => {
        let field_match;
        let field = null;
        let regex = null;
        if (field_regex && (field_match = word.match(field_regex))) {
          field = field_match[1];
          word = field_match[2];
        }
        if (word.length > 0) {
          if (this.settings.diacritics) {
            regex = diacriticRegexPoints(word);
          } else {
            regex = escape_regex(word);
          }
          if (respect_word_boundaries)
            regex = "\\b" + regex;
        }
        tokens.push({
          string: word,
          regex: regex ? new RegExp(regex, "iu") : null,
          field
        });
      });
      return tokens;
    }
    getScoreFunction(query, options) {
      var search = this.prepareSearch(query, options);
      return this._getScoreFunction(search);
    }
    _getScoreFunction(search) {
      const tokens = search.tokens, token_count = tokens.length;
      if (!token_count) {
        return function() {
          return 0;
        };
      }
      const fields = search.options.fields, weights = search.weights, field_count = fields.length, getAttrFn = search.getAttrFn;
      if (!field_count) {
        return function() {
          return 1;
        };
      }
      const scoreObject = function() {
        if (field_count === 1) {
          return function(token, data) {
            const field = fields[0].field;
            return scoreValue(getAttrFn(data, field), token, weights[field]);
          };
        }
        return function(token, data) {
          var sum = 0;
          if (token.field) {
            const value = getAttrFn(data, token.field);
            if (!token.regex && value) {
              sum += 1 / field_count;
            } else {
              sum += scoreValue(value, token, 1);
            }
          } else {
            iterate(weights, (weight, field) => {
              sum += scoreValue(getAttrFn(data, field), token, weight);
            });
          }
          return sum / field_count;
        };
      }();
      if (token_count === 1) {
        return function(data) {
          return scoreObject(tokens[0], data);
        };
      }
      if (search.options.conjunction === "and") {
        return function(data) {
          var i = 0, score, sum = 0;
          for (; i < token_count; i++) {
            score = scoreObject(tokens[i], data);
            if (score <= 0)
              return 0;
            sum += score;
          }
          return sum / token_count;
        };
      } else {
        return function(data) {
          var sum = 0;
          iterate(tokens, (token) => {
            sum += scoreObject(token, data);
          });
          return sum / token_count;
        };
      }
    }
    getSortFunction(query, options) {
      var search = this.prepareSearch(query, options);
      return this._getSortFunction(search);
    }
    _getSortFunction(search) {
      var i, n, implicit_score;
      const self2 = this, options = search.options, sort2 = !search.query && options.sort_empty ? options.sort_empty : options.sort, sort_flds = [], multipliers = [];
      if (typeof sort2 == "function") {
        return sort2.bind(this);
      }
      const get_field = function(name, result) {
        if (name === "$score")
          return result.score;
        return search.getAttrFn(self2.items[result.id], name);
      };
      if (sort2) {
        for (i = 0, n = sort2.length; i < n; i++) {
          if (search.query || sort2[i].field !== "$score") {
            sort_flds.push(sort2[i]);
          }
        }
      }
      if (search.query) {
        implicit_score = true;
        for (i = 0, n = sort_flds.length; i < n; i++) {
          if (sort_flds[i].field === "$score") {
            implicit_score = false;
            break;
          }
        }
        if (implicit_score) {
          sort_flds.unshift({field: "$score", direction: "desc"});
        }
      } else {
        for (i = 0, n = sort_flds.length; i < n; i++) {
          if (sort_flds[i].field === "$score") {
            sort_flds.splice(i, 1);
            break;
          }
        }
      }
      const sort_flds_count = sort_flds.length;
      if (!sort_flds_count) {
        return null;
      }
      return function(a, b) {
        var i2, result, field;
        for (i2 = 0; i2 < sort_flds_count; i2++) {
          field = sort_flds[i2].field;
          let multiplier = multipliers[i2];
          if (multiplier == void 0) {
            multiplier = sort_flds[i2].direction === "desc" ? -1 : 1;
          }
          result = multiplier * cmp(get_field(field, a), get_field(field, b));
          if (result)
            return result;
        }
        return 0;
      };
    }
    prepareSearch(query, optsUser) {
      const weights = {};
      var options = Object.assign({}, optsUser);
      propToArray(options, "sort");
      propToArray(options, "sort_empty");
      if (options.fields) {
        propToArray(options, "fields");
        const fields = [];
        options.fields.forEach((field) => {
          if (typeof field == "string") {
            field = {field, weight: 1};
          }
          fields.push(field);
          weights[field.field] = "weight" in field ? field.weight : 1;
        });
        options.fields = fields;
      }
      return {
        options,
        query: query.toLowerCase().trim(),
        tokens: this.tokenize(query, options.respect_word_boundaries, weights),
        total: 0,
        items: [],
        weights,
        getAttrFn: options.nesting ? getAttrNesting : getAttr
      };
    }
    search(query, options) {
      var self2 = this, score, search;
      search = this.prepareSearch(query, options);
      options = search.options;
      query = search.query;
      const fn_score = options.score || self2._getScoreFunction(search);
      if (query.length) {
        iterate(self2.items, (item, id) => {
          score = fn_score(item);
          if (options.filter === false || score > 0) {
            search.items.push({"score": score, "id": id});
          }
        });
      } else {
        iterate(self2.items, (_, id) => {
          search.items.push({"score": 1, "id": id});
        });
      }
      const fn_sort = self2._getSortFunction(search);
      if (fn_sort)
        search.items.sort(fn_sort);
      search.total = search.items.length;
      if (typeof options.limit === "number") {
        search.items = search.items.slice(0, options.limit);
      }
      return search;
    }
  };
  var sifter_default = Sifter;

  // node_modules/tom-select/src/vanilla.ts
  var getDom = (query) => {
    if (query.jquery) {
      return query[0];
    }
    if (query instanceof HTMLElement) {
      return query;
    }
    if (isHtmlString(query)) {
      let div = document.createElement("div");
      div.innerHTML = query.trim();
      return div.firstChild;
    }
    return document.querySelector(query);
  };
  var isHtmlString = (arg) => {
    if (typeof arg === "string" && arg.indexOf("<") > -1) {
      return true;
    }
    return false;
  };
  var escapeQuery = (query) => {
    return query.replace(/['"\\]/g, "\\$&");
  };
  var triggerEvent = (dom_el, event_name) => {
    var event = document.createEvent("HTMLEvents");
    event.initEvent(event_name, true, false);
    dom_el.dispatchEvent(event);
  };
  var applyCSS = (dom_el, css2) => {
    Object.assign(dom_el.style, css2);
  };
  var addClasses = (elmts, ...classes) => {
    var norm_classes = classesArray(classes);
    elmts = castAsArray(elmts);
    elmts.map((el) => {
      norm_classes.map((cls) => {
        el.classList.add(cls);
      });
    });
  };
  var removeClasses = (elmts, ...classes) => {
    var norm_classes = classesArray(classes);
    elmts = castAsArray(elmts);
    elmts.map((el) => {
      norm_classes.map((cls) => {
        el.classList.remove(cls);
      });
    });
  };
  var classesArray = (args) => {
    var classes = [];
    iterate(args, (_classes) => {
      if (typeof _classes === "string") {
        _classes = _classes.trim().split(/[\11\12\14\15\40]/);
      }
      if (Array.isArray(_classes)) {
        classes = classes.concat(_classes);
      }
    });
    return classes.filter(Boolean);
  };
  var castAsArray = (arg) => {
    if (!Array.isArray(arg)) {
      arg = [arg];
    }
    return arg;
  };
  var parentMatch = (target, selector, wrapper) => {
    if (wrapper && !wrapper.contains(target)) {
      return;
    }
    while (target && target.matches) {
      if (target.matches(selector)) {
        return target;
      }
      target = target.parentNode;
    }
  };
  var getTail = (list, direction = 0) => {
    if (direction > 0) {
      return list[list.length - 1];
    }
    return list[0];
  };
  var isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };
  var nodeIndex = (el, amongst) => {
    if (!el)
      return -1;
    amongst = amongst || el.nodeName;
    var i = 0;
    while (el = el.previousElementSibling) {
      if (el.matches(amongst)) {
        i++;
      }
    }
    return i;
  };
  var setAttr = (el, attrs) => {
    iterate(attrs, (val, attr) => {
      if (val == null) {
        el.removeAttribute(attr);
      } else {
        el.setAttribute(attr, "" + val);
      }
    });
  };
  var replaceNode = (existing, replacement) => {
    if (existing.parentNode)
      existing.parentNode.replaceChild(replacement, existing);
  };

  // node_modules/tom-select/src/contrib/highlight.ts
  var highlight = (element, regex) => {
    if (regex === null)
      return;
    if (typeof regex === "string") {
      if (!regex.length)
        return;
      regex = new RegExp(regex, "i");
    }
    const highlightText = (node) => {
      var match = node.data.match(regex);
      if (match && node.data.length > 0) {
        var spannode = document.createElement("span");
        spannode.className = "highlight";
        var middlebit = node.splitText(match.index);
        middlebit.splitText(match[0].length);
        var middleclone = middlebit.cloneNode(true);
        spannode.appendChild(middleclone);
        replaceNode(middlebit, spannode);
        return 1;
      }
      return 0;
    };
    const highlightChildren = (node) => {
      if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && (node.className !== "highlight" || node.tagName !== "SPAN")) {
        for (var i = 0; i < node.childNodes.length; ++i) {
          i += highlightRecursive(node.childNodes[i]);
        }
      }
    };
    const highlightRecursive = (node) => {
      if (node.nodeType === 3) {
        return highlightText(node);
      }
      highlightChildren(node);
      return 0;
    };
    highlightRecursive(element);
  };
  var removeHighlight = (el) => {
    var elements = el.querySelectorAll("span.highlight");
    Array.prototype.forEach.call(elements, function(el2) {
      var parent = el2.parentNode;
      parent.replaceChild(el2.firstChild, el2);
      parent.normalize();
    });
  };

  // node_modules/tom-select/src/constants.ts
  var KEY_A = 65;
  var KEY_RETURN = 13;
  var KEY_ESC = 27;
  var KEY_LEFT = 37;
  var KEY_UP = 38;
  var KEY_RIGHT = 39;
  var KEY_DOWN = 40;
  var KEY_BACKSPACE = 8;
  var KEY_DELETE = 46;
  var KEY_TAB = 9;
  var IS_MAC = typeof navigator === "undefined" ? false : /Mac/.test(navigator.userAgent);
  var KEY_SHORTCUT = IS_MAC ? "metaKey" : "ctrlKey";

  // node_modules/tom-select/src/defaults.ts
  var defaults_default = {
    options: [],
    optgroups: [],
    plugins: [],
    delimiter: ",",
    splitOn: null,
    persist: true,
    diacritics: true,
    create: null,
    createOnBlur: false,
    createFilter: null,
    highlight: true,
    openOnFocus: true,
    shouldOpen: null,
    maxOptions: 50,
    maxItems: null,
    hideSelected: null,
    duplicates: false,
    addPrecedence: false,
    selectOnTab: false,
    preload: null,
    allowEmptyOption: false,
    loadThrottle: 300,
    loadingClass: "loading",
    dataAttr: null,
    optgroupField: "optgroup",
    valueField: "value",
    labelField: "text",
    disabledField: "disabled",
    optgroupLabelField: "label",
    optgroupValueField: "value",
    lockOptgroupOrder: false,
    sortField: "$order",
    searchField: ["text"],
    searchConjunction: "and",
    mode: null,
    wrapperClass: "ts-wrapper",
    controlClass: "ts-control",
    dropdownClass: "ts-dropdown",
    dropdownContentClass: "ts-dropdown-content",
    itemClass: "item",
    optionClass: "option",
    dropdownParent: null,
    controlInput: '<input type="text" autocomplete="off" size="1" />',
    copyClassesToDropdown: false,
    placeholder: null,
    hidePlaceholder: null,
    shouldLoad: function(query) {
      return query.length > 0;
    },
    render: {}
  };

  // node_modules/tom-select/src/utils.ts
  var hash_key = (value) => {
    if (typeof value === "undefined" || value === null)
      return null;
    return get_hash(value);
  };
  var get_hash = (value) => {
    if (typeof value === "boolean")
      return value ? "1" : "0";
    return value + "";
  };
  var escape_html = (str) => {
    return (str + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  var loadDebounce = (fn, delay) => {
    var timeout;
    return function(value, callback) {
      var self2 = this;
      if (timeout) {
        self2.loading = Math.max(self2.loading - 1, 0);
        clearTimeout(timeout);
      }
      timeout = setTimeout(function() {
        timeout = null;
        self2.loadedSearches[value] = true;
        fn.call(self2, value, callback);
      }, delay);
    };
  };
  var debounce_events = (self2, types, fn) => {
    var type;
    var trigger = self2.trigger;
    var event_args = {};
    self2.trigger = function() {
      var type2 = arguments[0];
      if (types.indexOf(type2) !== -1) {
        event_args[type2] = arguments;
      } else {
        return trigger.apply(self2, arguments);
      }
    };
    fn.apply(self2, []);
    self2.trigger = trigger;
    for (type of types) {
      if (type in event_args) {
        trigger.apply(self2, event_args[type]);
      }
    }
  };
  var getSelection = (input) => {
    return {
      start: input.selectionStart || 0,
      length: (input.selectionEnd || 0) - (input.selectionStart || 0)
    };
  };
  var preventDefault = (evt, stop = false) => {
    if (evt) {
      evt.preventDefault();
      if (stop) {
        evt.stopPropagation();
      }
    }
  };
  var addEvent = (target, type, callback, options) => {
    target.addEventListener(type, callback, options);
  };
  var isKeyDown = (key_name, evt) => {
    if (!evt) {
      return false;
    }
    if (!evt[key_name]) {
      return false;
    }
    var count = (evt.altKey ? 1 : 0) + (evt.ctrlKey ? 1 : 0) + (evt.shiftKey ? 1 : 0) + (evt.metaKey ? 1 : 0);
    if (count === 1) {
      return true;
    }
    return false;
  };
  var getId = (el, id) => {
    const existing_id = el.getAttribute("id");
    if (existing_id) {
      return existing_id;
    }
    el.setAttribute("id", id);
    return id;
  };
  var addSlashes = (str) => {
    return str.replace(/[\\"']/g, "\\$&");
  };
  var append = (parent, node) => {
    if (node)
      parent.append(node);
  };

  // node_modules/tom-select/src/getSettings.ts
  function getSettings(input, settings_user) {
    var settings = Object.assign({}, defaults_default, settings_user);
    var attr_data = settings.dataAttr;
    var field_label = settings.labelField;
    var field_value = settings.valueField;
    var field_disabled = settings.disabledField;
    var field_optgroup = settings.optgroupField;
    var field_optgroup_label = settings.optgroupLabelField;
    var field_optgroup_value = settings.optgroupValueField;
    var tag_name = input.tagName.toLowerCase();
    var placeholder = input.getAttribute("placeholder") || input.getAttribute("data-placeholder");
    if (!placeholder && !settings.allowEmptyOption) {
      let option2 = input.querySelector('option[value=""]');
      if (option2) {
        placeholder = option2.textContent;
      }
    }
    var settings_element = {
      placeholder,
      options: [],
      optgroups: [],
      items: [],
      maxItems: null
    };
    var init_select = () => {
      var tagName;
      var options = settings_element.options;
      var optionsMap = {};
      var group_count = 1;
      var readData = (el) => {
        var data = Object.assign({}, el.dataset);
        var json = attr_data && data[attr_data];
        if (typeof json === "string" && json.length) {
          data = Object.assign(data, JSON.parse(json));
        }
        return data;
      };
      var addOption = (option2, group) => {
        var value = hash_key(option2.value);
        if (value == null)
          return;
        if (!value && !settings.allowEmptyOption)
          return;
        if (optionsMap.hasOwnProperty(value)) {
          if (group) {
            var arr = optionsMap[value][field_optgroup];
            if (!arr) {
              optionsMap[value][field_optgroup] = group;
            } else if (!Array.isArray(arr)) {
              optionsMap[value][field_optgroup] = [arr, group];
            } else {
              arr.push(group);
            }
          }
        } else {
          var option_data = readData(option2);
          option_data[field_label] = option_data[field_label] || option2.textContent;
          option_data[field_value] = option_data[field_value] || value;
          option_data[field_disabled] = option_data[field_disabled] || option2.disabled;
          option_data[field_optgroup] = option_data[field_optgroup] || group;
          option_data.$option = option2;
          optionsMap[value] = option_data;
          options.push(option_data);
        }
        if (option2.selected) {
          settings_element.items.push(value);
        }
      };
      var addGroup = (optgroup) => {
        var id, optgroup_data;
        optgroup_data = readData(optgroup);
        optgroup_data[field_optgroup_label] = optgroup_data[field_optgroup_label] || optgroup.getAttribute("label") || "";
        optgroup_data[field_optgroup_value] = optgroup_data[field_optgroup_value] || group_count++;
        optgroup_data[field_disabled] = optgroup_data[field_disabled] || optgroup.disabled;
        settings_element.optgroups.push(optgroup_data);
        id = optgroup_data[field_optgroup_value];
        iterate(optgroup.children, (option2) => {
          addOption(option2, id);
        });
      };
      settings_element.maxItems = input.hasAttribute("multiple") ? null : 1;
      iterate(input.children, (child) => {
        tagName = child.tagName.toLowerCase();
        if (tagName === "optgroup") {
          addGroup(child);
        } else if (tagName === "option") {
          addOption(child);
        }
      });
    };
    var init_textbox = () => {
      const data_raw = input.getAttribute(attr_data);
      if (!data_raw) {
        var value = input.value.trim() || "";
        if (!settings.allowEmptyOption && !value.length)
          return;
        const values = value.split(settings.delimiter);
        iterate(values, (value2) => {
          const option2 = {};
          option2[field_label] = value2;
          option2[field_value] = value2;
          settings_element.options.push(option2);
        });
        settings_element.items = values;
      } else {
        settings_element.options = JSON.parse(data_raw);
        iterate(settings_element.options, (opt) => {
          settings_element.items.push(opt[field_value]);
        });
      }
    };
    if (tag_name === "select") {
      init_select();
    } else {
      init_textbox();
    }
    return Object.assign({}, defaults_default, settings_element, settings_user);
  }

  // node_modules/tom-select/src/tom-select.ts
  var instance_i = 0;
  var TomSelect = class extends MicroPlugin(microevent_default) {
    constructor(input_arg, user_settings) {
      super();
      this.order = 0;
      this.isOpen = false;
      this.isDisabled = false;
      this.isInvalid = false;
      this.isValid = true;
      this.isLocked = false;
      this.isFocused = false;
      this.isInputHidden = false;
      this.isSetup = false;
      this.ignoreFocus = false;
      this.ignoreHover = false;
      this.hasOptions = false;
      this.lastValue = "";
      this.caretPos = 0;
      this.loading = 0;
      this.loadedSearches = {};
      this.activeOption = null;
      this.activeItems = [];
      this.optgroups = {};
      this.options = {};
      this.userOptions = {};
      this.items = [];
      instance_i++;
      var dir;
      var input = getDom(input_arg);
      if (input.tomselect) {
        throw new Error("Tom Select already initialized on this element");
      }
      input.tomselect = this;
      var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
      dir = computedStyle.getPropertyValue("direction");
      const settings = getSettings(input, user_settings);
      this.settings = settings;
      this.input = input;
      this.tabIndex = input.tabIndex || 0;
      this.is_select_tag = input.tagName.toLowerCase() === "select";
      this.rtl = /rtl/i.test(dir);
      this.inputId = getId(input, "tomselect-" + instance_i);
      this.isRequired = input.required;
      this.sifter = new sifter_default(this.options, {diacritics: settings.diacritics});
      settings.mode = settings.mode || (settings.maxItems === 1 ? "single" : "multi");
      if (typeof settings.hideSelected !== "boolean") {
        settings.hideSelected = settings.mode === "multi";
      }
      if (typeof settings.hidePlaceholder !== "boolean") {
        settings.hidePlaceholder = settings.mode !== "multi";
      }
      var filter = settings.createFilter;
      if (typeof filter !== "function") {
        if (typeof filter === "string") {
          filter = new RegExp(filter);
        }
        if (filter instanceof RegExp) {
          settings.createFilter = (input2) => filter.test(input2);
        } else {
          settings.createFilter = (value) => {
            return this.settings.duplicates || !this.options[value];
          };
        }
      }
      this.initializePlugins(settings.plugins);
      this.setupCallbacks();
      this.setupTemplates();
      const wrapper = getDom("<div>");
      const control = getDom("<div>");
      const dropdown = this._render("dropdown");
      const dropdown_content = getDom(`<div role="listbox" tabindex="-1">`);
      const classes = this.input.getAttribute("class") || "";
      const inputMode = settings.mode;
      var control_input;
      addClasses(wrapper, settings.wrapperClass, classes, inputMode);
      addClasses(control, settings.controlClass);
      append(wrapper, control);
      addClasses(dropdown, settings.dropdownClass, inputMode);
      if (settings.copyClassesToDropdown) {
        addClasses(dropdown, classes);
      }
      addClasses(dropdown_content, settings.dropdownContentClass);
      append(dropdown, dropdown_content);
      getDom(settings.dropdownParent || wrapper).appendChild(dropdown);
      if (isHtmlString(settings.controlInput)) {
        control_input = getDom(settings.controlInput);
        var attrs = ["autocorrect", "autocapitalize", "autocomplete"];
        iterate(attrs, (attr) => {
          if (input.getAttribute(attr)) {
            setAttr(control_input, {[attr]: input.getAttribute(attr)});
          }
        });
        control_input.tabIndex = -1;
        control.appendChild(control_input);
        this.focus_node = control_input;
      } else if (settings.controlInput) {
        control_input = getDom(settings.controlInput);
        this.focus_node = control_input;
      } else {
        control_input = getDom("<input/>");
        this.focus_node = control;
      }
      this.wrapper = wrapper;
      this.dropdown = dropdown;
      this.dropdown_content = dropdown_content;
      this.control = control;
      this.control_input = control_input;
      this.setup();
    }
    setup() {
      const self2 = this;
      const settings = self2.settings;
      const control_input = self2.control_input;
      const dropdown = self2.dropdown;
      const dropdown_content = self2.dropdown_content;
      const wrapper = self2.wrapper;
      const control = self2.control;
      const input = self2.input;
      const focus_node = self2.focus_node;
      const passive_event = {passive: true};
      const listboxId = self2.inputId + "-ts-dropdown";
      setAttr(dropdown_content, {
        id: listboxId
      });
      setAttr(focus_node, {
        role: "combobox",
        "aria-haspopup": "listbox",
        "aria-expanded": "false",
        "aria-controls": listboxId
      });
      const control_id = getId(focus_node, self2.inputId + "-ts-control");
      const query = "label[for='" + escapeQuery(self2.inputId) + "']";
      const label = document.querySelector(query);
      const label_click = self2.focus.bind(self2);
      if (label) {
        addEvent(label, "click", label_click);
        setAttr(label, {for: control_id});
        const label_id = getId(label, self2.inputId + "-ts-label");
        setAttr(focus_node, {"aria-labelledby": label_id});
        setAttr(dropdown_content, {"aria-labelledby": label_id});
      }
      wrapper.style.width = input.style.width;
      if (self2.plugins.names.length) {
        const classes_plugins = "plugin-" + self2.plugins.names.join(" plugin-");
        addClasses([wrapper, dropdown], classes_plugins);
      }
      if ((settings.maxItems === null || settings.maxItems > 1) && self2.is_select_tag) {
        setAttr(input, {multiple: "multiple"});
      }
      if (settings.placeholder) {
        setAttr(control_input, {placeholder: settings.placeholder});
      }
      if (!settings.splitOn && settings.delimiter) {
        settings.splitOn = new RegExp("\\s*" + escape_regex(settings.delimiter) + "+\\s*");
      }
      if (settings.load && settings.loadThrottle) {
        settings.load = loadDebounce(settings.load, settings.loadThrottle);
      }
      self2.control_input.type = input.type;
      addEvent(dropdown, "mouseenter", (e) => {
        var target_match = parentMatch(e.target, "[data-selectable]", dropdown);
        if (target_match)
          self2.onOptionHover(e, target_match);
      }, {capture: true});
      addEvent(dropdown, "click", (evt) => {
        const option2 = parentMatch(evt.target, "[data-selectable]");
        if (option2) {
          self2.onOptionSelect(evt, option2);
          preventDefault(evt, true);
        }
      });
      addEvent(control, "click", (evt) => {
        var target_match = parentMatch(evt.target, "[data-ts-item]", control);
        if (target_match && self2.onItemSelect(evt, target_match)) {
          preventDefault(evt, true);
          return;
        }
        if (control_input.value != "") {
          return;
        }
        self2.onClick();
        preventDefault(evt, true);
      });
      addEvent(focus_node, "keydown", (e) => self2.onKeyDown(e));
      addEvent(control_input, "keypress", (e) => self2.onKeyPress(e));
      addEvent(control_input, "input", (e) => self2.onInput(e));
      addEvent(focus_node, "resize", () => self2.positionDropdown(), passive_event);
      addEvent(focus_node, "blur", (e) => self2.onBlur(e));
      addEvent(focus_node, "focus", (e) => self2.onFocus(e));
      addEvent(control_input, "paste", (e) => self2.onPaste(e));
      const doc_mousedown = (evt) => {
        const target = evt.composedPath()[0];
        if (!wrapper.contains(target) && !dropdown.contains(target)) {
          if (self2.isFocused) {
            self2.blur();
          }
          self2.inputState();
          return;
        }
        if (target == control_input && self2.isOpen) {
          evt.stopPropagation();
        } else {
          preventDefault(evt, true);
        }
      };
      const win_scroll = () => {
        if (self2.isOpen) {
          self2.positionDropdown();
        }
      };
      const win_hover = () => {
        self2.ignoreHover = false;
      };
      addEvent(document, "mousedown", doc_mousedown);
      addEvent(window, "scroll", win_scroll, passive_event);
      addEvent(window, "resize", win_scroll, passive_event);
      addEvent(window, "mousemove", win_hover, passive_event);
      this._destroy = () => {
        document.removeEventListener("mousedown", doc_mousedown);
        window.removeEventListener("mousemove", win_hover);
        window.removeEventListener("scroll", win_scroll);
        window.removeEventListener("resize", win_scroll);
        if (label)
          label.removeEventListener("click", label_click);
      };
      this.revertSettings = {
        innerHTML: input.innerHTML,
        tabIndex: input.tabIndex
      };
      input.tabIndex = -1;
      input.insertAdjacentElement("afterend", self2.wrapper);
      self2.sync(false);
      settings.items = [];
      delete settings.optgroups;
      delete settings.options;
      addEvent(input, "invalid", (e) => {
        if (self2.isValid) {
          self2.isValid = false;
          self2.isInvalid = true;
          self2.refreshState();
        }
      });
      self2.updateOriginalInput();
      self2.refreshItems();
      self2.close(false);
      self2.inputState();
      self2.isSetup = true;
      if (input.disabled) {
        self2.disable();
      } else {
        self2.enable();
      }
      self2.on("change", this.onChange);
      addClasses(input, "tomselected", "ts-hidden-accessible");
      self2.trigger("initialize");
      if (settings.preload === true) {
        self2.preload();
      }
    }
    setupOptions(options = [], optgroups = []) {
      this.addOptions(options);
      iterate(optgroups, (optgroup) => {
        this.registerOptionGroup(optgroup);
      });
    }
    setupTemplates() {
      var self2 = this;
      var field_label = self2.settings.labelField;
      var field_optgroup = self2.settings.optgroupLabelField;
      var templates = {
        "optgroup": (data) => {
          let optgroup = document.createElement("div");
          optgroup.className = "optgroup";
          optgroup.appendChild(data.options);
          return optgroup;
        },
        "optgroup_header": (data, escape) => {
          return '<div class="optgroup-header">' + escape(data[field_optgroup]) + "</div>";
        },
        "option": (data, escape) => {
          return "<div>" + escape(data[field_label]) + "</div>";
        },
        "item": (data, escape) => {
          return "<div>" + escape(data[field_label]) + "</div>";
        },
        "option_create": (data, escape) => {
          return '<div class="create">Add <strong>' + escape(data.input) + "</strong>&hellip;</div>";
        },
        "no_results": () => {
          return '<div class="no-results">No results found</div>';
        },
        "loading": () => {
          return '<div class="spinner"></div>';
        },
        "not_loading": () => {
        },
        "dropdown": () => {
          return "<div></div>";
        }
      };
      self2.settings.render = Object.assign({}, templates, self2.settings.render);
    }
    setupCallbacks() {
      var key, fn;
      var callbacks = {
        "initialize": "onInitialize",
        "change": "onChange",
        "item_add": "onItemAdd",
        "item_remove": "onItemRemove",
        "item_select": "onItemSelect",
        "clear": "onClear",
        "option_add": "onOptionAdd",
        "option_remove": "onOptionRemove",
        "option_clear": "onOptionClear",
        "optgroup_add": "onOptionGroupAdd",
        "optgroup_remove": "onOptionGroupRemove",
        "optgroup_clear": "onOptionGroupClear",
        "dropdown_open": "onDropdownOpen",
        "dropdown_close": "onDropdownClose",
        "type": "onType",
        "load": "onLoad",
        "focus": "onFocus",
        "blur": "onBlur"
      };
      for (key in callbacks) {
        fn = this.settings[callbacks[key]];
        if (fn)
          this.on(key, fn);
      }
    }
    sync(get_settings = true) {
      const self2 = this;
      const settings = get_settings ? getSettings(self2.input, {delimiter: self2.settings.delimiter}) : self2.settings;
      self2.setupOptions(settings.options, settings.optgroups);
      self2.setValue(settings.items || [], true);
      self2.lastQuery = null;
    }
    onClick() {
      var self2 = this;
      if (self2.activeItems.length > 0) {
        self2.clearActiveItems();
        self2.focus();
        return;
      }
      if (self2.isFocused && self2.isOpen) {
        self2.blur();
      } else {
        self2.focus();
      }
    }
    onMouseDown() {
    }
    onChange() {
      triggerEvent(this.input, "input");
      triggerEvent(this.input, "change");
    }
    onPaste(e) {
      var self2 = this;
      if (self2.isInputHidden || self2.isLocked) {
        preventDefault(e);
        return;
      }
      if (!self2.settings.splitOn) {
        return;
      }
      setTimeout(() => {
        var pastedText = self2.inputValue();
        if (!pastedText.match(self2.settings.splitOn)) {
          return;
        }
        var splitInput = pastedText.trim().split(self2.settings.splitOn);
        iterate(splitInput, (piece) => {
          piece = hash_key(piece);
          if (this.options[piece]) {
            self2.addItem(piece);
          } else {
            self2.createItem(piece);
          }
        });
      }, 0);
    }
    onKeyPress(e) {
      var self2 = this;
      if (self2.isLocked) {
        preventDefault(e);
        return;
      }
      var character = String.fromCharCode(e.keyCode || e.which);
      if (self2.settings.create && self2.settings.mode === "multi" && character === self2.settings.delimiter) {
        self2.createItem();
        preventDefault(e);
        return;
      }
    }
    onKeyDown(e) {
      var self2 = this;
      self2.ignoreHover = true;
      if (self2.isLocked) {
        if (e.keyCode !== KEY_TAB) {
          preventDefault(e);
        }
        return;
      }
      switch (e.keyCode) {
        case KEY_A:
          if (isKeyDown(KEY_SHORTCUT, e)) {
            if (self2.control_input.value == "") {
              preventDefault(e);
              self2.selectAll();
              return;
            }
          }
          break;
        case KEY_ESC:
          if (self2.isOpen) {
            preventDefault(e, true);
            self2.close();
          }
          self2.clearActiveItems();
          return;
        case KEY_DOWN:
          if (!self2.isOpen && self2.hasOptions) {
            self2.open();
          } else if (self2.activeOption) {
            let next = self2.getAdjacent(self2.activeOption, 1);
            if (next)
              self2.setActiveOption(next);
          }
          preventDefault(e);
          return;
        case KEY_UP:
          if (self2.activeOption) {
            let prev = self2.getAdjacent(self2.activeOption, -1);
            if (prev)
              self2.setActiveOption(prev);
          }
          preventDefault(e);
          return;
        case KEY_RETURN:
          if (self2.canSelect(self2.activeOption)) {
            self2.onOptionSelect(e, self2.activeOption);
            preventDefault(e);
          } else if (self2.settings.create && self2.createItem()) {
            preventDefault(e);
          } else if (document.activeElement == self2.control_input && self2.isOpen) {
            preventDefault(e);
          }
          return;
        case KEY_LEFT:
          self2.advanceSelection(-1, e);
          return;
        case KEY_RIGHT:
          self2.advanceSelection(1, e);
          return;
        case KEY_TAB:
          if (self2.settings.selectOnTab) {
            if (self2.canSelect(self2.activeOption)) {
              self2.onOptionSelect(e, self2.activeOption);
              preventDefault(e);
            }
            if (self2.settings.create && self2.createItem()) {
              preventDefault(e);
            }
          }
          return;
        case KEY_BACKSPACE:
        case KEY_DELETE:
          self2.deleteSelection(e);
          return;
      }
      if (self2.isInputHidden && !isKeyDown(KEY_SHORTCUT, e)) {
        preventDefault(e);
      }
    }
    onInput(e) {
      var self2 = this;
      if (self2.isLocked) {
        return;
      }
      var value = self2.inputValue();
      if (self2.lastValue !== value) {
        self2.lastValue = value;
        if (self2.settings.shouldLoad.call(self2, value)) {
          self2.load(value);
        }
        self2.refreshOptions();
        self2.trigger("type", value);
      }
    }
    onOptionHover(evt, option2) {
      if (this.ignoreHover)
        return;
      this.setActiveOption(option2, false);
    }
    onFocus(e) {
      var self2 = this;
      var wasFocused = self2.isFocused;
      if (self2.isDisabled) {
        self2.blur();
        preventDefault(e);
        return;
      }
      if (self2.ignoreFocus)
        return;
      self2.isFocused = true;
      if (self2.settings.preload === "focus")
        self2.preload();
      if (!wasFocused)
        self2.trigger("focus");
      if (!self2.activeItems.length) {
        self2.showInput();
        self2.refreshOptions(!!self2.settings.openOnFocus);
      }
      self2.refreshState();
    }
    onBlur(e) {
      if (document.hasFocus() === false)
        return;
      var self2 = this;
      if (!self2.isFocused)
        return;
      self2.isFocused = false;
      self2.ignoreFocus = false;
      var deactivate = () => {
        self2.close();
        self2.setActiveItem();
        self2.setCaret(self2.items.length);
        self2.trigger("blur");
      };
      if (self2.settings.create && self2.settings.createOnBlur) {
        self2.createItem(null, false, deactivate);
      } else {
        deactivate();
      }
    }
    onOptionSelect(evt, option2) {
      var value, self2 = this;
      if (option2.parentElement && option2.parentElement.matches("[data-disabled]")) {
        return;
      }
      if (option2.classList.contains("create")) {
        self2.createItem(null, true, () => {
          if (self2.settings.closeAfterSelect) {
            self2.close();
          }
        });
      } else {
        value = option2.dataset.value;
        if (typeof value !== "undefined") {
          self2.lastQuery = null;
          self2.addItem(value);
          if (self2.settings.closeAfterSelect) {
            self2.close();
          }
          if (!self2.settings.hideSelected && evt.type && /click/.test(evt.type)) {
            self2.setActiveOption(option2);
          }
        }
      }
    }
    canSelect(option2) {
      if (this.isOpen && option2 && this.dropdown_content.contains(option2)) {
        return true;
      }
      return false;
    }
    onItemSelect(evt, item) {
      var self2 = this;
      if (!self2.isLocked && self2.settings.mode === "multi") {
        preventDefault(evt);
        self2.setActiveItem(item, evt);
        return true;
      }
      return false;
    }
    canLoad(value) {
      if (!this.settings.load)
        return false;
      if (this.loadedSearches.hasOwnProperty(value))
        return false;
      return true;
    }
    load(value) {
      const self2 = this;
      if (!self2.canLoad(value))
        return;
      addClasses(self2.wrapper, self2.settings.loadingClass);
      self2.loading++;
      const callback = self2.loadCallback.bind(self2);
      self2.settings.load.call(self2, value, callback);
    }
    loadCallback(options, optgroups) {
      const self2 = this;
      self2.loading = Math.max(self2.loading - 1, 0);
      self2.lastQuery = null;
      self2.clearActiveOption();
      self2.setupOptions(options, optgroups);
      self2.refreshOptions(self2.isFocused && !self2.isInputHidden);
      if (!self2.loading) {
        removeClasses(self2.wrapper, self2.settings.loadingClass);
      }
      self2.trigger("load", options, optgroups);
    }
    preload() {
      var classList = this.wrapper.classList;
      if (classList.contains("preloaded"))
        return;
      classList.add("preloaded");
      this.load("");
    }
    setTextboxValue(value = "") {
      var input = this.control_input;
      var changed = input.value !== value;
      if (changed) {
        input.value = value;
        triggerEvent(input, "update");
        this.lastValue = value;
      }
    }
    getValue() {
      if (this.is_select_tag && this.input.hasAttribute("multiple")) {
        return this.items;
      }
      return this.items.join(this.settings.delimiter);
    }
    setValue(value, silent) {
      var events = silent ? [] : ["change"];
      debounce_events(this, events, () => {
        this.clear(silent);
        this.addItems(value, silent);
      });
    }
    setMaxItems(value) {
      if (value === 0)
        value = null;
      this.settings.maxItems = value;
      this.refreshState();
    }
    setActiveItem(item, e) {
      var self2 = this;
      var eventName;
      var i, begin, end, swap;
      var last;
      if (self2.settings.mode === "single")
        return;
      if (!item) {
        self2.clearActiveItems();
        if (self2.isFocused) {
          self2.showInput();
        }
        return;
      }
      eventName = e && e.type.toLowerCase();
      if (eventName === "click" && isKeyDown("shiftKey", e) && self2.activeItems.length) {
        last = self2.getLastActive();
        begin = Array.prototype.indexOf.call(self2.control.children, last);
        end = Array.prototype.indexOf.call(self2.control.children, item);
        if (begin > end) {
          swap = begin;
          begin = end;
          end = swap;
        }
        for (i = begin; i <= end; i++) {
          item = self2.control.children[i];
          if (self2.activeItems.indexOf(item) === -1) {
            self2.setActiveItemClass(item);
          }
        }
        preventDefault(e);
      } else if (eventName === "click" && isKeyDown(KEY_SHORTCUT, e) || eventName === "keydown" && isKeyDown("shiftKey", e)) {
        if (item.classList.contains("active")) {
          self2.removeActiveItem(item);
        } else {
          self2.setActiveItemClass(item);
        }
      } else {
        self2.clearActiveItems();
        self2.setActiveItemClass(item);
      }
      self2.hideInput();
      if (!self2.isFocused) {
        self2.focus();
      }
    }
    setActiveItemClass(item) {
      const self2 = this;
      const last_active = self2.control.querySelector(".last-active");
      if (last_active)
        removeClasses(last_active, "last-active");
      addClasses(item, "active last-active");
      self2.trigger("item_select", item);
      if (self2.activeItems.indexOf(item) == -1) {
        self2.activeItems.push(item);
      }
    }
    removeActiveItem(item) {
      var idx = this.activeItems.indexOf(item);
      this.activeItems.splice(idx, 1);
      removeClasses(item, "active");
    }
    clearActiveItems() {
      removeClasses(this.activeItems, "active");
      this.activeItems = [];
    }
    setActiveOption(option2, scroll = true) {
      if (option2 === this.activeOption) {
        return;
      }
      this.clearActiveOption();
      if (!option2)
        return;
      this.activeOption = option2;
      setAttr(this.focus_node, {"aria-activedescendant": option2.getAttribute("id")});
      setAttr(option2, {"aria-selected": "true"});
      addClasses(option2, "active");
      if (scroll)
        this.scrollToOption(option2);
    }
    scrollToOption(option2, behavior) {
      if (!option2)
        return;
      const content = this.dropdown_content;
      const height_menu = content.clientHeight;
      const scrollTop = content.scrollTop || 0;
      const height_item = option2.offsetHeight;
      const y = option2.getBoundingClientRect().top - content.getBoundingClientRect().top + scrollTop;
      if (y + height_item > height_menu + scrollTop) {
        this.scroll(y - height_menu + height_item, behavior);
      } else if (y < scrollTop) {
        this.scroll(y, behavior);
      }
    }
    scroll(scrollTop, behavior) {
      const content = this.dropdown_content;
      if (behavior) {
        content.style.scrollBehavior = behavior;
      }
      content.scrollTop = scrollTop;
      content.style.scrollBehavior = "";
    }
    clearActiveOption() {
      if (this.activeOption) {
        removeClasses(this.activeOption, "active");
        setAttr(this.activeOption, {"aria-selected": null});
      }
      this.activeOption = null;
      setAttr(this.focus_node, {"aria-activedescendant": null});
    }
    selectAll() {
      const self2 = this;
      if (self2.settings.mode === "single")
        return;
      const activeItems = self2.controlChildren();
      if (!activeItems.length)
        return;
      self2.hideInput();
      self2.close();
      self2.activeItems = activeItems;
      iterate(activeItems, (item) => {
        self2.setActiveItemClass(item);
      });
    }
    inputState() {
      var self2 = this;
      if (!self2.control.contains(self2.control_input))
        return;
      setAttr(self2.control_input, {placeholder: self2.settings.placeholder});
      if (self2.activeItems.length > 0 || !self2.isFocused && self2.settings.hidePlaceholder && self2.items.length > 0) {
        self2.setTextboxValue();
        self2.isInputHidden = true;
      } else {
        if (self2.settings.hidePlaceholder && self2.items.length > 0) {
          setAttr(self2.control_input, {placeholder: ""});
        }
        self2.isInputHidden = false;
      }
      self2.wrapper.classList.toggle("input-hidden", self2.isInputHidden);
    }
    hideInput() {
      this.inputState();
    }
    showInput() {
      this.inputState();
    }
    inputValue() {
      return this.control_input.value.trim();
    }
    focus() {
      var self2 = this;
      if (self2.isDisabled)
        return;
      self2.ignoreFocus = true;
      if (self2.control_input.offsetWidth) {
        self2.control_input.focus();
      } else {
        self2.focus_node.focus();
      }
      setTimeout(() => {
        self2.ignoreFocus = false;
        self2.onFocus();
      }, 0);
    }
    blur() {
      this.focus_node.blur();
      this.onBlur();
    }
    getScoreFunction(query) {
      return this.sifter.getScoreFunction(query, this.getSearchOptions());
    }
    getSearchOptions() {
      var settings = this.settings;
      var sort2 = settings.sortField;
      if (typeof settings.sortField === "string") {
        sort2 = [{field: settings.sortField}];
      }
      return {
        fields: settings.searchField,
        conjunction: settings.searchConjunction,
        sort: sort2,
        nesting: settings.nesting
      };
    }
    search(query) {
      var i, result, calculateScore;
      var self2 = this;
      var options = this.getSearchOptions();
      if (self2.settings.score) {
        calculateScore = self2.settings.score.call(self2, query);
        if (typeof calculateScore !== "function") {
          throw new Error('Tom Select "score" setting must be a function that returns a function');
        }
      }
      if (query !== self2.lastQuery) {
        self2.lastQuery = query;
        result = self2.sifter.search(query, Object.assign(options, {score: calculateScore}));
        self2.currentResults = result;
      } else {
        result = Object.assign({}, self2.currentResults);
      }
      if (self2.settings.hideSelected) {
        for (i = result.items.length - 1; i >= 0; i--) {
          let hashed = hash_key(result.items[i].id);
          if (hashed && self2.items.indexOf(hashed) !== -1) {
            result.items.splice(i, 1);
          }
        }
      }
      return result;
    }
    refreshOptions(triggerDropdown = true) {
      var i, j, k, n, optgroup, optgroups, html, has_create_option, active_value, active_group;
      var create;
      const groups = {};
      const groups_order = [];
      var self2 = this;
      var query = self2.inputValue();
      var results = self2.search(query);
      var active_option = null;
      var show_dropdown = self2.settings.shouldOpen || false;
      var dropdown_content = self2.dropdown_content;
      if (self2.activeOption) {
        active_value = self2.activeOption.dataset.value;
        active_group = self2.activeOption.closest("[data-group]");
      }
      n = results.items.length;
      if (typeof self2.settings.maxOptions === "number") {
        n = Math.min(n, self2.settings.maxOptions);
      }
      if (n > 0) {
        show_dropdown = true;
      }
      for (i = 0; i < n; i++) {
        let opt_value = results.items[i].id;
        let option2 = self2.options[opt_value];
        let option_el = self2.getOption(opt_value, true);
        if (!self2.settings.hideSelected) {
          option_el.classList.toggle("selected", self2.items.includes(opt_value));
        }
        optgroup = option2[self2.settings.optgroupField] || "";
        optgroups = Array.isArray(optgroup) ? optgroup : [optgroup];
        for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
          optgroup = optgroups[j];
          if (!self2.optgroups.hasOwnProperty(optgroup)) {
            optgroup = "";
          }
          if (!groups.hasOwnProperty(optgroup)) {
            groups[optgroup] = document.createDocumentFragment();
            groups_order.push(optgroup);
          }
          if (j > 0) {
            option_el = option_el.cloneNode(true);
            setAttr(option_el, {id: option2.$id + "-clone-" + j, "aria-selected": null});
            option_el.classList.add("ts-cloned");
            removeClasses(option_el, "active");
          }
          if (!active_option && active_value == opt_value) {
            if (active_group) {
              if (active_group.dataset.group === optgroup) {
                active_option = option_el;
              }
            } else {
              active_option = option_el;
            }
          }
          groups[optgroup].appendChild(option_el);
        }
      }
      if (this.settings.lockOptgroupOrder) {
        groups_order.sort((a, b) => {
          var a_order = self2.optgroups[a] && self2.optgroups[a].$order || 0;
          var b_order = self2.optgroups[b] && self2.optgroups[b].$order || 0;
          return a_order - b_order;
        });
      }
      html = document.createDocumentFragment();
      iterate(groups_order, (optgroup2) => {
        if (self2.optgroups.hasOwnProperty(optgroup2) && groups[optgroup2].children.length) {
          let group_options = document.createDocumentFragment();
          let header = self2.render("optgroup_header", self2.optgroups[optgroup2]);
          append(group_options, header);
          append(group_options, groups[optgroup2]);
          let group_html = self2.render("optgroup", {group: self2.optgroups[optgroup2], options: group_options});
          append(html, group_html);
        } else {
          append(html, groups[optgroup2]);
        }
      });
      dropdown_content.innerHTML = "";
      append(dropdown_content, html);
      if (self2.settings.highlight) {
        removeHighlight(dropdown_content);
        if (results.query.length && results.tokens.length) {
          iterate(results.tokens, (tok) => {
            highlight(dropdown_content, tok.regex);
          });
        }
      }
      var add_template = (template5) => {
        let content = self2.render(template5, {input: query});
        if (content) {
          show_dropdown = true;
          dropdown_content.insertBefore(content, dropdown_content.firstChild);
        }
        return content;
      };
      if (self2.loading) {
        add_template("loading");
      } else if (!self2.settings.shouldLoad.call(self2, query)) {
        add_template("not_loading");
      } else if (results.items.length === 0) {
        add_template("no_results");
      }
      has_create_option = self2.canCreate(query);
      if (has_create_option) {
        create = add_template("option_create");
      }
      self2.hasOptions = results.items.length > 0 || has_create_option;
      if (show_dropdown) {
        if (results.items.length > 0) {
          if (!active_option && self2.settings.mode === "single" && self2.items.length) {
            active_option = self2.getOption(self2.items[0]);
          }
          if (!dropdown_content.contains(active_option)) {
            let active_index = 0;
            if (create && !self2.settings.addPrecedence) {
              active_index = 1;
            }
            active_option = self2.selectable()[active_index];
          }
        } else if (create) {
          active_option = create;
        }
        if (triggerDropdown && !self2.isOpen) {
          self2.open();
          self2.scrollToOption(active_option, "auto");
        }
        self2.setActiveOption(active_option);
      } else {
        self2.clearActiveOption();
        if (triggerDropdown && self2.isOpen) {
          self2.close(false);
        }
      }
    }
    selectable() {
      return this.dropdown_content.querySelectorAll("[data-selectable]");
    }
    addOption(data, user_created = false) {
      const self2 = this;
      if (Array.isArray(data)) {
        self2.addOptions(data, user_created);
        return false;
      }
      const key = hash_key(data[self2.settings.valueField]);
      if (key === null || self2.options.hasOwnProperty(key)) {
        return false;
      }
      data.$order = data.$order || ++self2.order;
      data.$id = self2.inputId + "-opt-" + data.$order;
      self2.options[key] = data;
      self2.lastQuery = null;
      if (user_created) {
        self2.userOptions[key] = user_created;
        self2.trigger("option_add", key, data);
      }
      return key;
    }
    addOptions(data, user_created = false) {
      iterate(data, (dat) => {
        this.addOption(dat, user_created);
      });
    }
    registerOption(data) {
      return this.addOption(data);
    }
    registerOptionGroup(data) {
      var key = hash_key(data[this.settings.optgroupValueField]);
      if (key === null)
        return false;
      data.$order = data.$order || ++this.order;
      this.optgroups[key] = data;
      return key;
    }
    addOptionGroup(id, data) {
      var hashed_id;
      data[this.settings.optgroupValueField] = id;
      if (hashed_id = this.registerOptionGroup(data)) {
        this.trigger("optgroup_add", hashed_id, data);
      }
    }
    removeOptionGroup(id) {
      if (this.optgroups.hasOwnProperty(id)) {
        delete this.optgroups[id];
        this.clearCache();
        this.trigger("optgroup_remove", id);
      }
    }
    clearOptionGroups() {
      this.optgroups = {};
      this.clearCache();
      this.trigger("optgroup_clear");
    }
    updateOption(value, data) {
      const self2 = this;
      var item_new;
      var index_item;
      const value_old = hash_key(value);
      const value_new = hash_key(data[self2.settings.valueField]);
      if (value_old === null)
        return;
      if (!self2.options.hasOwnProperty(value_old))
        return;
      if (typeof value_new !== "string")
        throw new Error("Value must be set in option data");
      const option2 = self2.getOption(value_old);
      const item = self2.getItem(value_old);
      data.$order = data.$order || self2.options[value_old].$order;
      delete self2.options[value_old];
      self2.uncacheValue(value_new);
      self2.options[value_new] = data;
      if (option2) {
        if (self2.dropdown_content.contains(option2)) {
          const option_new = self2._render("option", data);
          replaceNode(option2, option_new);
          if (self2.activeOption === option2) {
            self2.setActiveOption(option_new);
          }
        }
        option2.remove();
      }
      if (item) {
        index_item = self2.items.indexOf(value_old);
        if (index_item !== -1) {
          self2.items.splice(index_item, 1, value_new);
        }
        item_new = self2._render("item", data);
        if (item.classList.contains("active"))
          addClasses(item_new, "active");
        replaceNode(item, item_new);
      }
      self2.lastQuery = null;
    }
    removeOption(value, silent) {
      const self2 = this;
      value = get_hash(value);
      self2.uncacheValue(value);
      delete self2.userOptions[value];
      delete self2.options[value];
      self2.lastQuery = null;
      self2.trigger("option_remove", value);
      self2.removeItem(value, silent);
    }
    clearOptions(filter) {
      const boundFilter = (filter || this.clearFilter).bind(this);
      this.loadedSearches = {};
      this.userOptions = {};
      this.clearCache();
      const selected = {};
      iterate(this.options, (option2, key) => {
        if (boundFilter(option2, key)) {
          selected[key] = this.options[key];
        }
      });
      this.options = this.sifter.items = selected;
      this.lastQuery = null;
      this.trigger("option_clear");
    }
    clearFilter(option2, value) {
      if (this.items.indexOf(value) >= 0) {
        return true;
      }
      return false;
    }
    getOption(value, create = false) {
      const hashed = hash_key(value);
      if (hashed !== null && this.options.hasOwnProperty(hashed)) {
        const option2 = this.options[hashed];
        if (option2.$div) {
          return option2.$div;
        }
        if (create) {
          return this._render("option", option2);
        }
      }
      return null;
    }
    getAdjacent(option2, direction, type = "option") {
      var self2 = this, all;
      if (!option2) {
        return null;
      }
      if (type == "item") {
        all = self2.controlChildren();
      } else {
        all = self2.dropdown_content.querySelectorAll("[data-selectable]");
      }
      for (let i = 0; i < all.length; i++) {
        if (all[i] != option2) {
          continue;
        }
        if (direction > 0) {
          return all[i + 1];
        }
        return all[i - 1];
      }
      return null;
    }
    getItem(item) {
      if (typeof item == "object") {
        return item;
      }
      var value = hash_key(item);
      return value !== null ? this.control.querySelector(`[data-value="${addSlashes(value)}"]`) : null;
    }
    addItems(values, silent) {
      var self2 = this;
      var items = Array.isArray(values) ? values : [values];
      items = items.filter((x) => self2.items.indexOf(x) === -1);
      for (let i = 0, n = items.length; i < n; i++) {
        self2.isPending = i < n - 1;
        self2.addItem(items[i], silent);
      }
    }
    addItem(value, silent) {
      var events = silent ? [] : ["change", "dropdown_close"];
      debounce_events(this, events, () => {
        var item, wasFull;
        const self2 = this;
        const inputMode = self2.settings.mode;
        const hashed = hash_key(value);
        if (hashed && self2.items.indexOf(hashed) !== -1) {
          if (inputMode === "single") {
            self2.close();
          }
          if (inputMode === "single" || !self2.settings.duplicates) {
            return;
          }
        }
        if (hashed === null || !self2.options.hasOwnProperty(hashed))
          return;
        if (inputMode === "single")
          self2.clear(silent);
        if (inputMode === "multi" && self2.isFull())
          return;
        item = self2._render("item", self2.options[hashed]);
        if (self2.control.contains(item)) {
          item = item.cloneNode(true);
        }
        wasFull = self2.isFull();
        self2.items.splice(self2.caretPos, 0, hashed);
        self2.insertAtCaret(item);
        if (self2.isSetup) {
          if (!self2.isPending && self2.settings.hideSelected) {
            let option2 = self2.getOption(hashed);
            let next = self2.getAdjacent(option2, 1);
            if (next) {
              self2.setActiveOption(next);
            }
          }
          if (!self2.isPending && !self2.settings.closeAfterSelect) {
            self2.refreshOptions(self2.isFocused && inputMode !== "single");
          }
          if (self2.settings.closeAfterSelect != false && self2.isFull()) {
            self2.close();
          } else if (!self2.isPending) {
            self2.positionDropdown();
          }
          self2.trigger("item_add", hashed, item);
          if (!self2.isPending) {
            self2.updateOriginalInput({silent});
          }
        }
        if (!self2.isPending || !wasFull && self2.isFull()) {
          self2.inputState();
          self2.refreshState();
        }
      });
    }
    removeItem(item = null, silent) {
      const self2 = this;
      item = self2.getItem(item);
      if (!item)
        return;
      var i, idx;
      const value = item.dataset.value;
      i = nodeIndex(item);
      item.remove();
      if (item.classList.contains("active")) {
        idx = self2.activeItems.indexOf(item);
        self2.activeItems.splice(idx, 1);
        removeClasses(item, "active");
      }
      self2.items.splice(i, 1);
      self2.lastQuery = null;
      if (!self2.settings.persist && self2.userOptions.hasOwnProperty(value)) {
        self2.removeOption(value, silent);
      }
      if (i < self2.caretPos) {
        self2.setCaret(self2.caretPos - 1);
      }
      self2.updateOriginalInput({silent});
      self2.refreshState();
      self2.positionDropdown();
      self2.trigger("item_remove", value, item);
    }
    createItem(input = null, triggerDropdown = true, callback = () => {
    }) {
      var self2 = this;
      var caret = self2.caretPos;
      var output;
      input = input || self2.inputValue();
      if (!self2.canCreate(input)) {
        callback();
        return false;
      }
      self2.lock();
      var created = false;
      var create = (data) => {
        self2.unlock();
        if (!data || typeof data !== "object")
          return callback();
        var value = hash_key(data[self2.settings.valueField]);
        if (typeof value !== "string") {
          return callback();
        }
        self2.setTextboxValue();
        self2.addOption(data, true);
        self2.setCaret(caret);
        self2.addItem(value);
        callback(data);
        created = true;
      };
      if (typeof self2.settings.create === "function") {
        output = self2.settings.create.call(this, input, create);
      } else {
        output = {
          [self2.settings.labelField]: input,
          [self2.settings.valueField]: input
        };
      }
      if (!created) {
        create(output);
      }
      return true;
    }
    refreshItems() {
      var self2 = this;
      self2.lastQuery = null;
      if (self2.isSetup) {
        self2.addItems(self2.items);
      }
      self2.updateOriginalInput();
      self2.refreshState();
    }
    refreshState() {
      const self2 = this;
      self2.refreshValidityState();
      const isFull = self2.isFull();
      const isLocked = self2.isLocked;
      self2.wrapper.classList.toggle("rtl", self2.rtl);
      const wrap_classList = self2.wrapper.classList;
      wrap_classList.toggle("focus", self2.isFocused);
      wrap_classList.toggle("disabled", self2.isDisabled);
      wrap_classList.toggle("required", self2.isRequired);
      wrap_classList.toggle("invalid", !self2.isValid);
      wrap_classList.toggle("locked", isLocked);
      wrap_classList.toggle("full", isFull);
      wrap_classList.toggle("input-active", self2.isFocused && !self2.isInputHidden);
      wrap_classList.toggle("dropdown-active", self2.isOpen);
      wrap_classList.toggle("has-options", isEmptyObject(self2.options));
      wrap_classList.toggle("has-items", self2.items.length > 0);
    }
    refreshValidityState() {
      var self2 = this;
      if (!self2.input.validity) {
        return;
      }
      self2.isValid = self2.input.validity.valid;
      self2.isInvalid = !self2.isValid;
    }
    isFull() {
      return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
    }
    updateOriginalInput(opts = {}) {
      const self2 = this;
      var option2, label;
      const empty_option = self2.input.querySelector('option[value=""]');
      if (self2.is_select_tag) {
        let AddSelected = function(option_el, value, label2) {
          if (!option_el) {
            option_el = getDom('<option value="' + escape_html(value) + '">' + escape_html(label2) + "</option>");
          }
          if (option_el != empty_option) {
            self2.input.append(option_el);
          }
          selected.push(option_el);
          if (option_el != empty_option || has_selected > 0) {
            option_el.selected = true;
          }
          return option_el;
        };
        const selected = [];
        const has_selected = self2.input.querySelectorAll("option:checked").length;
        self2.input.querySelectorAll("option:checked").forEach((option_el) => {
          option_el.selected = false;
        });
        if (self2.items.length == 0 && self2.settings.mode == "single") {
          AddSelected(empty_option, "", "");
        } else {
          self2.items.forEach((value) => {
            option2 = self2.options[value];
            label = option2[self2.settings.labelField] || "";
            if (selected.includes(option2.$option)) {
              const reuse_opt = self2.input.querySelector(`option[value="${addSlashes(value)}"]:not(:checked)`);
              AddSelected(reuse_opt, value, label);
            } else {
              option2.$option = AddSelected(option2.$option, value, label);
            }
          });
        }
      } else {
        self2.input.value = self2.getValue();
      }
      if (self2.isSetup) {
        if (!opts.silent) {
          self2.trigger("change", self2.getValue());
        }
      }
    }
    open() {
      var self2 = this;
      if (self2.isLocked || self2.isOpen || self2.settings.mode === "multi" && self2.isFull())
        return;
      self2.isOpen = true;
      setAttr(self2.focus_node, {"aria-expanded": "true"});
      self2.refreshState();
      applyCSS(self2.dropdown, {visibility: "hidden", display: "block"});
      self2.positionDropdown();
      applyCSS(self2.dropdown, {visibility: "visible", display: "block"});
      self2.focus();
      self2.trigger("dropdown_open", self2.dropdown);
    }
    close(setTextboxValue = true) {
      var self2 = this;
      var trigger = self2.isOpen;
      if (setTextboxValue) {
        self2.setTextboxValue();
        if (self2.settings.mode === "single" && self2.items.length) {
          self2.hideInput();
        }
      }
      self2.isOpen = false;
      setAttr(self2.focus_node, {"aria-expanded": "false"});
      applyCSS(self2.dropdown, {display: "none"});
      if (self2.settings.hideSelected) {
        self2.clearActiveOption();
      }
      self2.refreshState();
      if (trigger)
        self2.trigger("dropdown_close", self2.dropdown);
    }
    positionDropdown() {
      if (this.settings.dropdownParent !== "body") {
        return;
      }
      var context = this.control;
      var rect = context.getBoundingClientRect();
      var top = context.offsetHeight + rect.top + window.scrollY;
      var left = rect.left + window.scrollX;
      applyCSS(this.dropdown, {
        width: rect.width + "px",
        top: top + "px",
        left: left + "px"
      });
    }
    clear(silent) {
      var self2 = this;
      if (!self2.items.length)
        return;
      var items = self2.controlChildren();
      iterate(items, (item) => {
        self2.removeItem(item, true);
      });
      self2.showInput();
      if (!silent)
        self2.updateOriginalInput();
      self2.trigger("clear");
    }
    insertAtCaret(el) {
      const self2 = this;
      const caret = self2.caretPos;
      const target = self2.control;
      target.insertBefore(el, target.children[caret]);
      self2.setCaret(caret + 1);
    }
    deleteSelection(e) {
      var direction, selection, caret, tail;
      var self2 = this;
      direction = e && e.keyCode === KEY_BACKSPACE ? -1 : 1;
      selection = getSelection(self2.control_input);
      const rm_items = [];
      if (self2.activeItems.length) {
        tail = getTail(self2.activeItems, direction);
        caret = nodeIndex(tail);
        if (direction > 0) {
          caret++;
        }
        iterate(self2.activeItems, (item) => rm_items.push(item));
      } else if ((self2.isFocused || self2.settings.mode === "single") && self2.items.length) {
        const items = self2.controlChildren();
        if (direction < 0 && selection.start === 0 && selection.length === 0) {
          rm_items.push(items[self2.caretPos - 1]);
        } else if (direction > 0 && selection.start === self2.inputValue().length) {
          rm_items.push(items[self2.caretPos]);
        }
      }
      if (!self2.shouldDelete(rm_items, e)) {
        return false;
      }
      preventDefault(e, true);
      if (typeof caret !== "undefined") {
        self2.setCaret(caret);
      }
      while (rm_items.length) {
        self2.removeItem(rm_items.pop());
      }
      self2.showInput();
      self2.positionDropdown();
      self2.refreshOptions(false);
      return true;
    }
    shouldDelete(items, evt) {
      const values = items.map((item) => item.dataset.value);
      if (!values.length || typeof this.settings.onDelete === "function" && this.settings.onDelete(values, evt) === false) {
        return false;
      }
      return true;
    }
    advanceSelection(direction, e) {
      var last_active, adjacent, self2 = this;
      if (self2.rtl)
        direction *= -1;
      if (self2.inputValue().length)
        return;
      if (isKeyDown(KEY_SHORTCUT, e) || isKeyDown("shiftKey", e)) {
        last_active = self2.getLastActive(direction);
        if (last_active) {
          if (!last_active.classList.contains("active")) {
            adjacent = last_active;
          } else {
            adjacent = self2.getAdjacent(last_active, direction, "item");
          }
        } else if (direction > 0) {
          adjacent = self2.control_input.nextElementSibling;
        } else {
          adjacent = self2.control_input.previousElementSibling;
        }
        if (adjacent) {
          if (adjacent.classList.contains("active")) {
            self2.removeActiveItem(last_active);
          }
          self2.setActiveItemClass(adjacent);
        }
      } else {
        self2.moveCaret(direction);
      }
    }
    moveCaret(direction) {
    }
    getLastActive(direction) {
      let last_active = this.control.querySelector(".last-active");
      if (last_active) {
        return last_active;
      }
      var result = this.control.querySelectorAll(".active");
      if (result) {
        return getTail(result, direction);
      }
    }
    setCaret(new_pos) {
      this.caretPos = this.items.length;
    }
    controlChildren() {
      return Array.from(this.control.querySelectorAll("[data-ts-item]"));
    }
    lock() {
      this.isLocked = true;
      this.refreshState();
    }
    unlock() {
      this.isLocked = false;
      this.refreshState();
    }
    disable() {
      var self2 = this;
      self2.input.disabled = true;
      self2.control_input.disabled = true;
      self2.focus_node.tabIndex = -1;
      self2.isDisabled = true;
      this.close();
      self2.lock();
    }
    enable() {
      var self2 = this;
      self2.input.disabled = false;
      self2.control_input.disabled = false;
      self2.focus_node.tabIndex = self2.tabIndex;
      self2.isDisabled = false;
      self2.unlock();
    }
    destroy() {
      var self2 = this;
      var revertSettings = self2.revertSettings;
      self2.trigger("destroy");
      self2.off();
      self2.wrapper.remove();
      self2.dropdown.remove();
      self2.input.innerHTML = revertSettings.innerHTML;
      self2.input.tabIndex = revertSettings.tabIndex;
      removeClasses(self2.input, "tomselected", "ts-hidden-accessible");
      self2._destroy();
      delete self2.input.tomselect;
    }
    render(templateName, data) {
      if (typeof this.settings.render[templateName] !== "function") {
        return null;
      }
      return this._render(templateName, data);
    }
    _render(templateName, data) {
      var value = "", id, html;
      const self2 = this;
      if (templateName === "option" || templateName == "item") {
        value = get_hash(data[self2.settings.valueField]);
      }
      html = self2.settings.render[templateName].call(this, data, escape_html);
      if (html == null) {
        return html;
      }
      html = getDom(html);
      if (templateName === "option" || templateName === "option_create") {
        if (data[self2.settings.disabledField]) {
          setAttr(html, {"aria-disabled": "true"});
        } else {
          setAttr(html, {"data-selectable": ""});
        }
      } else if (templateName === "optgroup") {
        id = data.group[self2.settings.optgroupValueField];
        setAttr(html, {"data-group": id});
        if (data.group[self2.settings.disabledField]) {
          setAttr(html, {"data-disabled": ""});
        }
      }
      if (templateName === "option" || templateName === "item") {
        setAttr(html, {"data-value": value});
        if (templateName === "item") {
          addClasses(html, self2.settings.itemClass);
          setAttr(html, {"data-ts-item": ""});
        } else {
          addClasses(html, self2.settings.optionClass);
          setAttr(html, {
            role: "option",
            id: data.$id
          });
          self2.options[value].$div = html;
        }
      }
      return html;
    }
    clearCache() {
      iterate(this.options, (option2, value) => {
        if (option2.$div) {
          option2.$div.remove();
          delete option2.$div;
        }
      });
    }
    uncacheValue(value) {
      const option_el = this.getOption(value);
      if (option_el)
        option_el.remove();
    }
    canCreate(input) {
      return this.settings.create && input.length > 0 && this.settings.createFilter.call(this, input);
    }
    hook(when, method, new_fn) {
      var self2 = this;
      var orig_method = self2[method];
      self2[method] = function() {
        var result, result_new;
        if (when === "after") {
          result = orig_method.apply(self2, arguments);
        }
        result_new = new_fn.apply(self2, arguments);
        if (when === "instead") {
          return result_new;
        }
        if (when === "before") {
          result = orig_method.apply(self2, arguments);
        }
        return result;
      };
    }
  };
  var tom_select_default = TomSelect;

  // node_modules/tom-select/src/plugins/remove_button/plugin.ts
  function plugin_default(userOptions) {
    const options = Object.assign({
      label: "&times;",
      title: "Remove",
      className: "remove",
      append: true
    }, userOptions);
    var self2 = this;
    if (!options.append) {
      return;
    }
    var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + "</a>";
    self2.hook("after", "setupTemplates", () => {
      var orig_render_item = self2.settings.render.item;
      self2.settings.render.item = (data, escape) => {
        var item = getDom(orig_render_item.call(self2, data, escape));
        var close_button = getDom(html);
        item.appendChild(close_button);
        addEvent(close_button, "mousedown", (evt) => {
          preventDefault(evt, true);
        });
        addEvent(close_button, "click", (evt) => {
          preventDefault(evt, true);
          if (self2.isLocked)
            return;
          if (!self2.shouldDelete([item], evt))
            return;
          self2.removeItem(item);
          self2.refreshOptions(false);
          self2.inputState();
        });
        return item;
      };
    });
  }

  // client/django-formset/IncompleteSelect.ts
  var IncompleteSelect = class {
    constructor(element) {
      this.touch = () => {
        this.fieldGroup.classList.remove("dj-untouched");
        this.fieldGroup.classList.remove("dj-validated");
        this.fieldGroup.classList.add("dj-touched");
      };
      const fieldGroup = element.closest("django-field-group");
      const form = element.closest("form");
      const formset = element.closest("django-formset");
      if (!fieldGroup || !form || !formset)
        throw new Error("Attempt to initialize <django-selectize> outside <django-formset>");
      this.fieldGroup = fieldGroup;
      this.isIncomplete = element.hasAttribute("incomplete");
      if (this.isIncomplete) {
        const formName = form.getAttribute("name") ?? "__default__";
        this.endpoint = formset.getAttribute("endpoint") ?? "";
        this.fieldName = `${formName}.${element.getAttribute("name")}`;
      }
      form.addEventListener("reset", (event) => this.formResetted(event));
      form.addEventListener("submitted", (event) => this.formSubmitted(event));
    }
    async loadOptions(query, successCallback) {
      const headers = new Headers();
      headers.append("Accept", "application/json");
      const url = `${this.endpoint}?field=${this.fieldName}&${query}`;
      const response = await fetch(url, {
        method: "GET",
        headers
      });
      if (response.status === 200) {
        const data = await response.json();
        if (typeof data.incomplete === "boolean") {
          this.isIncomplete = data.incomplete;
        }
        successCallback(data.items);
      } else {
        console.error(`Failed to fetch from ${url} (status=${response.status})`);
      }
    }
  };

  // client/django-formset/DjangoSelectize.ts
  var import_lodash5 = __toModule(require_lodash5());

  // client/django-formset/helpers.ts
  var StyleHelpers;
  (function(StyleHelpers2) {
    function extractStyles(element, properties) {
      let styles = Array();
      const style2 = window.getComputedStyle(element);
      for (let property of properties) {
        styles.push(`${property}:${style2.getPropertyValue(property)}`);
      }
      return styles.join("; ").concat("; ");
    }
    StyleHelpers2.extractStyles = extractStyles;
    function convertPseudoClasses() {
      const numStyleSheets = document.styleSheets.length;
      const styleElement = document.createElement("style");
      document.head.appendChild(styleElement);
      for (let index2 = 0; index2 < numStyleSheets; index2++) {
        const sheet = document.styleSheets[index2];
        for (let k = 0; k < sheet.cssRules.length; k++) {
          const cssRule = sheet.cssRules.item(k);
          if (cssRule) {
            traverseStyles(cssRule, styleElement.sheet);
          }
        }
      }
      return styleElement;
    }
    StyleHelpers2.convertPseudoClasses = convertPseudoClasses;
    function traverseStyles(cssRule, extraCSSStyleSheet) {
      if (cssRule instanceof CSSImportRule) {
        if (!cssRule.styleSheet)
          return;
        for (let subRule of cssRule.styleSheet.cssRules) {
          traverseStyles(subRule, extraCSSStyleSheet);
        }
      } else if (cssRule instanceof CSSStyleRule) {
        if (!cssRule.selectorText)
          return;
        const newSelectorText = cssRule.selectorText.replaceAll(":focus", ".-focus-").replaceAll(":focus-visible", ".-focus-visible-").replaceAll(":hover", ".-hover-").replaceAll(":disabled", ".-disabled-").replaceAll(":invalid", ".-invalid-").replaceAll(":valid", ".-valid-").replaceAll("::placeholder-shown", ".-placeholder-shown").replaceAll(":placeholder-shown", ".-placeholder-shown").replaceAll("::placeholder", ".-placeholder-").replaceAll(":placeholder", ".-placeholder-");
        if (newSelectorText !== cssRule.selectorText) {
          extraCSSStyleSheet.insertRule(`${newSelectorText}{${cssRule.style.cssText}}`);
        }
      }
    }
  })(StyleHelpers || (StyleHelpers = {}));

  // _soeytdaom:/home/runner/work/django-formset/django-formset/client/django-formset/DjangoSelectize.scss
  var DjangoSelectize_default = ":root{--django-formset-color-invalid: rgb(255, 3, 0);--django-formset-shadow-invalid: rgb(255, 3, 0, 0.25);--django-formset-color-valid: rgb(0, 122, 0)}.ts-wrapper{position:relative}.ts-wrapper .ts-control{overflow:hidden;box-sizing:border-box;display:flex;flex-wrap:wrap;align-content:center}.ts-wrapper .ts-control>input{flex:1 1 auto;box-sizing:border-box;user-select:auto;box-shadow:none;border:none;padding:0;font-size:inherit;font-weight:inherit;font-style:inherit;font-family:inherit;caret-color:rgba(0,0,0,.15)}.ts-wrapper .ts-control>input::placeholder{opacity:1}.ts-wrapper .ts-control>input::-ms-clear{display:none}.ts-wrapper .ts-control>input:focus{outline:none !important}.ts-wrapper .ts-control>div{flex:0 1 auto;box-sizing:border-box}.ts-wrapper.multi .ts-control{padding:0 6px 3px 10px}.ts-wrapper.multi .ts-control>div{border:1px solid rgba(0,0,0,.15);border-radius:3px;margin:3px 3px 0 0}.ts-wrapper.multi .ts-control>div .remove{text-decoration:none;color:rgba(0,0,0,.15);border-left:1px solid rgba(0,0,0,.15);padding-left:2px;margin-left:2px}.ts-wrapper.multi .ts-control>div .remove:hover{color:inherit}.ts-wrapper.multi .ts-control>div.active{background-color:rgba(0,0,0,.05)}.ts-wrapper.multi.full .ts-control>input{visibility:hidden}.ts-wrapper.multi.has-items:not(.dirty) .ts-control>input::placeholder{opacity:0}.ts-wrapper.focus .ts-control{opacity:1}.ts-wrapper.disabled .ts-control{opacity:1}.ts-wrapper.input-hidden .ts-control>input{opacity:0;position:absolute;left:-10000px}.ts-wrapper:not(.multi).dirty.focus .ts-control .item{display:none}.ts-wrapper .ts-dropdown{position:absolute;top:100%;left:0;width:100%;z-index:10;background:#f4f4f4;backdrop-filter:blur(0.5rem);margin:.125rem 0 0 0;border-top:0 none;box-sizing:border-box}.ts-wrapper .ts-dropdown [data-selectable]{cursor:pointer;overflow:hidden}.ts-wrapper .ts-dropdown [data-selectable] .highlight{background:rgba(255,237,40,.4);border-radius:1px}.ts-wrapper .ts-dropdown .ts-dropdown-content{overflow-y:auto;overflow-x:hidden;overflow-scrolling:touch;scroll-behavior:smooth}:host-context(django-field-group.dj-touched) .ts-wrapper.has-items:not(.input-active) .ts-control{border-color:var(--django-formset-color-valid)}:host-context(django-field-group.dj-touched) .ts-wrapper.invalid:not(.input-active) .ts-control{border-color:var(--django-formset-color-invalid)}";

  // client/django-formset/DjangoSelectize.ts
  tom_select_default.define("remove_button", plugin_default);
  var DjangoSelectize = class extends IncompleteSelect {
    constructor(tomInput) {
      super(tomInput);
      this.numOptions = 12;
      this.blurred = () => {
        const wrapper = this.shadowRoot.querySelector(".ts-wrapper");
        wrapper?.classList.remove("dirty");
      };
      this.changed = () => {
        this.tomSelect.setTextboxValue("");
        if (this.tomSelect.dropdown_content.childElementCount <= 1) {
          this.tomSelect.close();
        }
      };
      this.inputted = (event) => {
        const value = event;
        const wrapper = this.shadowRoot.querySelector(".ts-wrapper");
        wrapper?.classList.toggle("dirty", value.length > 0);
      };
      this.attributesChanged = (mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "attributes" && mutation.attributeName === "disabled") {
            if (this.tomInput.disabled) {
              if (!this.tomSelect.isDisabled) {
                this.tomSelect.disable();
              }
            } else {
              if (this.tomSelect.isDisabled) {
                this.tomSelect.enable();
              }
            }
          }
        }
      };
      this.tomInput = tomInput;
      const config = {
        create: false,
        valueField: "id",
        labelField: "label",
        maxItems: 1,
        searchField: ["label"],
        render: this.setupRender(tomInput),
        onFocus: this.touch,
        onBlur: this.blurred,
        onChange: this.changed,
        onType: this.inputted
      };
      if (this.isIncomplete) {
        config.load = (query, callback) => this.loadOptions(`query=${encodeURIComponent(query)}`, callback);
      }
      let isMultiple = false;
      if (tomInput.hasAttribute("multiple")) {
        config.maxItems = parseInt(tomInput.getAttribute("max_items") ?? "3");
        const translation = tomInput.parentElement?.querySelector("template.selectize-remove-item");
        if (translation) {
          config.plugins = {remove_button: {title: translation.innerHTML}};
        }
        const scriptId = `${tomInput.getAttribute("id")}_initial`;
        config.items = JSON.parse(document.getElementById(scriptId)?.textContent ?? "[]");
        tomInput.removeAttribute("multiple");
        isMultiple = true;
      }
      const nativeStyles = __spreadValues({}, window.getComputedStyle(tomInput));
      if (isMultiple) {
        tomInput.setAttribute("multiple", "multiple");
      }
      this.numOptions = parseInt(tomInput.getAttribute("options") ?? this.numOptions.toString());
      this.tomSelect = new tom_select_default(tomInput, config);
      this.observer = new MutationObserver(this.attributesChanged);
      this.observer.observe(this.tomInput, {attributes: true});
      this.initialValue = this.tomSelect.getValue();
      this.shadowRoot = this.wrapInShadowRoot();
      this.transferStyles(tomInput, nativeStyles);
      tomInput.classList.add("dj-concealed");
      this.validateInput(this.initialValue);
      this.tomSelect.on("change", (value) => this.validateInput(value));
    }
    formResetted(event) {
      this.tomSelect.setValue(this.initialValue);
    }
    formSubmitted(event) {
    }
    wrapInShadowRoot() {
      const shadowWrapper = document.createElement("div");
      shadowWrapper.classList.add("shadow-wrapper");
      const shadowRoot = shadowWrapper.attachShadow({mode: "open", delegatesFocus: true});
      const shadowStyleElement = document.createElement("style");
      shadowRoot.appendChild(shadowStyleElement).textContent = DjangoSelectize_default;
      this.tomInput.insertAdjacentElement("beforebegin", shadowWrapper);
      const wrapper = this.tomInput.parentElement.removeChild(this.tomSelect.wrapper);
      shadowRoot.appendChild(wrapper);
      return shadowRoot;
    }
    validateInput(value) {
      const wrapper = this.shadowRoot.querySelector(".ts-wrapper");
      wrapper?.classList.remove("dirty");
      const selectElem = this.tomInput;
      if (this.tomSelect.isRequired) {
        selectElem.setCustomValidity(value ? "" : "Value is missing.");
      }
      if (selectElem.multiple) {
        for (let k = 0; k < selectElem.options.length; k++) {
          const option2 = selectElem.options.item(k);
          if (option2) {
            option2.selected = value.indexOf(option2.value) >= 0;
          }
        }
      } else {
        this.tomInput.value = value;
      }
    }
    transferStyles(tomInput, nativeStyles) {
      const wrapperStyle = this.shadowRoot.host.style;
      wrapperStyle.setProperty("display", nativeStyles.display);
      const lineHeight = window.getComputedStyle(tomInput).getPropertyValue("line-height");
      const optionElement = tomInput.querySelector("option");
      const sheet = this.shadowRoot.styleSheets.item(0);
      for (let index2 = 0; sheet && index2 < sheet.cssRules.length; index2++) {
        const cssRule = sheet.cssRules.item(index2);
        let extraStyles;
        switch (cssRule.selectorText) {
          case ".ts-wrapper":
            extraStyles = StyleHelpers.extractStyles(tomInput, [
              "font-family",
              "font-size",
              "font-strech",
              "font-style",
              "font-weight",
              "letter-spacing",
              "white-space"
            ]);
            sheet.insertRule(`${cssRule.selectorText}{${extraStyles}}`, ++index2);
            break;
          case ".ts-wrapper .ts-control":
            extraStyles = StyleHelpers.extractStyles(tomInput, [
              "background-color",
              "border",
              "border-radius",
              "box-shadow",
              "color",
              "padding"
            ]).concat(`width: ${nativeStyles["width"]}; min-height: ${nativeStyles["height"]};`);
            sheet.insertRule(`${cssRule.selectorText}{${extraStyles}}`, ++index2);
            break;
          case ".ts-wrapper .ts-control > input":
          case ".ts-wrapper .ts-control > div":
            if (optionElement) {
              extraStyles = StyleHelpers.extractStyles(optionElement, ["padding-left", "padding-right"]);
              sheet.insertRule(`${cssRule.selectorText}{${extraStyles}}`, ++index2);
            }
            break;
          case ".ts-wrapper .ts-control > input::placeholder":
            tomInput.classList.add("-placeholder-");
            extraStyles = StyleHelpers.extractStyles(tomInput, ["background-color", "color"]);
            tomInput.classList.remove("-placeholder-");
            sheet.insertRule(`${cssRule.selectorText}{${extraStyles}}`, ++index2);
            break;
          case ".ts-wrapper.focus .ts-control":
            tomInput.style.transition = "none";
            tomInput.classList.add("-focus-");
            extraStyles = StyleHelpers.extractStyles(tomInput, [
              "background-color",
              "border",
              "box-shadow",
              "color",
              "outline",
              "transition"
            ]);
            tomInput.classList.remove("-focus-");
            sheet.insertRule(`${cssRule.selectorText}{${extraStyles}}`, ++index2);
            tomInput.style.transition = "";
            break;
          case ".ts-wrapper.disabled .ts-control":
            tomInput.classList.add("-disabled-");
            extraStyles = StyleHelpers.extractStyles(tomInput, [
              "background-color",
              "border",
              "box-shadow",
              "color",
              "opacity",
              "outline",
              "transition"
            ]);
            tomInput.classList.remove("-disabled-");
            sheet.insertRule(`${cssRule.selectorText}{${extraStyles}}`, ++index2);
            break;
          case ".ts-wrapper .ts-dropdown":
            extraStyles = StyleHelpers.extractStyles(tomInput, [
              "border-right",
              "border-bottom",
              "border-left",
              "color",
              "padding-left"
            ]).concat(parseFloat(lineHeight) > 0 ? `line-height: calc(${lineHeight} * 1.2);` : "line-height: 1.2em;");
            sheet.insertRule(`${cssRule.selectorText}{${extraStyles}}`, ++index2);
            break;
          case ".ts-wrapper .ts-dropdown .ts-dropdown-content":
            if (parseFloat(lineHeight) > 0) {
              extraStyles = `max-height: calc(${lineHeight} * 1.2 * ${this.numOptions});`;
            } else {
              extraStyles = `max-height: ${this.numOptions * 1.2}em;`;
            }
            sheet.insertRule(`${cssRule.selectorText}{${extraStyles}}`, ++index2);
            break;
          default:
            break;
        }
      }
    }
    setupRender(tomInput) {
      const templ = tomInput.parentElement?.querySelector("template.select-no-results");
      return templ ? {
        no_results: (data, escape) => (0, import_lodash5.default)(templ.innerHTML)(data)
      } : {};
    }
    get value() {
      return this.tomSelect.getValue();
    }
  };
  var DS = Symbol("DjangoSelectize");
  var DjangoSelectizeElement = class extends HTMLSelectElement {
    connectedCallback() {
      this[DS] = new DjangoSelectize(this);
    }
    async getValue() {
      return this[DS]?.value;
    }
  };
  DS;

  // _soeytdaom:/home/runner/work/django-formset/django-formset/client/django-formset/SortableSelect.scss
  var SortableSelect_default = "django-sortable-select{opacity:1}django-sortable-select.focus{opacity:1}django-sortable-select.focus>option.sortable-selected{opacity:1;cursor:grab}django-sortable-select.focus>option.sortable-chosen,django-sortable-select.focus>option.sortable-ghost{opacity:1;cursor:grabbing !important}django-sortable-select>option{line-height:normal;cursor:default}django-sortable-select>option.sortable-chosen,django-sortable-select>option.sortable-selected{opacity:1}";

  // client/django-formset/SortableSelect.ts
  sortable_esm_default.mount(new MultiDragPlugin());
  var SortableSelectElement = class extends HTMLElement {
    constructor() {
      super();
      this.lastSelected = null;
      this.declaredStyles = document.createElement("style");
      this.declaredStyles.innerText = SortableSelect_default;
      document.head.appendChild(this.declaredStyles);
      this.addEventListener("click", (event) => this.optionSelected(event));
      window.addEventListener("click", (event) => this.elementFocus(event));
    }
    initialize(selectElement) {
      this.transferStyles(selectElement);
      sortable_esm_default.create(this, {
        animation: 150,
        fallbackOnBody: true,
        multiDrag: true,
        onEnd: (event) => this.onEnd(event)
      });
    }
    onEnd(event) {
      this.deselectAllOptions();
      const sortedEvent = new Event("options-sorted", {
        bubbles: true,
        cancelable: true,
        composed: false
      });
      this.dispatchEvent(sortedEvent);
    }
    elementFocus(event) {
      if (event.target instanceof HTMLElement && this.contains(event.target)) {
        this.classList.add("focus");
      } else {
        this.classList.remove("focus");
      }
    }
    optionSelected(event) {
      if (!(event.target instanceof HTMLOptionElement))
        return;
      const selectedOption = event.target;
      if (event instanceof PointerEvent && event.metaKey) {
        if (selectedOption.selected = !selectedOption.selected) {
          sortable_esm_default.utils.select(selectedOption);
        } else {
          sortable_esm_default.utils.deselect(selectedOption);
        }
      } else if (event instanceof PointerEvent && event.shiftKey && this.lastSelected) {
        this.deselectAllOptions();
        let setSeleted = false;
        for (let option2 of this.getElementsByTagName("option")) {
          if (option2 === selectedOption || option2 === this.lastSelected) {
            option2.selected = true;
            setSeleted = !setSeleted;
          } else {
            option2.selected = setSeleted;
          }
          if (option2.selected) {
            sortable_esm_default.utils.select(option2);
          }
        }
      } else {
        this.deselectAllOptions();
        selectedOption.selected = true;
        sortable_esm_default.utils.select(selectedOption);
      }
      this.lastSelected = selectedOption;
      event.preventDefault();
    }
    deselectAllOptions() {
      for (let option2 of this.getElementsByTagName("option")) {
        option2.selected = false;
        sortable_esm_default.utils.deselect(option2);
      }
    }
    transferStyles(selectElement) {
      const sheet = this.declaredStyles.sheet;
      const optionElement = selectElement.querySelector("option");
      for (let index2 = 0; sheet && index2 < sheet.cssRules.length; index2++) {
        const cssRule = sheet.cssRules.item(index2);
        let extraStyles;
        switch (cssRule.selectorText) {
          case "django-sortable-select":
            extraStyles = StyleHelpers.extractStyles(selectElement, [
              "display",
              "width",
              "height",
              "border",
              "box-shadow",
              "outline",
              "overflow",
              "font-family",
              "font-size",
              "font-strech",
              "font-style",
              "font-weight",
              "letter-spacing",
              "white-space",
              "line-height"
            ]);
            sheet.insertRule(`${cssRule.selectorText}{${extraStyles}}`, ++index2);
            break;
          case "django-sortable-select.focus":
            selectElement.style.transition = "none";
            selectElement.focus();
            extraStyles = StyleHelpers.extractStyles(selectElement, [
              "border",
              "box-shadow",
              "outline"
            ]);
            selectElement.blur();
            sheet.insertRule(`${cssRule.selectorText}{${extraStyles}}`, ++index2);
            selectElement.style.transition = "";
            break;
          case "django-sortable-select > option.sortable-chosen, django-sortable-select > option.sortable-selected":
            if (optionElement) {
              optionElement.selected = true;
              extraStyles = StyleHelpers.extractStyles(optionElement, [
                "color",
                "background-color"
              ]);
              sheet.insertRule(`${cssRule.selectorText}{${extraStyles}}`, ++index2);
              optionElement.selected = false;
            }
            break;
          case "django-sortable-select.focus > option.sortable-chosen, django-sortable-select.focus > option.sortable-selected":
            selectElement.focus();
            if (optionElement) {
              optionElement.selected = true;
              extraStyles = StyleHelpers.extractStyles(optionElement, [
                "color",
                "background-color"
              ]);
              sheet.insertRule(`${cssRule.selectorText}{${extraStyles}}`, ++index2);
              optionElement.selected = false;
            }
            selectElement.blur();
            break;
          default:
            break;
        }
      }
    }
    add(option2) {
      this.appendChild(option2);
      sortable_esm_default.utils.select(option2);
    }
  };

  // client/django-formset/DualSelector.ts
  var import_lodash6 = __toModule(require_lodash5());
  var DualSelector = class extends IncompleteSelect {
    constructor(selectorElement, name) {
      super(selectorElement);
      this.historicalValues = [];
      this.historyCursor = 0;
      this.selectorElement = selectorElement;
      this.containerElement = this.fieldGroup.querySelector(".dj-dual-selector");
      selectorElement.setAttribute("multiple", "multiple");
      const inputs = this.fieldGroup.querySelectorAll('input[type="text"]');
      if (inputs.length === 2) {
        this.searchLeftInput = inputs[0];
        this.searchRightInput = inputs[1];
        this.searchLeftInput.addEventListener("input", (evt) => this.leftLookup());
        this.searchRightInput.addEventListener("input", (evt) => this.rightLookup());
      }
      const selectors = this.fieldGroup.querySelectorAll(`select:not([is="${name}"])`);
      if (selectors.length >= 1) {
        this.selectLeftElement = selectors.item(0);
        if (selectors.length === 2) {
          this.selectRightElement = selectors.item(1);
        } else {
          const selector = this.fieldGroup.querySelector("django-sortable-select");
          this.selectRightElement = selector;
        }
      } else {
        throw new Error(`<select is="${name}"> requires two <select>-elements`);
      }
      this.moveAllRightButton = this.fieldGroup.querySelector("button.dj-move-all-right");
      this.moveSelectedRightButton = this.fieldGroup.querySelector("button.dj-move-selected-right");
      this.moveSelectedLeftButton = this.fieldGroup.querySelector("button.dj-move-selected-left");
      this.moveAllLeftButton = this.fieldGroup.querySelector("button.dj-move-all-left");
      this.undoButton = this.fieldGroup.querySelector("button.dj-undo-selected");
      this.redoButton = this.fieldGroup.querySelector("button.dj-redo-selected");
      this.selectorElement.classList.add("dj-concealed");
      const templ = selectorElement.parentElement?.querySelector("template.select-no-results");
      this.renderNoResults = (data) => templ ? (0, import_lodash6.default)(templ.innerHTML)(data) : "No results";
      this.installEventHandlers();
      this.initialize();
      this.setButtonsState();
    }
    installEventHandlers() {
      this.selectLeftElement.addEventListener("focus", this.touch);
      this.selectLeftElement.addEventListener("dblclick", (evt) => this.moveOptionRight(evt.target));
      this.selectLeftElement.addEventListener("scroll", (evt) => this.selectLeftScrolled());
      this.selectRightElement.addEventListener("focus", this.touch);
      this.selectRightElement.addEventListener("dblclick", (evt) => this.moveOptionLeft(evt.target));
      this.selectRightElement.addEventListener("options-sorted", (evt) => this.optionsSorted());
      this.moveAllRightButton?.addEventListener("click", (evt) => this.moveAllOptionsRight());
      this.moveSelectedRightButton?.addEventListener("click", (evt) => this.moveSelectedOptionsRight());
      this.moveSelectedLeftButton?.addEventListener("click", (evt) => this.moveSelectedOptionsLeft());
      this.moveAllLeftButton?.addEventListener("click", (evt) => this.moveAllOptionsLeft());
      this.undoButton?.addEventListener("click", (evt) => this.unOrRedo(-1));
      this.redoButton?.addEventListener("click", (evt) => this.unOrRedo(1));
    }
    getOptions(selectElement) {
      return Array.from(selectElement.getElementsByTagName("option"));
    }
    initialize() {
      const initialValues = [];
      for (let option2 of this.getOptions(this.selectorElement)) {
        const clone2 = option2.cloneNode();
        if (option2.selected) {
          option2.selected = false;
          this.selectRightElement.add(option2);
          initialValues.push(option2.value);
        } else {
          this.selectLeftElement.add(option2);
        }
        this.selectorElement.add(clone2);
      }
      this.historicalValues.push(initialValues);
      this.setHistoryCursor(0);
      if (this.selectRightElement instanceof SortableSelectElement) {
        this.selectRightElement.initialize(this.selectLeftElement);
      }
    }
    addNoResultsOption(selectElement, query) {
      const option2 = new Option(this.renderNoResults({input: query}));
      option2.disabled = true;
      selectElement.add(option2);
    }
    prepareOptions(selectElement) {
      const options = this.getOptions(selectElement);
      options.filter((o) => o.disabled).forEach((o) => o.remove());
      return options;
    }
    addMoreOptions(items) {
      const selectorOptions = this.getOptions(this.selectorElement);
      for (let item of items) {
        if (selectorOptions.filter((o) => o.value == item.id).length === 0) {
          const option2 = new Option(item.label, item.id);
          this.selectorElement.add(option2.cloneNode());
          this.selectLeftElement.add(option2);
        }
      }
    }
    async selectLeftScrolled() {
      if (!this.isIncomplete)
        return;
      const selectLeftScroll = this.selectLeftElement.scrollHeight - this.selectLeftElement.scrollTop;
      if (selectLeftScroll <= this.selectLeftElement.offsetHeight) {
        await this.remoteLookup();
      }
    }
    async remoteLookup() {
      let query;
      const searchString = this.searchLeftInput?.value;
      if (searchString) {
        const offset = this.getOptions(this.selectLeftElement).filter((o) => !o.hidden).length;
        query = `query=${searchString}&offset=${offset}`;
      } else {
        query = `offset=${this.selectorElement.childElementCount}`;
      }
      if (this.lastRemoteQuery === query)
        return;
      this.lastRemoteQuery = query;
      await this.loadOptions(query, (items) => {
        this.addMoreOptions(items);
      });
    }
    selectorChanged() {
      const rightOptions = this.getOptions(this.selectRightElement);
      const selectorOptions = this.getOptions(this.selectorElement);
      for (let option2 of selectorOptions) {
        option2.selected = rightOptions.filter((o) => o.value === option2.value).length === 1;
      }
      this.setButtonsState();
      this.containerElement?.classList.toggle("invalid", !this.selectorElement.checkValidity());
      this.selectorElement.dispatchEvent(new Event("change"));
    }
    setButtonsState() {
      let disabled = this.getOptions(this.selectLeftElement).filter((o) => !o.hidden).length === 0;
      this.moveAllRightButton.disabled = disabled;
      this.moveSelectedRightButton.disabled = disabled;
      disabled = this.getOptions(this.selectRightElement).filter((o) => !o.hidden).length === 0;
      this.moveAllLeftButton.disabled = disabled;
      this.moveSelectedLeftButton.disabled = disabled;
    }
    clearSearchFields() {
      if (this.searchLeftInput) {
        this.searchLeftInput.value = "";
      }
      if (this.searchRightInput) {
        this.searchRightInput.value = "";
      }
      this.prepareOptions(this.selectLeftElement).forEach((o) => o.hidden = false);
      this.prepareOptions(this.selectRightElement).forEach((o) => o.hidden = false);
    }
    optionsMoved() {
      const rightOptions = this.getOptions(this.selectRightElement);
      this.historicalValues.splice(this.historyCursor + 1);
      this.historicalValues.push(rightOptions.map((o) => o.value));
      this.setHistoryCursor(this.historicalValues.length - 1);
      this.selectorChanged();
    }
    optionsSorted() {
      this.getOptions(this.selectorElement).filter((o) => o.selected).forEach((o) => o.remove());
      this.getOptions(this.selectRightElement).forEach((o) => {
        const clone2 = o.cloneNode();
        clone2.selected = true;
        this.selectorElement.add(clone2);
      });
      this.optionsMoved();
    }
    async moveOptionRight(target) {
      if (target instanceof HTMLOptionElement) {
        this.selectRightElement.add(target);
        await this.selectLeftScrolled();
        this.optionsMoved();
      }
    }
    async moveAllOptionsRight() {
      this.getOptions(this.selectLeftElement).filter((o) => !o.hidden).forEach((o) => this.selectRightElement.add(o));
      this.clearSearchFields();
      await this.selectLeftScrolled();
      this.optionsMoved();
    }
    moveSelectedOptionsRight() {
      this.getOptions(this.selectLeftElement).filter((o) => o.selected).forEach((o) => this.selectRightElement.add(o));
      this.optionsMoved();
    }
    moveSelectedOptionsLeft() {
      this.getOptions(this.selectRightElement).filter((o) => o.selected).forEach((o) => this.selectLeftElement.add(o));
      this.optionsMoved();
    }
    moveAllOptionsLeft() {
      this.getOptions(this.selectRightElement).filter((o) => !o.hidden).forEach((o) => this.selectLeftElement.add(o));
      this.clearSearchFields();
      this.optionsMoved();
    }
    moveOptionLeft(target) {
      if (target instanceof HTMLOptionElement) {
        this.selectLeftElement.add(target);
        this.optionsMoved();
      }
    }
    async leftLookup() {
      const query = this.searchLeftInput?.value ?? "";
      let numFoundOptions = this.lookup(this.prepareOptions(this.selectLeftElement), query);
      if (this.isIncomplete && numFoundOptions < this.selectLeftElement.size) {
        await this.remoteLookup();
        numFoundOptions = this.lookup(this.getOptions(this.selectLeftElement), query);
      }
      this.setButtonsState();
      if (numFoundOptions === 0) {
        this.addNoResultsOption(this.selectLeftElement, query);
      }
    }
    rightLookup() {
      const query = this.searchRightInput?.value ?? "";
      if (this.lookup(this.prepareOptions(this.selectRightElement), query) === 0) {
        this.addNoResultsOption(this.selectRightElement, query);
      }
    }
    lookup(options, query) {
      if (query) {
        query = query.toLowerCase();
        options.forEach((o) => o.hidden = o.text.toLowerCase().indexOf(query) === -1);
        return options.length - options.filter((o) => o.hidden).length;
      }
      options.forEach((o) => o.hidden = false);
      return options.length;
    }
    unOrRedo(direction) {
      this.clearSearchFields();
      const nextCursor = this.historyCursor + direction;
      if (nextCursor < 0 || nextCursor >= this.historicalValues.length)
        return;
      const nextValues = this.historicalValues[nextCursor];
      this.getOptions(this.selectRightElement).filter((o) => nextValues.indexOf(o.value) === -1).forEach((o) => this.selectLeftElement.add(o));
      this.getOptions(this.selectLeftElement).filter((o) => nextValues.indexOf(o.value) !== -1).forEach((o) => this.selectRightElement.add(o));
      if (this.selectRightElement.tagName === "DJANGO-SORTABLE-SELECT") {
        nextValues.forEach((val) => {
          const optionElem = this.selectRightElement.querySelector(`option[value="${val}"]`);
          if (optionElem) {
            this.selectRightElement.insertAdjacentElement("beforeend", optionElem);
          }
        });
        this.optionsSorted();
      }
      this.setHistoryCursor(nextCursor);
      this.selectorChanged();
    }
    setHistoryCursor(historyCursor) {
      this.historyCursor = historyCursor;
      if (this.undoButton) {
        this.undoButton.disabled = historyCursor === 0;
      }
      if (this.redoButton) {
        this.redoButton.disabled = historyCursor === this.historicalValues.length - 1;
      }
    }
    formResetted(event) {
      this.clearSearchFields();
      const initialValues = this.historicalValues[0];
      this.historicalValues.splice(1);
      this.setHistoryCursor(0);
      this.getOptions(this.selectRightElement).filter((o) => initialValues.indexOf(o.value) === -1).forEach((o) => this.selectLeftElement.add(o));
      this.getOptions(this.selectLeftElement).filter((o) => initialValues.indexOf(o.value) !== -1).forEach((o) => this.selectRightElement.add(o));
      this.selectorChanged();
    }
    formSubmitted(event) {
      this.clearSearchFields();
      this.historicalValues.splice(0, this.historicalValues.length - 1);
      this.setHistoryCursor(0);
    }
    getValue() {
      return this.getOptions(this.selectorElement).filter((o) => o.selected).map((o) => o.value);
    }
  };
  var DS2 = Symbol("DualSelectorElement");
  var DualSelectorElement = class extends HTMLSelectElement {
    connectedCallback() {
      this[DS2] = new DualSelector(this, "django-dual-selector");
    }
    get value() {
      return this[DS2]?.getValue();
    }
  };
  DS2;

  // client/django-formset.ts
  window.addEventListener("load", (event) => {
    const pseudoStylesElement = StyleHelpers.convertPseudoClasses();
    window.customElements.define("django-selectize", DjangoSelectizeElement, {extends: "select"});
    window.customElements.define("django-sortable-select", SortableSelectElement);
    window.customElements.define("django-dual-selector", DualSelectorElement, {extends: "select"});
    window.customElements.define("django-formset", DjangoFormsetElement);
    pseudoStylesElement.remove();
  });
})();
/**!
 * Sortable 1.15.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
//# sourceMappingURL=django-formset.js.map
