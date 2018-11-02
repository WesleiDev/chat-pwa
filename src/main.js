import TemplateComponent from './template';
import TalkComponent from './talk';

const components = [
    TemplateComponent,
    TalkComponent
]

class Init{
    constructor(){
        components.forEach((component) => {
            let element = document.querySelector(component.el);
            element.innerHTML =component.template;
            component.afteBind();
        })      
    
    }
}

new Init();