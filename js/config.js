define(["THREE"], function(THREE){
    var Config = {
        camera:{
            fov:40,
            near:1,
            far:1000
        },

        bgColor: new THREE.Color(0xffaaaa),

        block:{
            activeMatColor: 0x00ff00,
            activeMat: new THREE.MeshLambertMaterial( {color: 0x00ff00} ),
            fixedMat: new THREE.MeshLambertMaterial( {color: 0xff0000} ),
            moveSpeed: 0.1,
            fallAcc: 0.01,
            fallFade: 0.04
        }
    };

    return Config;
});