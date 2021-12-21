import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Producto,
  Detallefactura,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoDetallefacturaController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/detallefacturas', {
    responses: {
      '200': {
        description: 'Array of Producto has many Detallefactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Detallefactura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Detallefactura>,
  ): Promise<Detallefactura[]> {
    return this.productoRepository.detallefacturas(id).find(filter);
  }

  @post('/productos/{id}/detallefacturas', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Detallefactura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallefactura, {
            title: 'NewDetallefacturaInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) detallefactura: Omit<Detallefactura, 'id'>,
  ): Promise<Detallefactura> {
    return this.productoRepository.detallefacturas(id).create(detallefactura);
  }

  @patch('/productos/{id}/detallefacturas', {
    responses: {
      '200': {
        description: 'Producto.Detallefactura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallefactura, {partial: true}),
        },
      },
    })
    detallefactura: Partial<Detallefactura>,
    @param.query.object('where', getWhereSchemaFor(Detallefactura)) where?: Where<Detallefactura>,
  ): Promise<Count> {
    return this.productoRepository.detallefacturas(id).patch(detallefactura, where);
  }

  @del('/productos/{id}/detallefacturas', {
    responses: {
      '200': {
        description: 'Producto.Detallefactura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Detallefactura)) where?: Where<Detallefactura>,
  ): Promise<Count> {
    return this.productoRepository.detallefacturas(id).delete(where);
  }
}
