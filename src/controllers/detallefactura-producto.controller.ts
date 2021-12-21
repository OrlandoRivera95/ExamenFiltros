import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Detallefactura,
  Producto,
} from '../models';
import {DetallefacturaRepository} from '../repositories';

export class DetallefacturaProductoController {
  constructor(
    @repository(DetallefacturaRepository)
    public detallefacturaRepository: DetallefacturaRepository,
  ) { }

  @get('/detallefacturas/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Detallefactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof Detallefactura.prototype.id,
  ): Promise<Producto> {
    return this.detallefacturaRepository.producto(id);
  }
}
