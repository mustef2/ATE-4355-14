function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    const MenuBtn = document.querySelector('.menu-button')
    const hero = document.querySelector('.hero-text')
    hero.style.display = 'none'
    MenuBtn.style.display = 'none'
    sidebar.style.display = 'flex'
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    const MenuBtn = document.querySelector('.menu-button')
    const hero = document.querySelector('.hero-text')
    hero.style.display = 'block'
    MenuBtn.style.display = 'block'
    sidebar.style.display = 'none'
  }