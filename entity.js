let Entity = function(name){
  let me = this;
  let subs = {};
  me.buildInput=function(name, type, doesEmit){
    let label = document.createElement('label');
    label.innerHTML = name;
    let input = document.createElement('input');
    input.type = type;
    input.classList.add(name);
    input.value = me[name];
    input.addEventListener("change", function(){
      me[name] = input.value;
      if (doesEmit){
        dispatchEvent(new Event("change"));
      }
    });
    label.appendChild(input);
    return label;
  }

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
  me.hp = 0;
  me.toHTML = function(){
    let entity = document.createElement('div');
    let nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    nameDiv.innerHTML = me.name;
    entity.appendChild(nameDiv);
    entity.appendChild(me.buildInput("initiative", "number", true));
    entity.appendChild(me.buildInput("hp", "number", false));
    entity.appendChild(me.buildInput("notes", "text", false));
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
