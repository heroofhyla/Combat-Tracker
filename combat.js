(function(){
  let RedrawHandler = function(entityView){
    let me = this;
    me.redraw = function(entitySet){
      entityView.innerHTML = "";
      entityView.appendChild(entitySet.toHTML());
    }
  };

  let newEntityForm = document.getElementById("new-entity-form");
  let entityName = document.getElementById("entity-name");
  let entityView = document.getElementById("entity-view");
  let redrawHandler = new RedrawHandler(entityView);
  let entitySet = new EntitySet(redrawHandler);
  newEntityForm.addEventListener("submit", function(event){
    event.preventDefault();
    let e = new Entity(entityName.value);
    entitySet.push(e);
    redrawHandler.redraw(entitySet);
    return false;
  });
})();
