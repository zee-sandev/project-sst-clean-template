import { Attribute, Entity, EntityConfiguration } from 'electrodb'
import { TIndexKeys } from './types/electrodb.type'

type TAttributes = {
  readonly name: Attribute
  readonly createDate: Attribute
}

type TIndexes = {
  byName: TIndexKeys
}

@$di.injectable()
export default class ExampleEntity {
  private _name: string = 'Example'
  private _version: string = '1'
  private _service: string = 'example'

  private _attributes: TAttributes = {
    name: {
      type: 'string',
      required: true
    },
    createDate: {
      type: 'string'
    }
  }

  private _indexes: TIndexes = {
    byName: {
      pk: {
        field: 'pk',
        composite: ['name']
      }
    }
  }

  private _entity: Entity<
    string,
    string,
    string,
    {
      model: {
        entity: string
        service: string
        version: string
      }
      attributes: TAttributes
      indexes: TIndexes
    }
  >

  constructor(@$di.inject('ElectroConfig') config: EntityConfiguration) {
    this._entity = new Entity(
      {
        model: {
          entity: this._name,
          service: this._service,
          version: this._version
        },
        attributes: this._attributes,
        indexes: this._indexes
      },
      config
    )
  }

  get entity() {
    return this._entity
  }
}
