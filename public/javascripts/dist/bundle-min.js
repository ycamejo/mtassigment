"use strict";document.addEventListener("DOMContentLoaded",function(){console.log("Now that DOM is ready!!! My favorite movie is: Once upon a time!"),ready()});var factOptions={t1:"You are correct",l1:"You are incorrect",t2:"You are correct"},ready=function(){document.querySelectorAll('input[name="facts"]').forEach(function(e){e.addEventListener("change",function(){var t=e.value,n=factOptions[t],o=document.getElementById("answer");o.innerHTML=n,o.classList.remove("wrong"),o.classList.remove("right"),"t"===t[0]?o.classList.add("right"):o.classList.add("wrong")})})};
//# sourceMappingURL=bundle-min.js.map
