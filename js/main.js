define('THREE', ['js/lib/three.min'], function ( THREE ) { window.THREE = THREE; return THREE; });

requirejs.config({
    baseUrl: '.',
    paths: {
        "Config": "js/config", 
        "Universe" : "js/components/universe",
        "Block" : "js/components/block",
        "FallBlock": "js/components/fallblock"
        }
});

require(["THREE", "Universe", "Block"],
    function(THREE, Universe, Block){
        var u = new Universe(document.body);

        document.onmousedown = function(){
            u.AddBlock(new Block(u.GetScene()));
        };
    }
);