document.addEventListener("DOMContentLoaded", function(){
  let AppElem = document.getElementById("App");
  let ControlsElem = document.getElementById("Controls");

  window.App = new App(AppElem);
  window.App.Start();

  window.Controls = new Controls(ControlsElem);
  window.Controls.Start();

});
