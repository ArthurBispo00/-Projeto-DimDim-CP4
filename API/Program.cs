using APIrestfullC_.Properties.Data; // Importante: precisa incluir o namespace correto
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1) Registra política de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFront", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")  // origem do seu front
            .AllowAnyMethod()                       // GET, POST, PUT, DELETE...
            .AllowAnyHeader();                      // Content-Type, Authorization...
    });
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registro do DbContext usando PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 2) Ativa o CORS **antes** de MapControllers
app.UseCors("AllowFront");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
