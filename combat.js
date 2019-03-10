(function(){
  let newEntityForm = document.getElementById("new-entity-form");
  let entityName = document.getElementById("entity-name");
  let entitySet = new EntitySet();
  let entityView = document.getElementById("entity-view");
  newEntityForm.addEventListener("submit", function(event){
    event.preventDefault();
    let e = new Entity(entityName.value);
    entitySet.push(e);
    entityView.innerHTML = entitySet.toHTML();
    return false;
  });
})();
