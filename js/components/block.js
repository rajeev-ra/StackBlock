define(['THREE', 'Config', 'FallBlock'], function(THREE, Config, FallBlock){
    var scoreEl = document.getElementById("score");
    var high = 0;
    var lastBlock = {
        widthX: 5,
        widthZ: 5,
        posX:0,
        posZ:0,
        Fix:function(){return true;}
    };

    var activeMat = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
    var fixedMat = new THREE.MeshLambertMaterial( {color: 0xff0000, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1} );    
    var wireMat = new THREE.LineBasicMaterial( { color: 0xffff00, linewidth: 2 } );

    var Block = function(scene){
        var t = lastBlock.Fix();

        this.widthX = lastBlock.widthX;
        this.widthZ = lastBlock.widthZ;
        this.posX = lastBlock.posX;
        this.posZ = lastBlock.posZ;

        lastBlock = this;

        if(t){
            scoreEl.innerHTML = high;
            var active = true;
            var _this = this;
            high += 1;
            var trans = new THREE.Vector3();

            var geometry = new THREE.BoxGeometry( this.widthX, 1, this.widthZ );
            this.mesh = new THREE.Mesh( geometry, Config.block.activeMat );

            if(high % 2){
                this.mesh.position.set(-10, high, this.posZ);
                trans.x = 0.1;
            }
            else{
                this.mesh.position.set(this.posX, high, -10);
                trans.z = 0.1;
            }

            this.Fix = function(){
                var fallWidthx = _this.widthX;
                var fallWidthz = _this.widthZ;
                var fallPos = {x:_this.mesh.position.x, y:high, z:_this.mesh.position.z};
                active = false;
                if(high % 2){
                    var diff = _this.posX - _this.mesh.position.x;
                    fallWidthx = Math.abs(diff);
                    if(_this.widthX <= Math.abs(diff)){
                        new FallBlock(scene, _this.mesh.position, _this.widthX, _this.widthZ);
                        GetScene().remove(_this.mesh);
                        return false;
                    }
                    if(0.2 < diff){
                        _this.widthX -= diff;
                        _this.posX -= (diff / 2);
                        fallPos.x = _this.posX - _this.widthX / 2 - fallWidthx / 2;
                    }
                    else if(-0.2 > diff){
                        _this.widthX += diff;
                        _this.posX -= (diff / 2);
                        fallPos.x = _this.posX + _this.widthX / 2 + fallWidthx / 2;
                    }
                    else{
                        fallWidthx = 0.001;
                        fallWidthz = 0.001;
                    }
                }
                else{
                    var diff = _this.posZ - _this.mesh.position.z;                    
                    fallWidthz = Math.abs(diff);
                    if(_this.widthZ <= Math.abs(diff)){
                        new FallBlock(scene, _this.mesh.position, _this.widthX, _this.widthZ);
                        GetScene().remove(_this.mesh);
                        return false;
                    }
                    if(0.2 < diff){
                        _this.widthZ -= diff;
                        _this.posZ -= (diff / 2);
                        fallPos.z = _this.posZ - _this.widthZ / 2 - fallWidthz / 2;
                    }
                    else if(-0.2 > diff){
                        _this.widthZ += diff;
                        _this.posZ -= (diff / 2);
                        fallPos.z = _this.posZ + _this.widthZ / 2 + fallWidthz / 2;
                    }
                    else{
                        fallWidthx = 0.001;
                        fallWidthz = 0.001;
                    }
                }
                _this.mesh.material = Config.block.fixedMat;
                _this.mesh.geometry = new THREE.BoxGeometry( _this.widthX, 1, _this.widthZ );
                _this.mesh.position.set(_this.posX, high, _this.posZ);
                
                new FallBlock(scene, fallPos, fallWidthx, fallWidthz);
                return true;
            };

            function Translate(){
                if(high % 2){
                    if(_this.widthX < _this.mesh.position.x - _this.posX){
                        _this.Fix();
                    }
                }
                else{
                    if(_this.widthZ < _this.mesh.position.z - _this.posZ){
                        _this.Fix();
                    }
                }
                if(active){
                    _this.mesh.position.add(trans);
                    setTimeout(Translate, 20);
                }
            }
            Translate();
        }
        else{
            this.mesh = null;
            this.Fix = function(){
                return false;
            };
        }
    };

    return Block;
});