window.$id = document.getElementById.bind(document)
window.$ = document.querySelector.bind(document)
window.$$ = document.querySelectorAll.bind(document)
document.on = document.addEventListener
window.on = window.addEventListener
Element.prototype.on = Element.prototype.addEventListener
Element.prototype.$ = Element.prototype.querySelector
Element.prototype.$$ = Element.prototype.querySelectorAll

if (!Math.sign) {
// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
  Math.sign = function(x) {
    return ((x > 0) - (x < 0)) || +x
  }
}
