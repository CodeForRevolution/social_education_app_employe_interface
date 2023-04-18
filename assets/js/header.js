//working on header of layout for making link active on click
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