let Entity = function(name){
  let me = this;
  let subs = {};
  me.addEventListener = function(channel, sub){
    if (!subs[channel]){
      subs[channel] = [];
    }
    subs[channel].push(sub);
  };

  let dispatchEvent = function(event){
    if (!subs[event.type]){
      return;
    }

    for (let ii = 0, imax = subs[event.type].length; ii < imax; ii++){
      subs[event.type][ii](event);
    }
  };

  me.name = name;
  me.initiative = 0;
  me.notes = "";
  me.toHTML = function(){
    let entity = document.createElement('div');
    let initiativeBox = document.createElement("input");
    initiativeBox.type="number";
    initiativeBox.value = me.initiative;
    initiativeBox.addEventListener("change", function(){
      me.initiative = parseInt(initiativeBox.value);
      dispatchEvent(new Event("change"));
    });
    entity.appendChild(initiativeBox);
    let nameNode = document.createTextNode(me.name);
    entity.appendChild(nameNode);
    let notesBox = document.createElement("input");
    notesBox.type = "text";
    notesBox.value = me.notes;
    notesBox.addEventListener("change", function(){
      me.notes = notesBox.value;
    });
    entity.appendChild(notesBox);
    return entity;
  }
};

let EntitySet = function(redrawHandler){
  let me = this;
  let collection = [];
  me.push = function(entity){
    collection.push(entity);
    entity.addEventListener("change", function(event){
      redrawHandler.redraw(me);
    });
  }

  me.toHTML = function(){
    collection.sort(function(a, b){ return b.initiative - a.initiative});
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
