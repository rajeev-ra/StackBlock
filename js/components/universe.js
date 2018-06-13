define(['THREE', 'Config'], function(THREE, Config){
    var Universe = function(htmlElem){
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( Config.camera.fov, window.innerWidth / window.innerHeight, Config.camera.near, Config.camera.far );
        var renderer = new THREE.WebGLRenderer({clearColor: Config.bgColor, clearAlpha: 1});
        renderer.setClearColor(Config.bgColor, 1);
        renderer.setSize( htmlElem.clientWidth, htmlElem.clientHeight );

        camera.position.set(15,15,15);
        camera.lookAt(0,3,0);
        scene.add(camera)

        var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
        light.position.set( 0.5, 1, 0.75 );
        scene.add( light );
        
        var geometry = new THREE.BoxGeometry( 5, 1, 5 );
        var material = new THREE.MeshLambertMaterial( {color: 0xff0000} );
        scene.add(new THREE.Mesh( geometry, material ));

        htmlElem.appendChild(renderer.domElement);
        
        htmlElem.onresize = function(){
            camera.aspect = htmlElem.clientWidth / htmlElem.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( htmlElem.clientWidth, htmlElem.clientHeight );
        };

        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
        animate();

        this.GetScene = function(){
            return scene;
        }

        this.AddBlock = function(block){
            if(block.mesh){
                scene.add(block.mesh);
                var yStart = camera.position.y;
                var yEnd = yStart + 1;
                function posCamera(){
                    if(yEnd <= camera.position.y){
                        camera.position.y = yEnd;
                    }
                    else{
                        var vel = Math.min(camera.position.y - yStart, yEnd - camera.position.y);
                        vel *= 0.2;
                        vel += 0.01;
                        camera.position.y += vel;
                        setTimeout(posCamera, 20); 
                    }               
                }
                posCamera();
            }
        }

        window.GetScene = function(){
            return scene;
        }
    }

    return Universe;
});