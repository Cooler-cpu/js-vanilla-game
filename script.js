/*
    1: implement player movement right left
    2: implement player fire after space click
    3: implement bullet flying
    4: check are the bullet shot in the enemy
    5: death enemy if the buller shot him 
    6: implement explosion animation
    7: add a kill counter enemy
    8: add enemy shot 
*/

var player = document.querySelector("#player");

var counter = 0; // counter of death

document.addEventListener('keydown', function(event) {

    
     switch(event.keyCode){

        // Left arrow

        case 37:

            if(player.offsetLeft > 10){  // check left side 
                player.style.left = player.offsetLeft - 80 + "px";     
            }
                
            break;
        
        // key A

        case 65:

            if(player.offsetLeft > 10){ 
                player.style.left = player.offsetLeft - 80 + "px";
            }
                break;

        // Rigth arrow

        case 39:
            if(player.offsetLeft < document.body.offsetWidth - 330){ // check right side
                player.style.left = player.offsetLeft + 80 + "px";
            }

            break;

        //key D

        case 68:
            if(player.offsetLeft < document.body.offsetWidth - 330){ 
                player.style.left = player.offsetLeft + 80 + "px";
            }
                break;

        // key space 

        case 32:

            create_bullet();
    }

})

const create_bullet = () => {
    
    let bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.top = player.offsetTop + 20 + "px";
    bullet.style.left = player.offsetLeft + 110 + "px";

    document.body.appendChild(bullet);
    bullet_move(bullet);

} 


const bullet_move = (bullet) => {


    let timer =  setInterval( () =>{

        bullet.style.top = bullet.offsetHeight - 50 + "px";
        
        is_shot(bullet);

        if(bullet.offsetTop < 0){
            bullet.remove();
            clearInterval(timer);
        }

    }, 10)

}

const is_shot = (bullet) => {
    

    let enemy_all = document.querySelectorAll(".enemy");

    let bullet_left_x = bullet.offsetLeft;

    if(enemy_all != null){
        enemy_all.forEach(element => {
            let LeftX = element.offsetLeft; // left side enemy
            let RightX = element.offsetLeft + 200; // right side enemy
            
            if(bullet_left_x > LeftX && bullet_left_x < RightX && bullet.offsetTop < 200){


                animation(element); // add explosin animation

                bullet.remove();
                counter++; // counter killing

                counter_render(counter);

               

                setTimeout( () => {

                    element.remove(); 
                
                }, 1000)
            }
        });
    }
}


const enemy_shot = () => {
    
    let enemy_all = document.querySelectorAll(".enemy");

    let is_enemy_shot = Math.floor(Math.random() * (0, enemy_all.length));

    create_enemy_bullet(enemy_all[is_enemy_shot]);

}

const create_enemy_bullet = (enemy) => {
    console.log(enemy);

    let bullet = document.createElement("div");
    bullet.className = "bullet";

    bullet.style.transform = "rotate(90deg)";
    bullet.style.background = "#FFD700";

    bullet.style.top = enemy.offsetTop + 130 + "px";
    bullet.style.left = enemy.offsetLeft + 110 + "px"

    document.body.appendChild(bullet);
    enemy_bullet_move(bullet);

}

const enemy_bullet_move = (bullet) => {
    let timer =  setInterval( () =>{

        bullet.style.top = bullet.offsetHeight + 1000 + "px";

        console.log("bulltet offset top:", bullet.offsetTop, "document offset top:", document.body.clientHeight);

        if(bullet.offsetTop >= document.body.clientHeight){
            
            bullet.remove();
            clearInterval(timer);

        }

    }, 50);
}




const animation = (element) => { // explosin animation

    element.className = 'boom';

}

const counter_create = (counter) => {

    let block = document.createElement("div");
    block.className = "lifes";

    document.body.appendChild(block);
    
    block.innerHTML = "<span>" + "</span>" + "<h1>" + counter + "</h1>";

}

const counter_render = (counter) => {

    let block = document.querySelector(".lifes"); // for render counter

    let h1_counter = block.querySelector("h1");
    
    block.innerHTML = "<span>" + "</span>" + "<h1>" + counter + "</h1>";

}

counter_create(0);

const create_enemy = () => {
    
    let enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.style.top = 20 + "px";

    enemy.style.left = Math.random() * (0, document.body.offsetWidth - 250) + "px";
 
    document.body.appendChild(enemy);
   
}

var enemy_counter = 0;

setInterval( () => {
    enemy_counter++;
    if(enemy_counter < 10){
        create_enemy();
    }
    if(enemy_counter > 1){
    setTimeout( () => {

        enemy_shot();
        
    }, 2000)

    }

}, Math.random() * (2000, 7000))
    

