using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Tweek.ApiService.Addons;
using Tweek.Engine.Drivers.Context;

namespace Tweek.Drivers.Context.InMemory
{
    public class InMemoryServiceAddon : ITweekAddon
    {

        public void Use(IApplicationBuilder builder, IConfiguration configuration)
        {
        }

        public void Configure(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IContextDriver>(new InMemoryContext());
        }
    }
}
