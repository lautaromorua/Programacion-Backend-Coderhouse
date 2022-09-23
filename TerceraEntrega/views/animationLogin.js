let box = new gsap.timeline();

box.from('.container', { width: '0%', stagger: 0.4, duration: 1.5 });
box.from('.form_title', { opacity: 0, y: -30 });
box.from('.form_group input', { opacity: 0, stagger: 0.3 });
box.from('.form_button', { opacity: 0, y: 20 });

// Back to top button
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
});
$('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
});