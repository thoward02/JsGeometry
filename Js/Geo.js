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


    //Append
    this.Parent.appendChild(this.Renderer.domElement);
  }


  Start(){
    //Populate Scene
    this.Box = new THREE.BoxBufferGeometry( 4, 1, 4, 16, 4, 16);
    var Mat = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true} );
    var Final = new THREE.Mesh(this.Box, Mat);
    this.Scene.add( Final );

    this.Box.attributes.position.dynamic = true;

    this.Camera.position.z = 5;
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
    let position = window.App.Box.attributes.position;

    for ( let i = 0; i < position.count / 2; i ++ ) {
					let y = (window.Args.Wave.HeightSeed) * Math.sin( ((time + i) * (i/50) * (1/50)) );
					position.setY(i, y);
		}


    window.App.Box.attributes.position.needsUpdate = true;

    //Render
    window.App.Renderer.render(window.App.Scene, window.App.Camera);
  }

}
