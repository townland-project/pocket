import { Eventer } from '@townland-project/eventer';
import { IPocketItem, Pocket } from './pocket';

export let Event: Eventer;

export function SetEventer(eventer: Eventer) {
    Event = eventer
    Listen()
}

function Listen() {
    Event.on('pocket:show', () => {
        document.querySelector('tl-pocket')?.classList.add('show')
    })

    Event.on('pocket:hide', () => {
        document.querySelector('tl-pocket')?.classList.remove('show')
    })

    Event.on('pocket:item:set', (items: IPocketItem[]) => {        
        Pocket.AddItems(items)
    })

    Event.on('pocket:item:add', (item: IPocketItem) => {
        Pocket.AddItem(item)
    })

    Event.on('pocket:item:remove', (id: string) => {
        Pocket.RemoveItemById(id)
    })

    Event.on('pocket:item:badge', (id: string, value: string) => {
        Pocket.SetItemBadgeById(id, value)
    })
}