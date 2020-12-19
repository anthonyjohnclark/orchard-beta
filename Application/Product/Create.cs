using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;

namespace Application.Product
{
    public class Create 
    {
        public class Command : IRequest 
        {
            //properties of whatever being created here 

            //e.g. public string Name {get;: set;}
        }
        public class Handler : IRequest<Command>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // var thingBeingCreated = new ThingBeingCreated  --- like product, labor, etc.
                {
                    //id = request.id 
                    //name = request.name
                };

                //context.Products.AddAsync(thingBeingCreated);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}