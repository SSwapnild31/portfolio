// Basic interactivity for the static portfolio: contact form, year, smooth anchor scrolling.
// Put your real email in mailto if you want direct mail.

// set current year
document.getElementById('year').textContent = new Date().getFullYear();

const images = [
  "images/1.jpg",
  "images/2.jpg",
  //"images/3.jpg",
  //"images/4.jpg"
];

let index = 0;
const hero = document.querySelector(".hero");

/*function changeBackground() {
  hero.style.backgroundImage = `url(${images[index]})`;
  index = (index + 1) % images.length;
}

setInterval(changeBackground, 4000); // 4 sec
changeBackground();*/

function changeBackground() {
  // fade out
  hero.classList.add("fade");

  setTimeout(() => {
    // change image
    index = (index + 1) % images.length;
    hero.style.backgroundImage = `url(${images[index]})`;

    // fade in
    hero.classList.remove("fade");
  }, 500);
}

// initial image
hero.style.backgroundImage = `url(${images[0]}`;

// change every 4 sec
setInterval(changeBackground, 4000);

// smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// contact form simple handler: open mailto with prefilled values
const sendBtn = document.getElementById('sendBtn');
if(sendBtn){
  sendBtn.addEventListener('click', ()=>{
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if(!name || !email){
      alert('Please fill name and email');
      return;
    }

    // TODO: replace the email address below with your real address
    const to = 'swapnil.nd7057@gmail.com';
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

// Optional: small tilt effect for project cards on mouse move
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('mousemove', (e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width/2;
    const cy = rect.height/2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    card.style.transform = `perspective(900px) rotateX(${dy * -3}deg) rotateY(${dx * 3}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.transform = '';
  });
});
