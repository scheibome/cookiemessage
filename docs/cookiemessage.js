Element.prototype.cookiemessage=function(e){e=e||"";var t,o,i=this,s=window.location.hostname,n="cookiemessage--loaded",d=e.lifetime||365,c=e.button||document.getElementById("cookiemessagebutton"),a=function(e,t,o){var i=new Date;i.setTime(i.getTime()+864e5*o),document.cookie=e+"="+t+";path=/;expires="+i.toGMTString(),document.body.removeAttribute("style")};t=s,2===(o=("; "+document.cookie).split("; "+t+"=")).length&&o.pop().split(";").shift()||(i.classList.add(n),c.addEventListener("click",function(){a(s,"hide",d),i.classList.remove(n)}),document.body.classList.add("cookiemessageloaded"),document.body.setAttribute("style","padding-bottom: "+i.offsetHeight+"px;"))};