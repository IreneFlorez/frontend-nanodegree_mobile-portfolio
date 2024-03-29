## Website Performance Optimization portfolio project

Make the [original mobile portfolio website](https://github.com/udacity/frontend-nanodegree-mobile-portfolio) render as quickly as possible by applying the techniques covered in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

###Part 1: Optimize PageSpeed Insights score for index.html
Optimize for a 90 minimum PageSpeed Insights Score. My mobile score is 99/100. 

1. Inline CSS (also minified) to avoid render-blocking 
2. Print style inlined (also minified and saved as media query)
3. Async Google fonts, JS files, and google-analytics so it won't interfere with page load
4. Compress jpg and png files to reduce load time
5. Updated the .mover with transform:translateZ(0) and backface-visibility:hidden (and related prefixes)


###Part 2: Optimize Frames per Second in pizza.html
Optimize for a 60 fps or higher frame per second rate. See the instructive comments in main.js. 
You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

Techniques used to optimize pizza.html:
1. Inline (also minified) styles to avoid render-blocking
2. Compress jpg and png files to reduce load time

Techniques used to optimize main.js:
1. Remove sizeSwitcher() 
2. Removed determineDx()
3. UpdatePositions sliding pizza count reduced to 48
4. Push Math.sin(scrollConstant + (i % 5)) in phase array
5. Create variable to replace the querySelector with getElementById. Then append the pizza count in fragments to pizzasDiv
6. Replace document.querySelector("#pizzaSize") with document.getElementById("pizzaSize")
7. New randomPizzas and numPizzas variables to simplify the for loop; Create new variable for document.querySelectorAll(".randomPizzaContainer") and replace querySelectorAll with getElementByClassName
8. Updated document.querySelector call to the faster document.getElementById()
9. Dynamically calculate the number of pizzas needed to fill the screen, based on browser window resolution
 and declared the elem variable (var elem;) in the initialisation of the for-loop to prevent it from being created every time the loop is executed.


### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>
* Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

Additional References
https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
https://developer.mozilla.org/en-US/docs/Web/API/Screen/height
http://www.w3schools.com/jsref/prop_screen_height.asp
https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
http://tripleodeon.com/2011/12/first-understand-your-screen/
http://ryanve.com/lab/dimensions/
https://developer.mozilla.org/en-US/docs/Web/CSS/transform
http://blog.teamtreehouse.com/increase-your-sites-performance-with-hardware-accelerated-css
https://css-tricks.com/almanac/properties/b/backface-visibility/
http://designmodo.com/backface-visibility-css-animation/
http://autoprefixer.github.io/

### Loading/Use Instructions

To view the portfolio website download all the files and open index.html in your browser or view the site here: https://ireneflorez.github.io/mobile-portfolio/

To view the pizza website download all of the files and open views/pizza.html in your browser.

		<!-- *. To inspect the site on your phone, run a local server

		  ```bash
		  $> cd /path/to/your-project-folder
		  $> python -m SimpleHTTPServer 8080
		  ```

		*. Open a browser and visit localhost:8080
		*. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

		  ``` bash
		  $> cd /path/to/your-project-folder
		  $> ./ngrok http 8080
		  ```
