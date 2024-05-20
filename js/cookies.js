function hideCookieBanner() {
    var cookieBanner = document.getElementById('cookie-banner');
    cookieBanner.style.display = 'none';
}

document.getElementById('accept-cookies-btn').addEventListener('click', function() {
    localStorage.setItem('cookies_accepted', 'true');

    hideCookieBanner();
});

window.addEventListener('load', function() {
    var cookiesAccepted = localStorage.getItem('cookies_accepted');
    if (cookiesAccepted) {
        hideCookieBanner();
    }
});