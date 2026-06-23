import { type SchemaTypeDefinition } from 'sanity'

import { globalSettings } from './documents/globalSettings'
import { heroSection } from './documents/heroSection'
import { project } from './documents/project'
import { screenplay } from './documents/screenplay'
import { audioTrack } from './documents/audioTrack'
import { subscriber } from './documents/subscriber'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [globalSettings, heroSection, project, screenplay, audioTrack, subscriber],
}
