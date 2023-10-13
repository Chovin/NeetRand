function load(key) {
  return JSON.parse(localStorage.getItem(key))
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
window.load = load
window.save = save


// https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

let progress = load('progress')
if (!progress) {
  progress = {}

  hrefs = shuffle(Object.keys(challenges))
  hrefs.forEach(( href, i ) => {
    progress[href] = {
      done: false,
      fav: false,
      order: i
    }
  })
  save('progress', progress)
}
// ignore the absolute mess
window.list = Object.keys(progress).sort((a, b) => progress[a].order - progress[b].order).map((href) => {return {href: href, ...challenges[href]}})
window.challenges = challenges
window.progress = progress

let options = load('options')
if (!options) {
  options = {hideDone: false, showFave: false, showBlind: false}
  save('options', options)
}
window.options = options