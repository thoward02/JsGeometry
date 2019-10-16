class Controls{
  constructor(Parent){
    this.Parent = Parent;

    //Create Elems

      //SIN Height Control title
      this.HCTitle = document.createElement("div");
      this.HCTitle.innerHTML = "Height Control";
      this.HCTitle.style.fontSize = "15px";
      this.HCTitle.style.color = "white";


      //SIN Height Control
      this.HeightController = document.createElement("input");

      this.HeightController.type = "range";
      this.HeightController.min  = "-20";
      this.HeightController.max  = "20";
      this.HeightController.value = "0";



    //Append Elems
    this.Parent.appendChild(this.HCTitle);
    this.Parent.appendChild(this.HeightController);


  }

  Start(){
    //On height change, change height seed
    this.HeightController.oninput = function(){
      window.Args.Wave.HeightSeed = parseInt(window.Controls.HeightController.value) / 10;
      console.log("Changed")
    }


  }


}
