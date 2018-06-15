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
        var banner = document.getElementById("banner");
        var btnPlay = document.getElementById("play-btn");
        var scoreDiv = document.getElementById("score");
        var sm = document.getElementById("score-message");

        var universe = new Universe(document.body);
        var universeDiv = universe.GetDom();

        btnPlay.onclick = function(){
            universe.Reset();
            banner.style.display = "none";
            scoreDiv.style.display = "block";            
            
            var i = document.body;
            if (i.requestFullscreen) {
                i.requestFullscreen();
            } else if (i.webkitRequestFullscreen) {
                i.webkitRequestFullscreen();
            } else if (i.mozRequestFullScreen) {
                i.mozRequestFullScreen();
            } else if (i.msRequestFullscreen) {
                i.msRequestFullscreen();
            }

            universeDiv.onmousedown = function(){
                universe.AddBlock(new Block(universe.GetScene()));
            };

        };

        window.gameOver = function(score){
            banner.style.display = "block";
            scoreDiv.style.display = "none";
            sm.style.display = "block";
            sm.innerHTML = "Last score<br>" + score;
        };
    }
);