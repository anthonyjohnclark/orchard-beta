using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Product;
using Application.Order;


namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
                {
                    opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
                }

                );
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(typeof(GetProductList.Handler).Assembly);
            services.AddMediatR(typeof(GetProductItem.Handler).Assembly);
            services.AddMediatR(typeof(PostNewOrder.Handler).Assembly);

            return services;
        }
    }
}