const activeNav = (a) => {
  let countnav = document.getElementsByClassName('nav-item')
  for (let i = 0; i < countnav.length; i++) {
    countnav[i].classList.remove('active')
  }
  document.getElementsByClassName('nav-item')[a].classList.add('active')
}

const checkPathToActive = (pathnameIndex) => {
  const pathname = typeof pathnameIndex === 'string' ? pathnameIndex : ''
  const normalized =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  if (normalized === '/') return activeNav(0)

  if (normalized === '/phone-list' || normalized.startsWith('/phone-list/')) return activeNav(1)

  if (normalized === '/accesories' || normalized.startsWith('/accesories/')) return activeNav(2)

  if (normalized === '/blog' || normalized.startsWith('/blog/')) return activeNav(3)

  if (normalized === '/login' || normalized === '/signup') return activeNav(4)

  if (normalized === '/cart' || normalized.startsWith('/cart/')) return activeNav(5)
  }

document.addEventListener('DOMContentLoaded', function () {
  checkPathToActive(window.location.pathname)
})

