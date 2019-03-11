let Entity = function(name){
  let me = this;
  me.name = name;
  me.toHTML = function(){
    let entity = document.createElement('div');
    entity.innerHTML = me.name;
    return entity;
  }
};

let EntitySet = function(redrawHandler){
  let me = this;
  let collection = [];
  me.push = function(entity){
    collection.push(entity);
  }

  me.toHTML = function(){
    let ret = document.createElement('ul');
    for(let ii = 0, imax = collection.length; ii < imax; ii++){
      let li = document.createElement('li');
      let entity = collection[ii];
      li.appendChild(entity.toHTML());
      let deleteButton = document.createElement("button");
      deleteButton.textContent="X";
      deleteButton.addEventListener("click", function(){
        collection.splice(collection.indexOf(entity), 1);
        redrawHandler.redraw(me);
      });
      li.appendChild(deleteButton);
      ret.appendChild(li);
    }
    return ret;
  }
};
