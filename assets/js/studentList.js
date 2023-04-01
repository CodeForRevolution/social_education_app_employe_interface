const dropEL=document.querySelectorAll('.more_info_drop')
console.log("dropEl lllls ",dropEL);

for(let i=0;i<dropEL.length;i++){
    dropEL[i].addEventListener('click',function(e){
e.preventDefault();
console.log(e.target);

const studentEL=document.getElementById(dropEL[i].getAttribute("href"))
console.log(studentEL);

const findropEl=document.getElementsByClassName('activeStudent');

if(findropEl.length!=0){
    console.log('inside',findropEl[0].id);
    console.log('active',studentEL.id);
    findropEl[0].classList.add('student');
    findropEl[0].classList.remove('activeStudent')
    if(findropEl[0].id==studentEL.id){
console.log('if statement');
        return;
    }
   
}
console.log('last part')
studentEL.classList.add('activeStudent')
studentEL.classList.remove('student')

    })
}



//===============working on student form appear =============================
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