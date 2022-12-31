const activeNav = (a) => {
  let countnav = document.getElementsByClassName('nav-item')
  for (let i = 0; i < countnav.length; i++) {
    countnav[i].classList.remove('active')
  }
  document.getElementsByClassName('nav-item')[a].classList.add('active')
}

const checkPathToActive = (pathnameIndex) => {
  switch (pathnameIndex) {
    case '/':
      activeNav(0)
      break
    case '/phone-list':
      activeNav(1)
      break
  }
}
