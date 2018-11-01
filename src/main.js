import TemplateComponent from './template';

const components = [
    TemplateComponent
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