let Entity = function(name){
  let me = this;
  me.name = name;
  me.toHTML = function(){
    return "<div>" + me.name + "</div>";
  }
};

let EntitySet = function(){
  let me = this;
  let collection = [];
  me.push = function(entity){
    collection.push(entity);
  }

  me.toHTML = function(){
    let ret = "<ul>";
    for(let ii = 0, imax = collection.length; ii < imax; ii++){
      ret += "<li>" + collection[ii].toHTML() + "</li>";
    }
    ret += "</ul>";
    return ret;
  }
};
