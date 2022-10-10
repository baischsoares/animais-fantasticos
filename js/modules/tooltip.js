export default class Tooltip {
  constructor(tooltips){
    this.tooltips = document.querySelectorAll(tooltips);

    //bind do objeto da classe aos callbacks
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)

  }
 
 onMouseMove(event) { 
  this.tooltips.style.top = `${event.pageY + 20}px`;
  if (event.pageX + 240 > window.innerWidth){
    this.tooltips.style.left = `${event.pageX - 190}px`;
  } else {
    this.tooltips.style.left = `${event.pageX + 20}px`;
  }
}

 onMouseLeave({ currentTarget }) {
      this.tooltips.remove();
      currentTarget.removeEventListener('mouseleave', this.onMouseLeave);
      currentTarget.removeEventListener('mousemove', this.onMouseMove);
    }

 // cria a tooltip e coloca no body
  criarTooltipBox(element) {
    const tooltipBox = document.createElement('div');
    const text = element.getAttribute('aria-label');
    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    this.tooltips = tooltipBox;
  }

  onMouseOver({ currentTarget }) {
    this.criarTooltipBox(currentTarget)
    currentTarget.addEventListener('mousemove', this.onMouseMove);
    currentTarget.addEventListener('mouseleave', this.onMouseLeave);
  }

  addTooltipsEvent(){
    this.tooltips.forEach((item) => {
      item.addEventListener('mouseover', this.onMouseOver);
    });
  }

  init(){
    if (this.tooltips.length){
      this.addTooltipsEvent()
    }
    return this
  }
  
}
