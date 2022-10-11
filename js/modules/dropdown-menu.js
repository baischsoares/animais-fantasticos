import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(menu, events){
  this.dropdownMenus = document.querySelectorAll(menu);
  this.activeClass = 'active'
  
  if(events === undefined) this.events = ['touchstart', 'click']
  else this.events = events
  

  this.activeDropdownMenu = this.activeDropdownMenu.bind(this)
  }

  // ativa o dropdown menu e adiciona
  //a funcao que observa o clique fora dele
  activeDropdownMenu(event) {
    event.preventDefault();
    const element = event.currentTarget
    element.classList.add(this.activeClass);
    outsideClick(element, () => {
      element.classList.remove(this.activeClass);
    });
  }

  //adiciona os eventos ao dropdown menu
  addDropdownMenusEvent(){
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }

  init(){
    if(this.dropdownMenus.length){
      this.addDropdownMenusEvent()
    return this
    }
    
  }
  
}
