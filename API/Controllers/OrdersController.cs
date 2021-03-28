using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain;
using Application.Order;

namespace API.Controllers
{
    public class OrdersController : BaseAPIController
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> CreateNewOrder(Order order)
        {
            return Ok(await Mediator.Send(new PostNewOrder.Command { Order = order }));
        }
    }
}