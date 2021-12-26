import { Event } from "./eventer";

class CPocket {
    public SelectedItem: IPocketItem | undefined;
    public items: IPocketItem[] = []

    public AddItems(items: IPocketItem[]): void {
        items.forEach(item => this.AddItem(item))
    }

    public AddItem(item: IPocketItem): void {
        this._AddItemElement(item)
        this.items.push(item)
        this._SetItemsLength()
    }

    private _AddItemElement(item: IPocketItem): void {
        let element = document.createElement('div')
        
        element.className = 'item'

        element.setAttribute('item-id', item.id)
        element.setAttribute('title', item.title)

        element.style.setProperty('--index', this.items.length.toString())
        element.style.setProperty('--background-color', item.color.background)
        element.style.setProperty('--shadow-color', item.color.shadow)
        element.style.setProperty('--fill-color', item.color.fill)

        if (item.logo)
            element.style.setProperty('--background-image', item.logo)

        if(item.icon)
            element.innerHTML = item.icon
        

        if (item.badge != undefined && item.badge != null)
            element.setAttribute('badge', item.badge.toString())

        element.onmouseover = () => this.SelectedItem = item
        element.onmouseleave = () => this.SelectedItem = undefined
        element.onclick = () => {
            this.SelectedItem = undefined
            Event.emit('pocket:item:select', item)
        }

        document.getElementById('tl-pocket-items')?.appendChild(element)
    }
    
    private _SetItemsLength(): void {
        (<HTMLElement | undefined>document.querySelector('tl-pocket'))?.style.setProperty('--items-length', this.items.length.toString())
    }

    public RemoveItemById(id: string): void {
        let index = this.items.findIndex(item=> item.id == id)

        if(index != -1) {
            this.items.splice(index, 1)
            this._RemoveItemById(id)
        }
    }

    private _RemoveItemById(id: string): void {
        let item = document.querySelector(`tl-pocket-item[item-id="${id}"]`)
        item?.parentElement?.removeChild(item!)
    }

    public SetItemBadgeById(id: string, value: string): void {
        let index = this.items.findIndex(item=> item.id == id)
        if(index > -1) {
            this.items[index].badge = value
            document.querySelector(`tl-pocket-item[item-id="${id}"]`)?.setAttribute('badge', value)
        }
    }
}

export interface IPocketItem {
    id: string
    title: string
    event: string
    color: {
        background: string
        shadow: string
        fill: string
    }
    icon?: string
    logo?: string
    badge?: string | number | null
}

export const Pocket: CPocket = new CPocket()