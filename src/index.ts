import { Module, RenderModule } from '@townland-project/dom'
import { Eventer } from '@townland-project/eventer'

import { MainComponent } from './components/main'
import { SetEventer } from './core/eventer'

@Module({
    Component: [],
    Bootstrap: MainComponent
})
export class PocketModule { }

export function GeneratePocket(eventer: Eventer): Promise<HTMLElement | undefined> {
    SetEventer(eventer)
    return RenderModule(PocketModule)
}