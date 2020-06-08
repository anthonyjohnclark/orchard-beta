using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain;
using Application.Product;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]

        public async Task<ActionResult<List<Product>>> AllProducts()
        {
            return await _mediator.Send(new ProductList.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Product>> OneProduct(int id)
        {
            return await _mediator.Send(new ProductItem.Query { Id = id });
        }


    }
}