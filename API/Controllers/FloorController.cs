using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain;
using Application.Floor;

namespace API.Controllers
{
    public class FloorController : BaseAPIController
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> CreateNewFloor(FloorObjects floor)
        {
            return Ok(await Mediator.Send(new PostNewFloor.Command { Floor = floor }));
        }
    }
}