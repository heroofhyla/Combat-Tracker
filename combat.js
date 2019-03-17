(function(){
  let turnControlForm = document.getElementById("turn-control-form");
  let initiativePoint = document.getElementById("initiative-point");
  let initiativeTop = document.getElementById("initiative-top");
  let initiativeNext = document.getElementById("initiative-next");
  let newEntityForm = document.getElementById("new-entity-form");
  let entityName = document.getElementById("entity-name");
  let entityView = document.getElementById("entity-view");
  let RedrawHandler = function(entityView){
    let me = this;
    me.redraw = function(entitySet){
      entityView.innerHTML = "";
      entityView.appendChild(entitySet.toHTML(parseInt(initiativePoint.value)));
    }
  };
  let redrawHandler = new RedrawHandler(entityView);
  let entitySet = new EntitySet(redrawHandler);
  newEntityForm.addEventListener("submit", function(event){
    event.preventDefault();
    let e = new Entity(entityName.value);
    entitySet.push(e);
    redrawHandler.redraw(entitySet);
    return false;
  });

  initiativePoint.addEventListener("change", function(event){
    redrawHandler.redraw(entitySet);
  });

  initiativeTop.addEventListener("click", function(event){
    event.preventDefault();
    initiativePoint.value = entitySet.initiativeSize();
    redrawHandler.redraw(entitySet);
    return false;
  });

  initiativeNext.addEventListener("click", function(event){
    event.preventDefault();
    initiativePoint.value = entitySet.nextInitiative();
    redrawHandler.redraw(entitySet);
  });

})();
