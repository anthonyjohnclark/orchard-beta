using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain;
using Application.Product;

namespace API.Controllers
{
    public class ProductsController : BaseAPIController
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> AllProducts()
        {
            return await Mediator.Send(new GetProductList.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Product>> OneProduct(int id)
        {
            return await Mediator.Send(new GetProductItem.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, SetProductActive.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
    }
}