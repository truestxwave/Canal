using Microsoft.EntityFrameworkCore;
using Canal.Api.Data;

var builder = WebApplication.CreateBuilder(args);

//Cors

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Frontend URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CanalDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CanalDatabase")));

var app = builder.Build();
app.UseCors();
app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();
app.Run();
