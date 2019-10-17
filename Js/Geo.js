class App{
  constructor(Parent){
    //HTML
    this.Parent = Parent;

    //THREEJS
    this.Renderer = new THREE.WebGLRenderer();
    this.Camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.Scene    = new THREE.Scene();

    this.Clock    = new THREE.Clock();

    this.Renderer.setSize( window.innerWidth, window.innerHeight );

    //Controls
    this.Controls = new THREE.MapControls(this.Camera, this.Renderer.domElement );

  	this.Controls.enableDamping      = true;
  	this.Controls.dampingFactor      = 0.05;
		this.Controls.screenSpacePanning = false;
		this.Controls.minDistance        = 1;
		this.Controls.maxDistance        = 5;
		this.Controls.maxPolarAngle      = Math.PI / 2;

    //MISC
    window.Args = {}
    window.Args.Wave = {}
    window.Args.Wave.HeightSeed = 0.2;

    window.Geoms = {};
    window.Geoms.Planes = {}

    //Append
    this.Parent.appendChild(this.Renderer.domElement);
  }


  Start(){
    //Populate Scene
    let Planes = ["Planes1", "Planes2", "Planes3"]
    for(var x in Planes){
      //Create boxes
      window.Geoms.Planes[x] = new THREE.PlaneBufferGeometry(16, 8, 256, 32);
      var Mat = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, shininess: 90, emissive: 0xff0000, flatShading: false, wireframe:true} );
      var Final = new THREE.Mesh(window.Geoms.Planes[x], Mat);

      //Offset
      window.Geoms.Planes[x].position.setY = x / 10;
      window.Geoms.Planes[x].position.setX = x / 10;

      window.Geoms.Planes[x].attributes.position.dynamic = true;

      //Add boxes
      this.Scene.add( Final );

    }

    //Lights
    let PointL = new THREE.PointLight(0xffffff, 20);
    PointL.position.set(0, 5, 0);
  	PointL.castShadow = false;

    this.Scene.add( new THREE.AmbientLight( 0xffffff) );
    this.Scene.add(PointL);

    this.Camera.position.z = 8;
    this.Camera.position.y = 1;

    //Start render
    this.Update();

  }



  Update(){
    //Setup next frame
    requestAnimationFrame(window.App.Update);

    //Setup time
    let delta = window.App.Clock.getDelta();
    let time  = window.App.Clock.getElapsedTime() * 10;

    //Modify
    for(var items in window.Geoms.Planes){
      let position = window.Geoms.Planes[items].attributes.position;

      for ( let i = 0; i < position.count; i+=1 ) {
        let z = (window.Args.Wave.HeightSeed) * Math.sin( ((time ** 2) * (i/2) * (1/50)) );
        position.setZ(i, z);
      }


      window.Geoms.Planes[items].attributes.position.needsUpdate = true;

    }

    //Render
    window.App.Renderer.render(window.App.Scene, window.App.Camera);
  }

}
