function resetCookie(){"use strict";var e=new Date;e.setTime(e.getTime()+864e5),document.cookie=window.location.hostname+"=;path=/;expires="+e.toGMTString(),window.location.reload(!0)}document.getElementById("cookiemessage").cookiemessage({lifetime:1});