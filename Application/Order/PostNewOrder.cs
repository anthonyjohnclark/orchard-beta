using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Order
{
    public class PostNewOrder
    {
        public class Command : IRequest
        {
            public Domain.Order Order { get; set; }
            //properties of whatever being created here 

            //e.g. public string Name {get;: set;}
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                _context.Orders.Add(request.Order);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }

    }
}