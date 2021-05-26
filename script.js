/* variables */
var nowcombat = 0;
var dealer = 0;
var creaturecounter = null;
var xpgain = 0;
var aagria = 0;
var serectu = 2;
var serector = null;

/* jugador */
const player = {life:60, damage:10, xp:0};

/* enemigos */
const enemy1 = new enemy ("slime",10,6,3);
const enemy2 = new enemy ("skeleton",20,9,6);
const enemy3 = new enemy ("giant",35,12,10);

/* contadores*/
const xpcounter = [0];
const monsters = [];

/* LOCALSTORAGE */


if (!localStorage.totalS) {
    
    localStorage.setItem('totalS',0)
}

function sumLocal() {

    localStorage.totalS = Number(localStorage.totalS)+1

}

/*AJAX*/
/*en general tiene que funcionar bien. borrar el url me activa el fail que crea una pantalla negra y pide reiniciar. En caso de que no funcione hay un json que se llama borrar con la misma informacion*/
function DBuse() {

    $.ajax({
    
        url: "https://mocki.io/v1/b5481c47-05d6-45b2-b36a-0e56cf085ce4"
    })
    .done ( function(res) {
        serector = res[serectu].image
        $("body").css("background-image", "url("+serector+")")
        console.log("xd")       
    })
    .fail( function error(a,b) {
        $("#error").fadeIn(1500)

    })
    .always(function(res) {
        console.log(res)
    })
}

function SUMMON() {

    DBuse();

};

SUMMON()

/*ANIMACIONES*/
$("#MS").fadeOut(1000);

$("#wakiwaki").click(function() {     
    $("#msRest").fadeOut(1500);
});

$("#change1").click(function() {
    serectu = 2
    DBuse()
})

$("#change2").click(function() {
    serectu = 0
    DBuse()
})

$("#change3").click(function() {
    serectu = 1
    DBuse()
})

function showit() {

    let pageflip = new Audio("sound/pageflip.mp3");
    pageflip.play();
    $('#sidebar1').slideDown("fast");

}

function hideit() {

    let pageflip = new Audio("sound/pageflip.mp3");
    pageflip.play();
    $('#sidebar1').slideUp("fast");
    $('#creature--info').empty();

}


/* evento iniciador */
let startExplore = document.getElementById("Bexplore")
startExplore.addEventListener("click", choose_enemy)

let startRest = document.getElementById("Brest")
startRest.addEventListener("click", rest)

function disable() {
    $('#Bexplore').prop("disabled",true);
    $('#Brest').prop("disabled",true);
}

function enable() {
    $('#Bexplore').prop("disabled",false);
    $('#Brest').prop("disabled",false);
}

/* funciones */
function enemy (nam,life,damage,xp) {
    this.name = nam;
    this.life = life;
    this.damage = damage;
    this.xp= xp
    this.encounter = function() {
        /*crea texto para anunciar aparición*/
                                    document.getElementById('lore').innerHTML = 'you encounter a '+this.name+'!'
                                    let continueA = document.createElement("button");
                                    continueA.setAttribute("id", "continueA");
                                    continueA.innerHTML = "continue";
                                    document.getElementById('ptext').appendChild(continueA);

                                    let next = document.getElementById("continueA");
                                    next.addEventListener("click", faceoff);                                    
    }
    this.showcase = function() {
        /*agrega texto del enemigo al que se esta combatiendo para que aparezca como html arriba a la derecha*/
                                    $('#creature--info').append(this.name);                                    

                                    $('#creature--info').append('<img style="height: 100px; width: 100px;" src="img/'+this.name+'.png" alt=""></img>');

                                    $('#creature--info').append('<ul style="padding-top: 90px; list-style:none;"> <li>life: '+this.life+'</li> <li>damage: '+this.damage+'</li> <li>xp: '+this.xp+'</li> </ul>'); 
                                    
                                    $('#imgID').attr('src','img/'+this.name+'1.png');                                                                                            
    }
}

function faceoff() {

    /*esto crea el texto para interactuar con el enemigo*/

    if (player.life<1) { 
        alert("you are dead")
        
    } else {

        let die = document.getElementById("continueA");
        die.parentNode.removeChild(die);
       
        document.getElementById('lore').innerHTML = '¿what do you want to do?!'      
       
        let attack = document.createElement("button");
        attack.setAttribute("id","attacking");
        attack.innerHTML = "attack";
        document.getElementById('ptext').appendChild(attack)
        let attackOption = document.getElementById("attacking");

        attackOption.addEventListener("click", attack1);

        let defend = document.createElement("button");
        defend.setAttribute("id", "defending");
        defend.innerHTML = "defend";
        document.getElementById('ptext').appendChild(defend);
        let defendOption = document.getElementById("defending");

        defendOption.addEventListener("click", defend1);
        
        let heal = document.createElement("button");
        heal.setAttribute("id","healing");
        heal.innerHTML = "heal"
        document.getElementById('ptext').appendChild(heal);
        let healOption = document.getElementById("healing");

        healOption.addEventListener("click", heal1);
        
        function attack1() {
            /* funcion de realizar daño*/
            if (nowcombat < 1) {
            
                result()} else { 

                    deleteActions();

                    let continueA = document.createElement("button");
                    continueA.setAttribute("id", "continueA");
                    continueA.innerHTML = "continue";
                    document.getElementById('ptext').appendChild(continueA);
                    let next = document.getElementById("continueA");
                    next.addEventListener("click", faceoff);

                    document.getElementById('lore').innerHTML = 'you deal '+player.damage+' damage and receive '+ dealer;

                    nowcombat = nowcombat-player.damage;
                    player.life = player.life - dealer;

            }
        }
       
        function defend1() {
            /* funcion de defenderse*/
            if (nowcombat < 1) {
            
                result()} else {
                    
                    deleteActions(); 
                    
                    let continueA = document.createElement("button");
                    continueA.setAttribute("id", "continueA");
                    continueA.innerHTML = "continue";
                    document.getElementById('ptext').appendChild(continueA);
                    let next = document.getElementById("continueA");
                    next.addEventListener("click", faceoff);

                    document.getElementById('lore').innerHTML = 'you deal '+(player.damage/2)+' damage and receive '+ (dealer/3);
  
                    nowcombat = nowcombat - (player.damage/2);                              
                    player.life = player.life - (dealer/3);
            }                                            
        }
 
        function heal1() {
            /* funcion de curarse*/
            if (nowcombat < 1) {
            
                result()} else { 

                    deleteActions();

                    let continueA = document.createElement("button");
                    continueA.setAttribute("id", "continueA");
                    continueA.innerHTML = "continue";
                    document.getElementById('ptext').appendChild(continueA);
                    let next = document.getElementById("continueA");
                    next.addEventListener("click", faceoff);

                    document.getElementById('lore').innerHTML = 'you heal 9 life and receive '+dealer+' damage';
                    
                    player.life = player.life + 9;
                    player.life = player.life - dealer;
            }
        }
}               
}

function result() {
    /*empuja bastante información a sus respectivos lugares, usa un alert para anunciar que murio el enemigo. El alert es necesario para interrumpir cualquier cosa que pueda hacer el jugador*/
    xpcounter.push(xpgain);
    monsters.push(creaturecounter);
    alert("you killed the monster, you received "+xpgain+" experience")

    hideit()
    deleteActions()
    enable()
    sumLocal()

    $('#imgID').attr('src','img/bonfire.png');

    document.getElementById('lore').innerHTML = 'You are resting in a campfire, waiting to continue your journey'
}

function deleteActions() {

    let restart1 = document.getElementById('attacking');
    restart1.parentNode.removeChild(restart1);

    let restart2 = document.getElementById('defending');
    restart2.parentNode.removeChild(restart2);

    let restart3 = document.getElementById('healing');
    restart3.parentNode.removeChild(restart3);
}

function choose_enemy() {
    /*selecciona al enemigo y ejecuta acciones, utilizo un select ya que una de las opciones es especial y tiene un orden de acciones distinto*/

    let opt = Math.floor((Math.random() * 4));

    disable();

    switch (opt) {
        
        case 1: 
                if (player.life<1) {alert("you are dead")
                break;
                } else {
                enemy1.showcase();
                showit()
                dealer = enemy1.damage;
                nowcombat = enemy1.life;
                creaturecounter = enemy1.name;
                xpgain = enemy1.xp;
                enemy1.encounter();               
                break;
                }
    
        case 2:       
                if (player.life<1) {alert("you are dead")
                break;
                } else {
                enemy2.showcase();
                showit()
                dealer = enemy2.damage    
                nowcombat = enemy2.life;
                creaturecounter = enemy2.name;
                xpgain = enemy2.xp;
                enemy2.encounter();
                break;
                }
        case 3:
                if (player.life<1) {alert("you are dead")
                break;
                } else {
                enemy3.showcase();
                showit()
                dealer = enemy3.damage
                nowcombat = enemy3.life;
                creaturecounter = enemy3.name;
                xpgain = enemy3.xp;
                enemy3.encounter();
                break;
                }
        default:
                if (player.life<1) { 
                alert("you are dead")
                } else {
                    document.getElementById('lore').innerHTML = 'you travel safely';
                    enable();
                }
    }  
}

function rest() {

    /*crea un html invisible y le agrega información sobre tu status. Despues lo vuelve visible. Una vez que ya existe solo modifica el html con ID*/

    if (player.life<1) { 
        alert("you are dead") } else {

    const slimeC = monsters.filter(creature => creature == "slime");
    const skeletonC = monsters.filter(creature => creature =="skeleton");
    const giantC = monsters.filter(creature => creature == "giant");

    player.xp = xpcounter.reduce(function(a,b){
        return a+b;
        },0);

    if (player.life<1) { 
        alert("you are dead")
    } else if (aagria==0){

        player.life = player.life + 40;

        let lifer = document.createElement("p")
        lifer.setAttribute("id","a0")
        lifer.innerHTML = ("you rested well, heal 40 life points")
        document.getElementById('divinfo').appendChild(lifer)

        let showing = document.getElementById("divinfo")
        showing.setAttribute("style","display:;")

        let limonster = document.createElement("li");
        limonster.setAttribute("id","a1");
        limonster.innerHTML = ("you killed a total of "+(monsters.length)+" monsters");
        document.getElementById('divinfo').appendChild(limonster)

        let limonstertype = document.createElement("li");
        limonstertype.setAttribute("id","a2");
        limonstertype.innerHTML = (slimeC.length+" were slimes, "+skeletonC.length+" were skeletons and "+giantC.length+" were giants");
        document.getElementById('divinfo').appendChild(limonstertype); 

        let xptotaldisplay = document.createElement("li");
        xptotaldisplay.setAttribute("id","a3");
        xptotaldisplay.innerHTML = ("your current level is "+player.xp);
        document.getElementById('divinfo').appendChild(xptotaldisplay);

        let currentLife = document.createElement("li");
        currentLife.setAttribute("id","a4");
        currentLife.innerHTML = ("you have "+player.life+" health");
        document.getElementById('divinfo').appendChild(currentLife);

        let overal = document.createElement("li");
        overal.setAttribute("id","a5");
        overal.innerHTML = ("all monsters killed: "+localStorage.totalS);
        document.getElementById('divinfo').appendChild(overal);

        aagria++
        } else {

            player.life = player.life + 40;

            document.getElementById('a1').innerHTML = ("you killed a total of "+(monsters.length)+" monsters");

            document.getElementById('a2').innerHTML = (slimeC.length+" were slimes, "+skeletonC.length+" were skeletons and "+giantC.length+" were giants");

            document.getElementById('a3').innerHTML = ("your current level is "+player.xp);

            document.getElementById('a4').innerHTML = ("you have "+player.life+" health");

            document.getElementById('a5').innerHTML = ("all monsters killed: "+localStorage.totalS);

        }
    }
    $("#msRest").fadeIn(1500);
}
