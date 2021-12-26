import { Component, ComponentHelper } from '@townland-project/dom'

@Component({
    id: 'tl-pocket',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class MainComponent extends ComponentHelper {

    GenerateItem() {
        let div = document.createElement('div')
        div.className = 'item'

    
        this.Element.appendChild(div)
    }
}
