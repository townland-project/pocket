import { Eventer } from "@townland-project/eventer"
import { GeneratePocket } from "."
import { Event } from "./core/eventer"
import { IPocketItem } from "./core/pocket"

GeneratePocket(new Eventer())
    .then(element => {
        document.getElementById('root')?.appendChild(element!)
        return Promise.resolve()
    })
    .then(() => {
        FakeData()
        return Promise.resolve()
    })
    .then(() => {
        ListenToKeyboard()
    })



function FakeData() {
    let fill = `rgba(0, 0, 0, 0.3)`

    let items: IPocketItem[] = [
        {
            id: 'phone',
            title: 'Phone',
            event: 'phone:pick-up',
            color: {
                background: '#a29bfe',
                shadow: '#6c5ce7',
                fill: fill
            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>`
        },
        {
            id: 'money',
            title: 'Credit cart',
            event: 'credit-cart:pick-up',
            color: {
                background: '#74b9ff',
                shadow: '#0984e3',
                fill: fill
            },
            badge: '3$',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-1 14H5c-.55 0-1-.45-1-1v-5h16v5c0 .55-.45 1-1 1zm1-10H4V7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1z"/></svg>`
        },
        {
            id: 'key',
            title: 'Private room key',
            event: 'key:pick-up',
            color: {
                background: '#ff6b81',
                shadow: '#ff4757',
                fill: fill
            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M20.59,10h-7.94C11.7,7.31,8.89,5.5,5.77,6.12c-2.29,0.46-4.15,2.3-4.63,4.58C0.32,14.58,3.26,18,7,18 c2.61,0,4.83-1.67,5.65-4H13l1.29,1.29c0.39,0.39,1.02,0.39,1.41,0L17,14l1.29,1.29c0.39,0.39,1.03,0.39,1.42,0l2.59-2.61 c0.39-0.39,0.39-1.03-0.01-1.42l-0.99-0.97C21.1,10.1,20.85,10,20.59,10z M7,15c-1.65,0-3-1.35-3-3c0-1.65,1.35-3,3-3s3,1.35,3,3 C10,13.65,8.65,15,7,15z"/></g></svg>`
        },
    ]
    
    Event.emit('pocket:item:set', items)
}

function ListenToKeyboard() {
    let active: boolean = false
    let code = 'AltLeft'

    window.addEventListener('keydown', (event) => {
        event.preventDefault()

        if (event.code == code && !active) {
            Event.emit('pocket:show')
            active = true
        }
    })

    window.addEventListener('keyup', (event) => {
        event.preventDefault()

        if (event.code == code && active) {
            active = false
            Event.emit('pocket:hide')
        }
    })
}