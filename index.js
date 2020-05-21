if (window.location.host.indexOf('jrmylee') > -1 && window.location.protocol != "https:"){
    window.location.protocol = "https";
}

var frontSide = `
<article class="media">
                <div class="media-left">
                    <figure class="image is-64x64">
                        <img src="images/pf.jpeg" style="border-radius:40px;"   alt="Image">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>Jeremy Lee</strong> <small>@jrmylee</small>
                            <br>
                            Software Engineering @ <i><a href="https://capeanalytics.com">Cape Analytics</a></i> 
                            <br>
                            Web Developer @ <i><a href="http://sorkn.com">Sorkn</a></i>
                            <br>
                            CS Student @ <i><a href="https://berkeley.edu">Berkeley</a></i>
                        </p>
                    </div>
                    <nav class="level is-mobile">
                        <div class="level-left">
                            <a class="level-item" href="https://github.com/jrmylee">
                            <span class="icon is-small"><i class="fab fa-github"></i></span>
                            </a>
                            <a class="level-item" href="https://www.linkedin.com/in/jeremy-l-a90742b8/">
                            <span class="icon is-small"><i class="fab fa-linkedin"></i></span>
                            </a>
                            <a class="level-item" href="mailto:jrmylee@berkeley.edu">
                            <span class="icon is-small"><i class="fas fa-inbox"></i></span>
                            </a>
                        </div>
                    </nav>
                </div>            
            </article>
`

var backSide = `
<h1 class="title">Skills</h1>
<ul>
<li>System Design</li>
<li>Frontend </li>

</ul>
`

var toggled = false;

function animateCSS(node, animationName, callback) {
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

var mainCard = document.getElementById('main-card');

mainCard.addEventListener('click', (e) => {
    if(!toggled){
        mainCard.innerHTML = backSide;
        toggled = true;
        animateCSS(mainCard, 'flipInX')
    }else{
        mainCard.innerHTML = frontSide;
        toggled = false;
        animateCSS(mainCard, 'flipInX')
    }
})

mainCard.innerHTML = frontSide
animateCSS(mainCard, 'pulse');
