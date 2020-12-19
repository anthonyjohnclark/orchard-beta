using MediatR;
using Domain;
using System.Collections.Generic;
using System;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Product
{
    public class Edit 
    {
        public class Command : IRequest 
        {
        public int Id { get; set; }
        public Boolean productActive { get; set; }

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
                var product = await _context.Products.FindAsync(request.Id);

                if (product == null)
                    throw new Exception("Could not find product.");

                    product.productActive = !request.productActive;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}