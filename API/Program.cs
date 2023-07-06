using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));

// Need to add the authentication middleware after UseCors and before MapControllers method
app.UseAuthentication(); // 1st. Asks do you have a valid token
app.UseAuthorization(); // 2nd. So you have a valid token, now what are you allowed to do?

app.MapControllers(); // middleware that tells our http request which API endpoint it needs to go to

app.Run(); // command to actually run the application
