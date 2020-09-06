/*
    1: implement player movement right left
    2: implement player fire after space click
    3: implement bullet flying
    4: check are the bullet shot in the enemy
    5: death enemy if the buller shot him 
    6: implement explosion animation
    7: add a kill counter enemy
*/

var player = document.querySelector("#player");


console.log(player);

document.addEventListener('keydown', function(event) {

   
    console.log(event.keyCode);
    
     switch(event.keyCode){

        // Left arrow

        case 37:

            if(player.offsetLeft > 10){  // check left side 
                player.style.left = player.offsetLeft - 60 + "px";     
            }
                
            break;
        
        // key A

        case 65:

            if(player.offsetLeft > 10){ 
                player.style.left = player.offsetLeft - 60 + "px";
            }
                break;

        // Rigth arrow

        case 39:
            if(player.offsetLeft < document.body.offsetWidth - 310){ // check right side
                player.style.left = player.offsetLeft + 60 + "px";
            }

            break;

        //key D

        case 68:
            if(player.offsetLeft < document.body.offsetWidth - 310){ 
                player.style.left = player.offsetLeft + 60 + "px";
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
                    
  
                setTimeout( () => {
                    element.remove(); 
                    bullet.remove();
                }, 2000)
            }
        });
    }
}

const animation = (element) => {
    element.className = 'boom';
}


const create_enemy = () => {
    
    let enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.style.top = 20 + "px";

    console.log("offset width", document.body.offsetWidth );

    enemy.style.left = Math.random() * (0, document.body.offsetWidth - 250) + "px";
 
    document.body.appendChild(enemy);
}


setInterval( () => {
    create_enemy();
}, 5000)
    

