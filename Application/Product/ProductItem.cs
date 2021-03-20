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
    public class ProductItem
    {
        public class Query : IRequest<Domain.Product>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Domain.Product>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Domain.Product> Handle(Query request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.Id);
                return product;
            }
        }
    }
}