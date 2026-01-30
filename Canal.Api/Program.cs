using Microsoft.EntityFrameworkCore;
using Canal.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CanalDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CanalDatabase")));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();
app.Run();
