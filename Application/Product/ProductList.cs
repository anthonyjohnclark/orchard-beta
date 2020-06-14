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
    public class ProductList
    {
        public class Query : IRequest<List<Domain.Product>> { }

        public class Handler : IRequestHandler<Query, List<Domain.Product>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Domain.Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                var products = await _context.Products.ToListAsync();

                return products;
            }

        }
    }
}