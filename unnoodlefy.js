
//tracing

window.trace = function () {
    var caller = ((new Error).stack.split('\n')[2]).trim();
    var args = Array.prototype.slice.call(arguments);
    args.unshift(caller);
    console.log.apply(console, args);
}

window.red = function () {
    var caller = ((new Error).stack.split('\n')[2]).trim();
    var args = Array.prototype.slice.call(arguments);
    args.unshift('background: red; color: white;');
    args.unshift('%c' + caller);
    console.log.apply(console, args);
}


/* credits goes to:

https://gist.github.com/dustinboston/3288778

*/

if (requirejs) {
    requirejs.onResourceLoad = function (context, map, depMaps) {
      if (!window.rtree) {
        window.rtree = {};
        window.rtree.tree = {};
    	window.rtree.map = function() {
    	  var dep, key, rt, val, _i, _len, _ref;
    	  rt = rtree.tree;
    	  for (key in rt) {
    		val = rt[key];
    		if (rt.hasOwnProperty(key)) {
    		  _ref = val.deps;
    		  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    		    dep = _ref[_i];
    		    val.map[dep] = rt[dep];
    		  }
    		}
    	  }
    	};
    	window.rtree.toUml = function() {
    	  var dep, key, rt, uml, val, _i, _len, _ref;
    	  rt = rtree.tree;
    	  uml = [];
    	  for (key in rt) {
    		val = rt[key];
    		if (rt.hasOwnProperty(key)) {
    		  _ref = val.deps;
    		  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    		    dep = _ref[_i];
    		    uml.push("[" + key + "]->[" + dep + "]");
    		  }
    		}
    	  }
    	  return uml.join("\n");
    	};
    
      }
      r = window.rtree.tree;
      o = {deps: [], map: {}};
      if (!r[map.name]) {
        r[map.name] = o;
      }
      if (map.parentMap && map.parentMap.name) {
        if (!r[map.parentMap.name]) {
          r[map.parentMap.name] = o;
        }
        if (map.parentMap.name !== map.name) {
          r[map.parentMap.name].deps.push(map.name);
        }
      }
    };
}
