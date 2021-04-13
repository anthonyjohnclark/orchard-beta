using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Floor
{
    public class PostNewFloor
    {
        public class Command : IRequest
        {
            public Domain.FloorObjects Floor { get; set; }
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

                _context.FloorObjects.Add(request.Floor);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }

    }
}