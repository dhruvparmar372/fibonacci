var Fibonacci = function (options) {
  var container = options.element;
  container.innerHTML = '';

  function createChild (number) {
    var child = document.createElement('div');
    child.className = 'fib-child clearfix initial';
    child.innerHTML = number;
    return child;
  }

  function renderFibonacci (element, number) {
    if (number === 0 || number === 1) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(1);
        }, 500)
      })
    } else {
      
      element.innerHTML = '';
      var child1 = createChild(number-1);
      var child2 = createChild(number-2);
      element.appendChild(child1);
      element.appendChild(child2);
      
      var renderPromise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          child1.className = 'fib-child clearfix';
          child2.className = 'fib-child clearfix';  
        },10)
        setTimeout(function () {
          resolve()
        }, 3000)
      });
      
      return renderPromise.then(function () {
        return Promise.all([renderFibonacci(child1, number-1), renderFibonacci(child2, number-2)]).then(function (data) {
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              child1.className = 'fib-child clearfix initial';
              child2.className = 'fib-child clearfix initial';  
            },500)
            setTimeout(function () {
              element.innerHTML = data[0]+data[1];
              resolve(data[0]+data[1]);
            }, 3000);
          })
        });  
      })
    }
  }

  console.time('Calculate fibonacci of',options.number);
  renderFibonacci(container, options.number).then(function () {
    console.timeEnd('Calculate fibonacci of',options.number);
    container.className = 'clearfix complete';
  });
}


function init () {
  
  var $input = document.querySelector('#fib-number'),
      $startButton = document.querySelector('#start-button'),
      $stage = document.querySelector('#fibonacci-stage');
  
  var currentFibonacci;

  function startFibonacci () {
    if ($input.value) {
      currentFibonacci = new Fibonacci({
        element : $stage,
        number : parseInt($input.value),
      })  
    }
  }

  $startButton.addEventListener('click', startFibonacci);
}


window.onload = init