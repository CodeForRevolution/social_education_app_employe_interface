


const dropEL=document.querySelectorAll('.more_info_drop')
console.log("dropEl lllls ",dropEL);

for(let i=0;i<dropEL.length;i++){
    dropEL[i].addEventListener('click',function(e){
e.preventDefault();
console.log(e.target);

const clickEl=document.getElementById(dropEL[i].getAttribute("href"))
console.log(clickEl);

const findropEl=document.getElementsByClassName('interviewActive');

if(findropEl.length!=0){
    console.log('inside',findropEl[0].id);
    console.log('active',clickEl.id);
    findropEl[0].classList.add('interview');
    findropEl[0].classList.remove('interviewActive')
    if(findropEl[0].id==clickEl.id){
console.log('if statement');
        return;
    }
   
}
console.log('last part')
clickEl.classList.add('interviewActive')
clickEl.classList.remove('interview')

    })
}


// working on interview form popup
const create_logoEl=document.getElementById('create_logo');
const student_create_el=document.getElementById('student_create');
const exitEl=document.getElementById('exit');
create_logoEl.addEventListener('click',function(){
    console.log('item is click')
   student_create_el.classList.remove('student_create')
   student_create_el.classList.add('nonActive')
})

exitEl.addEventListener('click',function(){
    console.log('you click');
    student_create_el.classList.add('student_create')
    student_create_el.classList.remove('nonActive')
})