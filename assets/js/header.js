// const headerEl=document.getElementsByClassName('headerList');
// console.log(headerEl);
// console.log('welcome to header');

// for(let i=0;i<headerEl.length;i++){
//     headerEl[i].addEventListener('click',function(e){
//         e.preventDefault();
//        for(let j=0;j<headerEl.length;j++){
//             headerEl[j].classList.remove('active');   
//        }
//     headerEl[i].classList.add('active');
//     })
// }

// $('.headerList li').click(function(){
//     $('.navt li').removeClass('active');
//     console.log('adding class by jquery');
//     $(this).addClass('active');
// })
const ActivePage=window.location.pathname;
console.log(ActivePage)
const navLinks=document.querySelectorAll('header a').forEach(link=>{

if(link.href.includes(`${ActivePage}`)){


link.classList.add('active');
}
})


// working on logout slid down method 
const slidedownEl=document.getElementById('slidedown');
const more_menuEl=document.getElementById('more_menu');
console.log(slidedownEl);
more_menuEl.addEventListener('click',function(){

       
        slidedownEl.classList.toggle("activeSlide");
   
})