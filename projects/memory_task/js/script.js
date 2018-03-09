//Переменная для обозначения последовательности предъявления, 
//1ое трехзначное число - серия-квартиль-номер фото
//2ая цифра - задача (1 - запомнить, 2 - забыть, 3 - нет инструкции)
//3яя цифра - операция (1 - сохранить, 2 - удалить, 3 - нет операции)
var JSONhash;
var hash = [
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1]
];
var instructions = [
  [
      'Следователь просит Вас запомнить фото и сохранить его в архив, так как оно пригодится ему в дальнейшем',
      'Данное фото было получено незаконно, оно имеет ценность для расследования дела, однако руководству его лучше не видеть',
      'Данное фото следователь уже обработал, но оно важное, и Вам стоит его запомнить'
  ],
  [
      'Для расследования данное фото не нужно, однако следователь просит Вас его сохранить в архив, так как оно может пригодиться ему в будущем',
      'Не стоит обращать внимание на данное фото, оно не имеет ценности для расследования, и следователь просит вас его удалить',
      'Данное фото следователь уже обработал, при этом Вам не нужно его запоминать, так как оно не имеет значимости для исследования.'
  ],
  [
      'Следователь не знает ценность данной фотографии в расследовании и на всякий случай просит ее сохранить',
      'Следователь не знает ценность данной фотографии в расследовании, но склоняется к тому, что ее все же стоит удалить',
      'Данное фото следователь уже по каким-то причинам обработал, но не дал конкретных указаний, что с ним делать'
  ]  
];
var cur = 0;

function display(s,q,n){
    document.getElementById('stimuli').src = "stimuli/"+s+"-"+q+"-"+n+".jpg";
}
function show(f){
    if (cur == 18) {
      alert('Спасибо за участие!');
      document.write(name + ":<br>" + JSONhash)
    } 
    else{
        var got = hash[f][0].toString().split('');
        display(got[0], got[1], got[2]);
        var tta = hash[f][1];
        var opp = hash[f][2];

        console.log(hash[f][2])

        document.getElementById('info').innerHTML = instructions[parseInt(tta)-1][parseInt(opp)-1];

        switch (opp){
            case 1:
                document.getElementById('save_btn').addEventListener("click", show_next);
                document.getElementById('delete_btn').removeEventListener("click", show_next);
                document.getElementById('arrow_right').removeEventListener("click", show_next);
            break;
            case 2:
                document.getElementById('save_btn').removeEventListener("click", show_next);
                document.getElementById('delete_btn').addEventListener("click", show_next);
                document.getElementById('arrow_right').removeEventListener("click", show_next);
            break;
            case 3:
                document.getElementById('save_btn').removeEventListener("click", show_next);
                document.getElementById('delete_btn').removeEventListener("click", show_next);
                document.getElementById('arrow_right').addEventListener("click", show_next);
            break;

        }
    }
}
function show_next(){
    cur++;
    show(cur);
}

function getHash(){
    pics = [111, 112, 113, 121, 122, 123, 131, 132, 133, 211, 212, 213, 221, 222, 223, 231, 232, 233];
    tasks = [1, 2, 3].sort(rnd);
    oper = [1, 2, 3];
    for (var i = 0; i < pics.length/3; i++){
        oper = oper.sort(rnd);
        k = i;
        switch (i){
            case 3:
                k = 0;
                break;
            case 4:
                k = 1;
                break;
            case 5:
                k = 2;
                break;
        }
        for (var j = 1; j <= 3; j++){
            hash[i*3+j-1][0] = pics[i*3+j-1]; 
            hash[i*3+j-1][1] = tasks[k]; 
            hash[i*3+j-1][2] = oper[j-1]; 
        }
    }
    hash.sort(rnd)
    JSONhash = JSON.stringify(hash);
}

function rnd(a, b) {
  return Math.random() - 0.5;
}

function begin(){
    getHash();
    show(cur);
    
}


var name = prompt("Пожалуйста, укажите Ваше имя или псевдоним");
begin();
localStorage.setItem(name, JSONhash)