define(['THREE', 'Config'], function(THREE, Config){
    var FallBlock = function(scene, pos, widthx, widthz){
        var mat = new THREE.MeshLambertMaterial( {color: Config.block.activeMatColor, transparent: true, opacity: 1} );
        var geometry = new THREE.BoxGeometry( widthx, 1, widthz );
        var mesh = new THREE.Mesh( geometry, mat );
        mesh.position.set(pos.x, pos.y, pos.z);

        var v = 0;

        function fall(){
            if(mesh.material.opacity > 0){
                v += Config.block.fallAcc;
                mesh.material.opacity -= Config.block.fallFade;
                mesh.position.y -= v;  
                setTimeout(fall, 20);
            }
            else{
                scene.remove(mesh);
            }
        }
        
        fall();
        scene.add(mesh);
    };

    return FallBlock;
});